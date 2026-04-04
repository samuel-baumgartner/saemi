package com.saemi.goalswidget

import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper

/**
 * Best-effort: bring Google Fit to the foreground briefly so it can upload watch/phone data
 * to Google (what the Saemi web Fit API reads). There is no supported invisible sync API.
 *
 * Opt-in in widget settings; throttled globally (widget + blocker share one cooldown).
 */
object GoogleFitRefresh {

    private const val PREFS = "saemi_google_fit_nudge"
    private const val KEY_LAST_MS = "last_nudge_ms"

    private const val MIN_INTERVAL_MS = 4 * 60 * 60 * 1000L

    private const val FIT_PACKAGE = "com.google.android.apps.fitness"

    private const val DELAY_BEFORE_HOME_MS = 3_500L

    /** Short flash of Fit before the unproductive blocker appears. */
    private const val DELAY_BEFORE_BLOCKER_MS = 900L

    private val mainHandler = Handler(Looper.getMainLooper())

    fun maybeNudgeAfterWidgetRefresh(context: Context) {
        if (!WidgetPrefs.isGoogleFitNudgeEnabled(context)) return
        val app = context.applicationContext
        if (!isFitInstalled(app)) return
        if (launchIntent(app) == null) return
        if (!tryAcquireNudgeSlot(app)) return
        launchFitBrieflyThenHome(app)
    }

    /**
     * If enabled and throttle allows: start Fit, then run [after] on the main thread
     * (e.g. show the blocker). Otherwise runs [after] immediately.
     */
    fun maybePrimeFitThenRun(context: Context, after: () -> Unit) {
        if (!WidgetPrefs.isGoogleFitNudgeEnabled(context)) {
            after()
            return
        }
        val app = context.applicationContext
        if (!isFitInstalled(app)) {
            after()
            return
        }
        val launch = launchIntent(app) ?: run {
            after()
            return
        }
        if (!tryAcquireNudgeSlot(app)) {
            after()
            return
        }
        mainHandler.post {
            try {
                app.startActivity(launch)
            } catch (_: Exception) {
                after()
                return@post
            }
            mainHandler.postDelayed(after, DELAY_BEFORE_BLOCKER_MS)
        }
    }

    private fun tryAcquireNudgeSlot(context: Context): Boolean {
        val app = context.applicationContext
        val sp = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        val now = System.currentTimeMillis()
        if (now - sp.getLong(KEY_LAST_MS, 0L) < MIN_INTERVAL_MS) return false
        sp.edit().putLong(KEY_LAST_MS, now).apply()
        return true
    }

    private fun isFitInstalled(context: Context): Boolean =
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.packageManager.getPackageInfo(
                    FIT_PACKAGE,
                    PackageManager.PackageInfoFlags.of(0),
                )
            } else {
                @Suppress("DEPRECATION")
                context.packageManager.getPackageInfo(FIT_PACKAGE, 0)
            }
            true
        } catch (_: PackageManager.NameNotFoundException) {
            false
        }

    private fun launchIntent(appContext: Context): Intent? {
        val launch = appContext.packageManager.getLaunchIntentForPackage(FIT_PACKAGE)
            ?: return null
        launch.addFlags(
            Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP,
        )
        return launch
    }

    private fun launchFitBrieflyThenHome(appContext: Context) {
        val launch = launchIntent(appContext) ?: return
        mainHandler.post {
            try {
                appContext.startActivity(launch)
            } catch (_: Exception) {
                return@post
            }
            mainHandler.postDelayed({
                val home = Intent(Intent.ACTION_MAIN).apply {
                    addCategory(Intent.CATEGORY_HOME)
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                try {
                    appContext.startActivity(home)
                } catch (_: Exception) {
                    // ignore
                }
            }, DELAY_BEFORE_HOME_MS)
        }
    }
}
