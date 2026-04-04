import type { TimeSession } from '@/types/task'
import {
  effectiveSessionDurationMs,
  type DailyGoalDef,
} from '@/lib/goalConfig'
import { getLocalDateString } from '@/lib/dateUtils'

function formatGoalLine(g: DailyGoalDef): string {
  const t = g.targetMinutes
  const h = Math.floor(t / 60)
  const m = t % 60
  let dur: string
  if (h > 0 && m > 0) dur = `${h}h ${m}m`
  else if (h > 0) dur = `${h}h`
  else dur = `${t} min`
  return `- ${g.label}: ${dur} target`
}

function goalsBlock(goals: DailyGoalDef[]): string[] {
  if (!goals.length) return []
  return ['Goals:', ...goals.map(formatGoalLine), '']
}

/** Drop brief phone / laptop check-ins from exports (noise for LLM). */
const MIN_PHONE_OR_COMPUTER_MS = 2 * 60 * 1000

export function wallDurationMs(
  s: TimeSession,
  activeSessionId?: string | null
): number {
  const active = !s.endTime && s.id === activeSessionId
  if (!s.endTime && !active) return 0
  if (!s.endTime) return Math.max(0, Date.now() - s.startTime.getTime())
  return Math.max(0, s.endTime.getTime() - s.startTime.getTime())
}

export function includeSessionInChatExport(
  s: TimeSession,
  activeSessionId?: string | null
): boolean {
  const active = !s.endTime && s.id === activeSessionId
  if (!s.endTime && !active) return false

  const wall = wallDurationMs(s, activeSessionId)
  if (s.source === 'phone' || s.source === 'timechecker') {
    if (wall < MIN_PHONE_OR_COMPUTER_MS) return false
  }
  return true
}

function fmtClock(d: Date): string {
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function fmtDurationMs(ms: number): string {
  const totalMin = Math.floor(ms / 60000)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  const sec = Math.floor((ms % 60000) / 1000)
  if (h > 0) return `${h}h ${m}m`
  if (totalMin > 0) return `${totalMin}m`
  return `${sec}s`
}

function healthTag(s: TimeSession): string {
  const t = s.healthData?.type
  if (t) return ` health=${t}`
  const legacy = (s as { healthDataType?: string }).healthDataType
  if (legacy) return ` health=${legacy}`
  return ''
}

function formatSessionLine(
  s: TimeSession,
  activeSessionId?: string | null
): string {
  const start = fmtClock(s.startTime)
  const end = s.endTime ? fmtClock(s.endTime) : 'ongoing'
  const wall = wallDurationMs(s, activeSessionId)
  const eff = effectiveSessionDurationMs(s, activeSessionId)
  const src = s.source ?? 'unknown'

  let dur = `wall ${fmtDurationMs(wall)}`
  if (
    s.source === 'anki' &&
    eff > 0 &&
    Math.abs(eff - wall) > 30_000
  ) {
    dur += `, Anki timer ${fmtDurationMs(eff)}`
  }

  const desc = s.description ? ` | ${s.description}` : ''
  const health = healthTag(s)
  return `[${start}–${end}, ${dur}] source=${src}${health} | ${s.activity}${desc}`
}

export function monthBoundsFromYmd(ymd: string): { first: string; last: string } {
  const parts = ymd.split('-')
  const y = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10)
  if (!Number.isFinite(y) || !Number.isFinite(m) || parts.length < 2) {
    return monthBoundsFromYmd(getLocalDateString(new Date()))
  }
  const first = `${y}-${String(m).padStart(2, '0')}-01`
  const lastD = new Date(y, m, 0)
  const last = getLocalDateString(lastD)
  return { first, last }
}

/** All YYYY-MM-DD days in that calendar month (local). */
export function enumerateDaysInMonth(anyDateYmd: string): string[] {
  const { first, last } = monthBoundsFromYmd(anyDateYmd)
  const out: string[] = []
  const cur = new Date(first + 'T12:00:00')
  const end = new Date(last + 'T12:00:00')
  while (cur.getTime() <= end.getTime()) {
    out.push(getLocalDateString(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return out
}

export function buildDayTimelineExport(
  sessions: TimeSession[],
  dateYmd: string,
  activeSessionId?: string | null,
  goals?: DailyGoalDef[]
): string {
  const day = sessions
    .filter((s) => s.date === dateYmd)
    .filter((s) => includeSessionInChatExport(s, activeSessionId))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

  const lines = [`Day: ${dateYmd}`, '', ...goalsBlock(goals ?? [])]

  if (day.length === 0) {
    lines.push('(no sessions)')
  } else {
    for (const s of day) {
      lines.push(formatSessionLine(s, activeSessionId))
    }
  }

  return lines.join('\n')
}

export function buildMonthTimelineExport(
  sessions: TimeSession[],
  anyDateInMonthYmd: string,
  activeSessionId?: string | null,
  goals?: DailyGoalDef[]
): string {
  const { first, last } = monthBoundsFromYmd(anyDateInMonthYmd)
  const allDays = enumerateDaysInMonth(anyDateInMonthYmd)

  const lines = [
    `Month (local): ${first.slice(0, 7)} (${first} … ${last})`,
    '',
    ...goalsBlock(goals ?? []),
  ]

  for (const d of allDays) {
    lines.push(`## ${d}`)
    const daySessions = sessions
      .filter((s) => s.date === d)
      .filter((s) => includeSessionInChatExport(s, activeSessionId))
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    if (daySessions.length === 0) {
      lines.push('(no sessions)')
    } else {
      for (const s of daySessions) {
        lines.push(formatSessionLine(s, activeSessionId))
      }
    }
    lines.push('')
  }

  return lines.join('\n').trimEnd()
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
