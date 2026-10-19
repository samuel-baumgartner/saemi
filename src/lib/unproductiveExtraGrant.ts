import { prisma } from '@/lib/prisma'
import { UNPRODUCTIVE_EXTRA_GRANT_MIN } from '@/lib/goalConfig'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import { buildLimitStatus, type LimitStatus } from '@/lib/unproductiveLimit'
import {
  invalidateWidgetDayCacheForUser,
  loadWidgetDayBundleCached,
} from '@/lib/widgetDayDataCache'

/**
 * Adds {@link UNPRODUCTIVE_EXTRA_GRANT_MIN} minutes to today's allowance.
 * Always grants: the phone and browser can already be blocking from local usage
 * while the server still thinks the allowance is not used up, and refusing then
 * leaves the apps blocked without adding any time.
 */
export async function grantUnproductiveExtra(
  userId: string,
  source: string
): Promise<LimitStatus> {
  const date = getServerCalendarDateString()
  const before = await loadWidgetDayBundleCached(userId, date, { bypassCache: true })

  await prisma.unproductiveExtraGrant.create({
    data: { userId, date, minutes: UNPRODUCTIVE_EXTRA_GRANT_MIN, source },
  })
  invalidateWidgetDayCacheForUser(userId)

  const extraMinutes = before.extraMinutes + UNPRODUCTIVE_EXTRA_GRANT_MIN
  return buildLimitStatus(date, before.goals, before.sessions, extraMinutes)
}
