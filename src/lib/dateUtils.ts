/**
 * Get date string in local timezone (YYYY-MM-DD format)
 * This avoids timezone issues when converting to UTC with toISOString()
 */
export function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Calendar day in a fixed IANA timezone (YYYY-MM-DD). Used on the server because
 * Vercel runs in UTC; `getLocalDateString(new Date())` would be the wrong "today"
 * for users in e.g. Asia/Tokyo.
 */
export function formatDateYmdInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/**
 * Default calendar day for API routes when the client does not pass `?date=`.
 * Set `CALENDAR_TIMEZONE` (e.g. Asia/Tokyo). Defaults to Asia/Tokyo if unset.
 */
export function getServerCalendarDateString(date: Date = new Date()): string {
  const tz = process.env.CALENDAR_TIMEZONE?.trim() || 'Asia/Tokyo'
  return formatDateYmdInTimeZone(date, tz)
}

/**
 * Get today's date in local timezone
 */
export function getTodayString(): string {
  return getLocalDateString(new Date())
}







