package com.saemi.goalswidget

import android.view.accessibility.AccessibilityNodeInfo

/**
 * Best-effort: YouTube often omits the real video title from
 * [android.view.accessibility.AccessibilityEvent] text for [TYPE_WINDOW_CONTENT_CHANGED].
 * Walk the active window and take the longest plausible title-like string.
 */
object YoutubeTitleFromRoot {

    private val JUNK_LOWER = setOf(
        "youtube",
        "youtube music",
        "home",
        "shorts",
        "subscriptions",
        "library",
        "account",
        "search",
        "explore",
        "notifications",
        "upload",
        "create",
        "you",
        "premium",
    )

    fun longestPlausibleTitle(root: AccessibilityNodeInfo): String? {
        val texts = ArrayList<String>(24)
        val counter = intArrayOf(0)
        collect(root, texts, counter, depth = 0)
        return texts.maxByOrNull { it.length }?.trim()?.takeIf { it.isNotEmpty() }
    }

    private fun collect(
        node: AccessibilityNodeInfo,
        out: MutableList<String>,
        visited: IntArray,
        depth: Int,
    ) {
        if (visited[0] >= 120 || depth > 14) return
        visited[0]++

        val t = node.text?.toString()?.trim().orEmpty()
        if (t.length in 12..220 && !isJunkTitle(t)) {
            out.add(t)
        }
        val cd = node.contentDescription?.toString()?.trim().orEmpty()
        if (cd.length in 12..220 && cd != t && !isJunkTitle(cd)) {
            out.add(cd)
        }

        val n = node.childCount
        for (i in 0 until n) {
            val child = node.getChild(i) ?: continue
            try {
                collect(child, out, visited, depth + 1)
            } finally {
                child.recycle()
            }
        }
    }

    private fun isJunkTitle(s: String): Boolean {
        val lower = s.lowercase()
        if (lower in JUNK_LOWER) return true
        if (lower.startsWith("subscribe") || lower.startsWith("sign in")) return true
        // Timestamps / pure counts
        if (s.all { it.isDigit() || it == ':' || it.isWhitespace() }) return true
        return false
    }
}
