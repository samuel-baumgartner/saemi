import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import {
  unproductiveBudgetLimitMinutes,
  unproductiveBudgetProgressParts,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import { loadWidgetDayBundleCached } from '@/lib/widgetDayDataCache'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

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
    const { goals, sessions } = await loadWidgetDayBundleCached(userId, date)
    const minutes = unproductiveMinutesToday(sessions)
    const limitMinutes = unproductiveBudgetLimitMinutes(goals, sessions)
    const isOverLimit =
      limitMinutes > 0 ? minutes >= limitMinutes : minutes > 0
    const budgetProgress = unproductiveBudgetProgressParts(goals, sessions)

    return NextResponse.json({
      date,
      unproductiveMinutes: minutes,
      limitMinutes,
      isOverLimit,
      remainingMinutes: Math.max(0, limitMinutes - minutes),
      budgetFraction: Math.round(budgetProgress.fraction * 10_000) / 10_000,
      budgetCreditedMinutes: budgetProgress.creditedMinutes,
      budgetTotalTargetMinutes: budgetProgress.totalTargetMinutes,
    })
  } catch (e) {
    console.error('GET /api/widget/limits-status', e)
    return NextResponse.json(
      { error: 'Failed to load limit status' },
      { status: 500 }
    )
  }
}

