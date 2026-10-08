import { prisma } from '@/lib/prisma'
import {
  nextUnproductiveUnlock,
  unproductiveBudgetLimitMinutes,
  unproductiveBudgetProgressParts,
  unproductiveMinutesToday,
  type DailyGoalDef,
} from '@/lib/goalConfig'
import type { TimeSession } from '@/types/task'

/** Sum of extra unproductive minutes claimed on `date` (0 if the grants table is missing). */
export async function unproductiveExtraMinutes(
  userId: string,
  date: string
): Promise<number> {
  try {
    const agg = await prisma.unproductiveExtraGrant.aggregate({
      where: { userId: { equals: userId, mode: 'insensitive' }, date },
      _sum: { minutes: true },
    })
    return agg._sum.minutes ?? 0
  } catch (e) {
    console.warn('unproductiveExtraMinutes failed (migration applied?)', e)
    return 0
  }
}

/** JSON body of the limit status endpoints (browser extension, Android blocker, firewall). */
export function buildLimitStatus(
  date: string,
  goals: DailyGoalDef[],
  sessions: TimeSession[],
  extraMinutes: number
) {
  const minutes = unproductiveMinutesToday(sessions)
  const limitMinutes = unproductiveBudgetLimitMinutes(date, extraMinutes)
  const isOverLimit = limitMinutes > 0 ? minutes >= limitMinutes : minutes > 0
  const budgetProgress = unproductiveBudgetProgressParts(goals, sessions)
  const nextUnlock = nextUnproductiveUnlock(date)
  return {
    date,
    unproductiveMinutes: minutes,
    limitMinutes,
    extraMinutes,
    isOverLimit,
    remainingMinutes: Math.max(0, limitMinutes - minutes),
    nextUnlockAt: nextUnlock?.at.toISOString() ?? null,
    nextUnlockMinutes: nextUnlock?.minutes ?? null,
    budgetFraction: Math.round(budgetProgress.fraction * 10_000) / 10_000,
    budgetCreditedMinutes: budgetProgress.creditedMinutes,
    budgetTotalTargetMinutes: budgetProgress.totalTargetMinutes,
  }
}

export type LimitStatus = ReturnType<typeof buildLimitStatus>
