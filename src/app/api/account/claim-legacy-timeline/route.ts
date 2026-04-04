import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { prisma } from '@/lib/prisma'
import { reassignTimelineUserData } from '@/lib/timelineUserReassign'

/**
 * Manual merge: move rows from another `userId` into the current canonical account.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const toUserId = getDbUserId(session)
    if (!toUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body: { fromUserId?: unknown }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const fromRaw = typeof body.fromUserId === 'string' ? body.fromUserId.trim() : ''
    if (fromRaw.length < 3 || fromRaw.length > 320) {
      return NextResponse.json(
        { error: 'fromUserId must be a non-empty string (the email you used before)' },
        { status: 400 }
      )
    }

    if (fromRaw.toLowerCase() === toUserId.toLowerCase()) {
      return NextResponse.json({ error: 'Old and new accounts are the same' }, { status: 400 })
    }

    const sessionCount = await prisma.timeSession.count({
      where: { userId: { equals: fromRaw, mode: 'insensitive' } },
    })
    const goalRow = await prisma.userGoalSettings.findFirst({
      where: { userId: { equals: fromRaw, mode: 'insensitive' } },
    })
    const logCount = await prisma.focusSyncLog.count({
      where: { userId: { equals: fromRaw, mode: 'insensitive' } },
    })

    if (sessionCount === 0 && !goalRow && logCount === 0) {
      return NextResponse.json(
        { error: 'No saved data found for that account id' },
        { status: 404 }
      )
    }

    const result = await reassignTimelineUserData(fromRaw, toUserId)

    return NextResponse.json({ success: true, ...result })
  } catch (e) {
    console.error('POST /api/account/claim-legacy-timeline', e)
    return NextResponse.json({ error: 'Failed to merge account data' }, { status: 500 })
  }
}
