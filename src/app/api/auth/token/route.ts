import { NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * GET /api/auth/token
 * Returns a fresh access token for the current user
 * Triggers automatic token refresh via NextAuth
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'No access token available' },
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

