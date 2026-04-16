import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { getDailyGoalsPayloadForUser } from '@/lib/widgetDailyGoalsShared'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'

export const dynamic = 'force-dynamic'

/**
 * Goal progress for a calendar day (same rules as the Android widget).
 * Uses WIDGET_USER_ID so web matches widget; falls back to signed-in user when unset.
 *
 * Query: `?date=YYYY-MM-DD` optional — if omitted or invalid, uses server "today"
 * in CALENDAR_TIMEZONE (same as GET /api/widget/daily-goals).
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const sessionUserId = getDbUserId(session)
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = resolveSessionsOwnerUserId(sessionUserId)

    const rawDate = request.nextUrl.searchParams.get('date')
    const { date: d, items } = await getDailyGoalsPayloadForUser(userId, rawDate)
    return NextResponse.json({ date: d, items })
  } catch (e) {
    console.error('GET /api/user/goals/today', e)
    return NextResponse.json(
      { error: 'Failed to load goal progress' },
      { status: 500 }
    )
  }
}
