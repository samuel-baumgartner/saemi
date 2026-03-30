package com.saemi.goalswidget

import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

object PhoneSyncApi {
    fun postPhoneSessions(baseUrl: String, token: String, payload: JSONObject): Result<Unit> {
        var url = URL("${baseUrl.trim().trimEnd('/')}/api/widget/phone-sessions/sync")
        return try {
            var redirects = 0
            while (redirects < 8) {
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    instanceFollowRedirects = false
                    requestMethod = "POST"
                    doOutput = true
                    setRequestProperty("Authorization", "Bearer $token")
                    setRequestProperty("Accept", "application/json")
                    setRequestProperty("Content-Type", "application/json")
                    connectTimeout = 15_000
                    readTimeout = 25_000
                }
                val bytes = payload.toString().toByteArray(Charsets.UTF_8)
                conn.outputStream.use { it.write(bytes) }
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
                if (code !in 200..299) return Result.failure(Exception("HTTP $code: $body"))
                val json = JSONObject(body)
                if (json.has("error") && json.optString("error").isNotEmpty()) {
                    return Result.failure(Exception(json.optString("error")))
                }
                return Result.success(Unit)
            }
            Result.failure(Exception("Too many redirects"))
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

