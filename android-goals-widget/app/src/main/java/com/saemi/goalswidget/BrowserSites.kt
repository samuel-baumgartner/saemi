package com.saemi.goalswidget

import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

/** Detects YouTube / Instagram open in a mobile browser by reading its address bar. */
object BrowserSites {
    const val NONE = ""
    const val YOUTUBE = "youtube.com"
    const val INSTAGRAM = "instagram.com"

    private val urlBarIds: Map<String, List<String>> = mapOf(
        "com.android.chrome" to listOf("url_bar", "search_box_text"),
        "com.chrome.beta" to listOf("url_bar", "search_box_text"),
        "com.chrome.dev" to listOf("url_bar", "search_box_text"),
        "com.chrome.canary" to listOf("url_bar", "search_box_text"),
        "com.google.android.apps.chrome" to listOf("url_bar", "search_box_text"),
        "com.brave.browser" to listOf("url_bar", "search_box_text"),
        "com.brave.browser_beta" to listOf("url_bar", "search_box_text"),
        "com.microsoft.emmx" to listOf("url_bar", "search_box_text"),
        "com.vivaldi.browser" to listOf("url_bar", "search_box_text"),
        "com.kiwibrowser.browser" to listOf("url_bar", "search_box_text"),
        "com.opera.browser" to listOf("url_field"),
        "com.sec.android.app.sbrowser" to listOf("location_bar_edit_text", "url_bar_text"),
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
        "com.sec.android.app.sbrowser.beta" to "Samsung Internet",
        "com.android.browser" to "Browser",
        "com.mi.globalbrowser" to "Browser",
        "com.huawei.browser" to "Browser",
        "org.mozilla.firefox" to "Firefox",
        "org.mozilla.firefox_beta" to "Firefox",
        "org.mozilla.fenix" to "Firefox",
        "com.duckduckgo.mobile.android" to "DuckDuckGo",
    )

    /** Browsers with no known address-bar id still get a tree walk for a URL field. */
    private val extraBrowsers = setOf(
        "com.sec.android.app.sbrowser.beta",
        "com.android.browser",
        "com.mi.globalbrowser",
        "com.huawei.browser",
        "com.opera.mini.native",
        "org.mozilla.firefox_focus",
    )

    fun isBrowser(pkg: String): Boolean = urlBarIds.containsKey(pkg) || pkg in extraBrowsers

    fun browserName(pkg: String): String = browserNames[pkg] ?: "Browser"

    /**
     * YouTube / Instagram if the event text itself contains a target URL.
     * Never returns [NONE]: a page title in the event must not clear the last site.
     */
    fun siteFromEvent(event: AccessibilityEvent): String? {
        val parts = ArrayList<String>(event.text.size + 1)
        for (t in event.text) {
            val s = t?.toString()?.trim().orEmpty()
            if (s.isNotEmpty()) parts.add(s)
        }
        val cd = event.contentDescription?.toString()?.trim().orEmpty()
        if (cd.isNotEmpty()) parts.add(cd)
        for (p in parts) {
            val site = siteForUrl(p)
            if (site != NONE) return site
        }
        return null
    }

    fun siteFromRoot(root: AccessibilityNodeInfo, pkg: String): String? {
        val fromIds = siteFromKnownIds(root, pkg)
        if (fromIds != null) return fromIds
        return siteFromUrlLikeIds(root)
    }

    private fun siteFromKnownIds(root: AccessibilityNodeInfo, pkg: String): String? {
        val ids = urlBarIds[pkg] ?: return null
        var sawOther = false
        for (id in ids) {
            val nodes = root.findAccessibilityNodeInfosByViewId("$pkg:id/$id") ?: continue
            try {
                for (n in nodes) {
                    when (val site = siteFromNode(n)) {
                        YOUTUBE, INSTAGRAM -> return site
                        NONE -> sawOther = true
                    }
                }
            } finally {
                for (n in nodes) n.recycle()
            }
        }
        return if (sawOther) NONE else null
    }

    /** Address bars whose id changed in a browser update (Chrome puts the URL in the content description). */
    private fun siteFromUrlLikeIds(root: AccessibilityNodeInfo): String? {
        val budget = intArrayOf(400)
        var sawOther = false
        fun walk(node: AccessibilityNodeInfo): String? {
            if (budget[0] <= 0) return null
            budget[0]--
            val id = node.viewIdResourceName?.lowercase().orEmpty()
            if (
                id.contains("url") ||
                id.contains("omnibar") ||
                id.contains("location_bar") ||
                id.contains("address")
            ) {
                when (val site = siteFromNode(node)) {
                    YOUTUBE, INSTAGRAM -> return site
                    NONE -> sawOther = true
                }
            }
            for (i in 0 until node.childCount) {
                if (budget[0] <= 0) break
                val child = node.getChild(i) ?: continue
                val found = try {
                    walk(child)
                } finally {
                    child.recycle()
                }
                if (found != null) return found
            }
            return null
        }
        val found = walk(root)
        if (found != null) return found
        return if (sawOther) NONE else null
    }

    /** [YOUTUBE], [INSTAGRAM], [NONE] if the node has text that is not a target, or null if empty. */
    private fun siteFromNode(node: AccessibilityNodeInfo): String? {
        val texts = listOf(node.text?.toString(), node.contentDescription?.toString())
        var saw = false
        for (t in texts) {
            val raw = t?.trim().orEmpty()
            if (raw.isEmpty()) continue
            saw = true
            val site = siteForUrl(raw)
            if (site != NONE) return site
        }
        return if (saw) NONE else null
    }

    fun siteForUrl(raw: String): String {
        val s = raw.trim().lowercase()
        if (s.isEmpty()) return NONE
        if (containsHost(s, "instagram.com") || containsHost(s, "instagr.am") || containsHost(s, "ig.me")) {
            return INSTAGRAM
        }
        if (
            containsHost(s, "youtube.com") ||
            containsHost(s, "youtu.be") ||
            containsHost(s, "youtube-nocookie.com") ||
            containsHost(s, "youtubekids.com") ||
            containsHost(s, "yt.be")
        ) {
            return YOUTUBE
        }
        return NONE
    }

    private fun containsHost(s: String, host: String): Boolean {
        var from = 0
        while (from < s.length) {
            val at = s.indexOf(host, from)
            if (at < 0) return false
            val beforeOk = at == 0 || !s[at - 1].isLetterOrDigit()
            val after = at + host.length
            val afterOk = after >= s.length || !s[after].isLetterOrDigit()
            if (beforeOk && afterOk) return true
            from = at + host.length
        }
        return false
    }
}
