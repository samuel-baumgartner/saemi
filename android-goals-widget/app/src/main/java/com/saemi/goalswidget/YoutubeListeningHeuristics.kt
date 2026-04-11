package com.saemi.goalswidget

import android.view.accessibility.AccessibilityEvent

/**
 * Mirrors [browser-extension/background.js] `listeningRegex` and `normalizeYoutubeTitleText`.
 * If you change one, update the other.
 */
object YoutubeListeningHeuristics {

    private val LISTENING_REGEX = Regex(
        "(japanese|nihongo|comprehensible|comprehension|jlpt|日本語|listen(ing)?|english|esl|podcast|immersion)",
        RegexOption.IGNORE_CASE,
    )

    private val TRAILING_YOUTUBE_SUFFIX = Regex("\\s*-\\s*YouTube(\\s+Music)?\\s*$", RegexOption.IGNORE_CASE)
    private val BARE_YOUTUBE = Regex("^youtube(\\s+music)?$", RegexOption.IGNORE_CASE)

    fun normalizeYoutubeTitleText(raw: String): String {
        var s = raw.trim()
        if (s.isEmpty()) return ""
        s = TRAILING_YOUTUBE_SUFFIX.replace(s, "").trim()
        if (BARE_YOUTUBE.matches(s)) return ""
        return s
    }

    fun titleFromAccessibilityEvent(event: AccessibilityEvent): String {
        val parts = ArrayList<String>(4)
        val n = event.text?.size ?: 0
        for (i in 0 until n) {
            val c = event.text?.get(i) ?: continue
            val x = c.toString().trim()
            if (x.isNotEmpty()) parts.add(x)
        }
        event.contentDescription?.toString()?.trim()?.let {
            if (it.isNotEmpty()) parts.add(it)
        }
        return parts.joinToString(" ").trim()
    }

    fun looksLikeListeningTitle(normalized: String): Boolean =
        normalized.isNotEmpty() && LISTENING_REGEX.containsMatchIn(normalized)
}
