package com.saemi.goalswidget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.View
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
        private val slotIds = intArrayOf(
            R.id.goal_slot_1,
            R.id.goal_slot_2,
            R.id.goal_slot_3,
            R.id.goal_slot_4,
            R.id.goal_slot_5,
        )

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
                try {
                    PhoneSync.syncToday(context)
                } catch (_: Exception) {
                }

                LimitStatusCache.prefetch(context)

                val url = WidgetPrefs.getBaseUrl(context)
                val token = WidgetPrefs.getToken(context)
                if (url.isEmpty() || token.isEmpty()) {
                    WidgetGoalsCache.clearPayload()
                } else {
                    WidgetApi.fetchGoals(url, token).fold(
                        onSuccess = { WidgetGoalsCache.setData(it.date, it.items) },
                        onFailure = {
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

                        for (i in slotIds.indices) {
                            rv.setViewVisibility(
                                slotIds[i],
                                if (!showEmpty && i < data.size) View.VISIBLE else View.GONE,
                            )
                        }

                        rv.setViewVisibility(
                            R.id.empty_view,
                            if (showEmpty) View.VISIBLE else View.GONE,
                        )

                        val emptyText = when {
                            !configured -> context.getString(R.string.widget_empty_configure)
                            err != null -> context.getString(R.string.widget_error)
                            else -> context.getString(R.string.widget_loading)
                        }
                        rv.setTextViewText(R.id.empty_view, emptyText)

                        fun bindSlot(
                            idx: Int,
                            labelId: Int,
                            summaryId: Int,
                            progressRedId: Int,
                            progressMetId: Int,
                            progressOpenId: Int,
                        ) {
                            val item = data.getOrNull(idx) ?: return
                            WidgetGoalBinder.bindRow(
                                context,
                                rv,
                                item,
                                labelId,
                                summaryId,
                                progressRedId,
                                progressMetId,
                                progressOpenId,
                            )
                        }

                        bindSlot(
                            0,
                            R.id.goal_label_1,
                            R.id.goal_target_1,
                            R.id.goal_progress_1_red,
                            R.id.goal_progress_1_met,
                            R.id.goal_progress_1_open,
                        )
                        bindSlot(
                            1,
                            R.id.goal_label_2,
                            R.id.goal_target_2,
                            R.id.goal_progress_2_red,
                            R.id.goal_progress_2_met,
                            R.id.goal_progress_2_open,
                        )
                        bindSlot(
                            2,
                            R.id.goal_label_3,
                            R.id.goal_target_3,
                            R.id.goal_progress_3_red,
                            R.id.goal_progress_3_met,
                            R.id.goal_progress_3_open,
                        )
                        bindSlot(
                            3,
                            R.id.goal_label_4,
                            R.id.goal_target_4,
                            R.id.goal_progress_4_red,
                            R.id.goal_progress_4_met,
                            R.id.goal_progress_4_open,
                        )
                        bindSlot(
                            4,
                            R.id.goal_label_5,
                            R.id.goal_target_5,
                            R.id.goal_progress_5_red,
                            R.id.goal_progress_5_met,
                            R.id.goal_progress_5_open,
                        )

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
