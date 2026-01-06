import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// POST /api/sessions/sync - Sync health sessions (replaces old health data)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessions } = body

    if (!Array.isArray(sessions)) {
      return NextResponse.json(
        { error: 'Sessions must be an array' },
        { status: 400 }
      )
    }

    const userId = session.user.email

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
    const sessionsToCreate = sessions.map((s: any) => ({
      userId,
      activity: s.activity,
      description: s.description || null,
      startTime: new Date(s.startTime),
      endTime: s.endTime ? new Date(s.endTime) : null,
      date: s.date,
      source: s.source || 'google-fit',
      healthDataType: s.healthData?.type || null,
      healthDataDetails: s.healthData?.details || null,
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

