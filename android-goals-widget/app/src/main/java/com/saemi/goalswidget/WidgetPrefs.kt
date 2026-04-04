package com.saemi.goalswidget

import android.content.Context

object WidgetPrefs {
    private const val PREFS = "saemi_goals_widget"
    private const val KEY_BASE_URL = "base_url"
    private const val KEY_TOKEN = "api_token"
    private const val KEY_BUNPRO_PKG = "bunpro_pkg"
    private const val KEY_ANKI_PKG = "anki_pkg"
    private const val KEY_YOUTUBE_PKG = "youtube_pkg"
    private const val KEY_INSTAGRAM_PKG = "instagram_pkg"
    private const val KEY_GOOGLE_FIT_NUDGE = "google_fit_nudge"

    fun getBaseUrl(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_BASE_URL, "")?.trim().orEmpty()

    fun getToken(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_TOKEN, "")?.trim().orEmpty()

    fun isConfigured(context: Context): Boolean =
        getBaseUrl(context).isNotEmpty() && getToken(context).isNotEmpty()

    /** Open Google Fit briefly on throttled widget refresh (helps cloud upload). */
    fun isGoogleFitNudgeEnabled(context: Context): Boolean =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getBoolean(KEY_GOOGLE_FIT_NUDGE, false)

    fun setGoogleFitNudgeEnabled(context: Context, enabled: Boolean) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putBoolean(KEY_GOOGLE_FIT_NUDGE, enabled)
            .apply()
    }

    fun getBunproPackage(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_BUNPRO_PKG, "")?.trim().orEmpty()

    fun getAnkiPackage(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_ANKI_PKG, "")?.trim().orEmpty()

    fun getYoutubePackage(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_YOUTUBE_PKG, "")?.trim().orEmpty()

    fun getInstagramPackage(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_INSTAGRAM_PKG, "")?.trim().orEmpty()

    fun save(
        context: Context,
        baseUrl: String,
        token: String,
        bunproPkg: String,
        ankiPkg: String,
        youtubePkg: String,
        instagramPkg: String,
    ) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putString(KEY_BASE_URL, baseUrl.trim().trimEnd('/'))
            .putString(KEY_TOKEN, token.trim())
            .putString(KEY_BUNPRO_PKG, bunproPkg.trim())
            .putString(KEY_ANKI_PKG, ankiPkg.trim())
            .putString(KEY_YOUTUBE_PKG, youtubePkg.trim())
            .putString(KEY_INSTAGRAM_PKG, instagramPkg.trim())
            .apply()
    }
}
