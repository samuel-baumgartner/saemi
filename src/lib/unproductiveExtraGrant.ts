import { prisma } from '@/lib/prisma'
import { UNPRODUCTIVE_EXTRA_GRANT_MIN } from '@/lib/goalConfig'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import { buildLimitStatus, type LimitStatus } from '@/lib/unproductiveLimit'
import {
  invalidateWidgetDayCacheForUser,
  loadWidgetDayBundleCached,
} from '@/lib/widgetDayDataCache'

export type ExtraGrantResult =
  | { ok: true; status: LimitStatus }
  | { ok: false; error: 'not_blocked'; status: LimitStatus }

/**
 * Adds {@link UNPRODUCTIVE_EXTRA_GRANT_MIN} minutes to today's allowance, but only while
 * the user is actually over the limit (no stockpiling extras in advance).
 */
export async function grantUnproductiveExtra(
  userId: string,
  source: string
): Promise<ExtraGrantResult> {
  const date = getServerCalendarDateString()
  const before = await loadWidgetDayBundleCached(userId, date, { bypassCache: true })
  const statusBefore = buildLimitStatus(
    date,
    before.goals,
    before.sessions,
    before.extraMinutes
  )
  if (!statusBefore.isOverLimit) {
    return { ok: false, error: 'not_blocked', status: statusBefore }
  }

  await prisma.unproductiveExtraGrant.create({
    data: { userId, date, minutes: UNPRODUCTIVE_EXTRA_GRANT_MIN, source },
  })
  invalidateWidgetDayCacheForUser(userId)

  const extraMinutes = before.extraMinutes + UNPRODUCTIVE_EXTRA_GRANT_MIN
  return {
    ok: true,
    status: buildLimitStatus(date, before.goals, before.sessions, extraMinutes),
  }
}
