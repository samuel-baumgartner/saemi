package com.saemi.goalswidget

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.view.accessibility.AccessibilityEvent
import android.widget.Toast
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

    private var lastGuardProbeMs = 0L
    private val guardProbeIntervalMs = 300L
    private var lastGuardKickMs = 0L
    private val guardKickCooldownMs = 1_500L

    /** While a target stays open (e.g. a long video), re-check the limit periodically. */
    private val watchIntervalMs = 45_000L
    private var watching = false
    private val watchTick = object : Runnable {
        override fun run() {
            if (isOnTargetNow()) {
                requestLimitCheck(lastTarget)
                mainHandler.postDelayed(this, watchIntervalMs)
            } else {
                watching = false
            }
        }
    }

    private enum class Target { None, App, Browser, Unknown }

    /** Last target we positively saw. Used when the active window can't be read. */
    private var lastTarget = Target.None
    private var lastTargetAt = 0L

    override fun onServiceConnected() {
        super.onServiceConnected()
        // Replacing serviceInfo from scratch drops canRetrieveWindowContent, and then
        // rootInActiveWindow is null — the blocker saw YouTube open and then did nothing.
        val info = serviceInfo ?: AccessibilityServiceInfo()
        info.eventTypes =
            AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED or
                AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED or
                AccessibilityEvent.TYPE_WINDOWS_CHANGED
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        info.flags = info.flags or
            AccessibilityServiceInfo.FLAG_INCLUDE_NOT_IMPORTANT_VIEWS or
            AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS or
            AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS
        info.notificationTimeout = 100
        serviceInfo = info
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null) return
        val type = event.eventType
        if (
            type != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED &&
            type != AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED &&
            type != AccessibilityEvent.TYPE_WINDOWS_CHANGED
        ) {
            return
        }
        val pkg = event.packageName?.toString()?.takeIf { it.isNotEmpty() }
            ?: packageFromActiveWindow()
            ?: return
        if (pkg == packageName) {
            TargetUseLog.note(this, false)
            return
        }
        if (TamperGuard.isGuardedPackage(this, pkg)) {
            TargetUseLog.note(this, false)
            guardSettings(event)
            return
        }
        if (!WidgetPrefs.isConfigured(this)) return

        val onTarget = when {
            PhoneClassifier.isUnproductiveApp(this, pkg) -> true
            BrowserSites.isBrowser(pkg) -> {
                val now = System.currentTimeMillis()
                val force = type == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
                if (force || now - lastBrowserProbeMs >= browserProbeIntervalMs) {
                    lastBrowserProbeMs = now
                    probeBrowser(pkg, event)
                }
                BrowserSiteLog.currentSite(this) != BrowserSites.NONE
            }
            else -> false
        }
        TargetUseLog.note(this, onTarget)
        if (!onTarget) {
            lastTarget = Target.None
            return
        }
        lastTarget = if (PhoneClassifier.isUnproductiveApp(this, pkg)) Target.App else Target.Browser
        lastTargetAt = System.currentTimeMillis()

        requestLimitCheck(lastTarget)
        if (!watching) {
            watching = true
            mainHandler.postDelayed(watchTick, watchIntervalMs)
        }
    }

    /**
     * While protection is on, leaves any Settings / uninstall / permission screen that shows
     * this app's name (its accessibility toggle, App info, usage access, uninstall dialog,
     * settings search results, ...).
     */
    private fun guardSettings(event: AccessibilityEvent) {
        val now = System.currentTimeMillis()
        val force = event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
        if (!force && now - lastGuardProbeMs < guardProbeIntervalMs) return
        if (now - lastGuardKickMs < guardKickCooldownMs) return
        lastGuardProbeMs = now
        if (!TamperGuard.isProtecting(this)) return
        if (!windowMentionsThisApp(event)) return

        lastGuardKickMs = now
        performGlobalAction(GLOBAL_ACTION_BACK)
        mainHandler.postDelayed({ performGlobalAction(GLOBAL_ACTION_HOME) }, 200L)
        Toast.makeText(this, R.string.protection_kicked, Toast.LENGTH_LONG).show()
    }

    private fun windowMentionsThisApp(event: AccessibilityEvent): Boolean {
        val label = getString(R.string.app_name)
        if (event.text.any { it?.contains(label, ignoreCase = true) == true }) return true
        val root = rootInActiveWindow ?: return false
        return try {
            root.findAccessibilityNodeInfosByText(label).isNotEmpty()
        } finally {
            root.recycle()
        }
    }

    /** Records the site in the browser's address bar; returns it, or null if not visible. */
    private fun probeBrowser(pkg: String, event: AccessibilityEvent?): String? {
        val fromEvent = event?.let { BrowserSites.siteFromEvent(it) }
        if (fromEvent == BrowserSites.YOUTUBE || fromEvent == BrowserSites.INSTAGRAM) {
            BrowserSiteLog.record(this, System.currentTimeMillis(), fromEvent)
            return fromEvent
        }
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

    private fun packageFromActiveWindow(): String? {
        val root = rootInActiveWindow ?: return null
        return try {
            root.packageName?.toString()
        } finally {
            root.recycle()
        }
    }

    private fun currentTarget(): Target {
        val root = rootInActiveWindow ?: return Target.Unknown
        val pkg = try {
            root.packageName?.toString()
        } finally {
            root.recycle()
        } ?: return Target.Unknown
        if (pkg == packageName) return Target.Unknown
        if (PhoneClassifier.isUnproductiveApp(this, pkg)) return Target.App
        if (!BrowserSites.isBrowser(pkg)) return Target.None
        val site = probeBrowser(pkg, null) ?: BrowserSiteLog.currentSite(this)
        return if (site != BrowserSites.NONE) Target.Browser else Target.None
    }

    private fun isOnTargetNow(): Boolean = when (currentTarget()) {
        Target.App, Target.Browser -> true
        Target.Unknown ->
            lastTarget != Target.None && System.currentTimeMillis() - lastTargetAt < 60_000L
        Target.None -> false
    }

    private fun requestLimitCheck(target: Target) {
        if (target != Target.App && target != Target.Browser) return
        if (!checking.compareAndSet(false, true)) return
        worker.execute {
            try {
                if (!LimitStatusCache.isOverLimitForBlocker(this)) return@execute
                mainHandler.post { blockIfStillThere(target) }
            } catch (_: Exception) {
            } finally {
                checking.set(false)
            }
        }
    }

    private fun blockIfStillThere(captured: Target) {
        val live = currentTarget()
        val effective = when (live) {
            Target.App, Target.Browser -> live
            Target.Unknown -> captured
            // A system dialog over YouTube used to look like the app had closed,
            // and the block was dropped. Leaving for a real other app still cancels it.
            Target.None -> {
                if (captured != Target.App && captured != Target.Browser) return
                if (System.currentTimeMillis() - lastTargetAt > 4_000L) return
                if (!occludedBySystemUi()) return
                captured
            }
        }
        when (effective) {
            Target.App -> {
                showBlocker()
                performGlobalAction(GLOBAL_ACTION_HOME)
            }
            // Going home would leave the tab open on the site; navigate away instead.
            Target.Browser -> {
                performGlobalAction(GLOBAL_ACTION_BACK)
                mainHandler.postDelayed({
                    if (currentTarget() == Target.None) return@postDelayed
                    showBlocker()
                    performGlobalAction(GLOBAL_ACTION_HOME)
                }, 350L)
            }
            else -> {}
        }
    }

    /** True when no other app is actually in front — the target is still the one we saw. */
    private fun occludedBySystemUi(): Boolean {
        val root = rootInActiveWindow ?: return true
        val pkg = try {
            root.packageName?.toString().orEmpty()
        } finally {
            root.recycle()
        }
        return pkg.isEmpty() ||
            pkg == packageName ||
            pkg == "com.android.systemui" ||
            pkg == "android"
    }

    private fun showBlocker() {
        if (BlockOverlay.show(this)) return
        val intent = Intent(this, UnproductiveBlockerActivity::class.java).apply {
            addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP or
                    Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS,
            )
        }
        try {
            startActivity(intent)
        } catch (_: Exception) {
        }
    }

    override fun onInterrupt() {
        // no-op
    }

    override fun onDestroy() {
        mainHandler.removeCallbacks(watchTick)
        BlockOverlay.hide()
        worker.shutdownNow()
        super.onDestroy()
    }
}
