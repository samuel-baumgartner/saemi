import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { createHash, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/prisma'
import { getLocalDateString } from '@/lib/dateUtils'

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

type IncomingPhoneSession = {
  activity: string
  description?: string | null
  startTime: string
  endTime?: string | null
  date?: string
  healthData?: { type?: string; details?: unknown } | null
}

/**
 * POST /api/widget/phone-sessions/sync
 *
 * Token-authenticated (same token as widgets):
 *   Authorization: Bearer <WIDGET_API_TOKEN>
 *
 * Server binds writes to WIDGET_USER_ID.
 *
 * Body:
 *   { date?: "YYYY-MM-DD", sessions: IncomingPhoneSession[] }
 *
 * Behavior:
 * - Deletes existing sessions for that user/date where source === "phone"
 * - Inserts the provided sessions as source === "phone"
 */
export async function POST(request: NextRequest) {
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

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const dateRaw =
    typeof (body as any)?.date === 'string' ? (body as any).date : null
  const date =
    dateRaw && DATE_RE.test(dateRaw) ? dateRaw : getLocalDateString(new Date())

  const sessions = (body as any)?.sessions as unknown
  if (!Array.isArray(sessions)) {
    return NextResponse.json(
      { error: 'Invalid body: expected { sessions: [...] }' },
      { status: 400 }
    )
  }

  for (const s of sessions) {
    if (!s || typeof s !== 'object') {
      return NextResponse.json(
        { error: 'Each session must be an object' },
        { status: 400 }
      )
    }
    if (!(s as any).activity || typeof (s as any).activity !== 'string') {
      return NextResponse.json(
        { error: 'Each session needs activity (string)' },
        { status: 400 }
      )
    }
    if (!(s as any).startTime || typeof (s as any).startTime !== 'string') {
      return NextResponse.json(
        { error: 'Each session needs startTime (ISO string)' },
        { status: 400 }
      )
    }
  }

  try {
    await prisma.timeSession.deleteMany({
      where: { userId, date, source: 'phone' },
    })

    if (sessions.length === 0) {
      return NextResponse.json({ success: true, count: 0, date })
    }

    const rows = (sessions as IncomingPhoneSession[]).map((s) => {
      const jsonDetails =
        s.healthData?.details !== undefined && s.healthData?.details !== null
          ? (s.healthData.details as Prisma.InputJsonValue)
          : undefined
      return {
        userId,
        activity: String(s.activity).slice(0, 200),
        description:
          typeof s.description === 'string'
            ? s.description.slice(0, 500)
            : s.description === null
              ? null
              : null,
        startTime: new Date(s.startTime),
        endTime: s.endTime ? new Date(s.endTime) : null,
        date: (s.date && DATE_RE.test(s.date) ? s.date : date) as string,
        source: 'phone',
        healthDataType: s.healthData?.type ? String(s.healthData.type) : null,
        healthDataDetails: jsonDetails,
      }
    })

    const created = await prisma.timeSession.createMany({ data: rows })
    return NextResponse.json({
      success: true,
      count: created.count,
      date,
    })
  } catch (e) {
    console.error('POST /api/widget/phone-sessions/sync', e)
    return NextResponse.json(
      { error: 'Failed to sync phone sessions' },
      { status: 500 }
    )
  }
}

