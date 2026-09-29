package com.saemi.goalswidget

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone

data class PhoneSession(
    val activity: String,
    val startMs: Long,
    val endMs: Long,
    val date: String,
    val description: String? = null,
)

object PhoneUsageTracker {
    private val dayFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    private fun startOfTodayMs(): Long {
        val cal = Calendar.getInstance()
        cal.timeInMillis = System.currentTimeMillis()
        cal.set(Calendar.HOUR_OF_DAY, 0)
        cal.set(Calendar.MINUTE, 0)
        cal.set(Calendar.SECOND, 0)
        cal.set(Calendar.MILLISECOND, 0)
        return cal.timeInMillis
    }

    fun buildTodaySessions(context: Context): List<PhoneSession> {
        if (!UsageAccess.hasUsageAccess(context)) return emptyList()
        val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val start = startOfTodayMs()
        val end = System.currentTimeMillis()

        val events = usm.queryEvents(start, end) ?: return emptyList()
        val e = UsageEvents.Event()

        var curPkg: String? = null
        var curStart: Long? = null

        val raw = ArrayList<PhoneSession>(256)

        fun closeAt(ts: Long) {
            val p = curPkg ?: return
            val s = curStart ?: return
            if (ts <= s) return
            val day = dayFmt.format(Date(s))
            if (BrowserSites.isBrowser(p)) {
                val browser = BrowserSites.browserName(p)
                for ((segStart, segEnd, site) in BrowserSiteLog.segments(context, s, ts)) {
                    val unproductive = site != BrowserSites.NONE
                    raw.add(
                        PhoneSession(
                            activity = if (unproductive) {
                                PhoneCategory.Unproductive.activityLabel
                            } else {
                                PhoneCategory.Other.activityLabel
                            },
                            startMs = segStart,
                            endMs = segEnd,
                            date = day,
                            description = if (unproductive) "$browser · $site" else null,
                        ),
                    )
                }
                return
            }
            raw.add(
                PhoneSession(
                    activity = PhoneClassifier.categoryForPackage(context, p).activityLabel,
                    startMs = s,
                    endMs = ts,
                    date = day,
                ),
            )
        }

        while (events.hasNextEvent()) {
            events.getNextEvent(e)
            val pkg = e.packageName ?: continue
            when (e.eventType) {
                UsageEvents.Event.MOVE_TO_FOREGROUND -> {
                    // Close previous app session at this timestamp.
                    if (curPkg != null && curStart != null) closeAt(e.timeStamp)
                    curPkg = pkg
                    curStart = e.timeStamp
                }
                UsageEvents.Event.MOVE_TO_BACKGROUND -> {
                    if (curPkg == pkg && curStart != null) {
                        closeAt(e.timeStamp)
                        curPkg = null
                        curStart = null
                    }
                }
            }
        }

        // If something is still in foreground, close at "now".
        if (curPkg != null && curStart != null) closeAt(end)

        if (raw.isEmpty()) return emptyList()

        // Merge adjacent sessions with same activity and small gaps.
        raw.sortBy { it.startMs }
        val merged = ArrayList<PhoneSession>(raw.size)
        val gapMs = 30_000L
        for (s in raw) {
            val last = merged.lastOrNull()
            if (last != null &&
                last.activity == s.activity &&
                last.description == s.description &&
                s.startMs <= last.endMs + gapMs &&
                last.date == s.date
            ) {
                merged[merged.size - 1] = last.copy(endMs = maxOf(last.endMs, s.endMs))
            } else {
                merged.add(s)
            }
        }
        return merged
    }

    /** Phone-only YouTube + Instagram minutes today (offline fallback for the blocker). */
    fun unproductiveMinutesToday(context: Context): Int {
        val label = PhoneCategory.Unproductive.activityLabel
        val ms = buildTodaySessions(context)
            .filter { it.activity == label }
            .sumOf { it.endMs - it.startMs }
        return (ms / 60_000L).toInt()
    }

    fun toJsonPayload(date: String, sessions: List<PhoneSession>): JSONObject {
        val arr = JSONArray()
        for (s in sessions) {
            val o = JSONObject()
                .put("activity", s.activity)
                .put("startTime", iso(Date(s.startMs)))
                .put("endTime", iso(Date(s.endMs)))
                .put("date", s.date)
            val d = s.description?.trim().orEmpty()
            if (d.isNotEmpty()) o.put("description", d)
            arr.put(o)
        }
        return JSONObject()
            .put("date", date)
            .put("sessions", arr)
    }

    private fun iso(d: Date): String {
        // Avoid java.time desugaring requirements (minSdk 26 anyway, but keep simple).
        val fmt = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.US)
        fmt.timeZone = TimeZone.getTimeZone("UTC")
        return fmt.format(d)
    }
}

