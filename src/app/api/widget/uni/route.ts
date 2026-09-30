import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { kindLabel } from '@/lib/uni/dates'
import { widgetUserId } from '@/lib/uni/server'
import type { UniKind } from '@/lib/uni/types'

export const dynamic = 'force-dynamic'

const DAY_MS = 24 * 3600 * 1000

/**
 * Open (not done / not skipped) uni deadlines for the Android widget + reminders:
 * overdue from the last 14 days and everything due in the next 21 days.
 */
export async function GET(request: NextRequest) {
  const userId = widgetUserId(request.headers.get('authorization'))
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now = Date.now()
  try {
    const rows = await prisma.uniItem.findMany({
      where: {
        userId,
        done: false,
        skipped: false,
        dueAt: { gte: new Date(now - 14 * DAY_MS), lte: new Date(now + 21 * DAY_MS) },
      },
      include: { course: { select: { name: true, color: true, hasQuiz: true } } },
      orderBy: { dueAt: 'asc' },
      take: 60,
    })
    const items = rows
      .filter((r) => r.kind === 'exercise' || r.course.hasQuiz)
      .map((r) => ({
        id: r.id,
        courseId: r.courseId,
        course: r.course.name,
        color: r.course.color,
        kind: r.kind,
        week: r.week,
        label: kindLabel(r.kind as UniKind, r.week),
        dueAt: r.dueAt!.toISOString(),
        dueAtMs: r.dueAt!.getTime(),
        overdue: r.dueAt!.getTime() < now,
      }))
    return NextResponse.json({ now, items })
  } catch (e) {
    console.error('GET /api/widget/uni', e)
    return NextResponse.json({ error: 'Failed to load uni deadlines' }, { status: 500 })
  }
}
