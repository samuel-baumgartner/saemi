package com.saemi.goalswidget

import android.Manifest
import android.app.AlarmManager
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build

/** Local notifications 24h and 3h before each open Uni deadline. */
object UniReminders {
    const val CHANNEL_ID = "uni_deadlines"

    const val EXTRA_ID = "id"
    const val EXTRA_COURSE_ID = "course_id"
    const val EXTRA_COURSE = "course"
    const val EXTRA_LABEL = "label"
    const val EXTRA_DUE = "due"

    private val OFFSETS_MS = longArrayOf(24 * 3600_000L, 3 * 3600_000L)
    private const val HORIZON_MS = 8 * 24 * 3600_000L

    private const val PREFS = "saemi_uni_alarms"
    private const val KEY_CODES = "codes"

    fun ensureChannel(context: Context) {
        val nm = context.getSystemService(NotificationManager::class.java)
        if (nm.getNotificationChannel(CHANNEL_ID) != null) return
        nm.createNotificationChannel(
            NotificationChannel(
                CHANNEL_ID,
                context.getString(R.string.uni_channel_name),
                NotificationManager.IMPORTANCE_HIGH,
            ).apply { description = context.getString(R.string.uni_channel_description) },
        )
    }

    private fun alarmIntent(context: Context): Intent =
        Intent(context, UniReminderReceiver::class.java)

    fun reschedule(context: Context, entries: List<UniEntry>) {
        val app = context.applicationContext
        val am = app.getSystemService(AlarmManager::class.java)
        val prefs = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

        for (code in prefs.getStringSet(KEY_CODES, emptySet()).orEmpty()) {
            val pi = PendingIntent.getBroadcast(
                app,
                code.toIntOrNull() ?: continue,
                alarmIntent(app),
                PendingIntent.FLAG_NO_CREATE or PendingIntent.FLAG_IMMUTABLE,
            ) ?: continue
            am.cancel(pi)
            pi.cancel()
        }

        val now = System.currentTimeMillis()
        val codes = HashSet<String>()
        for (e in entries) {
            if (e.dueAtMs <= now || e.dueAtMs - now > HORIZON_MS) continue
            for (offset in OFFSETS_MS) {
                val at = e.dueAtMs - offset
                if (at <= now + 30_000L) continue
                val code = "${e.id}:$offset".hashCode()
                val intent = alarmIntent(app)
                    .putExtra(EXTRA_ID, e.id)
                    .putExtra(EXTRA_COURSE_ID, e.courseId)
                    .putExtra(EXTRA_COURSE, e.course)
                    .putExtra(EXTRA_LABEL, e.label)
                    .putExtra(EXTRA_DUE, e.dueAtMs)
                val pi = PendingIntent.getBroadcast(
                    app,
                    code,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
                )
                am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi)
                codes.add(code.toString())
            }
        }
        prefs.edit().putStringSet(KEY_CODES, codes).apply()
    }

    fun canNotify(context: Context): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU ||
            context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) ==
            PackageManager.PERMISSION_GRANTED

    fun notify(
        context: Context,
        id: String,
        courseId: String,
        course: String,
        label: String,
        dueAtMs: Long,
    ) {
        if (!canNotify(context)) return
        ensureChannel(context)
        val now = System.currentTimeMillis()
        val open = PendingIntent.getActivity(
            context,
            id.hashCode(),
            Intent(Intent.ACTION_VIEW, Uri.parse(UniCache.courseUrl(context, courseId))),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val n = Notification.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_stat_uni)
            .setContentTitle("$course · $label")
            .setContentText(
                context.getString(
                    R.string.uni_notification_text,
                    UniCache.relative(dueAtMs, now),
                    UniCache.formatDue(dueAtMs),
                ),
            )
            .setWhen(dueAtMs)
            .setShowWhen(true)
            .setCategory(Notification.CATEGORY_REMINDER)
            .setContentIntent(open)
            .setAutoCancel(true)
            .build()
        context.getSystemService(NotificationManager::class.java).notify(id.hashCode(), n)
    }
}
