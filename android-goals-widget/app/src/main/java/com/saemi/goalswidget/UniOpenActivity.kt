package com.saemi.goalswidget

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle

/** Explicit trampoline for widget rows (mutable implicit PendingIntents are disallowed on Android 14+). */
class UniOpenActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val url = intent?.getStringExtra(EXTRA_URL)?.takeIf { it.isNotBlank() }
            ?: UniCache.courseUrl(this, "")
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        } catch (_: Exception) {
        }
        finish()
    }

    companion object {
        const val EXTRA_URL = "com.saemi.goalswidget.EXTRA_URL"
    }
}
