import type { TimeSession } from '@/types/task'
import { formatDateYmdInCalendarTz, getCalendarHour } from '@/lib/dateUtils'

export interface DailyGoalDef {
  id: string
  label: string
  targetMinutes: number
}

const MIN_TARGET_MINUTES = 1
const MAX_TARGET_MINUTES = 24 * 60
const MAX_LABEL_LENGTH = 100

/** Default targets when nothing is stored yet (also used for “reset”). */
export const DEFAULT_DAILY_GOALS: DailyGoalDef[] = [
  { id: 'startup', label: 'StartUp', targetMinutes: 60 },
]

function clampTargetMinutes(n: number, fallback: number): number {
  if (!Number.isFinite(n)) return fallback
  return Math.min(
    MAX_TARGET_MINUTES,
    Math.max(MIN_TARGET_MINUTES, Math.round(n))
  )
}

/**
 * Merge DB JSON with code defaults (new goal ids in code appear automatically).
 */
export function normalizeStoredGoals(stored: unknown): DailyGoalDef[] {
  const parsed = Array.isArray(stored) ? stored : []
  const byId = new Map<string, Record<string, unknown>>()
  for (const x of parsed) {
    if (x === null || typeof x !== 'object') continue
    const id = String((x as { id?: unknown }).id ?? '')
    if (!id) continue
    byId.set(id, x as Record<string, unknown>)
  }
  return DEFAULT_DAILY_GOALS.map((def) => {
    let s = byId.get(def.id)
    const mergedFromCursor =
      !s && def.id === 'startup' && byId.has('cursor')
    if (mergedFromCursor) {
      s = byId.get('cursor')
    }
    if (!s) return { ...def }
    const t = clampTargetMinutes(
      Number(s.targetMinutes),
      def.targetMinutes
    )
    const rawL = s.label
    let label =
      typeof rawL === 'string' && rawL.trim()
        ? rawL.trim().slice(0, MAX_LABEL_LENGTH)
        : def.label
    if (def.id === 'startup' && mergedFromCursor) {
      const L = label.trim().toLowerCase()
      if (L.length === 0 || L === 'cursor') {
        label = def.label
      }
    }
    return { id: def.id, label, targetMinutes: t }
  })
}

export function sanitizeGoalsFromClient(goals: unknown): DailyGoalDef[] | null {
  if (!Array.isArray(goals)) return null
  return normalizeStoredGoals(goals)
}

/** Case-insensitive: if activity includes any of these, count as unproductive (timechecker only). */
export const UNPRODUCTIVE_ACTIVITY_MARKERS = [
  'not productive',
  'distracted',
] as const

/**
 * Wall-clock span, or “now” when this session id is the active tracker session.
 */
export function effectiveSessionDurationMs(
  s: TimeSession,
  activeSessionId?: string | null
): number {
  const isActive = !s.endTime && activeSessionId === s.id
  if (!s.endTime && !isActive) return 0

  return s.endTime
    ? Math.max(0, s.endTime.getTime() - s.startTime.getTime())
    : Math.max(0, Date.now() - s.startTime.getTime())
}

export function sessionDurationMinutes(
  s: TimeSession,
  activeSessionId?: string | null
): number {
  return Math.floor(effectiveSessionDurationMs(s, activeSessionId) / 60000)
}

/**
 * Text used for daily-goal keyword matching. TimeChecker often puts the browser
 * title in `activity` (e.g. "Brave") while the active URL lives in
 * `healthData.details` — so goal keywords are matched against details/description too.
 */
export function sessionTextForGoalMatching(s: TimeSession): string {
  const parts: string[] = [s.activity]
  if (s.description?.trim()) parts.push(s.description)
  const d = s.healthData?.details
  if (d !== undefined && d !== null) {
    if (typeof d === 'string') parts.push(d)
    else parts.push(JSON.stringify(d))
  }
  return parts.join('\n')
}

/** TimeChecker foreground title is often exactly "Cursor". */
export function matchesCursorGoal(text: string): boolean {
  return /\bcursor\b/i.test(text.trim())
}

/** Blender sessions from TimeChecker on laptop should count toward StartUp. */
export function matchesBlenderStartupGoal(
  s: TimeSession,
  text: string
): boolean {
  if (s.source !== 'timechecker') return false
  return /\bblender\b/i.test(text)
}

/**
 * True when a TimeChecker row’s `healthData.details` includes `saemiGoals`
 * (or `saemiGoal`) set on the computer — see `startup_rule_ids` in
 * `~/.config/timechecker/sync.json`.
 */
