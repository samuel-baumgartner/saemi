import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import { buildLimitStatus } from '@/lib/unproductiveLimit'
import { loadWidgetDayBundleCached } from '@/lib/widgetDayDataCache'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await auth()
  const sessionUserId = getDbUserId(session)
  if (!sessionUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = resolveSessionsOwnerUserId(sessionUserId)
  const { searchParams } = new URL(request.url)
  const rawDate = searchParams.get('date')
  const date =
    rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
      ? rawDate
      : getServerCalendarDateString(new Date())

  try {
    const { goals, sessions, extraMinutes } = await loadWidgetDayBundleCached(
      userId,
      date,
      { bypassCache: true }
    )
    return NextResponse.json(buildLimitStatus(date, goals, sessions, extraMinutes))
  } catch (e) {
    console.error('GET /api/limits/status', e)
    return NextResponse.json(
      { error: 'Failed to compute limits' },
      { status: 500 }
    )
  }
}
