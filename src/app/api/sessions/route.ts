import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/sessions - Get all sessions for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let where: any = { userId: session.user.email }

    // Add date range filter if provided
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const sessions = await prisma.timeSession.findMany({
      where,
      orderBy: { startTime: 'asc' },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('GET /api/sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

// POST /api/sessions - Create a new session
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      activity,
      description,
      startTime,
      endTime,
      date,
      source,
      healthData,
    } = body

    const newSession = await prisma.timeSession.create({
      data: {
        userId: session.user.email,
        activity,
        description: description || null,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        date,
        source: source || 'tracked',
        healthDataType: healthData?.type || null,
        healthDataDetails: healthData?.details || null,
      },
    })

    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    console.error('POST /api/sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

