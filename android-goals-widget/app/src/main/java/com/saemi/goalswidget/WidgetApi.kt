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

    data class GoalsPayload(
        val date: String,
        val items: List<WidgetGoalLine>,
    )

    fun fetchGoals(baseUrl: String, token: String): Result<GoalsPayload> {
        val date = dateFmt.format(Date())
        var url = URL(
            "${baseUrl.trim().trimEnd('/')}/api/widget/daily-goals?date=$date",
        )
        return try {
            var redirects = 0
            while (redirects < 8) {
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    instanceFollowRedirects = false
                    requestMethod = "GET"
                    setRequestProperty("Authorization", "Bearer $token")
                    setRequestProperty("Accept", "application/json")
                    connectTimeout = 15_000
                    readTimeout = 20_000
                }
                val code = conn.responseCode
                if (code in 300..399) {
                    val loc = conn.getHeaderField("Location")
                    conn.disconnect()
                    if (loc.isNullOrBlank()) {
                        return Result.failure(Exception("HTTP $code without Location"))
                    }
                    url = URL(url, loc)
                    redirects++
                    continue
                }
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
                val responseDate = json.optString("date").ifEmpty { date }
                val arr = json.getJSONArray("items")
                val out = ArrayList<WidgetGoalLine>(arr.length())
                for (i in 0 until arr.length()) {
                    val o = arr.getJSONObject(i)
                    val id = o.optString("id", "")
                    var label = o.getString("label")
                    if (id == "cursor" || (id == "startup" && label.trim().equals("Cursor", ignoreCase = true))) {
                        label = "StartUp"
                    }
                    out.add(
                        WidgetGoalLine(
                            id = id,
                            label = label,
                            targetMinutes = o.getInt("targetMinutes"),
                            progressPercent = o.getInt("progressPercent").coerceIn(0, 100),
                            progressLabel = o.getString("progressLabel"),
                            met = o.optBoolean("met", false),
                        ),
                    )
                }
                return Result.success(GoalsPayload(responseDate, out))
            }
            Result.failure(Exception("Too many redirects"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
