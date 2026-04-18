import {
  computeWidgetDailyGoalItems,
  type WidgetGoalItem,
} from '@/lib/widgetDailyGoalsCompute'
import { loadWidgetDayBundleCached } from '@/lib/widgetDayDataCache'

export type { WidgetGoalItem }

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
  const { goals, sessions } = await loadWidgetDayBundleCached(userId, date)
  const items = computeWidgetDailyGoalItems({
    goals,
    sessions,
    activeSessionId,
  })
  return { date, items }
}
