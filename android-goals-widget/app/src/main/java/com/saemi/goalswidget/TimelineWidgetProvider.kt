package com.saemi.goalswidget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.widget.RemoteViews

class TimelineWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        for (id in appWidgetIds) {
            bindWidget(context, appWidgetManager, id)
        }
        refreshData(context, appWidgetManager, appWidgetIds)
        AutoRefreshScheduler.schedule(context)
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        AutoRefreshScheduler.schedule(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        AutoRefreshScheduler.cancel(context)
    }

    companion object {
        fun bindWidget(context: Context, mgr: AppWidgetManager, appWidgetId: Int) {
            val rv = RemoteViews(context.packageName, R.layout.widget_timeline)

            val service = Intent(context, TimelineRemoteViewsService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
                data = Uri.parse(toUri(Intent.URI_INTENT_SCHEME))
            }
            rv.setRemoteAdapter(R.id.timeline_list, service)
            rv.setEmptyView(R.id.timeline_list, R.id.timeline_empty_view)

            val err = TimelineCache.getError()
            val data = TimelineCache.snapshot()
            val emptyText = when {
                !WidgetPrefs.isConfigured(context) ->
                    context.getString(R.string.widget_empty_configure)
                err != null && data.isEmpty() ->
                    context.getString(R.string.widget_error)
                data.isEmpty() ->
                    context.getString(R.string.widget_loading)
                else ->
                    context.getString(R.string.widget_empty_configure)
            }
            rv.setTextViewText(R.id.timeline_empty_view, emptyText)

            mgr.updateAppWidget(appWidgetId, rv)
        }

        fun refreshData(context: Context, mgr: AppWidgetManager, appWidgetIds: IntArray) {
            Thread {
                try {
                    PhoneSync.syncToday(context)
                } catch (_: Exception) {
                }

                val url = WidgetPrefs.getBaseUrl(context)
                val token = WidgetPrefs.getToken(context)
                if (url.isEmpty() || token.isEmpty()) {
                    TimelineCache.setData(emptyList())
                    TimelineCache.setError(null)
                } else {
                    TimelineApi.fetchTimeline(url, token).fold(
                        onSuccess = { TimelineCache.setData(it) },
                        onFailure = {
                            TimelineCache.setData(emptyList())
                            TimelineCache.setError(it.message)
                        },
                    )
                }

                Handler(Looper.getMainLooper()).post {
                    for (id in appWidgetIds) {
                        mgr.notifyAppWidgetViewDataChanged(id, R.id.timeline_list)
                        bindWidget(context, mgr, id)
                    }
                }
            }.start()
        }

        fun updateAllWidgets(context: Context) {
            val mgr = AppWidgetManager.getInstance(context)
            val ids = mgr.getAppWidgetIds(
                ComponentName(context, TimelineWidgetProvider::class.java),
            )
            if (ids.isEmpty()) return
            refreshData(context, mgr, ids)
        }
    }
}

