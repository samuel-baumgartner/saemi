import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { mergeTimecheckerDescription } from '@/lib/timecheckerSessionDetails'
import { incomingPhoneSessionSuppressedByLockedRow } from '@/lib/phoneSessionUserOverride'

const SOURCE = 'timechecker'

function bearerMatches(header: string | null, secret: string | undefined): boolean {
  if (!secret || header === null) return false
  const m = /^Bearer\s+(.+)$/i.exec(header.trim())
  if (!m) return false
  const token = m[1]
  if (token.length !== secret.length) return false
  try {
    return timingSafeEqual(Buffer.from(token, 'utf8'), Buffer.from(secret, 'utf8'))
  } catch {
    return false
  }
}

type IncomingSession = {
  activity: string
  description?: string | null
  startTime: string
  endTime?: string | null
  date: string
  source?: string
  healthData?: { type?: string; details?: unknown } | null
}

async function logSync(userId: string, sessionCount: number, message: string) {
  try {
    await prisma.focusSyncLog.create({
      data: { userId, sessionCount, message },
    })
  } catch (e) {
    console.error('FocusSyncLog create failed:', e)
  }
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.TIMECHECKER_SYNC_SECRET
    const userEmail = process.env.TIMECHECKER_SYNC_USER_EMAIL
    const authHeader = request.headers.get('authorization')

    if (!bearerMatches(authHeader, secret)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!userEmail?.trim()) {
      console.error('TIMECHECKER_SYNC_USER_EMAIL is not set')
      return NextResponse.json(
        { error: 'Server misconfigured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { sessions } = body as { sessions?: IncomingSession[] }

    if (!Array.isArray(sessions)) {
      return NextResponse.json(
        { error: 'sessions must be an array' },
        { status: 400 }
      )
    }

    for (const s of sessions) {
      if (!s?.activity || !s?.startTime || !s?.date) {
        return NextResponse.json(
          { error: 'Each session needs activity, startTime, and date' },
          { status: 400 }
        )
      }
    }

    const rows =
      sessions.length === 0
        ? []
        : sessions.map((s) => ({
            userId: userEmail,
            activity: s.activity,
            description: mergeTimecheckerDescription(
              s.description,
              s.healthData?.details
            ),
            startTime: new Date(s.startTime),
            endTime: s.endTime ? new Date(s.endTime) : null,
            date: s.date,
            source: SOURCE,
            healthDataType: s.healthData?.type ?? null,
            healthDataDetails:
              s.healthData?.details !== undefined && s.healthData?.details !== null
                ? (s.healthData.details as Prisma.InputJsonValue)
                : undefined,
          }))

    // Replace non-overridden timechecker rows atomically:
    // - web-edited (`userOverridden=true`) rows are kept
    // - incoming rows that overlap kept rows are suppressed
    // - if insert fails, do NOT leave prior data deleted.
    const created = await prisma.$transaction(async (tx) => {
      const lockedRows = await tx.timeSession.findMany({
        where: { userId: userEmail, source: SOURCE, userOverridden: true },
        select: { startTime: true, endTime: true },
      })

      const rowsToInsert = rows.filter((row) => {
        for (const L of lockedRows) {
          // Reuse the same robust interval suppression used by phone sync.
          if (
            incomingPhoneSessionSuppressedByLockedRow(
              row.startTime,
              row.endTime,
              L.startTime,
              L.endTime
            )
          ) {
            return false
          }
        }
        return true
      })

      await tx.timeSession.deleteMany({
        where: { userId: userEmail, source: SOURCE, userOverridden: false },
      })
      if (rowsToInsert.length === 0) {
        return { count: 0 }
      }
      return tx.timeSession.createMany({ data: rowsToInsert })
    })

    if (sessions.length === 0) {
      await logSync(userEmail, 0, 'ok_empty')
    } else {
      await logSync(userEmail, created.count, 'ok')
    }

    return NextResponse.json({ success: true, count: created.count })
  } catch (error) {
    console.error('POST /api/focus/timechecker/sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync focus sessions' },
      { status: 500 }
    )
  }
}
