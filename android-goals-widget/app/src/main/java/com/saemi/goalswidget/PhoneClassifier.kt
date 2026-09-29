package com.saemi.goalswidget

import android.content.Context

object PhoneClassifier {
    private val defaultYoutubePackages = setOf(
        "com.google.android.youtube",
        "com.google.android.youtube.tv",
        "app.revanced.android.youtube",
    )

    private val defaultInstagramPackages = setOf(
        "com.instagram.android",
        "com.instagram.lite",
    )

    fun youtubePackages(context: Context): Set<String> {
        val custom = WidgetPrefs.getYoutubePackage(context)
        return if (custom.isEmpty()) defaultYoutubePackages else defaultYoutubePackages + custom
    }

    fun instagramPackages(context: Context): Set<String> {
        val custom = WidgetPrefs.getInstagramPackage(context)
        return if (custom.isEmpty()) defaultInstagramPackages else defaultInstagramPackages + custom
    }

    /** Native YouTube / Instagram apps (browsers are handled via [BrowserSites]). */
    fun isUnproductiveApp(context: Context, pkg: String): Boolean {
        val p = pkg.trim()
        if (p.isEmpty()) return false
        return youtubePackages(context).contains(p) || instagramPackages(context).contains(p)
    }

    fun categoryForPackage(context: Context, pkg: String): PhoneCategory =
        if (isUnproductiveApp(context, pkg)) PhoneCategory.Unproductive else PhoneCategory.Other
}
