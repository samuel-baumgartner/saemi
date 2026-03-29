package com.saemi.goalswidget

import java.util.concurrent.atomic.AtomicReference

object WidgetGoalsCache {
    private val lines = AtomicReference<List<WidgetGoalLine>>(emptyList())
    private val error = AtomicReference<String?>(null)

    fun snapshot(): List<WidgetGoalLine> = lines.get()

    fun setData(items: List<WidgetGoalLine>) {
        error.set(null)
        lines.set(items)
    }

    fun setError(message: String?) {
        error.set(message)
    }

    fun getError(): String? = error.get()
}
