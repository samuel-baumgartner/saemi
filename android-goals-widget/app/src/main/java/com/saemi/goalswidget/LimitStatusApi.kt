package com.saemi.goalswidget

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

data class LimitStatus(
    val date: String,
    val unproductiveMinutes: Int,
    val limitMinutes: Int,
    val isOverLimit: Boolean,
)

object LimitStatusApi {
    private val dateFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    fun fetchStatus(baseUrl: String, token: String): Result<LimitStatus> {
        val date = dateFmt.format(Date())
        var url = URL("${baseUrl.trim().trimEnd('/')}/api/widget/limits-status?date=$date")
        return try {
            var redirects = 0
            while (redirects < 8) {
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    instanceFollowRedirects = false
                    requestMethod = "GET"
                    setRequestProperty("Authorization", "Bearer $token")
                    setRequestProperty("Accept", "application/json")
                    connectTimeout = 10_000
                    readTimeout = 15_000
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
                if (code !in 200..299) return Result.failure(Exception("HTTP $code: $body"))
                val json = JSONObject(body)
                if (json.has("error") && json.optString("error").isNotEmpty()) {
                    return Result.failure(Exception(json.optString("error")))
                }
                return Result.success(
                    LimitStatus(
                        date = json.optString("date", date),
                        unproductiveMinutes = json.optInt("unproductiveMinutes", 0),
                        limitMinutes = json.optInt("limitMinutes", 120),
                        isOverLimit = json.optBoolean("isOverLimit", false),
                    ),
                )
            }
            Result.failure(Exception("Too many redirects"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

