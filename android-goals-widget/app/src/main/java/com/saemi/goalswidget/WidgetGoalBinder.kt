package com.saemi.goalswidget

import android.content.Context
import android.view.View
import android.widget.RemoteViews
import androidx.core.content.ContextCompat

object WidgetGoalBinder {
    fun bindRow(
        context: Context,
        rv: RemoteViews,
        item: WidgetGoalLine,
        labelId: Int,
        targetId: Int,
        progressRedId: Int,
        progressMetId: Int,
        progressOpenId: Int,
        progressLabelId: Int,
    ) {
        rv.setTextViewText(labelId, item.label)
        rv.setTextViewText(targetId, item.targetMinutes.toString())
        rv.setProgressBar(progressRedId, 100, item.progressPercent, false)
        rv.setProgressBar(progressMetId, 100, item.progressPercent, false)
        rv.setProgressBar(progressOpenId, 100, item.progressPercent, false)
        rv.setTextViewText(progressLabelId, item.progressLabel)

        val unproductive = item.id == "unproductive"
        val labelColor = when {
            unproductive -> ContextCompat.getColor(
                context,
                R.color.widget_progress_label_unproductive,
            )
            else -> ContextCompat.getColor(context, R.color.widget_muted)
        }
        rv.setTextColor(progressLabelId, labelColor)

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
