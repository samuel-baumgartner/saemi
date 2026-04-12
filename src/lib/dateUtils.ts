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

const WEEKDAY_SHORT_TO_MON_OFFSET: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
}

/**
 * An instant that lies on the given calendar day in {@link calendarTimeZone} (for week math).
 */
export function resolveInstantOnCalendarYmd(ymd: string): Date {
  const parts = ymd.split('-').map(Number)
  const y = parts[0]
  const m = parts[1]
  const d = parts[2]
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    return new Date()
  }
  let t = Date.UTC(y, m - 1, d, 12, 0, 0)
  const tz = calendarTimeZone()
  for (let step = 0; step < 30; step++) {
    if (formatDateYmdInTimeZone(new Date(t), tz) === ymd) return new Date(t)
    if (formatDateYmdInTimeZone(new Date(t), tz) < ymd) t += 3600000
    else t -= 3600000
  }
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0))
}

function mondayOffsetFromCalendarDay(ymd: string): number {
  const t = resolveInstantOnCalendarYmd(ymd)
  const wd = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: calendarTimeZone(),
  }).format(t)
  return WEEKDAY_SHORT_TO_MON_OFFSET[wd] ?? 0
}

/**
 * The seven calendar dates (YYYY-MM-DD) Monday → Sunday in {@link calendarTimeZone}
 * for the week that contains `anchorYmd`.
 */
export function getCalendarWeekDateStringsContaining(anchorYmd: string): string[] {
  const tz = calendarTimeZone()
  const mondayMs =
    resolveInstantOnCalendarYmd(anchorYmd).getTime() -
    mondayOffsetFromCalendarDay(anchorYmd) * 86400000
  return Array.from({ length: 7 }, (_, i) =>
    formatDateYmdInTimeZone(new Date(mondayMs + i * 86400000), tz),
  )
}

/** Human label for a Mon–Sun range, e.g. "Apr 7 – Apr 13, 2026". */
export function formatCalendarWeekRangeLabel(weekDaysYmd: string[]): string {
  if (weekDaysYmd.length < 7) return ''
  const tz = calendarTimeZone()
  const start = resolveInstantOnCalendarYmd(weekDaysYmd[0])
  const end = resolveInstantOnCalendarYmd(weekDaysYmd[6])
  const md = { timeZone: tz, month: 'short', day: 'numeric' } as const
  const yr = { timeZone: tz, year: 'numeric' } as const
  const mon = new Intl.DateTimeFormat('en-US', md).format(start)
  const sunMd = new Intl.DateTimeFormat('en-US', md).format(end)
  const yStart = new Intl.DateTimeFormat('en-US', yr).format(start)
  const yEnd = new Intl.DateTimeFormat('en-US', yr).format(end)
  if (yStart === yEnd) return `${mon} – ${sunMd}, ${yEnd}`
  return `${mon}, ${yStart} – ${sunMd}, ${yEnd}`
}



