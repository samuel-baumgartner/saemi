import type { Session } from 'next-auth'

/**
 * Canonical id for timeline DB rows: primary Google email (stable for this account).
 * Populated on sign-in as `session.dbUserId`; falls back to `session.user.email`.
 */
export function getDbUserId(session: Session | null): string | null {
  if (!session?.user) return null
  const extra = session as Session & { dbUserId?: string }
  const fromToken = extra.dbUserId?.trim()
  if (fromToken) return fromToken
  return session.user.email?.trim() || null
}
