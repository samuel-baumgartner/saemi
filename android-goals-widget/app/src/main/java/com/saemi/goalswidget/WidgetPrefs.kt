package com.saemi.goalswidget

import android.content.Context

object WidgetPrefs {
    private const val PREFS = "saemi_goals_widget"
    private const val KEY_BASE_URL = "base_url"
    private const val KEY_TOKEN = "api_token"

    fun getBaseUrl(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_BASE_URL, "")?.trim().orEmpty()

    fun getToken(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_TOKEN, "")?.trim().orEmpty()

    fun isConfigured(context: Context): Boolean =
        getBaseUrl(context).isNotEmpty() && getToken(context).isNotEmpty()

    fun save(context: Context, baseUrl: String, token: String) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putString(KEY_BASE_URL, baseUrl.trim().trimEnd('/'))
            .putString(KEY_TOKEN, token.trim())
            .apply()
    }
}
