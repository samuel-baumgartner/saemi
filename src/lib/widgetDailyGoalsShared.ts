import { getServerCalendarDateString } from '@/lib/dateUtils'
import {
  getWidgetDailyGoalsPayload,
  type WidgetGoalItem,
} from '@/lib/widgetDailyGoalsPayload'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Resolves `?date=YYYY-MM-DD` the same way as GET /api/widget/daily-goals:
 * use the param when valid, otherwise server calendar "today" in CALENDAR_TIMEZONE.
 */
export function resolveDailyGoalsDateParam(rawDate: string | null): string {
  return rawDate && DATE_RE.test(rawDate)
    ? rawDate
    : getServerCalendarDateString(new Date())
}

/**
 * Single source of truth for daily goal progress JSON (same as the Android widget).
 * All callers (widget route, web goals route) should use this instead of calling
 * {@link getWidgetDailyGoalsPayload} with ad-hoc date logic.
 */
export async function getDailyGoalsPayloadForUser(
  userId: string,
  rawDate: string | null
): Promise<{ date: string; items: WidgetGoalItem[] }> {
  const date = resolveDailyGoalsDateParam(rawDate)
  return getWidgetDailyGoalsPayload(userId, date)
}
