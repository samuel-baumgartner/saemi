package com.saemi.goalswidget

import java.util.concurrent.atomic.AtomicReference

object WidgetGoalsCache {
    private val lines = AtomicReference<List<WidgetGoalLine>>(emptyList())
    private val error = AtomicReference<String?>(null)
    private val responseDate = AtomicReference<String?>(null)

    fun snapshot(): List<WidgetGoalLine> = lines.get()

    fun responseDate(): String? = responseDate.get()

    fun setData(date: String, items: List<WidgetGoalLine>) {
        error.set(null)
        responseDate.set(date)
        lines.set(items)
    }

    fun clearPayload() {
        error.set(null)
        responseDate.set(null)
        lines.set(emptyList())
    }

    fun setError(message: String?) {
        error.set(message)
        if (message != null) {
            responseDate.set(null)
            lines.set(emptyList())
        }
    }

    fun getError(): String? = error.get()
}
