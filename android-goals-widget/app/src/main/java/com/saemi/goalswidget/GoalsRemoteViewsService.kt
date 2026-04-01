package com.saemi.goalswidget

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService

class GoalsRemoteViewsService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory =
        GoalsRemoteViewsFactory(applicationContext, intent)
}

private class GoalsRemoteViewsFactory(
    private val context: Context,
    @Suppress("UNUSED_PARAMETER") intent: Intent,
) : RemoteViewsService.RemoteViewsFactory {

    private var items: List<WidgetGoalLine> = emptyList()

    override fun onCreate() {}

    override fun onDataSetChanged() {
        items = WidgetGoalsCache.snapshot()
    }

    override fun onDestroy() {}

    override fun getCount(): Int = items.size

    override fun getViewAt(position: Int): RemoteViews {
        val rv = RemoteViews(context.packageName, R.layout.widget_goal_row)
        if (position !in items.indices) return rv
        val item = items[position]
        WidgetGoalBinder.bindRow(
            context,
            rv,
            item,
            R.id.goal_label,
            R.id.goal_target,
            R.id.goal_progress_red,
            R.id.goal_progress_met,
            R.id.goal_progress_open,
            R.id.goal_progress_label,
        )
        return rv
    }

    override fun getLoadingView(): RemoteViews? = null

    override fun getViewTypeCount(): Int = 1

    override fun getItemId(position: Int): Long = position.toLong()

    override fun hasStableIds(): Boolean = true
}
