import type { TimeSession } from '@/types/task'

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
  { id: 'listening', label: 'Listening', targetMinutes: 120 },
  { id: 'anki', label: 'Anki', targetMinutes: 60 },
  { id: 'grammar', label: 'Grammar', targetMinutes: 30 },
  { id: 'cursor', label: 'Cursor', targetMinutes: 60 },
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
    const s = byId.get(def.id)
    if (!s) return { ...def }
    const t = clampTargetMinutes(
      Number(s.targetMinutes),
      def.targetMinutes
    )
    const rawL = s.label
    const label =
      typeof rawL === 'string' && rawL.trim()
        ? rawL.trim().slice(0, MAX_LABEL_LENGTH)
        : def.label
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

  const wallMs = s.endTime
    ? Math.max(0, s.endTime.getTime() - s.startTime.getTime())
    : Math.max(0, Date.now() - s.startTime.getTime())

  if (s.source === 'anki') {
    const raw = s.healthData?.details?.studyTimeMs
    const study =
      raw != null && Number.isFinite(Number(raw)) ? Number(raw) : null
    if (study != null && study > 0) return study
  }

  return wallMs
}

export function sessionDurationMinutes(s: TimeSession): number {
  return Math.floor(effectiveSessionDurationMs(s) / 60000)
}

export function matchesListeningGoal(activity: string): boolean {
  return /listening/i.test(activity)
}

export function matchesAnkiGoal(activity: string, source?: string): boolean {
  if (source === 'anki') return true
  if (/anki/i.test(activity)) return true
  if (activity.includes('📚 Anki')) return true
  return false
}

export function matchesGrammarGoal(activity: string): boolean {
  return /grammar|bunpro/i.test(activity)
}

/** TimeChecker foreground title is often exactly "Cursor". */
export function matchesCursorGoal(activity: string): boolean {
  return /\bcursor\b/i.test(activity.trim())
}

export function matchesUnproductiveTimechecker(activity: string): boolean {
  const a = activity.trim().toLowerCase()
  return UNPRODUCTIVE_ACTIVITY_MARKERS.some((m) => a.includes(m))
}

export function minutesTowardGoal(
  goalId: string,
  sessions: TimeSession[]
): number {
  let sumMs = 0
  for (const s of sessions) {
    const ms = effectiveSessionDurationMs(s)
    if (ms <= 0) continue
    const { activity, source } = s
    let hit = false
    if (goalId === 'listening' && matchesListeningGoal(activity)) hit = true
    if (goalId === 'anki' && matchesAnkiGoal(activity, source)) hit = true
    if (goalId === 'grammar' && matchesGrammarGoal(activity)) hit = true
    if (goalId === 'cursor' && matchesCursorGoal(activity)) hit = true
    if (hit) sumMs += ms
  }
  return Math.max(0, Math.round(sumMs / 60000))
}

export function unproductiveMinutesToday(sessions: TimeSession[]): number {
  let sum = 0
  for (const s of sessions) {
    if (s.source !== 'timechecker' && s.source !== 'phone') continue
    if (!matchesUnproductiveTimechecker(s.activity)) continue
    sum += sessionDurationMinutes(s)
  }
  return sum
}

/** Max unproductive minutes you can unlock in a day (full “leisure” cap). */
export const UNPRODUCTIVE_BUDGET_MAX_MIN = 120

/**
 * Progress toward your daily goal mix: for each goal we count min(time logged, target).
 * Example: one goal target 2h done fully + others 0, with all targets summing 3h → 2/3 of progress.
 */
export function unproductiveBudgetProgressParts(
  goals: DailyGoalDef[],
  sessions: TimeSession[]
): {
  creditedMinutes: number
  totalTargetMinutes: number
  fraction: number
} {
  let creditedMinutes = 0
  let totalTargetMinutes = 0
  for (const g of goals) {
    totalTargetMinutes += g.targetMinutes
    const done = minutesTowardGoal(g.id, sessions)
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
 * Today's allowed unproductive minutes: (progress fraction) × UNPRODUCTIVE_BUDGET_MAX_MIN.
 * Starts at 0; fully weighted by actual time toward each goal vs sum of targets.
 */
export function unproductiveBudgetLimitMinutes(
  goals: DailyGoalDef[],
  sessions: TimeSession[]
): number {
  const { fraction } = unproductiveBudgetProgressParts(goals, sessions)
  return Math.round(fraction * UNPRODUCTIVE_BUDGET_MAX_MIN)
}
