/** Returns true at most once per `intervalMs` (for focus/visibility refetch gates). */
export function createThrottleGate(intervalMs: number): () => boolean {
  let last = 0
  return () => {
    const now = Date.now()
    if (now - last < intervalMs) return false
    last = now
    return true
  }
}
