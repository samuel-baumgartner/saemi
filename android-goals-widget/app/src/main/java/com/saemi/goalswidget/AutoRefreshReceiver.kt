package com.saemi.goalswidget

import android.appwidget.AppWidgetManager
import android.content.BroadcastReceiver
import android.content.ComponentName
import android.content.Context
import android.content.Intent

class AutoRefreshReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        if (intent?.action != ACTION_TICK) return

        val mgr = AppWidgetManager.getInstance(context)
        val timelineIds = mgr.getAppWidgetIds(ComponentName(context, TimelineWidgetProvider::class.java))

        if (timelineIds.isNotEmpty()) {
            TimelineWidgetProvider.refreshData(context, mgr, timelineIds)
        }
    }

    companion object {
        const val ACTION_TICK = "com.saemi.goalswidget.ACTION_AUTO_REFRESH_TICK"
    }
}

