import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { prisma } from '@/lib/prisma'
import {
  DEFAULT_DAILY_GOALS,
  normalizeStoredGoals,
  sanitizeGoalsFromClient,
} from '@/lib/goalConfig'

export async function GET() {
  try {
    const session = await auth()
    const userId = getDbUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const row = await prisma.userGoalSettings.findUnique({
      where: { userId },
    })
    const goals = normalizeStoredGoals(row?.goalsJson ?? null)

    return NextResponse.json({ goals, defaults: DEFAULT_DAILY_GOALS })
  } catch (e) {
    console.error('GET /api/user/goals', e)
    return NextResponse.json(
      { error: 'Failed to load goals' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    const userId = getDbUserId(session)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const sanitized = sanitizeGoalsFromClient(body?.goals)
    if (!sanitized) {
      return NextResponse.json(
        { error: 'Invalid body: expected { goals: [...] }' },
        { status: 400 }
      )
    }

    const json = sanitized as unknown as Prisma.InputJsonValue
    await prisma.userGoalSettings.upsert({
      where: { userId },
      create: { userId, goalsJson: json },
      update: { goalsJson: json },
    })

    return NextResponse.json({ goals: sanitized })
  } catch (e) {
    console.error('PUT /api/user/goals', e)
    return NextResponse.json(
      { error: 'Failed to save goals' },
      { status: 500 }
    )
  }
}
