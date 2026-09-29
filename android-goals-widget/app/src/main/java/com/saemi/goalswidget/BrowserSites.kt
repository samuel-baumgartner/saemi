package com.saemi.goalswidget

import android.view.accessibility.AccessibilityNodeInfo

/** Detects YouTube / Instagram open in a mobile browser by reading its address bar. */
object BrowserSites {
    const val NONE = ""
    const val YOUTUBE = "youtube.com"
    const val INSTAGRAM = "instagram.com"

    private val urlBarIds: Map<String, List<String>> = mapOf(
        "com.android.chrome" to listOf("url_bar"),
        "com.chrome.beta" to listOf("url_bar"),
        "com.chrome.dev" to listOf("url_bar"),
        "com.chrome.canary" to listOf("url_bar"),
        "com.google.android.apps.chrome" to listOf("url_bar"),
        "com.brave.browser" to listOf("url_bar"),
        "com.brave.browser_beta" to listOf("url_bar"),
        "com.microsoft.emmx" to listOf("url_bar"),
        "com.vivaldi.browser" to listOf("url_bar"),
        "com.kiwibrowser.browser" to listOf("url_bar"),
        "com.opera.browser" to listOf("url_field"),
        "com.sec.android.app.sbrowser" to listOf("location_bar_edit_text"),
        "org.mozilla.firefox" to listOf("mozac_browser_toolbar_url_view"),
        "org.mozilla.firefox_beta" to listOf("mozac_browser_toolbar_url_view"),
        "org.mozilla.fenix" to listOf("mozac_browser_toolbar_url_view"),
        "com.duckduckgo.mobile.android" to listOf("omnibarTextInput"),
    )

    private val browserNames: Map<String, String> = mapOf(
        "com.android.chrome" to "Chrome",
        "com.chrome.beta" to "Chrome",
        "com.chrome.dev" to "Chrome",
        "com.chrome.canary" to "Chrome",
        "com.google.android.apps.chrome" to "Chrome",
        "com.brave.browser" to "Brave",
        "com.brave.browser_beta" to "Brave",
        "com.microsoft.emmx" to "Edge",
        "com.vivaldi.browser" to "Vivaldi",
        "com.kiwibrowser.browser" to "Kiwi",
        "com.opera.browser" to "Opera",
        "com.sec.android.app.sbrowser" to "Samsung Internet",
        "org.mozilla.firefox" to "Firefox",
        "org.mozilla.firefox_beta" to "Firefox",
        "org.mozilla.fenix" to "Firefox",
        "com.duckduckgo.mobile.android" to "DuckDuckGo",
    )

    fun isBrowser(pkg: String): Boolean = urlBarIds.containsKey(pkg)

    fun browserName(pkg: String): String = browserNames[pkg] ?: "Browser"

    /**
     * Site shown in the browser's address bar, or null when the bar isn't visible
     * (fullscreen video, tab switcher) so the caller keeps the last known site.
     */
    fun siteFromRoot(root: AccessibilityNodeInfo, pkg: String): String? {
        val ids = urlBarIds[pkg] ?: return null
        for (id in ids) {
            val nodes = root.findAccessibilityNodeInfosByViewId("$pkg:id/$id") ?: continue
            try {
                for (n in nodes) {
                    val text = n.text?.toString()?.trim().orEmpty()
                    if (text.isNotEmpty()) return siteForUrl(text)
                }
            } finally {
                for (n in nodes) n.recycle()
            }
        }
        return null
    }

    fun siteForUrl(raw: String): String {
        var s = raw.trim().lowercase()
        val scheme = s.indexOf("://")
        if (scheme >= 0) s = s.substring(scheme + 3)
        val end = s.indexOfFirst { it == '/' || it == '?' || it == '#' || it == ' ' }
        val host = (if (end >= 0) s.substring(0, end) else s).substringBefore(':')
        return when {
            host == "youtube.com" || host.endsWith(".youtube.com") || host == "youtu.be" -> YOUTUBE
            host == "instagram.com" || host.endsWith(".instagram.com") -> INSTAGRAM
            else -> NONE
        }
    }
}
