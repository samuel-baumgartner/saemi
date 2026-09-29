package com.saemi.goalswidget

import android.content.Context
import android.graphics.Color
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object UniCache {
    private const val PREFS = "saemi_uni"
    private const val KEY_JSON = "json"
    private const val KEY_FETCHED_AT = "fetched_at"
    private const val KEY_ERROR = "error"

    private fun prefs(context: Context) =
        context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    fun save(context: Context, json: String) {
        prefs(context).edit()
            .putString(KEY_JSON, json)
            .putLong(KEY_FETCHED_AT, System.currentTimeMillis())
            .remove(KEY_ERROR)
            .apply()
    }

    fun setError(context: Context, message: String) {
        prefs(context).edit().putString(KEY_ERROR, message).apply()
    }

    fun error(context: Context): String? = prefs(context).getString(KEY_ERROR, null)

    fun fetchedAt(context: Context): Long = prefs(context).getLong(KEY_FETCHED_AT, 0L)

    fun hasData(context: Context): Boolean = prefs(context).contains(KEY_JSON)

    fun entries(context: Context): List<UniEntry> {
        val raw = prefs(context).getString(KEY_JSON, null) ?: return emptyList()
        return try {
            UniApi.parse(raw)
        } catch (_: Exception) {
            emptyList()
        }
    }

    fun courseUrl(context: Context, courseId: String): String {
        val base = WidgetPrefs.getBaseUrl(context).trimEnd('/')
        return if (courseId.isEmpty()) "$base/personal/uni" else "$base/personal/uni/course/$courseId"
    }

    fun parseColor(hex: String): Int =
        try {
            Color.parseColor(hex)
        } catch (_: Exception) {
            Color.parseColor("#6366f1")
        }

    private val dueFmt = SimpleDateFormat("EEE d MMM, HH:mm", Locale.getDefault())

    fun formatDue(ms: Long): String = synchronized(dueFmt) { dueFmt.format(Date(ms)) }

    /** "in 2d 3h", "in 45m", "5h overdue". */
    fun relative(dueMs: Long, nowMs: Long): String {
        val diff = dueMs - nowMs
        val abs = kotlin.math.abs(diff)
        val min = abs / 60_000L
        val h = min / 60
        val d = h / 24
        val text = when {
            d >= 1 -> if (h % 24 == 0L) "${d}d" else "${d}d ${h % 24}h"
            h >= 1 -> "${h}h"
            else -> "${maxOf(min, 1)}m"
        }
        return if (diff >= 0) "in $text" else "$text overdue"
    }
}
