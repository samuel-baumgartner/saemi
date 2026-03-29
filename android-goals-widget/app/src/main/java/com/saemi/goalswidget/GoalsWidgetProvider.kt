package com.saemi.goalswidget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.widget.RemoteViews

class GoalsWidgetProvider : AppWidgetProvider() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == ACTION_REFRESH) {
            val mgr = AppWidgetManager.getInstance(context)
            val ids = mgr.getAppWidgetIds(
                ComponentName(context, GoalsWidgetProvider::class.java),
            )
            refreshData(context, mgr, ids)
            return
        }
        super.onReceive(context, intent)
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        for (id in appWidgetIds) {
            bindWidget(context, appWidgetManager, id)
        }
        refreshData(context, appWidgetManager, appWidgetIds)
    }

    companion object {
        const val ACTION_REFRESH = "com.saemi.goalswidget.ACTION_REFRESH"

        fun bindWidget(context: Context, mgr: AppWidgetManager, appWidgetId: Int) {
            val rv = RemoteViews(context.packageName, R.layout.widget_goals)

            val service = Intent(context, GoalsRemoteViewsService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
                data = Uri.parse(toUri(Intent.URI_INTENT_SCHEME))
            }
            rv.setRemoteAdapter(R.id.goals_list, service)
            rv.setEmptyView(R.id.goals_list, R.id.empty_view)

            if (!WidgetPrefs.isConfigured(context)) {
                rv.setTextViewText(
                    R.id.empty_view,
                    context.getString(R.string.widget_empty_configure),
                )
            } else {
                val err = WidgetGoalsCache.getError()
                val data = WidgetGoalsCache.snapshot()
                val emptyText = when {
                    err != null && data.isEmpty() ->
                        context.getString(R.string.widget_error)
                    data.isEmpty() ->
                        context.getString(R.string.widget_loading)
                    else ->
                        context.getString(R.string.widget_empty_configure)
                }
                rv.setTextViewText(R.id.empty_view, emptyText)
            }

            val refreshPi = PendingIntent.getBroadcast(
                context,
                appWidgetId,
                Intent(context, GoalsWidgetProvider::class.java).setAction(ACTION_REFRESH),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
            )
            rv.setOnClickPendingIntent(R.id.btn_refresh, refreshPi)

            mgr.updateAppWidget(appWidgetId, rv)
        }

        fun refreshData(
            context: Context,
            mgr: AppWidgetManager,
            appWidgetIds: IntArray,
        ) {
            Thread {
                val url = WidgetPrefs.getBaseUrl(context)
                val token = WidgetPrefs.getToken(context)
                if (url.isEmpty() || token.isEmpty()) {
                    WidgetGoalsCache.setData(emptyList())
                    WidgetGoalsCache.setError(null)
                } else {
                    WidgetApi.fetchGoals(url, token).fold(
                        onSuccess = { WidgetGoalsCache.setData(it) },
                        onFailure = {
                            WidgetGoalsCache.setData(emptyList())
                            WidgetGoalsCache.setError(
                                it.message ?: context.getString(R.string.widget_error),
                            )
                        },
                    )
                }
                Handler(Looper.getMainLooper()).post {
                    for (id in appWidgetIds) {
                        mgr.notifyAppWidgetViewDataChanged(id, R.id.goals_list)
                        bindWidget(context, mgr, id)
                    }
                }
            }.start()
        }

        fun updateAllWidgets(context: Context) {
            val mgr = AppWidgetManager.getInstance(context)
            val ids = mgr.getAppWidgetIds(
                ComponentName(context, GoalsWidgetProvider::class.java),
            )
            if (ids.isEmpty()) return
            refreshData(context, mgr, ids)
        }
    }
}
