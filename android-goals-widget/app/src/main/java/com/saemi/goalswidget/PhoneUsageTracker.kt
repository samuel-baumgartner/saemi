package com.saemi.goalswidget

import android.app.usage.UsageEvents
import android.app.usage.UsageEventsQuery
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Build
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

    /**
     * Today's sessions, or null when usage events could not be read. Null must not be
     * uploaded: the server replaces the day's phone sessions, so an empty failed read
     * would delete the time and turn the blocker off.
     */
    fun buildTodaySessions(context: Context): List<PhoneSession>? {
        if (!UsageAccess.hasUsageAccess(context)) return emptyList()
        val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val start = startOfTodayMs()
        val end = System.currentTimeMillis()

        val events = readEvents(usm, start, end) ?: return null
        val e = UsageEvents.Event()

        var curPkg: String? = null
        var curStart: Long? = null
        var sawTransition = false

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
            val foreground = e.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND ||
                e.eventType == UsageEvents.Event.ACTIVITY_RESUMED
            val background = e.eventType == UsageEvents.Event.MOVE_TO_BACKGROUND ||
                e.eventType == UsageEvents.Event.ACTIVITY_PAUSED
            when {
                foreground -> {
                    sawTransition = true
                    if (curPkg == pkg) continue
                    if (curPkg != null && curStart != null) closeAt(e.timeStamp)
                    curPkg = pkg
                    curStart = e.timeStamp
                }
                background -> {
                    sawTransition = true
                    if (curPkg == pkg && curStart != null) {
                        closeAt(e.timeStamp)
                        curPkg = null
                        curStart = null
                    }
                }
            }
        }
        if (!sawTransition) return null

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

    /**
     * Android 15's old query often comes back with no activity events for apps
     * that target the current SDK. Ask for resumed/paused explicitly, and keep
     * the old query when that returns nothing.
     */
    private fun readEvents(usm: UsageStatsManager, start: Long, end: Long): UsageEvents? {
        if (Build.VERSION.SDK_INT >= 35) {
            try {
                val query = UsageEventsQuery.Builder(start, end)
                    .setEventTypes(
                        UsageEvents.Event.ACTIVITY_RESUMED,
                        UsageEvents.Event.ACTIVITY_PAUSED,
                    )
                    .build()
                val filtered = usm.queryEvents(query)
                if (filtered != null && filtered.hasNextEvent()) return filtered
            } catch (_: Throwable) {
            }
        }
        return usm.queryEvents(start, end)
    }

    /** Phone-only YouTube + Instagram minutes today (offline fallback for the blocker). */
    fun unproductiveMinutesToday(context: Context): Int {
        val label = PhoneCategory.Unproductive.activityLabel
        val fromUsage = buildTodaySessions(context)
            ?.filter { it.activity == label }
            ?.sumOf { it.endMs - it.startMs }
            ?.let { (it / 60_000L).toInt() }
            ?: 0
        return maxOf(fromUsage, TargetUseLog.minutesToday(context))
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

