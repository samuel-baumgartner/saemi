package com.saemi.goalswidget

import android.Manifest
import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.widget.Button
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast

class ConfigureActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_configure)

        val widgetId = intent?.extras?.getInt(
            AppWidgetManager.EXTRA_APPWIDGET_ID,
            AppWidgetManager.INVALID_APPWIDGET_ID,
        ) ?: AppWidgetManager.INVALID_APPWIDGET_ID

        val editUrl = findViewById<EditText>(R.id.edit_base_url)
        val editToken = findViewById<EditText>(R.id.edit_token)
        val editYoutube = findViewById<EditText>(R.id.edit_youtube_pkg)
        val editInstagram = findViewById<EditText>(R.id.edit_instagram_pkg)
        editUrl.setText(WidgetPrefs.getBaseUrl(this))
        editToken.setText(WidgetPrefs.getToken(this))
        editYoutube.setText(WidgetPrefs.getYoutubePackage(this))
        editInstagram.setText(WidgetPrefs.getInstagramPackage(this))

        val switchGoogleFitNudge = findViewById<Switch>(R.id.switch_google_fit_nudge)
        switchGoogleFitNudge.isChecked = WidgetPrefs.isGoogleFitNudgeEnabled(this)

        findViewById<Button>(R.id.btn_usage_access).setOnClickListener {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        }

        findViewById<Button>(R.id.btn_accessibility).setOnClickListener {
            startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS))
        }

        findViewById<Button>(R.id.btn_notifications).setOnClickListener {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && !UniReminders.canNotify(this)) {
                requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), REQ_NOTIFICATIONS)
            } else {
                startActivity(
                    Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS)
                        .putExtra(Settings.EXTRA_APP_PACKAGE, packageName),
                )
            }
        }

        val ui = Handler(Looper.getMainLooper())
        fun detectInto(target: EditText, button: Button) {
            if (!UsageAccess.hasUsageAccess(this)) {
                Toast.makeText(
                    this,
                    "Grant Usage Access, then try again.",
                    Toast.LENGTH_SHORT,
                ).show()
                return
            }

            button.isEnabled = false
            Toast.makeText(
                this,
                "Switch to the target app now…",
                Toast.LENGTH_SHORT,
            ).show()

            ui.postDelayed({
                val pkg = ForegroundApp.getCurrentForegroundPackage(this, lookbackMs = 30_000L)
                if (pkg == null) {
                    Toast.makeText(
                        this,
                        "Could not detect. Try again.",
                        Toast.LENGTH_SHORT,
                    ).show()
                } else {
                    target.setText(pkg)
                }
                button.isEnabled = true
            }, 3_000L)
        }

        val btnDetectYoutube = findViewById<Button>(R.id.btn_detect_youtube)
        val btnDetectInstagram = findViewById<Button>(R.id.btn_detect_instagram)

        btnDetectYoutube.setOnClickListener {
            detectInto(editYoutube, btnDetectYoutube)
        }
        btnDetectInstagram.setOnClickListener {
            detectInto(editInstagram, btnDetectInstagram)
        }

        findViewById<Button>(R.id.btn_save).setOnClickListener {
            val url = editUrl.text.toString()
            val token = editToken.text.toString()
            if (url.isBlank() || token.isBlank()) return@setOnClickListener
            WidgetPrefs.save(
                this,
                url,
                token,
                editYoutube.text.toString(),
                editInstagram.text.toString(),
            )
            WidgetPrefs.setGoogleFitNudgeEnabled(this, switchGoogleFitNudge.isChecked)
            UniWidgetProvider.refresh(this, force = true)
            AutoRefreshScheduler.schedule(this)
            val mgr = AppWidgetManager.getInstance(this)
            if (widgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
                GoalsWidgetProvider.bindWidget(this, mgr, widgetId)
                GoalsWidgetProvider.refreshData(this, mgr, intArrayOf(widgetId))
                setResult(
                    RESULT_OK,
                    Intent().putExtra(
                        AppWidgetManager.EXTRA_APPWIDGET_ID,
                        widgetId,
                    ),
                )
            } else {
                GoalsWidgetProvider.updateAllWidgets(this)
            }
            finish()
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && !UniReminders.canNotify(this)) {
            requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), REQ_NOTIFICATIONS)
        }
    }

    override fun onResume() {
        super.onResume()
        updateStatus()
        if (WidgetPrefs.isConfigured(this)) {
            GoalsWidgetProvider.updateAllWidgets(this)
            UniWidgetProvider.refresh(this, force = false)
            AutoRefreshScheduler.schedule(this)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray,
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        updateStatus()
    }

    private fun updateStatus() {
        val blockerOn = isBlockerEnabled()
        findViewById<TextView>(R.id.blocker_status).apply {
            setText(if (blockerOn) R.string.blocker_status_on else R.string.blocker_status_off)
            setTextColor(if (blockerOn) 0xFF86EFAC.toInt() else 0xFFFCA5A5.toInt())
        }
        findViewById<Button>(R.id.btn_notifications).setText(
            if (UniReminders.canNotify(this)) R.string.uni_notifications_on else R.string.uni_allow_notifications,
        )
    }

    private fun isBlockerEnabled(): Boolean {
        val enabled = Settings.Secure.getString(
            contentResolver,
            Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES,
        ) ?: return false
        val me = ComponentName(this, UnproductiveAccessibilityService::class.java)
        return enabled.split(':').any {
            ComponentName.unflattenFromString(it) == me
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (intent?.hasExtra(AppWidgetManager.EXTRA_APPWIDGET_ID) == true) {
            val id = intent.getIntExtra(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID,
            )
            if (id != AppWidgetManager.INVALID_APPWIDGET_ID) {
                setResult(RESULT_CANCELED)
            }
        }
        super.onBackPressed()
    }

    companion object {
        private const val REQ_NOTIFICATIONS = 42
    }
}
