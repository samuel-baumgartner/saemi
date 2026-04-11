/** Max difference in ms for start/end when matching a widget session to a web-locked row. */
export const PHONE_LOCK_TIME_MATCH_EPS_MS = 2_000

type Interval = { startMs: number; endMs: number }

function rowInterval(
  startTime: Date,
  endTime: Date | null
): Interval | null {
  if (!endTime) return null
  const startMs = startTime.getTime()
  const endMs = endTime.getTime()
  if (endMs <= startMs) return null
  return { startMs, endMs }
}

/**
 * Whether an incoming phone session is the same wall interval as a user-locked row
 * (edited on web). Used to avoid duplicating that block on the next sync.
 */
export function incomingPhoneSessionMatchesLockedRow(
  incomingStart: Date,
  incomingEnd: Date | null,
  lockedStart: Date,
  lockedEnd: Date | null,
  epsMs: number = PHONE_LOCK_TIME_MATCH_EPS_MS
): boolean {
  const a = rowInterval(incomingStart, incomingEnd)
  const b = rowInterval(lockedStart, lockedEnd)
  if (!a || !b) return false
  return (
    Math.abs(a.startMs - b.startMs) <= epsMs &&
    Math.abs(a.endMs - b.endMs) <= epsMs
  )
}
