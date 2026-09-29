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

class UniWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        for (id in appWidgetIds) bind(context, appWidgetManager, id)
        refresh(context, force = false)
        AutoRefreshScheduler.schedule(context)
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        AutoRefreshScheduler.schedule(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        AutoRefreshScheduler.cancelIfNoWidgets(context)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_REFRESH) refresh(context, force = true)
    }

    companion object {
        const val ACTION_REFRESH = "com.saemi.goalswidget.ACTION_UNI_REFRESH"
        private const val MIN_REFRESH_INTERVAL_MS = 10 * 60 * 1000L

        fun widgetIds(context: Context): IntArray =
            AppWidgetManager.getInstance(context)
                .getAppWidgetIds(ComponentName(context, UniWidgetProvider::class.java))

        @Suppress("DEPRECATION")
        fun bind(context: Context, mgr: AppWidgetManager, appWidgetId: Int) {
            val rv = RemoteViews(context.packageName, R.layout.widget_uni)

            val adapter = Intent(context, UniRemoteViewsService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
                data = Uri.parse(toUri(Intent.URI_INTENT_SCHEME))
            }
            rv.setRemoteAdapter(R.id.uni_list, adapter)
            rv.setEmptyView(R.id.uni_list, R.id.uni_empty)

            val rowTemplate = PendingIntent.getActivity(
                context,
                1,
                Intent(context, UniOpenActivity::class.java),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE,
            )
            rv.setPendingIntentTemplate(R.id.uni_list, rowTemplate)

            val openOverview = PendingIntent.getActivity(
                context,
                2,
                Intent(context, UniOpenActivity::class.java),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
            )
            rv.setOnClickPendingIntent(R.id.uni_title, openOverview)

            val refreshPi = PendingIntent.getBroadcast(
                context,
                3,
                Intent(context, UniWidgetProvider::class.java).setAction(ACTION_REFRESH),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
            )
            rv.setOnClickPendingIntent(R.id.uni_refresh, refreshPi)

            val configured = WidgetPrefs.isConfigured(context)
            val entries = UniCache.entries(context)
            val now = System.currentTimeMillis()
            val overdue = entries.count { it.dueAtMs < now }
            val week = entries.count { it.dueAtMs in now..(now + 7 * 24 * 3600_000L) }
            rv.setTextViewText(
                R.id.uni_subtitle,
                when {
                    !configured -> ""
                    overdue > 0 -> context.getString(R.string.uni_subtitle_overdue, overdue, week)
                    else -> context.getString(R.string.uni_subtitle, week)
                },
            )
            rv.setTextViewText(
                R.id.uni_empty,
                when {
                    !configured -> context.getString(R.string.widget_empty_configure)
                    UniCache.error(context) != null && !UniCache.hasData(context) ->
                        context.getString(R.string.uni_error)
                    !UniCache.hasData(context) -> context.getString(R.string.widget_loading)
                    else -> context.getString(R.string.uni_empty)
                },
            )
            mgr.updateAppWidget(appWidgetId, rv)
        }

        fun updateAll(context: Context) {
            val mgr = AppWidgetManager.getInstance(context)
            val ids = widgetIds(context)
            for (id in ids) bind(context, mgr, id)
            if (ids.isNotEmpty()) mgr.notifyAppWidgetViewDataChanged(ids, R.id.uni_list)
        }

        /** Fetches deadlines, updates widgets and re-plans reminder notifications. */
        fun refresh(context: Context, force: Boolean) {
            val app = context.applicationContext
            if (!WidgetPrefs.isConfigured(app)) {
                updateAll(app)
                return
            }
            if (!force && System.currentTimeMillis() - UniCache.fetchedAt(app) < MIN_REFRESH_INTERVAL_MS) {
                // Still re-render so "in 3h" labels don't go stale between fetches.
                updateAll(app)
                return
            }
            Thread {
                UniApi.fetchRaw(WidgetPrefs.getBaseUrl(app), WidgetPrefs.getToken(app)).fold(
                    onSuccess = { UniCache.save(app, it) },
                    onFailure = { UniCache.setError(app, it.message ?: "error") },
                )
                try {
                    UniReminders.reschedule(app, UniCache.entries(app))
                } catch (_: Exception) {
                }
                Handler(Looper.getMainLooper()).post { updateAll(app) }
            }.start()
        }
    }
}