export function timecheckerSessionClaimsSaemiGoal(
  s: TimeSession,
  goalId: string
): boolean {
  if (s.source !== 'timechecker') return false
  const raw = s.healthData?.details
  if (raw == null || typeof raw !== 'object') return false
  const d = raw as Record<string, unknown>
  const want = goalId.trim().toLowerCase()
  if (!want) return false
  const single = d.saemiGoal
  if (typeof single === 'string' && single.trim().toLowerCase() === want) {
    return true
  }
  const arr = d.saemiGoals
  if (!Array.isArray(arr)) return false
  return arr.some(
    (x) => typeof x === 'string' && x.trim().toLowerCase() === want
  )
}

/**
 * StartUp goal: **TimeChecker** rows tagged with `saemiGoals: ["startup"]` on the
 * computer, any laptop TimeChecker Blender session, or any session whose text
 * still matches Cursor (e.g. rule label “Cursor”, or a manual session).
 */
export function matchesStartupGoal(s: TimeSession, matchText: string): boolean {
  if (matchesCursorGoal(matchText)) return true
  if (matchesBlenderStartupGoal(s, matchText)) return true
  if (timecheckerSessionClaimsSaemiGoal(s, 'startup')) return true
  return false
}

export function matchesUnproductiveTimechecker(activity: string): boolean {
  const a = activity.trim().toLowerCase()
  return UNPRODUCTIVE_ACTIVITY_MARKERS.some((m) => a.includes(m))
}

export function minutesTowardGoal(
  goalId: string,
  sessions: TimeSession[],
  activeSessionId?: string | null
): number {
  let sumMs = 0
  for (const s of sessions) {
    const ms = effectiveSessionDurationMs(s, activeSessionId)
    if (ms <= 0) continue
    const matchText = sessionTextForGoalMatching(s)
    let hit = false
    if (goalId === 'startup' && matchesStartupGoal(s, matchText)) hit = true
    // Legacy stored goal id until users re-save goals.
    if (goalId === 'cursor' && matchesStartupGoal(s, matchText)) hit = true
    if (hit) sumMs += ms
  }
  return Math.max(0, Math.round(sumMs / 60000))
}

/** Seven-day target from a per-day minute target (Mon–Sun). */
export function weeklyTargetMinutesFromDaily(dailyTargetMinutes: number): number {
  return Math.max(0, dailyTargetMinutes) * 7
}

/**
 * Like {@link minutesTowardGoal}, but only sessions whose `date` is in `datesYmd`
 * (calendar days in your configured timezone).
 */
export function minutesTowardGoalOnDates(
  goalId: string,
  sessions: TimeSession[],
  datesYmd: ReadonlySet<string>,
  activeSessionId?: string | null
): number {
  let sumMs = 0
  for (const s of sessions) {
    if (!datesYmd.has(s.date)) continue
    const ms = effectiveSessionDurationMs(s, activeSessionId)
    if (ms <= 0) continue
    const matchText = sessionTextForGoalMatching(s)
    let hit = false
    if (goalId === 'startup' && matchesStartupGoal(s, matchText)) hit = true
    if (goalId === 'cursor' && matchesStartupGoal(s, matchText)) hit = true
    if (hit) sumMs += ms
  }
  return Math.max(0, Math.round(sumMs / 60000))
}

export type WeeklyGoalRollup = {
  goalId: string
  label: string
  dailyTargetMinutes: number
  weekTargetMinutes: number
  weekDoneMinutes: number
  met: boolean
  progressPercent: number
}

export function weeklyGoalRollups(
  goals: DailyGoalDef[],
  sessions: TimeSession[],
  weekDatesYmd: ReadonlySet<string>,
  activeSessionId?: string | null
): WeeklyGoalRollup[] {
  return goals.map((g) => {
    const weekDoneMinutes = minutesTowardGoalOnDates(
      g.id,
      sessions,
      weekDatesYmd,
      activeSessionId
    )
    const weekTargetMinutes = weeklyTargetMinutesFromDaily(g.targetMinutes)
    const met = weekTargetMinutes > 0 && weekDoneMinutes >= weekTargetMinutes
    const progressPercent =
      weekTargetMinutes > 0
        ? Math.min(100, Math.round((weekDoneMinutes / weekTargetMinutes) * 100))
        : 0
    return {
      goalId: g.id,
      label: g.label,
      dailyTargetMinutes: g.targetMinutes,
      weekTargetMinutes,
      weekDoneMinutes,
      met,
      progressPercent,
    }
  })
}

export function weeklyGoalsMetCount(rollups: WeeklyGoalRollup[]): number {
  return rollups.filter((r) => r.met).length
}

export function unproductiveMinutesToday(
  sessions: TimeSession[],
  activeSessionId?: string | null
): number {
  let sum = 0
  for (const s of sessions) {
    if (s.source !== 'timechecker' && s.source !== 'phone') continue
    if (!matchesUnproductiveTimechecker(s.activity)) continue
    sum += sessionDurationMinutes(s, activeSessionId)
  }
  return sum
}

