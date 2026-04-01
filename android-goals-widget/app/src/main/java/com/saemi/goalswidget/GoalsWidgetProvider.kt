package com.saemi.goalswidget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.widget.RemoteViews

class GoalsWidgetProvider : AppWidgetProvider() {

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
            val rv = RemoteViews(context.packageName, R.layout.widget_goals_static)
            mgr.updateAppWidget(appWidgetId, rv)
        }

        fun refreshData(
            context: Context,
            mgr: AppWidgetManager,
            appWidgetIds: IntArray,
        ) {
            Thread {
                // Opportunistically sync phone usage before fetching widget data.
                // (Requires Usage Access; no-op if not granted.)
                try {
                    PhoneSync.syncToday(context)
                } catch (_: Exception) {
                }

                LimitStatusCache.prefetch(context)

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
                        val rv = RemoteViews(context.packageName, R.layout.widget_goals_static)
                        val configured = WidgetPrefs.isConfigured(context)
                        val err = WidgetGoalsCache.getError()
                        val data = WidgetGoalsCache.snapshot()

                        val showEmpty = !configured || data.isEmpty()
                        rv.setViewVisibility(R.id.empty_view, if (showEmpty) android.view.View.VISIBLE else android.view.View.GONE)
                        rv.setViewVisibility(R.id.goal_slot_1, if (showEmpty) android.view.View.GONE else android.view.View.VISIBLE)
                        rv.setViewVisibility(R.id.goal_slot_2, if (showEmpty) android.view.View.GONE else android.view.View.VISIBLE)
                        rv.setViewVisibility(R.id.goal_slot_3, if (showEmpty) android.view.View.GONE else android.view.View.VISIBLE)
                        rv.setViewVisibility(R.id.goal_slot_4, if (showEmpty) android.view.View.GONE else android.view.View.VISIBLE)

                        val emptyText = when {
                            !configured -> context.getString(R.string.widget_empty_configure)
                            err != null -> context.getString(R.string.widget_error)
                            else -> context.getString(R.string.widget_loading)
                        }
                        rv.setTextViewText(R.id.empty_view, emptyText)

                        fun bindSlot(
                            idx: Int,
                            labelId: Int,
                            targetId: Int,
                            progressId: Int,
                            progressLabelId: Int,
                        ) {
                            val item = data.getOrNull(idx) ?: return
                            rv.setTextViewText(labelId, item.label)
                            rv.setTextViewText(targetId, item.targetMinutes.toString())
                            rv.setProgressBar(progressId, 100, item.progressPercent, false)
                            rv.setTextViewText(progressLabelId, item.progressLabel)
                        }

                        bindSlot(0, R.id.goal_label_1, R.id.goal_target_1, R.id.goal_progress_1, R.id.goal_progress_label_1)
                        bindSlot(1, R.id.goal_label_2, R.id.goal_target_2, R.id.goal_progress_2, R.id.goal_progress_label_2)
                        bindSlot(2, R.id.goal_label_3, R.id.goal_target_3, R.id.goal_progress_3, R.id.goal_progress_label_3)
                        bindSlot(3, R.id.goal_label_4, R.id.goal_target_4, R.id.goal_progress_4, R.id.goal_progress_label_4)

                        mgr.updateAppWidget(id, rv)
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
