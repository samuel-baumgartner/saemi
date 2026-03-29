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

export function aggregateFocusByActivity(
  sessions: { activity: string; startTime: Date; endTime: Date | null }[],
  winStart: Date,
  winEnd: Date
): { activity: string; ms: number }[] {
  const m = new Map<string, number>()
  for (const s of sessions) {
    if (!s.endTime) continue
    const ms = overlapMs(s.startTime, s.endTime, winStart, winEnd)
    if (ms <= 0) continue
    m.set(s.activity, (m.get(s.activity) ?? 0) + ms)
  }
  return Array.from(m.entries())
    .map(([activity, ms]) => ({ activity, ms }))
    .sort((x, y) => y.ms - x.ms)
}

export function formatDurationMs(ms: number): string {
  const mins = Math.round(ms / 60000)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/**
 * Merge TimeChecker segments into continuous "at computer" spans.
 * Gaps shorter than gapMergeMs are treated as one continuous block.
 */
export function mergeComputerUseBlocks(
  sessions: { startTime: Date; endTime?: Date | null }[],
  gapMergeMs = 2 * 60 * 1000
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
