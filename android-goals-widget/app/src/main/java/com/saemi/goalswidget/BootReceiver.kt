package com.saemi.goalswidget

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/** Alarms are wiped on reboot / app update; plan them again from the cached deadlines. */
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_BOOT_COMPLETED, Intent.ACTION_MY_PACKAGE_REPLACED -> {
                if (!WidgetPrefs.isConfigured(context)) return
                UniReminders.reschedule(context, UniCache.entries(context))
                AutoRefreshScheduler.schedule(context)
            }
        }
    }
}
