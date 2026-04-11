import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import type { TimeSession as DbTimeSession } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
import {
  normalizeStoredGoals,
  unproductiveBudgetLimitMinutes,
  unproductiveBudgetProgressParts,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import { TimeSession } from '@/types/task'
import { getServerCalendarDateString } from '@/lib/dateUtils'

export async function GET(request: NextRequest) {
  const session = await auth()
  const sessionUserId = getDbUserId(session)
  if (!sessionUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = resolveSessionsOwnerUserId(sessionUserId)
  const { searchParams } = new URL(request.url)
  const rawDate = searchParams.get('date')
  const date =
    rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
      ? rawDate
      : getServerCalendarDateString(new Date())

  try {
    const [goalRow, rows] = await Promise.all([
      prisma.userGoalSettings.findUnique({ where: { userId } }),
      prisma.timeSession.findMany({
        where: { userId, date },
        orderBy: { startTime: 'asc' },
      }),
    ])

    const goals = normalizeStoredGoals(goalRow?.goalsJson ?? null)

    const sessions: TimeSession[] = rows.map((r: DbTimeSession) => ({
      id: r.id,
      activity: r.activity,
      description: r.description ?? undefined,
      startTime: r.startTime,
      endTime: r.endTime ?? undefined,
      date: r.date,
      source: r.source as TimeSession['source'],
      healthData: r.healthDataType
        ? {
            type: r.healthDataType as NonNullable<
              TimeSession['healthData']
            >['type'],
            details: (r.healthDataDetails ?? undefined) as
              | Record<string, unknown>
              | undefined,
          }
        : undefined,
    }))

    const minutes = unproductiveMinutesToday(sessions)
    const limitMinutes = unproductiveBudgetLimitMinutes(goals, sessions)
    const isOverLimit =
      limitMinutes > 0 ? minutes >= limitMinutes : minutes > 0
    const remainingMinutes = Math.max(0, limitMinutes - minutes)
    const budgetProgress = unproductiveBudgetProgressParts(goals, sessions)

    return NextResponse.json({
      date,
      unproductiveMinutes: minutes,
      limitMinutes,
      isOverLimit,
      remainingMinutes,
      budgetFraction: Math.round(budgetProgress.fraction * 10_000) / 10_000,
      budgetCreditedMinutes: budgetProgress.creditedMinutes,
      budgetTotalTargetMinutes: budgetProgress.totalTargetMinutes,
    })
  } catch (e) {
    console.error('GET /api/limits/status', e)
    return NextResponse.json(
      { error: 'Failed to compute limits' },
      { status: 500 }
    )
  }
}

