package com.saemi.goalswidget

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.widget.RemoteViews
import android.widget.RemoteViewsService

class UniRemoteViewsService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory =
        UniRemoteViewsFactory(applicationContext)
}

private class UniRemoteViewsFactory(
    private val context: Context,
) : RemoteViewsService.RemoteViewsFactory {

    private var items: List<UniEntry> = emptyList()

    override fun onCreate() {}

    override fun onDataSetChanged() {
        items = UniCache.entries(context)
    }

    override fun onDestroy() {}

    override fun getCount(): Int = items.size

    override fun getViewAt(position: Int): RemoteViews {
        val rv = RemoteViews(context.packageName, R.layout.widget_uni_row)
        val item = items.getOrNull(position) ?: return rv
        val now = System.currentTimeMillis()

        rv.setInt(R.id.uni_row_color, "setBackgroundColor", UniCache.parseColor(item.color))
        rv.setTextViewText(R.id.uni_row_title, item.course)
        rv.setTextViewText(
            R.id.uni_row_sub,
            "${item.label} · ${UniCache.formatDue(item.dueAtMs)}",
        )
        rv.setTextViewText(R.id.uni_row_due, UniCache.relative(item.dueAtMs, now))
        val dueColor = when {
            item.dueAtMs < now -> Color.parseColor("#F87171")
            item.dueAtMs - now < 48 * 3600_000L -> Color.parseColor("#FBBF24")
            else -> Color.parseColor("#B3FFFFFF")
        }
        rv.setTextColor(R.id.uni_row_due, dueColor)

        rv.setOnClickFillInIntent(
            R.id.uni_row,
            Intent().putExtra(UniOpenActivity.EXTRA_URL, UniCache.courseUrl(context, item.courseId)),
        )
        return rv
    }

    override fun getLoadingView(): RemoteViews? = null

    override fun getViewTypeCount(): Int = 1

    override fun getItemId(position: Int): Long =
        items.getOrNull(position)?.id?.hashCode()?.toLong() ?: position.toLong()

    override fun hasStableIds(): Boolean = true
}
