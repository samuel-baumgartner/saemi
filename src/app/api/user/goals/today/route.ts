import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { getDailyGoalsPayloadForUser } from '@/lib/widgetDailyGoalsShared'

export const dynamic = 'force-dynamic'

/**
 * Today's goal progress — uses WIDGET_USER_ID so web always shows the same
 * numbers as the Android widget.  Falls back to the signed-in user when
 * WIDGET_USER_ID is not configured.
 */
export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    const sessionUserId = getDbUserId(session)
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = process.env.WIDGET_USER_ID?.trim() || sessionUserId

    const { date: d, items } = await getDailyGoalsPayloadForUser(userId, null)
    return NextResponse.json({ date: d, items })
  } catch (e) {
    console.error('GET /api/user/goals/today', e)
    return NextResponse.json(
      { error: "Failed to load today's goal progress" },
      { status: 500 }
    )
  }
}
