package com.saemi.goalswidget

import android.accessibilityservice.AccessibilityService
import android.annotation.SuppressLint
import android.graphics.PixelFormat
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import java.lang.ref.WeakReference
import java.util.concurrent.Executors

/**
 * Full-screen block drawn by the accessibility service. Starting an activity from
 * the service is ignored on newer Android versions, which left YouTube and Instagram
 * usable; this window does not depend on that.
 */
object BlockOverlay {
    private const val HOLD_MS = 60_000L

    private val mainHandler = Handler(Looper.getMainLooper())
    private val io = Executors.newSingleThreadExecutor()

    private var serviceRef: WeakReference<AccessibilityService>? = null
    private var windowManager: WindowManager? = null
    private var view: View? = null

    private var holdStartMs = 0L
    private var claiming = false

    private val holdTick = object : Runnable {
        override fun run() {
            val root = view ?: return
            if (holdStartMs == 0L) return
            val elapsed = SystemClock.uptimeMillis() - holdStartMs
            val button = root.findViewById<Button>(R.id.blockerHoldButton)
            val progress = root.findViewById<ProgressBar>(R.id.blockerHoldProgress)
            if (elapsed >= HOLD_MS) {
                claimExtra()
                return
            }
            progress.progress = (elapsed * 1000 / HOLD_MS).toInt()
            button.text = root.context.getString(
                R.string.blocker_hold_running,
                ((HOLD_MS - elapsed + 999) / 1000).toInt(),
            )
            mainHandler.postDelayed(this, 100L)
        }
    }

    fun isShowing(): Boolean = view != null

    @SuppressLint("ClickableViewAccessibility")
    fun show(service: AccessibilityService): Boolean {
        if (view != null) return true
        val wm = service.getSystemService(AccessibilityService.WINDOW_SERVICE) as WindowManager
        val root = LayoutInflater.from(service).inflate(R.layout.activity_unproductive_blocker, null)
        root.isClickable = true
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
            PixelFormat.OPAQUE,
        ).apply {
            gravity = Gravity.TOP or Gravity.START
        }
        root.findViewById<Button>(R.id.blockerCloseButton).setOnClickListener {
            service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_HOME)
            hide()
        }
        val hold = root.findViewById<Button>(R.id.blockerHoldButton)
        hold.setOnTouchListener { _, event ->
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> startHold()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> cancelHold()
            }
            true
        }
        return try {
            wm.addView(root, params)
            serviceRef = WeakReference(service)
            windowManager = wm
            view = root
            true
        } catch (_: Exception) {
            false
        }
    }

    fun hide() {
        cancelHold()
        val v = view
        view = null
        val wm = windowManager
        windowManager = null
        serviceRef = null
        if (v != null && wm != null) {
            try {
                wm.removeView(v)
            } catch (_: Exception) {
            }
        }
    }

    private fun startHold() {
        if (claiming || holdStartMs != 0L || view == null) return
        view?.findViewById<TextView>(R.id.blockerHoldStatus)?.text = ""
        holdStartMs = SystemClock.uptimeMillis()
        mainHandler.post(holdTick)
    }

    private fun cancelHold() {
        if (holdStartMs == 0L) return
        holdStartMs = 0L
        mainHandler.removeCallbacks(holdTick)
        val root = view ?: return
        root.findViewById<ProgressBar>(R.id.blockerHoldProgress).progress = 0
        root.findViewById<Button>(R.id.blockerHoldButton).setText(R.string.blocker_hold_idle)
    }

    private fun claimExtra() {
        val root = view ?: return
        val app = root.context.applicationContext
        holdStartMs = 0L
        claiming = true
        val button = root.findViewById<Button>(R.id.blockerHoldButton)
        val progress = root.findViewById<ProgressBar>(R.id.blockerHoldProgress)
        val status = root.findViewById<TextView>(R.id.blockerHoldStatus)
        progress.progress = 1000
        button.isEnabled = false
        button.setText(R.string.blocker_hold_claiming)
        io.execute {
            val result = LimitStatusApi.claimExtra(
                WidgetPrefs.getBaseUrl(app),
                WidgetPrefs.getToken(app),
            )
            result.getOrNull()?.let { LimitStatusCache.applyClaimedStatus(it) }
            mainHandler.post {
                claiming = false
                val shown = view ?: return@post
                val statusNow = result.getOrNull()
                if (statusNow != null) {
                    shown.findViewById<Button>(R.id.blockerHoldButton)
                        .setText(R.string.blocker_hold_done)
                    status.text = shown.context.getString(
                        R.string.blocker_hold_done_detail,
                        statusNow.extraMinutes,
                    )
                    mainHandler.postDelayed({ hide() }, 1_500L)
                } else {
                    button.isEnabled = true
                    progress.progress = 0
                    button.setText(R.string.blocker_hold_idle)
                    status.text = shown.context.getString(
                        R.string.blocker_hold_failed,
                        result.exceptionOrNull()?.message ?: "unknown error",
                    )
                }
            }
        }
    }
}
