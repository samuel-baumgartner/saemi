package com.saemi.goalswidget

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

data class UniEntry(
    val id: String,
    val courseId: String,
    val course: String,
    val color: String,
    val kind: String,
    val week: Int,
    val label: String,
    val dueAtMs: Long,
)

object UniApi {
    /** Returns the raw JSON body of `/api/widget/uni` (parse with [parse]). */
    fun fetchRaw(baseUrl: String, token: String): Result<String> {
        var url = URL("${baseUrl.trim().trimEnd('/')}/api/widget/uni")
        return try {
            var redirects = 0
            while (redirects < 8) {
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    instanceFollowRedirects = false
                    requestMethod = "GET"
                    setRequestProperty("Authorization", "Bearer $token")
                    setRequestProperty("Accept", "application/json")
                    connectTimeout = 6_000
                    readTimeout = 8_000
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
                if (code !in 200..299) return Result.failure(Exception("HTTP $code"))
                parse(body)
                return Result.success(body)
            }
            Result.failure(Exception("Too many redirects"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    fun parse(body: String): List<UniEntry> {
        val arr = JSONObject(body).getJSONArray("items")
        val out = ArrayList<UniEntry>(arr.length())
        for (i in 0 until arr.length()) {
            val o = arr.getJSONObject(i)
            val due = o.optLong("dueAtMs", 0L)
            if (due <= 0L) continue
            out.add(
                UniEntry(
                    id = o.getString("id"),
                    courseId = o.optString("courseId"),
                    course = o.optString("course"),
                    color = o.optString("color", "#6366f1"),
                    kind = o.optString("kind", "exercise"),
                    week = o.optInt("week"),
                    label = o.optString("label"),
                    dueAtMs = due,
                ),
            )
        }
        return out.sortedBy { it.dueAtMs }
    }
}
