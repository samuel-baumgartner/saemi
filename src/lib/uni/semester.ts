import { UNI_WEEKS } from './types'

/**
 * ETH lecture weeks, from the academic calendar:
 * https://ethz.ch/staffnet/en/news-and-events/academic-calendar.html
 *
 * Autumn / winter semester (HS): ISO weeks 38–51, 14 lecture weeks.
 * Spring / summer semester (FS): ISO weeks 8–22. That span is 15 weeks,
 * including one lecture-free week after Easter, so there are 14 lecture weeks.
 *
 * Confirmed starts (Schedule Office calendars): HS 2026 Mon 14 Sep,
 * FS 2027 Mon 22 Feb, HS 2027 Mon 20 Sep, FS 2028 Mon 21 Feb, HS 2028 Mon 18 Sep.
 * The same ISO-week rule covers later years until ETH publishes the PAKETH
 * calendar (planned from HS 2028, not yet in the week numbers above).
 */

const TZ = 'Europe/Zurich'

/** Autumn semester, which ETH students also call the winter semester. */
const WINTER_START_WEEK = 38
const WINTER_END_WEEK = 51
/** Spring semester, which ETH students also call the summer semester. */
const SUMMER_START_WEEK = 8
const SUMMER_END_WEEK = 22

export type EthSemester =
  | { phase: 'lecture'; season: 'winter' | 'summer'; year: number; week: number; weeks: number }
  | { phase: 'break'; season: 'summer'; year: number }
  | { phase: 'finished' }

function zurichYmd(date: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const n = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return { y: n('year'), m: n('month'), d: n('day') }
}

/** ISO week of a calendar day. `m` is 1–12. */
function isoWeek(y: number, m: number, d: number): { isoYear: number; week: number } {
  const utc = new Date(Date.UTC(y, m - 1, d))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const isoYear = utc.getUTCFullYear()
  const yearStart = new Date(Date.UTC(isoYear, 0, 1))
  const diffDays = Math.round((utc.getTime() - yearStart.getTime()) / 86400000)
  const week = Math.floor(diffDays / 7) + 1
  return { isoYear, week }
}

/** Gregorian Easter Sunday, month is 1–12. */
function easterSunday(year: number): { y: number; m: number; d: number } {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return { y: year, m: month, d: day }
}

/** ISO week of the Monday after Easter: the lecture-free week in the summer semester. */
function easterBreakWeek(year: number): number {
  const easter = easterSunday(year)
  const monday = new Date(Date.UTC(easter.y, easter.m - 1, easter.d + 1))
  return isoWeek(monday.getUTCFullYear(), monday.getUTCMonth() + 1, monday.getUTCDate()).week
}

export function ethSemester(now: Date | number = new Date()): EthSemester {
  const date = typeof now === 'number' ? new Date(now) : now
  const { y, m, d } = zurichYmd(date)
  const { week } = isoWeek(y, m, d)

  if (week >= WINTER_START_WEEK && week <= WINTER_END_WEEK) {
    return { phase: 'lecture', season: 'winter', year: y, week: week - (WINTER_START_WEEK - 1), weeks: UNI_WEEKS }
  }

  if (week >= SUMMER_START_WEEK && week <= SUMMER_END_WEEK) {
    const breakWeek = easterBreakWeek(y)
    if (week === breakWeek) return { phase: 'break', season: 'summer', year: y }
    const lectureWeek = week - (SUMMER_START_WEEK - 1) - (week > breakWeek ? 1 : 0)
    return { phase: 'lecture', season: 'summer', year: y, week: lectureWeek, weeks: UNI_WEEKS }
  }

  return { phase: 'finished' }
}
