package com.saemi.goalswidget

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText

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
        editUrl.setText(WidgetPrefs.getBaseUrl(this))
        editToken.setText(WidgetPrefs.getToken(this))

        findViewById<Button>(R.id.btn_save).setOnClickListener {
            val url = editUrl.text.toString()
            val token = editToken.text.toString()
            if (url.isBlank() || token.isBlank()) return@setOnClickListener
            WidgetPrefs.save(this, url, token)
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
