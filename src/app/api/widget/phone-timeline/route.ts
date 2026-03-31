import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import { getServerCalendarDateString } from '@/lib/dateUtils'

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
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
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

  const phoneCuts = mergeIntervals(
    phone.map((r) => ({ start: r.startTime.getTime(), end: r.endTime!.getTime() }))
  )

  const fragments: SessionRow[] = []
  for (const r of other) {
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

  return [...phone, ...fragments].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  )
}

function mergeAdjacent(
  rows: SessionRow[],
  gapMs = 60_000
): SessionRow[] {
  const xs = rows
    .filter((r) => r.endTime && r.endTime.getTime() > r.startTime.getTime())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  const out: SessionRow[] = []
  for (const r of xs) {
    const last = out[out.length - 1]
    if (
      last &&
      last.activity === r.activity &&
      last.source === r.source &&
      last.endTime &&
      r.startTime.getTime() <= last.endTime.getTime() + gapMs
    ) {
      last.endTime = new Date(Math.max(last.endTime.getTime(), r.endTime!.getTime()))
      continue
    }
    out.push({ ...r })
  }
  return out
}

function mins(a: Date, b: Date) {
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000))
}

/**
 * Timeline blocks for phone widgets (list-friendly).
 *
 * Auth: Authorization: Bearer <WIDGET_API_TOKEN>
 * Env: WIDGET_API_TOKEN, WIDGET_USER_ID
 * Query:
 *   ?date=YYYY-MM-DD
 *   ?limit=40 (optional)
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
  const limitRaw = request.nextUrl.searchParams.get('limit')
  const limit =
    limitRaw && /^\d{1,3}$/.test(limitRaw) ? Math.min(120, Math.max(5, Number(limitRaw))) : 40

  try {
    const rows = await prisma.timeSession.findMany({
      where: { userId, date, endTime: { not: null } },
      select: {
        activity: true,
        description: true,
        startTime: true,
        endTime: true,
        date: true,
        source: true,
      },
      orderBy: { startTime: 'asc' },
    })

    const effective = effectiveSessionsForDate(rows as SessionRow[])
    const merged = mergeAdjacent(effective, 60_000)
    const trimmed = merged.slice(-limit)

    return NextResponse.json({
      date,
      items: trimmed.map((r) => ({
        activity: r.activity,
        source: r.source,
        startTime: r.startTime.toISOString(),
        endTime: r.endTime!.toISOString(),
        minutes: mins(r.startTime, r.endTime!),
      })),
    })
  } catch (e) {
    console.error('GET /api/widget/phone-timeline', e)
    return NextResponse.json(
      { error: 'Failed to load widget data' },
      { status: 500 }
    )
  }
}

