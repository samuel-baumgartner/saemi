package com.saemi.goalswidget

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.EditText
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
        val editBunpro = findViewById<EditText>(R.id.edit_bunpro_pkg)
        val editAnki = findViewById<EditText>(R.id.edit_anki_pkg)
        val editYoutube = findViewById<EditText>(R.id.edit_youtube_pkg)
        val editInstagram = findViewById<EditText>(R.id.edit_instagram_pkg)
        editUrl.setText(WidgetPrefs.getBaseUrl(this))
        editToken.setText(WidgetPrefs.getToken(this))
        editBunpro.setText(WidgetPrefs.getBunproPackage(this))
        editAnki.setText(WidgetPrefs.getAnkiPackage(this))
        editYoutube.setText(WidgetPrefs.getYoutubePackage(this))
        editInstagram.setText(WidgetPrefs.getInstagramPackage(this))

        findViewById<Button>(R.id.btn_usage_access).setOnClickListener {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        }

        fun detectInto(target: EditText) {
            val pkg = ForegroundApp.getCurrentForegroundPackage(this)
            if (pkg == null) {
                Toast.makeText(
                    this,
                    "Grant Usage Access, then try again.",
                    Toast.LENGTH_SHORT,
                ).show()
            } else {
                target.setText(pkg)
            }
        }

        findViewById<Button>(R.id.btn_detect_bunpro).setOnClickListener {
            detectInto(editBunpro)
        }
        findViewById<Button>(R.id.btn_detect_anki).setOnClickListener {
            detectInto(editAnki)
        }
        findViewById<Button>(R.id.btn_detect_youtube).setOnClickListener {
            detectInto(editYoutube)
        }
        findViewById<Button>(R.id.btn_detect_instagram).setOnClickListener {
            detectInto(editInstagram)
        }

        findViewById<Button>(R.id.btn_save).setOnClickListener {
            val url = editUrl.text.toString()
            val token = editToken.text.toString()
            if (url.isBlank() || token.isBlank()) return@setOnClickListener
            WidgetPrefs.save(
                this,
                url,
                token,
                editBunpro.text.toString(),
                editAnki.text.toString(),
                editYoutube.text.toString(),
                editInstagram.text.toString(),
            )
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
}
