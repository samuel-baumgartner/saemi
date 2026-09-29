package com.saemi.goalswidget

import android.content.Context
import org.json.JSONArray

/**
 * Timestamped browser site transitions (written by the accessibility service) so
 * [PhoneUsageTracker] can split browser foreground time into YouTube / Instagram vs other.
 */
object BrowserSiteLog {
    private const val PREFS = "saemi_browser_sites"
    private const val KEY_LOG = "log"
    private const val KEEP_MS = 36 * 60 * 60 * 1000L

    data class Entry(val atMs: Long, val site: String)

    private val lock = Any()
    private var cache: MutableList<Entry>? = null

    private fun load(context: Context): MutableList<Entry> {
        cache?.let { return it }
        val raw = context.applicationContext
            .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_LOG, null)
        val out = ArrayList<Entry>()
        if (raw != null) {
            try {
                val arr = JSONArray(raw)
                for (i in 0 until arr.length()) {
                    val o = arr.getJSONArray(i)
                    out.add(Entry(o.getLong(0), o.getString(1)))
                }
            } catch (_: Exception) {
            }
        }
        cache = out
        return out
    }

    private fun persist(context: Context, entries: List<Entry>) {
        val arr = JSONArray()
        for (e in entries) arr.put(JSONArray().put(e.atMs).put(e.site))
        context.applicationContext
            .getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit()
            .putString(KEY_LOG, arr.toString())
            .apply()
    }

    fun record(context: Context, atMs: Long, site: String) {
        synchronized(lock) {
            val entries = load(context)
            if (entries.lastOrNull()?.site == site) return
            entries.add(Entry(atMs, site))
            val cutoff = atMs - KEEP_MS
            while (entries.size > 1 && entries[1].atMs < cutoff) entries.removeAt(0)
            persist(context, entries)
        }
    }

    fun currentSite(context: Context): String =
        synchronized(lock) { load(context).lastOrNull()?.site ?: BrowserSites.NONE }

    /** Splits [startMs, endMs) into consecutive (start, end, site) pieces. */
    fun segments(context: Context, startMs: Long, endMs: Long): List<Triple<Long, Long, String>> {
        val entries = synchronized(lock) { ArrayList(load(context)) }
        var site = BrowserSites.NONE
        var cursor = startMs
        val out = ArrayList<Triple<Long, Long, String>>()
        for (e in entries) {
            if (e.atMs <= startMs) {
                site = e.site
                continue
            }
            if (e.atMs >= endMs) break
            if (e.atMs > cursor) out.add(Triple(cursor, e.atMs, site))
            cursor = e.atMs
            site = e.site
        }
        if (endMs > cursor) out.add(Triple(cursor, endMs, site))
        return out
    }
}
