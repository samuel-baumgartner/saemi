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
        info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        serviceInfo = info
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return
        val pkg = event.packageName?.toString() ?: return

        val yt = youtubePackages()
        val ig = instagramPackages()
        val isYoutube = yt.contains(pkg)
        val isInstagram = ig.contains(pkg)
        if (!isYoutube && !isInstagram) return

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

            mainHandler.post {
                GoogleFitRefresh.maybePrimeFitThenRun(this) { launchBlocker() }
            }
        }
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
