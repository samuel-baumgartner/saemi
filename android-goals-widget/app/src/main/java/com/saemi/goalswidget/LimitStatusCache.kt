package com.saemi.goalswidget

import android.content.Context
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

object LimitStatusCache {
    @Volatile private var lastFetchedAtMs: Long = 0L
    @Volatile private var lastKnownOverLimit: Boolean = false
    @Volatile private var lastKnownDate: String = ""
    @Volatile private var lastKnownExtraMinutes: Int = 0

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
        if (lastKnownDate.isNotEmpty() && lastKnownDate != today) {
            lastKnownOverLimit = false
            lastKnownExtraMinutes = 0
            lastKnownDate = ""
            lastFetchedAtMs = 0L
        }
        val cacheFresh = lastKnownDate == today && now - lastFetchedAtMs < BLOCKER_CACHE_MS
        if (cacheFresh && lastKnownOverLimit) return true
        if (!cacheFresh) {
            try {
                PhoneSync.syncTodayIfDue(app, BLOCKER_SYNC_INTERVAL_MS)
            } catch (_: Exception) {
            }
            val result = LimitStatusApi.fetchStatus(
                WidgetPrefs.getBaseUrl(app),
                WidgetPrefs.getToken(app),
                fresh = true,
            )
            if (result.isSuccess) {
                applyFetchResult(result)
            } else {
                // Keep the last good answer. A failed refresh used to clear "over limit"
                // and leave YouTube open while the server was unreachable.
                lastFetchedAtMs = now
            }
        }
        val localOver = PhoneUsageTracker.unproductiveMinutesToday(app) >= thresholdMinutes(now)
        if (localOver) {
            lastKnownOverLimit = true
            lastKnownDate = today
        }
        return (lastKnownDate == today && lastKnownOverLimit) || localOver
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

    /** Adopts the status returned after claiming extra time, so the blocker lets you through at once. */
    fun applyClaimedStatus(status: LimitStatus) {
        applyFetchResult(Result.success(status))
    }

    /**
     * Minutes unlocked so far today: 30 from midnight, +45 at 12:00, +45 at 19:00,
     * plus extra minutes claimed from the block screen. Matches the server schedule.
     */
    private fun thresholdMinutes(now: Long): Int {
        val cal = Calendar.getInstance()
        cal.timeInMillis = now
        val scheduled = when {
            cal.get(Calendar.HOUR_OF_DAY) >= 19 -> 120
            cal.get(Calendar.HOUR_OF_DAY) >= 12 -> 75
            else -> 30
        }
        val extra = if (lastKnownDate == dayFmt.format(Date(now))) lastKnownExtraMinutes else 0
        return scheduled + extra.coerceAtLeast(0)
    }

    private fun applyFetchResult(result: Result<LimitStatus>) {
        val s = result.getOrNull() ?: return
        lastKnownOverLimit = s.isOverLimit
        lastKnownDate = s.date
        lastKnownExtraMinutes = s.extraMinutes.coerceAtLeast(0)
        lastFetchedAtMs = System.currentTimeMillis()
    }
}
