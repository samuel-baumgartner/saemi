package com.saemi.goalswidget

import android.content.Context
import org.json.JSONArray
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone

/**
 * Foreground stretches of YouTube / Instagram seen by the accessibility service.
 * Usage-stats events can come back empty after an OS update; this still lets the
 * blocker count the time it actually watched.
 */
object TargetUseLog {
    private const val PREFS = "saemi_target_use"
    private const val KEY = "segments"
    private const val KEEP_MS = 36 * 60 * 60 * 1000L

    private data class Seg(val startMs: Long, val endMs: Long)

    private val lock = Any()
    private var cache: MutableList<Seg>? = null
    private val dayFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    fun note(context: Context, onTarget: Boolean, now: Long = System.currentTimeMillis()) {
        synchronized(lock) {
            val segs = load(context)
            val open = segs.lastOrNull()?.takeIf { it.endMs == 0L }
            if (onTarget) {
                if (open == null) segs.add(Seg(now, 0L))
            } else if (open != null) {
                segs[segs.lastIndex] = open.copy(endMs = now)
            } else {
                return
            }
            val cutoff = now - KEEP_MS
            while (segs.size > 1 && segs[0].endMs != 0L && segs[0].endMs < cutoff) segs.removeAt(0)
            persist(context, segs)
        }
    }

    fun minutesToday(context: Context, now: Long = System.currentTimeMillis()): Int {
        val start = startOfTodayMs(now)
        var ms = 0L
        for (seg in snapshot(context)) {
            val end = if (seg.endMs == 0L) now else seg.endMs
            val a = maxOf(seg.startMs, start)
            val b = minOf(end, now)
            if (b > a) ms += b - a
        }
        return (ms / 60_000L).toInt()
    }

    /** Parts of today's log that usage-stats sessions did not already label unproductive. */
    fun extraSessions(
        context: Context,
        existing: List<PhoneSession>,
        now: Long = System.currentTimeMillis(),
    ): List<PhoneSession> {
        val start = startOfTodayMs(now)
        val label = PhoneCategory.Unproductive.activityLabel
        val blocks = existing.filter { it.activity == label }.map { it.startMs to it.endMs }
        val out = ArrayList<PhoneSession>()
        for (seg in snapshot(context)) {
            val end = if (seg.endMs == 0L) now else seg.endMs
            val a = maxOf(seg.startMs, start)
            val b = minOf(end, now)
            if (b <= a) continue
            for ((s, e) in subtract(a, b, blocks)) {
                if (e - s < 15_000L) continue
                out.add(
                    PhoneSession(
                        activity = label,
                        startMs = s,
                        endMs = e,
                        date = dayFmt.format(Date(s)),
                    ),
                )
            }
        }
        return out
    }

    private fun subtract(start: Long, end: Long, blocks: List<Pair<Long, Long>>): List<Pair<Long, Long>> {
        var cur = start
        val out = ArrayList<Pair<Long, Long>>()
        val sorted = blocks.filter { it.second > it.first }.sortedBy { it.first }
        for ((bs, be) in sorted) {
            if (be <= cur) continue
            if (bs >= end) break
            if (bs > cur) out.add(cur to minOf(bs, end))
            cur = maxOf(cur, be)
            if (cur >= end) break
        }
        if (cur < end) out.add(cur to end)
        return out
    }

    private fun snapshot(context: Context): List<Seg> = synchronized(lock) { ArrayList(load(context)) }

    private fun load(context: Context): MutableList<Seg> {
        cache?.let { return it }
        val raw = context.applicationContext
            .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY, null)
        val out = ArrayList<Seg>()
        if (raw != null) {
            try {
                val arr = JSONArray(raw)
                for (i in 0 until arr.length()) {
                    val o = arr.getJSONArray(i)
                    out.add(Seg(o.getLong(0), o.getLong(1)))
                }
            } catch (_: Exception) {
            }
        }
        cache = out
        return out
    }

    private fun persist(context: Context, segs: List<Seg>) {
        val arr = JSONArray()
        for (s in segs) arr.put(JSONArray().put(s.startMs).put(s.endMs))
        context.applicationContext
            .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .putString(KEY, arr.toString())
            .apply()
    }

    private fun startOfTodayMs(now: Long): Long {
        val cal = Calendar.getInstance()
        cal.timeInMillis = now
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)
        return cal.timeInMillis
    }
}
