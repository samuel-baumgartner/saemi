import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import { grantUnproductiveExtra } from '@/lib/unproductiveExtraGrant'

export const dynamic = 'force-dynamic'

/** Browser extension: claim extra unproductive minutes after holding the unlock button. */
export async function POST() {
  const session = await auth()
  const sessionUserId = getDbUserId(session)
  if (!sessionUserId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const status = await grantUnproductiveExtra(
      resolveSessionsOwnerUserId(sessionUserId),
      'browser'
    )
    return NextResponse.json(status)
  } catch (e) {
    console.error('POST /api/limits/extra', e)
    return NextResponse.json({ error: 'Failed to grant extra time' }, { status: 500 })
  }
}
