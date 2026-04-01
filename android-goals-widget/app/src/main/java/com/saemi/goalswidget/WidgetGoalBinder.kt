package com.saemi.goalswidget

import android.content.Context
import android.view.View
import android.widget.RemoteViews
import androidx.core.content.ContextCompat

object WidgetGoalBinder {
    /**
     * [summaryId] shows read-only progress text (e.g. "1h 4m / 2h"), not an editable target.
     */
    fun bindRow(
        context: Context,
        rv: RemoteViews,
        item: WidgetGoalLine,
        labelId: Int,
        summaryId: Int,
        progressRedId: Int,
        progressMetId: Int,
        progressOpenId: Int,
    ) {
        rv.setTextViewText(labelId, item.label)
        rv.setTextViewText(summaryId, item.progressLabel)
        rv.setProgressBar(progressRedId, 100, item.progressPercent, false)
        rv.setProgressBar(progressMetId, 100, item.progressPercent, false)
        rv.setProgressBar(progressOpenId, 100, item.progressPercent, false)

        val unproductive = item.id == "unproductive"
        val summaryColor = when {
            unproductive -> ContextCompat.getColor(
                context,
                R.color.widget_progress_label_unproductive,
            )
            else -> ContextCompat.getColor(context, R.color.widget_muted)
        }
        rv.setTextColor(summaryId, summaryColor)

        rv.setViewVisibility(
            progressRedId,
            if (unproductive) View.VISIBLE else View.GONE,
        )
        rv.setViewVisibility(
            progressMetId,
            if (!unproductive && item.met) View.VISIBLE else View.GONE,
        )
        rv.setViewVisibility(
            progressOpenId,
            if (!unproductive && !item.met) View.VISIBLE else View.GONE,
        )
    }
}
