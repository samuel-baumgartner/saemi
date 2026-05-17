package com.saemi.goalswidget

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.SystemClock

object AutoRefreshScheduler {
    /** Poll for goal label/target changes (batched for battery + fewer server requests). */
    private const val INTERVAL_MS = 180 * 1000L

    private fun pi(context: Context): PendingIntent =
        PendingIntent.getBroadcast(
            context,
            0,
            Intent(context, AutoRefreshReceiver::class.java).setAction(AutoRefreshReceiver.ACTION_TICK),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )

    fun schedule(context: Context) {
        val am = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val startAt = SystemClock.elapsedRealtime() + 15_000L
        // Best-effort; Android may batch for battery.
        am.setInexactRepeating(
            AlarmManager.ELAPSED_REALTIME_WAKEUP,
            startAt,
            INTERVAL_MS,
            pi(context),
        )
    }

    fun cancel(context: Context) {
        val am = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        am.cancel(pi(context))
    }
}