/**
 * Unproductive allowance (Instagram + YouTube, phone and laptop combined), unlocked in
 * slices over the day. `hour` is local time in the calendar timezone.
 */
export const UNPRODUCTIVE_BUDGET_UNLOCKS: ReadonlyArray<{
  hour: number
  minutes: number
}> = [
  { hour: 0, minutes: 30 },
  { hour: 12, minutes: 45 },
  { hour: 19, minutes: 45 },
]

export const UNPRODUCTIVE_BUDGET_MAX_MIN = UNPRODUCTIVE_BUDGET_UNLOCKS.reduce(
  (sum, u) => sum + u.minutes,
  0
)

/** One-off total limits for specific calendar days (replace the schedule entirely). */
const UNPRODUCTIVE_BUDGET_DAY_OVERRIDES: Readonly<Record<string, number>> = {
  '2026-09-30': 178,
}

/**
 * Progress toward your daily goal mix: for each goal we count min(time logged, target).
 * Example: one goal target 2h done fully + others 0, with all targets summing 3h → 2/3 of progress.
 */
export function unproductiveBudgetProgressParts(
  goals: DailyGoalDef[],
  sessions: TimeSession[],
  activeSessionId?: string | null
): {
  creditedMinutes: number
  totalTargetMinutes: number
  fraction: number
} {
  let creditedMinutes = 0
  let totalTargetMinutes = 0
  for (const g of goals) {
    totalTargetMinutes += g.targetMinutes
    const done = minutesTowardGoal(g.id, sessions, activeSessionId)
    creditedMinutes += Math.min(done, g.targetMinutes)
  }
  if (totalTargetMinutes <= 0) {
    return { creditedMinutes: 0, totalTargetMinutes: 0, fraction: 0 }
  }
  return {
    creditedMinutes,
    totalTargetMinutes,
    fraction: creditedMinutes / totalTargetMinutes,
  }
}

/**
 * Unproductive minutes unlocked so far on `dateYmd`: past days get the full allowance,
 * future days only the first slice, today the slices whose hour has been reached.
 */
export function unproductiveBudgetLimitMinutes(
  dateYmd: string,
  now: Date = new Date()
): number {
  const override = UNPRODUCTIVE_BUDGET_DAY_OVERRIDES[dateYmd]
  if (override !== undefined) return override
  const today = formatDateYmdInCalendarTz(now)
  if (dateYmd < today) return UNPRODUCTIVE_BUDGET_MAX_MIN
  if (dateYmd > today) return UNPRODUCTIVE_BUDGET_UNLOCKS[0]?.minutes ?? 0
  const hour = getCalendarHour(now)
  return UNPRODUCTIVE_BUDGET_UNLOCKS.filter((u) => u.hour <= hour).reduce(
    (sum, u) => sum + u.minutes,
    0
  )
}

/**
 * Next time more unproductive minutes unlock today, or null if the day's allowance is
 * complete. Assumes a whole-hour UTC offset for the calendar timezone.
 */
export function nextUnproductiveUnlock(
  dateYmd: string,
  now: Date = new Date()
): { at: Date; minutes: number } | null {
  if (UNPRODUCTIVE_BUDGET_DAY_OVERRIDES[dateYmd] !== undefined) return null
  if (dateYmd !== formatDateYmdInCalendarTz(now)) return null
  const hour = getCalendarHour(now)
  const next = UNPRODUCTIVE_BUDGET_UNLOCKS.find((u) => u.hour > hour)
  if (!next) return null
  const startOfHourMs = now.getTime() - (now.getTime() % 3_600_000)
  return {
    at: new Date(startOfHourMs + (next.hour - hour) * 3_600_000),
    minutes: next.minutes,
  }
}

/**
 * Same leisure-budget math as {@link unproductiveBudgetProgressParts}, but with
 * per-goal done minutes supplied (e.g. from server-computed daily progress).
 */
export function unproductiveBudgetProgressPartsFromDones(
  goals: DailyGoalDef[],
  doneByGoalId: Record<string, number>
): {
  creditedMinutes: number
  totalTargetMinutes: number
  fraction: number
} {
  let creditedMinutes = 0
  let totalTargetMinutes = 0
  for (const g of goals) {
    totalTargetMinutes += g.targetMinutes
    const done = Math.max(0, doneByGoalId[g.id] ?? 0)
    creditedMinutes += Math.min(done, g.targetMinutes)
  }
  if (totalTargetMinutes <= 0) {
    return { creditedMinutes: 0, totalTargetMinutes: 0, fraction: 0 }
  }
  return {
    creditedMinutes,
    totalTargetMinutes,
    fraction: creditedMinutes / totalTargetMinutes,
  }
}