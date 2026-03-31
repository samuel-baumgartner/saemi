import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { unproductiveMinutesToday } from '@/lib/goalConfig'
import { TimeSession } from '@/types/task'
import { getServerCalendarDateString } from '@/lib/dateUtils'

const DEFAULT_LIMIT_MINUTES = 120

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.email
  const { searchParams } = new URL(request.url)
  const rawDate = searchParams.get('date')
  const date =
    rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
      ? rawDate
      : getServerCalendarDateString(new Date())

  try {
    const rows = await prisma.timeSession.findMany({
      where: { userId, date },
      orderBy: { startTime: 'asc' },
    })

    const sessions: TimeSession[] = rows.map((r: any) => ({
      id: r.id,
      activity: r.activity,
      description: r.description ?? undefined,
      startTime: r.startTime,
      endTime: r.endTime ?? undefined,
      date: r.date,
      source: r.source,
      healthData: r.healthDataType
        ? {
            type: r.healthDataType,
            details: r.healthDataDetails ?? undefined,
          }
        : undefined,
    }))

    const minutes = unproductiveMinutesToday(sessions)
    const limitMinutes = DEFAULT_LIMIT_MINUTES
    const isOverLimit = minutes >= limitMinutes
    const remainingMinutes = Math.max(0, limitMinutes - minutes)

    return NextResponse.json({
      date,
      unproductiveMinutes: minutes,
      limitMinutes,
      isOverLimit,
      remainingMinutes,
    })
  } catch (e) {
    console.error('GET /api/limits/status', e)
    return NextResponse.json(
      { error: 'Failed to compute limits' },
      { status: 500 }
    )
  }
}

