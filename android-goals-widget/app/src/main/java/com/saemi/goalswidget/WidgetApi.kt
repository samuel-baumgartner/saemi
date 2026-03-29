package com.saemi.goalswidget

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

object WidgetApi {
    private val dateFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    fun fetchGoals(baseUrl: String, token: String): Result<List<WidgetGoalLine>> {
        val date = dateFmt.format(Date())
        val u = URL(
            "${baseUrl.trim().trimEnd('/')}/api/widget/daily-goals?date=$date",
        )
        return try {
            val conn = (u.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                setRequestProperty("Authorization", "Bearer $token")
                setRequestProperty("Accept", "application/json")
                connectTimeout = 15_000
                readTimeout = 20_000
            }
            val code = conn.responseCode
            val body = (if (code in 200..299) conn.inputStream else conn.errorStream)
                .bufferedReader().use { it.readText() }
            conn.disconnect()
            if (code !in 200..299) {
                return Result.failure(Exception("HTTP $code"))
            }
            val json = JSONObject(body)
            if (json.has("error") && json.optString("error").isNotEmpty()) {
                return Result.failure(Exception(json.optString("error")))
            }
            val arr = json.getJSONArray("items")
            val out = ArrayList<WidgetGoalLine>(arr.length())
            for (i in 0 until arr.length()) {
                val o = arr.getJSONObject(i)
                out.add(
                    WidgetGoalLine(
                        label = o.getString("label"),
                        targetMinutes = o.getInt("targetMinutes"),
                        progressPercent = o.getInt("progressPercent").coerceIn(0, 100),
                        progressLabel = o.getString("progressLabel"),
                    ),
                )
            }
            Result.success(out)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
