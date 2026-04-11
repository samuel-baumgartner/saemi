package com.saemi.goalswidget

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/**
 * Timestamps when YouTube window titles matched listening heuristics, for joining with
 * usage-stats intervals in [PhoneUsageTracker].
 */
object YoutubeListeningTitleLog {

    private const val PREFS = "saemi_yt_listen_samples"
    private const val KEY_SAMPLES = "samples_json"
    private const val MAX_ENTRIES = 400
    private const val TTL_MS = 36L * 60 * 60 * 1000
    private const val DEDUP_MS = 3_000L

    @Volatile
    private var lastDedupeTitle = ""

    @Volatile
    private var lastDedupeAt = 0L

    fun recordMatch(context: Context, t: Long, normalizedTitle: String) {
        val title = normalizedTitle.trim().take(200)
        if (title.isEmpty()) return
        val now = System.currentTimeMillis()
        synchronized(this) {
            if (title == lastDedupeTitle && now - lastDedupeAt < DEDUP_MS) return
            lastDedupeTitle = title
            lastDedupeAt = now

            val app = context.applicationContext
            val sp = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            val arr = parseSamples(sp.getString(KEY_SAMPLES, null))

            val cutoff = now - TTL_MS
            val kept = arr.filter { it.first >= cutoff }.toMutableList()
            kept.add(t to title)
            kept.sortBy { it.first }
            val trimmed = if (kept.size > MAX_ENTRIES) kept.takeLast(MAX_ENTRIES) else kept

            val out = JSONArray()
            for ((ts, tit) in trimmed) {
                out.put(JSONObject().put("t", ts).put("title", tit))
            }
            sp.edit().putString(KEY_SAMPLES, out.toString()).apply()
        }
    }

    fun hasListeningMatchBetween(context: Context, startMs: Long, endMs: Long): Boolean {
        if (endMs <= startMs) return false
        synchronized(this) {
            for ((t, _) in loadPairs(context)) {
                if (t in startMs..endMs) return true
            }
        }
        return false
    }

    /** Latest matched title sample inside [startMs, endMs] (for session description). */
    fun bestTitleInRange(context: Context, startMs: Long, endMs: Long): String? {
        if (endMs <= startMs) return null
        var bestT = -1L
        var best: String? = null
        synchronized(this) {
            for ((t, title) in loadPairs(context)) {
                if (t in startMs..endMs && t >= bestT) {
                    bestT = t
                    best = title
                }
            }
        }
        return best
    }

    private fun loadPairs(context: Context): List<Pair<Long, String>> {
        val sp = context.applicationContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        return parseSamples(sp.getString(KEY_SAMPLES, null))
    }

    private fun parseSamples(json: String?): List<Pair<Long, String>> {
        if (json.isNullOrBlank()) return emptyList()
        return try {
            val arr = JSONArray(json)
            val out = ArrayList<Pair<Long, String>>(arr.length())
            for (i in 0 until arr.length()) {
                val o = arr.optJSONObject(i) ?: continue
                val t = o.optLong("t", 0L)
                val title = o.optString("title", "").trim()
                if (t > 0L && title.isNotEmpty()) out.add(t to title)
            }
            out
        } catch (_: Exception) {
            emptyList()
        }
    }
}
