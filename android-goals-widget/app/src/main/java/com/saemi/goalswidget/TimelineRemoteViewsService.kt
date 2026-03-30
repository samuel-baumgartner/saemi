package com.saemi.goalswidget

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

class TimelineRemoteViewsService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory =
        TimelineRemoteViewsFactory(applicationContext)
}

private class TimelineRemoteViewsFactory(
    private val context: Context,
) : RemoteViewsService.RemoteViewsFactory {

    private var items: List<TimelineItem> = emptyList()

    private val isoFmt = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.US).apply {
        timeZone = TimeZone.getTimeZone("UTC")
    }

    override fun onCreate() {}

    override fun onDataSetChanged() {
        items = TimelineCache.snapshot()
    }

    override fun onDestroy() {}

    override fun getCount(): Int = items.size

    private fun parseIso(s: String): Date? =
        try {
            isoFmt.parse(s)
        } catch (_: Exception) {
            null
        }

    override fun getViewAt(position: Int): RemoteViews {
        val rv = RemoteViews(context.packageName, R.layout.widget_timeline_row)
        if (position !in items.indices) return rv
        val item = items[position]
        rv.setTextViewText(R.id.timeline_activity, item.activity)
        rv.setTextViewText(R.id.timeline_minutes, "${item.minutes}m")
        val sd = parseIso(item.startIso)
        val ed = parseIso(item.endIso)
        if (sd != null && ed != null) {
            val localFmt = SimpleDateFormat("HH:mm", Locale.US).apply {
                timeZone = TimeZone.getDefault()
            }
            rv.setTextViewText(
                R.id.timeline_range,
                "${localFmt.format(sd)} – ${localFmt.format(ed)}",
            )
        } else {
            rv.setTextViewText(R.id.timeline_range, "")
        }
        return rv
    }

    override fun getLoadingView(): RemoteViews? = null

    override fun getViewTypeCount(): Int = 1

    override fun getItemId(position: Int): Long = position.toLong()

    override fun hasStableIds(): Boolean = true
}

