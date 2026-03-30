package com.saemi.goalswidget

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone

object TimelineApi {
    private val dateFmt = SimpleDateFormat("yyyy-MM-dd", Locale.US).apply {
        timeZone = TimeZone.getDefault()
    }

    fun fetchTimeline(baseUrl: String, token: String, limit: Int = 40): Result<List<TimelineItem>> {
        val date = dateFmt.format(Date())
        var url = URL(
            "${baseUrl.trim().trimEnd('/')}/api/widget/phone-timeline?date=$date&limit=$limit",
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
                    if (loc.isNullOrBlank()) return Result.failure(Exception("HTTP $code without Location"))
                    url = URL(url, loc)
                    redirects++
                    continue
                }
                val body = (if (code in 200..299) conn.inputStream else conn.errorStream)
                    .bufferedReader().use { it.readText() }
                conn.disconnect()
                if (code !in 200..299) return Result.failure(Exception("HTTP $code"))
                val json = JSONObject(body)
                if (json.has("error") && json.optString("error").isNotEmpty()) {
                    return Result.failure(Exception(json.optString("error")))
                }
                val arr = json.getJSONArray("items")
                val out = ArrayList<TimelineItem>(arr.length())
                for (i in 0 until arr.length()) {
                    val o = arr.getJSONObject(i)
                    out.add(
                        TimelineItem(
                            activity = o.getString("activity"),
                            startIso = o.getString("startTime"),
                            endIso = o.getString("endTime"),
                            minutes = o.getInt("minutes"),
                        ),
                    )
                }
                return Result.success(out)
            }
            Result.failure(Exception("Too many redirects"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

