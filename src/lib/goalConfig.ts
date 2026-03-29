import type { TimeSession } from '@/types/task'

export interface DailyGoalDef {
  id: string
  label: string
  targetMinutes: number
}

/** Daily targets — edit here. */
export const DAILY_GOALS: DailyGoalDef[] = [
  { id: 'listening', label: 'Listening', targetMinutes: 120 },
  { id: 'anki', label: 'Anki', targetMinutes: 60 },
  { id: 'grammar', label: 'Grammar', targetMinutes: 30 },
]

/** Case-insensitive: if activity includes any of these, count as unproductive (timechecker only). */
export const UNPRODUCTIVE_ACTIVITY_MARKERS = [
  'not productive',
  'distracted',
] as const

export function sessionDurationMinutes(s: TimeSession): number {
  if (!s.endTime) return 0
  return Math.floor(
    (s.endTime.getTime() - s.startTime.getTime()) / 60000
  )
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

export function matchesUnproductiveTimechecker(activity: string): boolean {
  const a = activity.trim().toLowerCase()
  return UNPRODUCTIVE_ACTIVITY_MARKERS.some((m) => a.includes(m))
}

export function minutesTowardGoal(
  goalId: string,
  sessions: TimeSession[]
): number {
  let sum = 0
  for (const s of sessions) {
    const m = sessionDurationMinutes(s)
    if (m <= 0) continue
    const { activity, source } = s
    let hit = false
    if (goalId === 'listening' && matchesListeningGoal(activity)) hit = true
    if (goalId === 'anki' && matchesAnkiGoal(activity, source)) hit = true
    if (goalId === 'grammar' && matchesGrammarGoal(activity)) hit = true
    if (hit) sum += m
  }
  return sum
}

export function unproductiveMinutesToday(sessions: TimeSession[]): number {
  let sum = 0
  for (const s of sessions) {
    if (s.source !== 'timechecker') continue
    if (!matchesUnproductiveTimechecker(s.activity)) continue
    sum += sessionDurationMinutes(s)
  }
  return sum
}
