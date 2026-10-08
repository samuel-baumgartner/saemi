import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'
import { grantUnproductiveExtra } from '@/lib/unproductiveExtraGrant'

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

/** Android blocker: claim extra unproductive minutes after holding the unlock button. */
export async function POST(request: NextRequest) {
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

  try {
    const result = await grantUnproductiveExtra(userId, 'phone')
    if (!result.ok) {
      return NextResponse.json(
        { error: 'Not blocked right now', status: result.status },
        { status: 409 }
      )
    }
    return NextResponse.json(result.status)
  } catch (e) {
    console.error('POST /api/widget/limits-extra', e)
    return NextResponse.json({ error: 'Failed to grant extra time' }, { status: 500 })
  }
}
