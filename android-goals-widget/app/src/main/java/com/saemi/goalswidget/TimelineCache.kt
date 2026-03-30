package com.saemi.goalswidget

import java.util.concurrent.atomic.AtomicReference

object TimelineCache {
    private val items = AtomicReference<List<TimelineItem>>(emptyList())
    private val error = AtomicReference<String?>(null)

    fun snapshot(): List<TimelineItem> = items.get()

    fun setData(xs: List<TimelineItem>) {
        error.set(null)
        items.set(xs)
    }

    fun setError(message: String?) {
        error.set(message)
    }

    fun getError(): String? = error.get()
}

