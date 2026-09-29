package com.saemi.goalswidget

import android.content.Context
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

object LimitStatusCache {
    @Volatile private var lastFetchedAtMs: Long = 0L
    @Volatile private var lastKnownOverLimit: Boolean = false
    @Volatile private var lastKnownDate: String = ""
    @Volatile private var lastKnownLimitMinutes: Int = DEFAULT_LIMIT_MINUTES

    private const val DEFAULT_LIMIT_MINUTES = 120
    private const val PREFETCH_MIN_INTERVAL_MS = 120_000L
    private const val BLOCKER_CACHE_MS = 30_000L
    private const val BLOCKER_SYNC_INTERVAL_MS = 60_000L

    private val dayFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    private val refreshing = AtomicBoolean(false)
    private val io = Executors.newSingleThreadExecutor()

    /**
     * For the accessibility blocker (background thread only). Uploads fresh phone usage,
     * asks the server (phone + laptop combined), and falls back to phone-only minutes offline.
     */
    fun isOverLimitForBlocker(context: Context): Boolean {
        val app = context.applicationContext
        if (!WidgetPrefs.isConfigured(app)) return false
        val now = System.currentTimeMillis()
        val today = dayFmt.format(Date(now))
        if (now - lastFetchedAtMs < BLOCKER_CACHE_MS && lastKnownDate == today) {
            return lastKnownOverLimit
        }
        try {
            PhoneSync.syncTodayIfDue(app, BLOCKER_SYNC_INTERVAL_MS)
        } catch (_: Exception) {
        }
        val result = LimitStatusApi.fetchStatus(
            WidgetPrefs.getBaseUrl(app),
            WidgetPrefs.getToken(app),
            fresh = true,
        )
        applyFetchResult(result)
        if (lastKnownOverLimit) return true
        val localMinutes = PhoneUsageTracker.unproductiveMinutesToday(app)
        if (localMinutes >= lastKnownLimitMinutes) {
            lastKnownOverLimit = true
            lastKnownDate = today
        }
        return lastKnownOverLimit
    }

    /** Called from widget refresh so limit state stays aligned with the server without opening YouTube. */
    fun prefetch(context: Context) {
        val app = context.applicationContext
        if (!WidgetPrefs.isConfigured(app)) return
        if (System.currentTimeMillis() - lastFetchedAtMs < PREFETCH_MIN_INTERVAL_MS) return
        io.execute {
            if (!refreshing.compareAndSet(false, true)) return@execute
            try {
                applyFetchResult(
                    LimitStatusApi.fetchStatus(
                        WidgetPrefs.getBaseUrl(app),
                        WidgetPrefs.getToken(app),
                    ),
                )
            } finally {
                refreshing.set(false)
            }
        }
    }

    private fun applyFetchResult(result: Result<LimitStatus>) {
        val s = result.getOrNull()
        if (s != null) {
            lastKnownOverLimit = s.isOverLimit
            lastKnownDate = s.date
            if (s.limitMinutes > 0) lastKnownLimitMinutes = s.limitMinutes
        } else {
            lastKnownOverLimit = false
            lastKnownDate = ""
        }
        lastFetchedAtMs = System.currentTimeMillis()
    }
}
