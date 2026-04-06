import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const NO_CACHE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' } as const

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const userId = getDbUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Prisma.TimeSessionWhereInput =
      startDate && endDate
        ? {
            userId,
            startTime: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : { userId }

    const sessions = await prisma.timeSession.findMany({
      where,
      orderBy: { startTime: 'asc' },
    })

    return NextResponse.json(sessions, { headers: NO_CACHE_HEADERS })
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
    const userId = getDbUserId(session)
    if (!userId) {
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
        userId,
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

    return NextResponse.json(newSession, { status: 201, headers: NO_CACHE_HEADERS })
  } catch (error) {
    console.error('POST /api/sessions error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}









