package com.saemi.goalswidget

import android.content.Context
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

object LimitStatusCache {
    private const val REFRESH_MS = 2 * 60 * 1000L

    @Volatile private var lastFetchedAtMs: Long = 0L
    @Volatile private var lastKnownOverLimit: Boolean = false
    @Volatile private var lastKnownDate: String = ""

    private val refreshing = AtomicBoolean(false)
    private val io = Executors.newSingleThreadExecutor()

    fun shouldBlockNow(context: Context): Boolean {
        refreshIfStaleAsync(context)
        return lastKnownOverLimit
    }

    private fun refreshIfStaleAsync(context: Context) {
        val now = System.currentTimeMillis()
        if (now - lastFetchedAtMs < REFRESH_MS) return
        if (!refreshing.compareAndSet(false, true)) return

        val app = context.applicationContext
        io.execute {
            try {
                val baseUrl = WidgetPrefs.getBaseUrl(app)
                val token = WidgetPrefs.getToken(app)
                if (baseUrl.isBlank() || token.isBlank()) {
                    lastKnownOverLimit = false
                    lastFetchedAtMs = System.currentTimeMillis()
                    return@execute
                }

                val result = LimitStatusApi.fetchStatus(baseUrl, token)
                if (result.isSuccess) {
                    val s = result.getOrNull()
                    if (s != null) {
                        lastKnownOverLimit = s.isOverLimit
                        lastKnownDate = s.date
                    } else {
                        lastKnownOverLimit = false
                    }
                } else {
                    // On any failure (e.g. offline), treat as not over limit.
                    lastKnownOverLimit = false
                }
                lastFetchedAtMs = System.currentTimeMillis()
            } finally {
                refreshing.set(false)
            }
        }
    }
}

