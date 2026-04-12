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
  { id: 'grammar', label: 'Grammar', targetMinutes: 10 },
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

function studyTimeMsFromHealthDetails(s: TimeSession): number | null {
  const raw = s.healthData?.details
  if (raw == null || typeof raw !== 'object') return null
  const v = (raw as Record<string, unknown>)['studyTimeMs']
  if (v == null || !Number.isFinite(Number(v))) return null
  const n = Number(v)
  return n > 0 ? n : null
}

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

  const study = studyTimeMsFromHealthDetails(s)
  if (study != null) {
    if (s.source === 'anki') {
      return Math.min(study, wallMs)
    }
    // Anki rows synced before source was stored as "anki" (e.g. defaulted to
    // google-fit) still carry healthData.type "study" + studyTimeMs — use study
    // time, not wall span, for goal totals.
    if (s.healthData?.type === 'study' && matchesAnkiGoalSession(s)) {
      return Math.min(study, wallMs)
    }
  }

  return wallMs
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
 * `healthData.details` — so Bunpro must be detected from details/description too.
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

export function matchesListeningGoal(activity: string): boolean {
  return /listening/i.test(activity)
}

export function matchesAnkiGoal(activity: string, source?: string): boolean {
  if (source === 'anki') return true
  if (/anki/i.test(activity)) return true
  if (activity.includes('📚 Anki')) return true
  return false
}

/**
 * Whether a session counts toward the Anki daily goal. Prefer this over
 * {@link matchesAnkiGoal} with {@link sessionTextForGoalMatching}: full JSON
 * from health details can contain "anki" in deck/URL strings and false-match.
 */
export function matchesAnkiGoalSession(s: TimeSession): boolean {
  if (s.source === 'anki') return true
  const a = [s.activity, s.description ?? ''].filter(Boolean).join('\n')
  if (/anki/i.test(a)) return true
  if (a.includes('📚 Anki')) return true
  return false
}

export function matchesGrammarGoal(text: string): boolean {
  return /grammar|bunpro|文法|ぶんプロ/i.test(text)
}

/** TimeChecker foreground title is often exactly "Cursor". */
export function matchesCursorGoal(text: string): boolean {
  return /\bcursor\b/i.test(text.trim())
}

/**
 * Substrings matched in {@link sessionTextForGoalMatching} for **timechecker**
 * sessions only, counting toward {@link DEFAULT_DAILY_GOALS} `startup`.
 *
 * Recommended set (expand as needed): work / startup tools and obvious
 * productivity surfaces — LinkedIn, ChatGPT, Notion, docs, issue trackers, design,
 * comms, deploy dashboards, API clients, etc.
 */
const PRODUCTIVE_COMPUTER_SUBSTRINGS: readonly string[] = [
  'linkedin',
  'chatgpt',
  'openai',
  'notion',
  'figma',
  'linear.app',
  'linear', // product / issue tracker titles (rare false positives)
  'slack',
  'github',
  'gitlab',
  'vscode',
  'visual studio code',
  'google docs',
  'docs.google',
  'sheets.google',
  'meet.google',
  'zoom',
  'loom',
  'miro',
  'confluence',
  'jira',
  'asana',
  'trello',
  'vercel',
  'netlify',
  'railway',
  'render.com',
  'postman',
  'insomnia',
  'excalidraw',
  'cal.com',
  'granola',
  'superhuman',
  'mail.google',
  'outlook',
  '1password',
  'stripe',
  'hubspot',
  'salesforce',
  'airtable',
  'clickup',
  'monday.com',
  'productboard',
  'canva',
  'webflow',
  'framer',
  'gemini',
]

function escapeForAlternation(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PRODUCTIVE_COMPUTER_REGEX = new RegExp(
  PRODUCTIVE_COMPUTER_SUBSTRINGS.map(escapeForAlternation).join('|'),
  'i',
)

/** True when window title / URL blob looks like intentional work (timechecker only in callers). */
export function matchesProductiveComputerActivity(text: string): boolean {
  if (!text.trim()) return false
  return PRODUCTIVE_COMPUTER_REGEX.test(text)
}

/** StartUp goal: Cursor (any source) plus timechecker sessions matching productive tools. */
export function matchesStartupGoal(s: TimeSession, matchText: string): boolean {
  if (matchesCursorGoal(matchText)) return true
  if (s.source === 'timechecker' && matchesProductiveComputerActivity(matchText)) {
    return true
  }
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
    if (goalId === 'listening' && matchesListeningGoal(matchText)) hit = true
    if (goalId === 'anki' && matchesAnkiGoalSession(s)) hit = true
    if (goalId === 'grammar' && matchesGrammarGoal(matchText)) hit = true
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
    if (goalId === 'listening' && matchesListeningGoal(matchText)) hit = true
    if (goalId === 'anki' && matchesAnkiGoalSession(s)) hit = true
    if (goalId === 'grammar' && matchesGrammarGoal(matchText)) hit = true
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

/** Max unproductive minutes you can unlock in a day (full “leisure” cap). */
export const UNPRODUCTIVE_BUDGET_MAX_MIN = 120

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
 * Today's allowed unproductive minutes: (progress fraction) × UNPRODUCTIVE_BUDGET_MAX_MIN.
 * Starts at 0; fully weighted by actual time toward each goal vs sum of targets.
 */
export function unproductiveBudgetLimitMinutes(
  goals: DailyGoalDef[],
  sessions: TimeSession[],
  activeSessionId?: string | null
): number {
  const { fraction } = unproductiveBudgetProgressParts(
    goals,
    sessions,
    activeSessionId
  )
  return Math.round(fraction * UNPRODUCTIVE_BUDGET_MAX_MIN)
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

export function unproductiveBudgetLimitMinutesFromDones(
  goals: DailyGoalDef[],
  doneByGoalId: Record<string, number>
): number {
  const { fraction } = unproductiveBudgetProgressPartsFromDones(
    goals,
    doneByGoalId
  )
  return Math.round(fraction * UNPRODUCTIVE_BUDGET_MAX_MIN)
}
