import type { DailyGoalDef } from '@/lib/goalConfig'
import {
  minutesTowardGoal,
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

export type ComputeWidgetDailyGoalItemsArgs = {
  goals: DailyGoalDef[]
  sessions: TimeSession[]
  activeSessionId?: string | null
}

/**
 * Pure goal progress for one calendar day (same rules as the Android widget).
 * Used by the server payload builder and the Goals tab to avoid redundant DB reads.
 */
export function computeWidgetDailyGoalItems({
  goals,
  sessions,
  activeSessionId = null,
}: ComputeWidgetDailyGoalItemsArgs): WidgetGoalItem[] {
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

  return [unproductiveRow, ...goalItems]
}
