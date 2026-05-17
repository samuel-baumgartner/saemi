package com.saemi.goalswidget

import android.content.Context
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

object LimitStatusCache {
    @Volatile private var lastFetchedAtMs: Long = 0L
    @Volatile private var lastKnownOverLimit: Boolean = false
    @Volatile private var lastKnownDate: String = ""

    private const val PREFETCH_MIN_INTERVAL_MS = 120_000L

    private val refreshing = AtomicBoolean(false)
    private val io = Executors.newSingleThreadExecutor()

    /**
     * Synchronous fetch for the accessibility blocker (call only from a background thread).
     * Always hits the network; updates cache; returns whether the user is over unproductive budget.
     */
    fun refreshForBlocker(context: Context): Boolean {
        val app = context.applicationContext
        val baseUrl = WidgetPrefs.getBaseUrl(app)
        val token = WidgetPrefs.getToken(app)
        if (baseUrl.isBlank() || token.isBlank()) {
            return false
        }
        val result = LimitStatusApi.fetchStatus(baseUrl, token)
        applyFetchResult(result)
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
        if (result.isSuccess) {
            val s = result.getOrNull()
            if (s != null) {
                lastKnownOverLimit = s.isOverLimit
                lastKnownDate = s.date
            } else {
                lastKnownOverLimit = false
            }
        } else {
            lastKnownOverLimit = false
        }
        lastFetchedAtMs = System.currentTimeMillis()
    }
}

