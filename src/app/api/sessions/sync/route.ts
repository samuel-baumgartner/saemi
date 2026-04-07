import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** Client shape for sync payload (matches what the client sends today). */
type SyncSessionInput = {
  activity: string
  description?: string | null
  startTime: string
  endTime?: string | null
  date: string
  source?: string
  healthData?: { type?: string; details?: unknown }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const sessionUserId = getDbUserId(session)
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = resolveSessionsOwnerUserId(sessionUserId)

    const body = await request.json()
    const { sessions } = body

    console.log('📥 Received sync request:', {
      isArray: Array.isArray(sessions),
      count: sessions?.length || 0,
      firstSession: sessions?.[0],
      sessionSample: sessions?.slice(0, 2)
    })

    if (!Array.isArray(sessions)) {
      return NextResponse.json(
        { error: 'Sessions must be an array' },
        { status: 400 }
      )
    }

    // Determine the source from the first session
    const source = sessions[0]?.source || 'google-fit'

    // Delete old sessions from this source
    await prisma.timeSession.deleteMany({
      where: {
        userId,
        source: source,
      },
    })

    console.log(`🗑️  Deleted old ${source} sessions`)

    // Create new sessions
    const sessionsToCreate = sessions.map((s: SyncSessionInput) => ({
      userId,
      activity: s.activity,
      description: s.description || null,
      startTime: new Date(s.startTime),
      endTime: s.endTime ? new Date(s.endTime) : null,
      date: s.date,
      source: s.source || 'google-fit',
      healthDataType: s.healthData?.type || null,
      healthDataDetails:
        s.healthData?.details !== undefined && s.healthData?.details !== null
          ? (s.healthData.details as Prisma.InputJsonValue)
          : Prisma.JsonNull,
    }))

    console.log('💾 Saving to database:')
    console.log('  Sessions to save:', sessionsToCreate.length)
    console.log('  First session:', sessionsToCreate[0])
    console.log('  Dates:', sessionsToCreate.map(s => s.date).join(', '))

    const created = await prisma.timeSession.createMany({
      data: sessionsToCreate,
    })

    console.log('  ✅ Saved:', created.count, 'sessions')

    return NextResponse.json({ success: true, count: created.count })
  } catch (error) {
    console.error('POST /api/sessions/sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync sessions' },
      { status: 500 }
    )
  }
}

