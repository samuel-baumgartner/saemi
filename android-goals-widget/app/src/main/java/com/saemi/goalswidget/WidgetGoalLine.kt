package com.saemi.goalswidget

data class WidgetGoalLine(
    val id: String,
    val label: String,
    val targetMinutes: Int,
    val progressPercent: Int,
    val progressLabel: String,
    val met: Boolean,
)
