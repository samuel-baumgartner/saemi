import type { TimeSession } from '@/types/task'

/** Matches Prisma/widget select shape for goal merging. */
export type GoalSessionRow = {
  id: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
  healthDataType?: string | null
  healthDataDetails?: unknown | null
}

type Interval = { start: number; end: number }

function mergeIntervals(xs: Interval[]): Interval[] {
  const segs = xs
    .filter((x) => x.end > x.start)
    .sort((a, b) => a.start - b.start)
  const out: Interval[] = []
  for (const s of segs) {
    const last = out[out.length - 1]
    if (!last || s.start > last.end) out.push({ ...s })
    else last.end = Math.max(last.end, s.end)
  }
  return out
}

function subtractIntervals(base: Interval, cuts: Interval[]): Interval[] {
  if (base.end <= base.start) return []
  if (cuts.length === 0) return [base]
  const out: Interval[] = []
  let cur = base.start
  for (const c of cuts) {
    if (c.end <= cur) continue
    if (c.start >= base.end) break
    const s = Math.max(cur, base.start)
    const e = Math.min(c.start, base.end)
    if (e > s) out.push({ start: s, end: e })
    cur = Math.max(cur, c.end)
    if (cur >= base.end) break
  }
  if (cur < base.end) out.push({ start: cur, end: base.end })
  return out
}

/**
 * Phone sessions (source=phone) take precedence over overlapping laptop time for
 * non-anki rows (used for timeline / phone-specific views; not for daily goal
 * progress — that uses {@link getWidgetDailyGoalsPayload} raw sessions).
 */
export function effectiveSessionsForDate(rows: GoalSessionRow[]): GoalSessionRow[] {
  const phone = rows.filter((r) => r.source === 'phone' && r.endTime)
  const other = rows.filter((r) => r.source !== 'phone' && r.endTime)
  const anki = other.filter((r) => r.source === 'anki')
  const otherNonAnki = other.filter((r) => r.source !== 'anki')

  const phoneCuts = mergeIntervals(
    phone.map((r) => ({
      start: r.startTime.getTime(),
      end: r.endTime!.getTime(),
    }))
  )

  const fragments: GoalSessionRow[] = []
  for (const r of otherNonAnki) {
    const base = { start: r.startTime.getTime(), end: r.endTime!.getTime() }
    const parts = subtractIntervals(base, phoneCuts)
    for (const p of parts) {
      fragments.push({
        ...r,
        startTime: new Date(p.start),
        endTime: new Date(p.end),
      })
    }
  }

  return [...phone, ...fragments, ...anki].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  )
}

export function timeSessionToGoalSessionRow(s: TimeSession): GoalSessionRow {
  return {
    id: s.id,
    activity: s.activity,
    description: s.description ?? null,
    startTime: s.startTime,
    endTime: s.endTime ?? null,
    date: s.date,
    source: s.source ?? 'tracked',
    healthDataType: s.healthData?.type ?? null,
    healthDataDetails: s.healthData?.details ?? null,
  }
}

export function goalSessionRowToTimeSession(r: GoalSessionRow): TimeSession {
  const healthData =
    r.healthDataType != null || r.healthDataDetails != null
      ? ({
          type: r.healthDataType,
          details: r.healthDataDetails ?? undefined,
        } as TimeSession['healthData'])
      : undefined
  return {
    id: r.id,
    activity: r.activity,
    description: r.description ?? undefined,
    startTime: r.startTime,
    endTime: r.endTime ?? undefined,
    date: r.date,
    source: r.source as TimeSession['source'],
    ...(healthData ? { healthData } : {}),
  }
}

/** Sessions for the day, merged the same way as the phone goals widget. */
export function goalSessionsMergedWithPhone(
  sessionsForOneDay: TimeSession[]
): TimeSession[] {
  const rows = sessionsForOneDay.map(timeSessionToGoalSessionRow)
  const effective = effectiveSessionsForDate(rows)
  return effective.map(goalSessionRowToTimeSession)
}
