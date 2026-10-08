package com.saemi.goalswidget

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.view.MotionEvent
import android.view.WindowManager
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import java.util.concurrent.Executors

class UnproductiveBlockerActivity : Activity() {

    private val mainHandler = Handler(Looper.getMainLooper())
    private val io = Executors.newSingleThreadExecutor()

    private lateinit var holdButton: Button
    private lateinit var holdProgress: ProgressBar
    private lateinit var holdStatus: TextView

    /** Uptime when the current hold started, or 0 while not holding. */
    private var holdStartMs = 0L
    private var claiming = false

    private val holdTick = object : Runnable {
        override fun run() {
            if (holdStartMs == 0L) return
            val elapsed = SystemClock.uptimeMillis() - holdStartMs
            if (elapsed >= HOLD_MS) {
                claimExtra()
                return
            }
            holdProgress.progress = (elapsed * 1000 / HOLD_MS).toInt()
            holdButton.text = getString(
                R.string.blocker_hold_running,
                ((HOLD_MS - elapsed + 999) / 1000).toInt(),
            )
            mainHandler.postDelayed(this, 100L)
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.addFlags(
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        setContentView(R.layout.activity_unproductive_blocker)

        findViewById<Button>(R.id.blockerCloseButton).setOnClickListener {
            finish()
        }

        holdButton = findViewById(R.id.blockerHoldButton)
        holdProgress = findViewById(R.id.blockerHoldProgress)
        holdStatus = findViewById(R.id.blockerHoldStatus)

        holdButton.setOnTouchListener { _, event ->
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> startHold()
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> cancelHold()
            }
            true
        }
    }

    override fun onPause() {
        super.onPause()
        cancelHold()
    }

    override fun onDestroy() {
        mainHandler.removeCallbacksAndMessages(null)
        io.shutdownNow()
        super.onDestroy()
    }

    private fun startHold() {
        if (claiming || holdStartMs != 0L) return
        holdStatus.text = ""
        holdStartMs = SystemClock.uptimeMillis()
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        mainHandler.post(holdTick)
    }

    private fun cancelHold() {
        if (holdStartMs == 0L) return
        holdStartMs = 0L
        mainHandler.removeCallbacks(holdTick)
        window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        holdProgress.progress = 0
        holdButton.setText(R.string.blocker_hold_idle)
    }

    private fun claimExtra() {
        holdStartMs = 0L
        claiming = true
        window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        holdProgress.progress = 1000
        holdButton.isEnabled = false
        holdButton.setText(R.string.blocker_hold_claiming)
        val app = applicationContext
        io.execute {
            val result = LimitStatusApi.claimExtra(
                WidgetPrefs.getBaseUrl(app),
                WidgetPrefs.getToken(app),
            )
            result.getOrNull()?.let { LimitStatusCache.applyClaimedStatus(it) }
            mainHandler.post {
                if (isDestroyed) return@post
                claiming = false
                val status = result.getOrNull()
                if (status != null) {
                    holdButton.setText(R.string.blocker_hold_done)
                    holdStatus.text = getString(
                        R.string.blocker_hold_done_detail,
                        status.extraMinutes,
                    )
                    mainHandler.postDelayed({ finish() }, 1_500L)
                } else {
                    holdButton.isEnabled = true
                    holdProgress.progress = 0
                    holdButton.setText(R.string.blocker_hold_idle)
                    holdStatus.text = getString(
                        R.string.blocker_hold_failed,
                        result.exceptionOrNull()?.message ?: "unknown error",
                    )
                }
            }
        }
    }

    companion object {
        private const val HOLD_MS = 60_000L
    }
}
