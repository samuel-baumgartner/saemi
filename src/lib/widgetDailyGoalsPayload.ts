import { prisma } from '@/lib/prisma'
import { excludePhoneDeletionTombstones } from '@/lib/phoneSessionDeletion'
import {
  minutesTowardGoal,
  normalizeStoredGoals,
  unproductiveBudgetLimitMinutes,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import type { TimeSession } from '@/types/task'

export type WidgetGoalItem = {
  id: string
  label: string
  targetMinutes: number
  doneMinutes: number
  progressPercent: number
  progressLabel: string
  met: boolean
}

function formatProgressLabel(done: number, target: number) {
  const h = Math.floor(done / 60)
  const m = done % 60
  const doneStr = h > 0 ? `${h}h ${m}m` : `${m} min`
  const tH = Math.floor(target / 60)
  const tM = target % 60
  const targetStr =
    tH > 0 ? `${tH}h${tM > 0 ? ` ${tM}m` : ''}`.trim() : `${target} min`
  return `${doneStr} / ${targetStr}`
}

function toTimeSession(row: {
  id: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
  healthDataType?: string | null
  healthDataDetails?: unknown | null
}): TimeSession {
  const healthData =
    row.healthDataType != null || row.healthDataDetails != null
      ? ({
          type: row.healthDataType,
          details: row.healthDataDetails ?? undefined,
        } as TimeSession['healthData'])
      : undefined
  return {
    id: row.id,
    activity: row.activity,
    description: row.description ?? undefined,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    date: row.date,
    source: row.source as TimeSession['source'],
    ...(healthData ? { healthData } : {}),
  }
}

export type WidgetDailyGoalsOptions = {
  /** When set, open session duration matches TimeChecker / Goals web (wall clock for active id). */
  activeSessionId?: string | null
}

/**
 * Same payload as GET /api/widget/daily-goals (for Android widget + web preview).
 * Optional {@link WidgetDailyGoalsOptions.activeSessionId} aligns in-progress
 * sessions with the logged-in web app.
 */
export async function getWidgetDailyGoalsPayload(
  userId: string,
  date: string,
  options?: WidgetDailyGoalsOptions,
): Promise<{ date: string; items: WidgetGoalItem[] }> {
  const activeSessionId = options?.activeSessionId ?? null

  /** Matches legacy rows + env typos: Google email casing can differ from WIDGET_USER_ID. */
  const userIdMatch = { userId: { equals: userId, mode: 'insensitive' as const } }

  const [goalRow, sessionRows] = await Promise.all([
    prisma.userGoalSettings.findFirst({ where: userIdMatch }),
    prisma.timeSession.findMany({
      where: excludePhoneDeletionTombstones({ ...userIdMatch, date }),
      orderBy: { startTime: 'asc' },
    }),
  ])

  const goals = normalizeStoredGoals(goalRow?.goalsJson ?? null)
  const sessions = sessionRows.map(toTimeSession)

  const unproductiveBudget = unproductiveBudgetLimitMinutes(
    goals,
    sessions,
    activeSessionId,
  )
  const unproductiveDone = unproductiveMinutesToday(sessions, activeSessionId)
  const unproductivePct =
    unproductiveBudget > 0
      ? Math.min(
          100,
          Math.round((unproductiveDone / unproductiveBudget) * 100),
        )
      : unproductiveDone > 0
        ? 100
        : 0
  const unproductiveMet =
    unproductiveBudget > 0
      ? unproductiveDone >= unproductiveBudget
      : unproductiveDone > 0

  const unproductiveRow: WidgetGoalItem = {
    id: 'unproductive',
    label: 'Unproductive',
    targetMinutes: unproductiveBudget,
    doneMinutes: unproductiveDone,
    progressPercent: unproductivePct,
    progressLabel: formatProgressLabel(unproductiveDone, unproductiveBudget),
    met: unproductiveMet,
  }

  const goalItems = goals.map((g) => {
    const done = minutesTowardGoal(g.id, sessions, activeSessionId)
    const pct = Math.min(100, Math.round((done / g.targetMinutes) * 100))
    const met = done >= g.targetMinutes
    return {
      id: g.id,
      label: g.label,
      targetMinutes: g.targetMinutes,
      doneMinutes: done,
      progressPercent: pct,
      progressLabel: formatProgressLabel(done, g.targetMinutes),
      met,
    }
  })

  return { date, items: [unproductiveRow, ...goalItems] }
}
