package com.saemi.goalswidget

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.view.accessibility.AccessibilityEvent
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

/**
 * Blocks the YouTube / Instagram apps and youtube.com / instagram.com in mobile browsers
 * once the combined daily allowance (phone + laptop) is used up.
 */
class UnproductiveAccessibilityService : AccessibilityService() {

    private val worker = Executors.newSingleThreadExecutor()
    private val mainHandler = Handler(Looper.getMainLooper())
    private val checking = AtomicBoolean(false)

    /** Browsers fire content-changed events constantly; don't walk the tree on every one. */
    private var lastBrowserProbeMs = 0L
    private val browserProbeIntervalMs = 1_000L

    /** While a target stays open (e.g. a long video), re-check the limit periodically. */
    private val watchIntervalMs = 45_000L
    private var watching = false
    private val watchTick = object : Runnable {
        override fun run() {
            if (isOnTargetNow()) {
                requestLimitCheck()
                mainHandler.postDelayed(this, watchIntervalMs)
            } else {
                watching = false
            }
        }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        val info = AccessibilityServiceInfo()
        info.eventTypes =
            AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED or
                AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        info.flags = AccessibilityServiceInfo.FLAG_INCLUDE_NOT_IMPORTANT_VIEWS or
            AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS
        info.notificationTimeout = 100
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
        if (!WidgetPrefs.isConfigured(this)) return

        val onTarget = when {
            PhoneClassifier.isUnproductiveApp(this, pkg) -> true
            BrowserSites.isBrowser(pkg) -> {
                val now = System.currentTimeMillis()
                val force = type == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
                if (force || now - lastBrowserProbeMs >= browserProbeIntervalMs) {
                    lastBrowserProbeMs = now
                    probeBrowser(pkg)
                }
                BrowserSiteLog.currentSite(this) != BrowserSites.NONE
            }
            else -> false
        }
        if (!onTarget) return

        requestLimitCheck()
        if (!watching) {
            watching = true
            mainHandler.postDelayed(watchTick, watchIntervalMs)
        }
    }

    /** Records the site in the browser's address bar; returns it, or null if not visible. */
    private fun probeBrowser(pkg: String): String? {
        val root = rootInActiveWindow ?: return null
        try {
            if (root.packageName?.toString() != pkg) return null
            val site = BrowserSites.siteFromRoot(root, pkg) ?: return null
            BrowserSiteLog.record(this, System.currentTimeMillis(), site)
            return site
        } finally {
            root.recycle()
        }
    }

    private enum class Target { None, App, Browser }

    private fun currentTarget(): Target {
        val root = rootInActiveWindow ?: return Target.None
        val pkg = try {
            root.packageName?.toString()
        } finally {
            root.recycle()
        } ?: return Target.None
        if (PhoneClassifier.isUnproductiveApp(this, pkg)) return Target.App
        if (!BrowserSites.isBrowser(pkg)) return Target.None
        val site = probeBrowser(pkg) ?: BrowserSiteLog.currentSite(this)
        return if (site != BrowserSites.NONE) Target.Browser else Target.None
    }

    private fun isOnTargetNow(): Boolean = currentTarget() != Target.None

    private fun requestLimitCheck() {
        if (!checking.compareAndSet(false, true)) return
        worker.execute {
            try {
                if (!LimitStatusCache.isOverLimitForBlocker(this)) return@execute
                mainHandler.post {
                    when (currentTarget()) {
                        Target.App -> {
                            showBlocker()
                            performGlobalAction(GLOBAL_ACTION_HOME)
                        }
                        // Going home would leave the tab open on the site; navigate away instead.
                        Target.Browser -> {
                            performGlobalAction(GLOBAL_ACTION_BACK)
                            mainHandler.postDelayed({ showBlocker() }, 350L)
                        }
                        Target.None -> {}
                    }
                }
            } catch (_: Exception) {
            } finally {
                checking.set(false)
            }
        }
    }

    private fun showBlocker() {
        val intent = Intent(this, UnproductiveBlockerActivity::class.java).apply {
            addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP or
                    Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS,
            )
        }
        startActivity(intent)
    }

    override fun onInterrupt() {
        // no-op
    }

    override fun onDestroy() {
        mainHandler.removeCallbacks(watchTick)
        worker.shutdownNow()
        super.onDestroy()
    }
}
