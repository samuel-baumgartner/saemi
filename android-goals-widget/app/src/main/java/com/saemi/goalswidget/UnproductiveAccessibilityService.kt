package com.saemi.goalswidget

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Intent
import android.os.Build
import android.view.accessibility.AccessibilityEvent

class UnproductiveAccessibilityService : AccessibilityService() {

    private val youtubePackages = setOf("com.google.android.youtube")
    private val instagramPackages = setOf("com.instagram.android")

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

        val isTarget = youtubePackages.contains(pkg) || instagramPackages.contains(pkg)
        if (!isTarget) return

        if (!WidgetPrefs.isConfigured(this)) return
        val overLimit = LimitStatusCache.shouldBlockNow(this)
        if (!overLimit) return

        launchBlocker()
    }

    private fun launchBlocker() {
        val intent = Intent(this, UnproductiveBlockerActivity::class.java).apply {
            addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                    Intent.FLAG_ACTIVITY_CLEAR_TOP or
                    Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS
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
}

