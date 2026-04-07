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

/** Default IANA zone for stored session `date` and widgets (must match server). */
const DEFAULT_CALENDAR_TZ = 'Asia/Tokyo'

function calendarTimeZone(): string {
  if (typeof process === 'undefined') return DEFAULT_CALENDAR_TZ
  const p = process.env
  return (
    p.CALENDAR_TIMEZONE?.trim() ||
    p.NEXT_PUBLIC_CALENDAR_TIMEZONE?.trim() ||
    DEFAULT_CALENDAR_TZ
  )
}

/**
 * Calendar YYYY-MM-DD for an instant in the same timezone as server/widget/phone sync.
 * Set `NEXT_PUBLIC_CALENDAR_TIMEZONE` on the client to match `CALENDAR_TIMEZONE` on the server.
 */
export function formatDateYmdInCalendarTz(date: Date): string {
  return formatDateYmdInTimeZone(date, calendarTimeZone())
}

/**
 * Default calendar day for API routes when the client does not pass `?date=`.
 * Set `CALENDAR_TIMEZONE` (e.g. Asia/Tokyo). Defaults to Asia/Tokyo if unset.
 */
export function getServerCalendarDateString(date: Date = new Date()): string {
  return formatDateYmdInCalendarTz(date)
}

/**
 * "Today" for goals, timeline default, and new sessions — aligns web UI with phone widgets
 * and `/api/widget/*` (which use {@link getServerCalendarDateString}).
 */
export function getCalendarTodayString(): string {
  return formatDateYmdInCalendarTz(new Date())
}

/** Previous calendar day in {@link calendarTimeZone} (for labels like "Yesterday"). */
export function getCalendarYesterdayString(): string {
  const tz = calendarTimeZone()
  const y = new Date(Date.now() - 24 * 60 * 60 * 1000)
  return formatDateYmdInTimeZone(y, tz)
}

/**
 * Get today's date in local timezone
 */
export function getTodayString(): string {
  return getLocalDateString(new Date())
}







