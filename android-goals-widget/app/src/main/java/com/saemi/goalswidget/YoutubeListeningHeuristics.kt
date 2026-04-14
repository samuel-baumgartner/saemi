package com.saemi.goalswidget

import android.view.accessibility.AccessibilityEvent

/**
 * Mirrors [browser-extension/background.js] `listeningRegex` and `normalizeYoutubeTitleText`,
 * and aligns with [TimeChecker/config.example.json] `listening_comprehension.title_regex`
 * (YouTube is implied by package — no `youtube` lookahead in the title).
 */
object YoutubeListeningHeuristics {

    private val LISTENING_REGEX = Regex(
        """(?is)(聞き取り|リスニング|ヒアリング|日本語|字幕|nihongo|japanese|japan(ese)?|japanisch|japanische|jlpt|n[1-5]\b|immersion|comprehensible|comprehension|verständlich|verstaendlich|listening|listen|learn\s+japanese|study\s+japanese|lass\s+uns\s+japanisch|shadowing|subtitles?|japonais|giapponese|japonés|anfänger|anfaenger|english|esl|podcast)""",
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
