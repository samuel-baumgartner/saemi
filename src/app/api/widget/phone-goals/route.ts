import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { getDailyGoalsPayloadForUser } from '@/lib/widgetDailyGoalsShared'

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

/**
 * Same payload as GET /api/widget/daily-goals (token auth).
 * Kept for compatibility; clients should prefer /api/widget/daily-goals.
 *
 * Auth: Authorization: Bearer <WIDGET_API_TOKEN>
 * Env: WIDGET_API_TOKEN, WIDGET_USER_ID
 * Query: ?date=YYYY-MM-DD
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

  try {
    const { date: d, items } = await getDailyGoalsPayloadForUser(userId, rawDate)
    return NextResponse.json({ date: d, items })
  } catch (e) {
    console.error('GET /api/widget/phone-goals', e)
    return NextResponse.json(
      { error: 'Failed to load widget data' },
      { status: 500 }
    )
  }
}
