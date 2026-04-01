package com.saemi.goalswidget

import android.content.Context

/**
 * Short window where the accessibility blocker skips YouTube (not Instagram), so behavior
 * matches the laptop extension’s listening grace.
 */
object ListeningGracePrefs {
    private const val PREFS = "saemi_listening_grace"
    private const val KEY_UNTIL_MS = "until_ms"
    private const val GRACE_MS = 30_000L

    fun startGrace(context: Context) {
        val until = System.currentTimeMillis() + GRACE_MS
        context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putLong(KEY_UNTIL_MS, until)
            .apply()
    }

    fun isActive(context: Context): Boolean {
        val until = context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getLong(KEY_UNTIL_MS, 0L)
        return System.currentTimeMillis() < until
    }
}
