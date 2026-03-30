package com.saemi.goalswidget

import android.content.Context
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

object PhoneSync {
    private val dayFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    /**
     * Best-effort: Build today's sessions from Usage Access and upload them.
     * Safe to call often; server replaces today's phone sessions.
     */
    fun syncToday(context: Context) {
        if (!WidgetPrefs.isConfigured(context)) return
        if (!UsageAccess.hasUsageAccess(context)) return

        val baseUrl = WidgetPrefs.getBaseUrl(context)
        val token = WidgetPrefs.getToken(context)
        if (baseUrl.isBlank() || token.isBlank()) return

        val sessions = PhoneUsageTracker.buildTodaySessions(context)
        val date = dayFmt.format(Date())
        val payload = PhoneUsageTracker.toJsonPayload(date, sessions)
        PhoneSyncApi.postPhoneSessions(baseUrl, token, payload)
        // Ignore errors here; widgets will show last known server state on fetch.
    }
}

