package com.saemi.goalswidget

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class UniReminderReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val id = intent.getStringExtra(UniReminders.EXTRA_ID) ?: return
        val app = context.applicationContext
        val pending = goAsync()
        Thread {
            try {
                // Skip the reminder if the item was ticked off since the alarm was planned.
                var stillOpen = true
                if (WidgetPrefs.isConfigured(app)) {
                    UniApi.fetchRaw(WidgetPrefs.getBaseUrl(app), WidgetPrefs.getToken(app))
                        .onSuccess { json ->
                            UniCache.save(app, json)
                            stillOpen = UniApi.parse(json).any { it.id == id }
                        }
                }
                if (stillOpen) {
                    UniReminders.notify(
                        app,
                        id,
                        intent.getStringExtra(UniReminders.EXTRA_COURSE_ID).orEmpty(),
                        intent.getStringExtra(UniReminders.EXTRA_COURSE).orEmpty(),
                        intent.getStringExtra(UniReminders.EXTRA_LABEL).orEmpty(),
                        intent.getLongExtra(UniReminders.EXTRA_DUE, 0L),
                    )
                }
            } catch (_: Exception) {
            } finally {
                pending.finish()
            }
        }.start()
    }
}
