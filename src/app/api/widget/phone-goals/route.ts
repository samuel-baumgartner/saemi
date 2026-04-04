import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import { minutesTowardGoal, normalizeStoredGoals } from '@/lib/goalConfig'

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

type SessionRow = {
  id: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
  healthDataType?: string | null
  healthDataDetails?: unknown | null
}

type Interval = { start: number; end: number }

function mergeIntervals(xs: Interval[]): Interval[] {
  const segs = xs
    .filter((x) => x.end > x.start)
    .sort((a, b) => a.start - b.start)
  const out: Interval[] = []
  for (const s of segs) {
    const last = out[out.length - 1]
    if (!last || s.start > last.end) out.push({ ...s })
    else last.end = Math.max(last.end, s.end)
  }
  return out
}

function subtractIntervals(base: Interval, cuts: Interval[]): Interval[] {
  if (base.end <= base.start) return []
  if (cuts.length === 0) return [base]
  const out: Interval[] = []
  let cur = base.start
  for (const c of cuts) {
    if (c.end <= cur) continue
    if (c.start >= base.end) break
    const s = Math.max(cur, base.start)
    const e = Math.min(c.start, base.end)
    if (e > s) out.push({ start: s, end: e })
    cur = Math.max(cur, c.end)
    if (cur >= base.end) break
  }
  if (cur < base.end) out.push({ start: cur, end: base.end })
  return out
}

function effectiveSessionsForDate(rows: SessionRow[]): SessionRow[] {
  const phone = rows.filter((r) => r.source === 'phone' && r.endTime)
  const other = rows.filter((r) => r.source !== 'phone' && r.endTime)
  const anki = other.filter((r) => r.source === 'anki')
  const otherNonAnki = other.filter((r) => r.source !== 'anki')

  const phoneCuts = mergeIntervals(
    phone.map((r) => ({ start: r.startTime.getTime(), end: r.endTime!.getTime() }))
  )

  const fragments: SessionRow[] = []
  for (const r of otherNonAnki) {
    const base = { start: r.startTime.getTime(), end: r.endTime!.getTime() }
    const parts = subtractIntervals(base, phoneCuts)
    for (const p of parts) {
      fragments.push({
        ...r,
        startTime: new Date(p.start),
        endTime: new Date(p.end),
      })
    }
  }

  return [...phone, ...fragments, ...anki].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  )
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

/**
 * Read-only goals for phone widgets.
 *
 * Uses phone sessions (source='phone') to override overlapping laptop sessions.
 *
 * Auth: Authorization: Bearer <WIDGET_API_TOKEN>
 * Env: WIDGET_API_TOKEN, WIDGET_USER_ID
 * Query: ?date=YYYY-MM-DD
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
    rawDate && DATE_RE.test(rawDate) ? rawDate : getServerCalendarDateString()

  try {
    const [goalRow, rows] = await Promise.all([
      prisma.userGoalSettings.findUnique({ where: { userId } }),
      prisma.timeSession.findMany({
        where: { userId, date },
        select: {
          id: true,
          activity: true,
          description: true,
          startTime: true,
          endTime: true,
          date: true,
          source: true,
          healthDataType: true,
          healthDataDetails: true,
        },
        orderBy: { startTime: 'asc' },
      }),
    ])

    const effective = effectiveSessionsForDate(rows as SessionRow[])
    const goalsAll = normalizeStoredGoals(goalRow?.goalsJson ?? null)
    const goals = goalsAll.filter((g) => g.id !== 'listening')

    const forGoals = effective.map((r) => {
      const healthData =
        r.healthDataType != null || r.healthDataDetails != null
          ? ({
              type: r.healthDataType,
              details: r.healthDataDetails ?? undefined,
            } as const)
          : undefined
      return {
        id: r.id,
        activity: r.activity,
        description: r.description ?? undefined,
        startTime: r.startTime,
        endTime: r.endTime ?? undefined,
        date: r.date,
        source: r.source,
        ...(healthData ? { healthData } : {}),
      }
    })

    const items = goals.map((g) => {
      const done = minutesTowardGoal(g.id, forGoals as any)
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

    return NextResponse.json({ date, items })
  } catch (e) {
    console.error('GET /api/widget/phone-goals', e)
    return NextResponse.json(
      { error: 'Failed to load widget data' },
      { status: 500 }
    )
  }
}

