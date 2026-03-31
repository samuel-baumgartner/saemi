import { NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * GET /api/auth/token
 * Returns a fresh Google access token (OAuth refresh runs in the JWT callback).
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()

    if (session?.error === 'RefreshAccessTokenError') {
      return NextResponse.json(
        {
          error: 'Google session expired. Sign out and sign in again to restore Fit access.',
          code: 'NEEDS_REAUTH',
        },
        { status: 401 }
      )
    }

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'No access token available', code: 'NO_ACCESS_TOKEN' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      accessToken: session.accessToken,
    })
  } catch (error) {
    console.error('Failed to get fresh token:', error)
    return NextResponse.json(
      { error: 'Failed to get token' },
      { status: 500 }
    )
  }
}

