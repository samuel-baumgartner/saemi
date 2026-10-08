package com.saemi.goalswidget

import android.content.Context
import android.os.SystemClock
import android.provider.Settings

/**
 * "Protection": while on, the accessibility service kicks you out of any Settings /
 * uninstall / permission screen that mentions this app, and the setup screen locks the
 * server URL, token and package fields. Turning it off needs an unlock request, then a
 * wait of [UNLOCK_WAIT_MS], then an [UNLOCK_WINDOW_MS] window in which everything is open.
 *
 * Times use elapsedRealtime + boot count, so changing the clock can't skip the wait;
 * a reboot cancels a pending request.
 */
object TamperGuard {
    private const val PREFS = "saemi_tamper_guard"
    private const val KEY_ENABLED = "enabled"
    private const val KEY_REQUESTED_ELAPSED = "unlock_requested_elapsed"
    private const val KEY_REQUESTED_BOOT = "unlock_requested_boot"

    const val UNLOCK_WAIT_MS = 30 * 60_000L
    const val UNLOCK_WINDOW_MS = 10 * 60_000L

    sealed class State {
        object Off : State()
        object Locked : State()
        data class Waiting(val remainingMs: Long) : State()
        data class Open(val remainingMs: Long) : State()
    }

    /** Settings-like apps where this app can be disabled, force-stopped, uninstalled or stripped of permissions. */
    private val GUARDED_PACKAGES = setOf(
        "com.android.settings",
        "com.android.packageinstaller",
        "com.google.android.packageinstaller",
        "com.android.permissioncontroller",
        "com.google.android.permissioncontroller",
        "com.samsung.android.lool",
        "com.samsung.android.sm_cn",
        "com.miui.securitycenter",
    )

    fun isGuardedPackage(context: Context, pkg: String): Boolean {
        if (pkg == context.packageName) return false
        return pkg in GUARDED_PACKAGES || pkg.contains("settings")
    }

    fun state(context: Context): State {
        val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        if (!prefs.getBoolean(KEY_ENABLED, false)) return State.Off
        val requestedAt = prefs.getLong(KEY_REQUESTED_ELAPSED, -1L)
        if (requestedAt < 0 || prefs.getInt(KEY_REQUESTED_BOOT, -1) != bootCount(context)) {
            return State.Locked
        }
        val elapsed = SystemClock.elapsedRealtime() - requestedAt
        return when {
            elapsed < 0 -> State.Locked
            elapsed < UNLOCK_WAIT_MS -> State.Waiting(UNLOCK_WAIT_MS - elapsed)
            elapsed < UNLOCK_WAIT_MS + UNLOCK_WINDOW_MS ->
                State.Open(UNLOCK_WAIT_MS + UNLOCK_WINDOW_MS - elapsed)
            else -> State.Locked
        }
    }

    /** True while settings for this app should be blocked and the setup fields locked. */
    fun isProtecting(context: Context): Boolean = when (state(context)) {
        State.Locked, is State.Waiting -> true
        State.Off, is State.Open -> false
    }

    fun enable(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putBoolean(KEY_ENABLED, true)
            .remove(KEY_REQUESTED_ELAPSED)
            .remove(KEY_REQUESTED_BOOT)
            .apply()
    }

    fun requestUnlock(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putLong(KEY_REQUESTED_ELAPSED, SystemClock.elapsedRealtime())
            .putInt(KEY_REQUESTED_BOOT, bootCount(context))
            .apply()
    }

    fun cancelUnlock(context: Context) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .remove(KEY_REQUESTED_ELAPSED)
            .remove(KEY_REQUESTED_BOOT)
            .apply()
    }

    /** Only allowed inside the unlock window. */
    fun disable(context: Context): Boolean {
        if (state(context) !is State.Open) return false
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit()
            .putBoolean(KEY_ENABLED, false)
            .remove(KEY_REQUESTED_ELAPSED)
            .remove(KEY_REQUESTED_BOOT)
            .apply()
        return true
    }

    private fun bootCount(context: Context): Int =
        Settings.Global.getInt(context.contentResolver, Settings.Global.BOOT_COUNT, 0)
}
