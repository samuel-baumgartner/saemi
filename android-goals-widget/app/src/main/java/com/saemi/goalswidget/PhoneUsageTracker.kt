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

        val bunproPkg = WidgetPrefs.getBunproPackage(context)
        val ankiPkg = WidgetPrefs.getAnkiPackage(context)
        val youtubePkg = WidgetPrefs.getYoutubePackage(context)
        val instagramPkg = WidgetPrefs.getInstagramPackage(context)

        var curPkg: String? = null
        var curStart: Long? = null

        val raw = ArrayList<PhoneSession>(256)

        fun closeAt(ts: Long) {
            val p = curPkg ?: return
            val s = curStart ?: return
            if (ts <= s) return
            val cat = PhoneClassifier.categoryForPackage(p, bunproPkg, ankiPkg, youtubePkg, instagramPkg)
            var activity = cat.activityLabel
            var description: String? = null
            if (cat == PhoneCategory.Unproductive &&
                PhoneClassifier.isYoutubePackage(p, youtubePkg) &&
                YoutubeListeningTitleLog.hasListeningMatchBetween(context, s, ts)
            ) {
                activity = "Listening · YouTube"
                description = YoutubeListeningTitleLog.bestTitleInRange(context, s, ts)?.take(500)
            }
            val day = dayFmt.format(Date(s))
            raw.add(
                PhoneSession(
                    activity = activity,
                    startMs = s,
                    endMs = ts,
                    date = day,
                    description = description,
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

