package com.saemi.goalswidget

object PhoneClassifier {
    fun categoryForPackage(
        pkg: String,
        bunproPkg: String,
        ankiPkg: String,
        youtubePkg: String,
        instagramPkg: String,
    ): PhoneCategory {
        val p = pkg.trim()
        if (p.isEmpty()) return PhoneCategory.Other

        if (bunproPkg.isNotBlank() && p == bunproPkg.trim()) return PhoneCategory.Bunpro
        if (ankiPkg.isNotBlank() && p == ankiPkg.trim()) return PhoneCategory.Anki
        if (youtubePkg.isNotBlank() && p == youtubePkg.trim()) return PhoneCategory.Unproductive
        if (instagramPkg.isNotBlank() && p == instagramPkg.trim()) return PhoneCategory.Unproductive

        // Common fallbacks if user hasn't configured everything yet.
        if (p == "com.ichi2.anki") return PhoneCategory.Anki
        if (p == "com.google.android.youtube" || p == "com.google.android.youtube.tv") return PhoneCategory.Unproductive
        if (p == "com.instagram.android") return PhoneCategory.Unproductive

        return PhoneCategory.Other
    }
}

