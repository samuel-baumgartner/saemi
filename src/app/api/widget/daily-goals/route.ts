import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { getWidgetDailyGoalsPayload } from '@/lib/widgetDailyGoalsPayload'
import { getServerCalendarDateString } from '@/lib/dateUtils'

function timingSafeTokenEqual(a: string, b: string): boolean {
  const da = createHash('sha256').update(a, 'utf8').digest()
  const db = createHash('sha256').update(b, 'utf8').digest()
  return timingSafeEqual(da, db)
}

function parseBearerToken(header: string | null): string | null {
  if (!header || !header.startsWith('Bearer ')) return null
  const t = header.slice(7).trim()
  return t.length > 0 ? t : null
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Read-only daily goals + today's progress for the Android home screen widget.
 * Auth: Authorization: Bearer <WIDGET_API_TOKEN>
 * Server env: WIDGET_API_TOKEN, WIDGET_USER_ID (same as Prisma userId / sign-in email)
 *
 * Query: ?date=YYYY-MM-DD (optional; if omitted, uses CALENDAR_TIMEZONE on server, default Asia/Tokyo)
 */
export async function GET(request: NextRequest) {
  const expected = process.env.WIDGET_API_TOKEN?.trim()
  const userId = process.env.WIDGET_USER_ID?.trim()

  if (!expected || !userId) {
    return NextResponse.json(
      { error: 'Widget API is not configured on the server' },
      { status: 503 }
    )
  }

  const provided = parseBearerToken(request.headers.get('authorization'))
  if (!provided || !timingSafeTokenEqual(provided, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rawDate = request.nextUrl.searchParams.get('date')
  const date =
    rawDate && DATE_RE.test(rawDate)
      ? rawDate
      : getServerCalendarDateString(new Date())

  try {
    const { date: d, items } = await getWidgetDailyGoalsPayload(userId, date)
    return NextResponse.json({ date: d, items })
  } catch (e) {
    console.error('GET /api/widget/daily-goals', e)
    return NextResponse.json(
      { error: 'Failed to load widget data' },
      { status: 500 }
    )
  }
}
