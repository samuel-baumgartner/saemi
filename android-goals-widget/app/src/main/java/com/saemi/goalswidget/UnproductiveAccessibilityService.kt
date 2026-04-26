package com.saemi.goalswidget

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Intent
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.view.accessibility.AccessibilityEvent
import java.util.concurrent.Executors

class UnproductiveAccessibilityService : AccessibilityService() {

    private val worker = Executors.newSingleThreadExecutor()
    private val mainHandler = Handler(Looper.getMainLooper())

    /** Throttle [TYPE_WINDOW_CONTENT_CHANGED] — YouTube fires very often. */
    private var lastYoutubeTitleProbeMs = 0L
    private val contentProbeIntervalMs = 2_000L

    private fun youtubePackages(): Set<String> {
        val set = linkedSetOf("com.google.android.youtube")
        val custom = WidgetPrefs.getYoutubePackage(this).trim()
        if (custom.isNotEmpty()) set.add(custom)
        return set
    }

    private fun instagramPackages(): Set<String> {
        val set = linkedSetOf("com.instagram.android")
        val custom = WidgetPrefs.getInstagramPackage(this).trim()
        if (custom.isNotEmpty()) set.add(custom)
        return set
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        val info = AccessibilityServiceInfo()
        info.eventTypes =
            AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED or
                AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        info.flags = AccessibilityServiceInfo.FLAG_INCLUDE_NOT_IMPORTANT_VIEWS
        serviceInfo = info
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null) return
        val type = event.eventType
        if (type != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED &&
            type != AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
        ) {
            return
        }
        val pkg = event.packageName?.toString() ?: return

        val yt = youtubePackages()
        val ig = instagramPackages()
        val isYoutube = yt.contains(pkg)
        val isInstagram = ig.contains(pkg)
        if (!isYoutube && !isInstagram) return

        if (isYoutube && WidgetPrefs.isConfigured(this)) {
            if (type == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED) {
                val now = System.currentTimeMillis()
                if (now - lastYoutubeTitleProbeMs < contentProbeIntervalMs) {
                    // Still run blocker path below for Instagram / over-limit; skip title probe.
                } else {
                    lastYoutubeTitleProbeMs = now
                    maybeRecordYoutubeListeningFromEvent(event)
                }
            } else {
                maybeRecordYoutubeListeningFromEvent(event)
            }
        }

        if (!WidgetPrefs.isConfigured(this)) return

        worker.execute {
            val overLimit = LimitStatusCache.refreshForBlocker(this)
            if (!overLimit) return@execute

            if (isYoutube && ListeningGracePrefs.isActive(this)) return@execute

            if (UsageAccess.hasUsageAccess(this)) {
                val fg = ForegroundApp.getCurrentForegroundPackage(this, 8_000L)
                val stillTarget =
                    fg != null && (yt.contains(fg) || ig.contains(fg))
                if (!stillTarget) return@execute
            }

            mainHandler.post { launchBlocker() }
        }
    }

    /**
     * Log timestamps when the current YouTube screen looks like listening / Japanese study,
     * for [PhoneUsageTracker] to upgrade usage intervals to [Listening · YouTube].
     */
    private fun maybeRecordYoutubeListeningFromEvent(event: AccessibilityEvent) {
        val normalizedCandidates = LinkedHashSet<String>()
        val fromEvent = YoutubeListeningHeuristics.titleFromAccessibilityEvent(event)
        val nEvent = YoutubeListeningHeuristics.normalizeYoutubeTitleText(fromEvent)
        if (nEvent.isNotEmpty()) normalizedCandidates.add(nEvent)

        val root = rootInActiveWindow
        if (root != null) {
            try {
                val fromRoot = YoutubeTitleFromRoot.longestPlausibleTitle(root)
                val nRoot =
                    YoutubeListeningHeuristics.normalizeYoutubeTitleText(fromRoot.orEmpty())
                if (nRoot.isNotEmpty()) normalizedCandidates.add(nRoot)
            } finally {
                root.recycle()
            }
        }

        var best: String? = null
        for (c in normalizedCandidates) {
            if (!YoutubeListeningHeuristics.looksLikeListeningTitle(c)) continue
            if (best == null || c.length > best.length) best = c
        }
        val match = best ?: return
        YoutubeListeningTitleLog.recordMatch(this, System.currentTimeMillis(), match)
        ListeningGracePrefs.startGrace(this)
    }

    private fun launchBlocker() {
        val intent = Intent(this, UnproductiveBlockerActivity::class.java).apply {
            addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP or
                    Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS,
            )
        }
        startActivity(intent)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            performGlobalAction(GLOBAL_ACTION_HOME)
        }
    }

    override fun onInterrupt() {
        // no-op
    }

    override fun onDestroy() {
        worker.shutdownNow()
        super.onDestroy()
    }
}
