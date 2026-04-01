import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import {
  minutesTowardGoal,
  normalizeStoredGoals,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import type { TimeSession } from '@/types/task'
import { getServerCalendarDateString } from '@/lib/dateUtils'

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

function timingSafeTokenEqual(a: string, b: string): boolean {
  const da = createHash('sha256').update(a, 'utf8').digest()
  const db = createHash('sha256').update(b, 'utf8').digest()
  return timingSafeEqual(da, db)
}

function parseBearerToken(header: string | null): string | null {
  if (!header || !header.startsWith('Bearer ')) return null
  const t = header.slice(7).trim()
  return t.length > 0 ? t : null
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function toTimeSession(row: {
  id: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
}): TimeSession {
  return {
    id: row.id,
    activity: row.activity,
    description: row.description ?? undefined,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    date: row.date,
    source: row.source as TimeSession['source'],
  }
}

/**
 * Read-only daily goals + today's progress for the Android home screen widget.
 * Auth: Authorization: Bearer <WIDGET_API_TOKEN>
 * Server env: WIDGET_API_TOKEN, WIDGET_USER_ID (same as Prisma userId / sign-in email)
 *
 * Query: ?date=YYYY-MM-DD (optional; if omitted, uses CALENDAR_TIMEZONE on server, default Asia/Tokyo)
 */
export async function GET(request: NextRequest) {
  const expected = process.env.WIDGET_API_TOKEN?.trim()
  const userId = process.env.WIDGET_USER_ID?.trim()

  if (!expected || !userId) {
    return NextResponse.json(
      { error: 'Widget API is not configured on the server' },
      { status: 503 }
    )
  }

  const provided = parseBearerToken(request.headers.get('authorization'))
  if (!provided || !timingSafeTokenEqual(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rawDate = request.nextUrl.searchParams.get('date')
  const date =
    rawDate && DATE_RE.test(rawDate)
      ? rawDate
      : getServerCalendarDateString(new Date())

  try {
    const [goalRow, sessionRows] = await Promise.all([
      prisma.userGoalSettings.findUnique({ where: { userId } }),
      prisma.timeSession.findMany({
        where: { userId, date },
        orderBy: { startTime: 'asc' },
      }),
    ])

    const goals = normalizeStoredGoals(goalRow?.goalsJson ?? null)
    const sessions = sessionRows.map(toTimeSession)

    const unproductiveTarget = 120
    const unproductiveDone = unproductiveMinutesToday(sessions)
    const unproductivePct = Math.min(
      100,
      Math.round((unproductiveDone / unproductiveTarget) * 100),
    )
    const unproductiveMet = unproductiveDone >= unproductiveTarget

    const unproductiveRow = {
      id: 'unproductive' as const,
      label: 'Unproductive',
      targetMinutes: unproductiveTarget,
      doneMinutes: unproductiveDone,
      progressPercent: unproductivePct,
      progressLabel: formatProgressLabel(
        unproductiveDone,
        unproductiveTarget,
      ),
      met: unproductiveMet,
    }

    const goalItems = goals.map((g) => {
      const done = minutesTowardGoal(g.id, sessions)
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

    const items = [unproductiveRow, ...goalItems]

    return NextResponse.json({ date, items })
  } catch (e) {
    console.error('GET /api/widget/daily-goals', e)
    return NextResponse.json(
      { error: 'Failed to load widget data' },
      { status: 500 }
    )
  }
}
