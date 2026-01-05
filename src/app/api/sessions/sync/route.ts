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

    // Delete old health sessions (Google Fit data)
    await prisma.timeSession.deleteMany({
      where: {
        userId: session.user.email,
        source: 'google-fit',
      },
    })

    // Create new health sessions
    const created = await prisma.timeSession.createMany({
      data: sessions.map((s: any) => ({
        userId: session.user.email,
        activity: s.activity,
        description: s.description || null,
        startTime: new Date(s.startTime),
        endTime: s.endTime ? new Date(s.endTime) : null,
        date: s.date,
        source: s.source || 'google-fit',
        healthDataType: s.healthData?.type || null,
        healthDataDetails: s.healthData?.details || null,
      })),
    })

    return NextResponse.json({ success: true, count: created.count })
  } catch (error) {
    console.error('POST /api/sessions/sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync sessions' },
      { status: 500 }
    )
  }
}

