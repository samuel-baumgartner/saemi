/** Overlap of [start, end] with [winStart, winEnd] in milliseconds. */
export function overlapMs(
  start: Date,
  end: Date,
  winStart: Date,
  winEnd: Date
): number {
  const a = Math.max(start.getTime(), winStart.getTime())
  const b = Math.min(end.getTime(), winEnd.getTime())
  return Math.max(0, b - a)
}

type SessionSlice = {
  activity: string
  startTime: Date
  endTime: Date | null
  healthData?: { details?: { focusSeconds?: unknown } }
}

function focusSecondsWeight(s: SessionSlice): number | null {
  const v = s.healthData?.details?.focusSeconds
  if (typeof v === 'number' && Number.isFinite(v) && v > 0) return v
  return null
}

/**
 * Sums overlap of each session with [winStart, winEnd].
 * If overlaps double-count wall time (legacy TimeChecker hourly upload placed every
 * rule at the same hour start), scale breakdown to the window using focusSeconds weights.
 */
export function aggregateFocusByActivity(
  sessions: SessionSlice[],
  winStart: Date,
  winEnd: Date
): { activity: string; ms: number }[] {
  const wallMs = Math.max(0, winEnd.getTime() - winStart.getTime())
  if (wallMs <= 0) return []

  let totalOverlap = 0
  const byActivityOverlap = new Map<string, number>()
  const byActivityWeight = new Map<string, number>()

  for (const s of sessions) {
    if (!s.endTime) continue
    const ov = overlapMs(s.startTime, s.endTime, winStart, winEnd)
    if (ov <= 0) continue
    totalOverlap += ov
    byActivityOverlap.set(
      s.activity,
      (byActivityOverlap.get(s.activity) ?? 0) + ov
    )
    const fs = focusSecondsWeight(s)
    const w = fs ?? ov / 1000
    byActivityWeight.set(
      s.activity,
      (byActivityWeight.get(s.activity) ?? 0) + w
    )
  }

  if (byActivityOverlap.size === 0) return []

  if (totalOverlap > wallMs + 1500) {
    const tw = [...byActivityWeight.values()].reduce((a, b) => a + b, 0)
    if (tw <= 0) return []
    return Array.from(byActivityWeight.entries())
      .map(([activity, w]) => ({ activity, ms: (wallMs * w) / tw }))
      .sort((x, y) => y.ms - x.ms)
  }

  return Array.from(byActivityOverlap.entries())
    .map(([activity, ms]) => ({ activity, ms }))
    .sort((x, y) => y.ms - x.ms)
}

export function formatDurationMs(ms: number): string {
  // Floor so "5:00 – 5:56" labels (minute precision) match the shown total.
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return ms > 0 ? '< 1 min' : '0 min'
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/**
 * Default gap for merging adjacent TimeChecker spans on the timeline.
 * Hourly buckets often leave a few minutes “short” of :00; real breaks away
 * from the machine are usually longer than this.
 */
export const COMPUTER_USE_VISUAL_MERGE_GAP_MS = 15 * 60 * 1000

/**
 * Merge TimeChecker segments into continuous "at computer" spans.
 * Gaps shorter than gapMergeMs are treated as one continuous block.
 */
export function mergeComputerUseBlocks(
  sessions: { startTime: Date; endTime?: Date | null }[],
  gapMergeMs = COMPUTER_USE_VISUAL_MERGE_GAP_MS
): { start: Date; end: Date }[] {
  const segments = sessions
    .map((s) => {
      const start = s.startTime.getTime()
      const end = (s.endTime != null ? s.endTime : new Date()).getTime()
      return { start, end }
    })
    .filter((x) => x.end > x.start)
    .sort((a, b) => a.start - b.start)

  const blocks: { start: number; end: number }[] = []
  for (const seg of segments) {
    if (!blocks.length) {
      blocks.push({ ...seg })
      continue
    }
    const last = blocks[blocks.length - 1]
    if (seg.start <= last.end + gapMergeMs) {
      last.end = Math.max(last.end, seg.end)
    } else {
      blocks.push({ ...seg })
    }
  }
  return blocks.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }))
}
