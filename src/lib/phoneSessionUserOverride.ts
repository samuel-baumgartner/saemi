/** Max difference in ms for start/end when matching a widget session to a web-locked row. */
export const PHONE_LOCK_TIME_MATCH_EPS_MS = 2_000

/** Treat intervals as the same block if Jaccard(overlap/union) is at least this (phone vs web times often differ by ~1m). */
const PHONE_LOCK_JACCARD_MIN = 0.42

/** Ignore overlaps shorter than this when using Jaccard (noise / unrelated touch). */
const PHONE_LOCK_MIN_OVERLAP_MS = 45_000

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

/**
 * Whether an incoming phone row should not be inserted because a web-locked (`userOverridden`)
 * phone row already represents that block — exact match or strong wall-clock overlap
 * (phone durations often differ by a minute from UI-edited times).
 */
export function incomingPhoneSessionSuppressedByLockedRow(
  incomingStart: Date,
  incomingEnd: Date | null,
  lockedStart: Date,
  lockedEnd: Date | null,
  epsMs: number = PHONE_LOCK_TIME_MATCH_EPS_MS
): boolean {
  if (
    incomingPhoneSessionMatchesLockedRow(
      incomingStart,
      incomingEnd,
      lockedStart,
      lockedEnd,
      epsMs
    )
  ) {
    return true
  }
  const a = rowInterval(incomingStart, incomingEnd)
  const b = rowInterval(lockedStart, lockedEnd)
  if (!a || !b) return false
  const overlapMs = Math.max(
    0,
    Math.min(a.endMs, b.endMs) - Math.max(a.startMs, b.startMs)
  )
  if (overlapMs < PHONE_LOCK_MIN_OVERLAP_MS) return false
  const unionMs =
    Math.max(a.endMs, b.endMs) - Math.min(a.startMs, b.startMs)
  if (unionMs <= 0) return false
  const jaccard = overlapMs / unionMs
  return jaccard >= PHONE_LOCK_JACCARD_MIN
}
