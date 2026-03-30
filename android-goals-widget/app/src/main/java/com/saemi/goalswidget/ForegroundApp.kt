package com.saemi.goalswidget

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context

object ForegroundApp {
    /**
     * Best-effort: returns the last package that moved to foreground in the
     * recent window, or null if Usage Access is not granted / no data.
     */
    fun getCurrentForegroundPackage(context: Context, lookbackMs: Long = 15_000L): String? {
        if (!UsageAccess.hasUsageAccess(context)) return null
        val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val end = System.currentTimeMillis()
        val start = end - lookbackMs
        val events = usm.queryEvents(start, end) ?: return null
        val e = UsageEvents.Event()
        var lastPkg: String? = null
        var lastTs: Long = -1
        while (events.hasNextEvent()) {
            events.getNextEvent(e)
            if (e.timeStamp < lastTs) continue
            if (e.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND) {
                val pkg = e.packageName
                if (!pkg.isNullOrBlank()) {
                    lastPkg = pkg
                    lastTs = e.timeStamp
                }
            }
        }
        return lastPkg
    }
}

