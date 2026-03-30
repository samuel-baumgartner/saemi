package com.saemi.goalswidget

data class TimelineItem(
    val activity: String,
    val startIso: String,
    val endIso: String,
    val minutes: Int,
)

