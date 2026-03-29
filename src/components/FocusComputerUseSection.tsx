'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export type FocusAggregate = { activity: string; ms: number }

export type FocusSegment = {
  activity: string
  startTime: string
  endTime: string
}

function formatDurationMs(ms: number): string {
  const mins = Math.round(ms / 60000)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function getBarColorClass(activity: string): string {
  const colors = [
    'bg-blue-500/85',
    'bg-purple-500/85',
    'bg-green-500/85',
    'bg-yellow-500/85',
    'bg-pink-500/85',
    'bg-cyan-500/85',
    'bg-orange-500/85',
    'bg-red-500/85',
  ]
  let hash = 0
  for (let i = 0; i < activity.length; i++) {
    hash = activity.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

type StripPart = { ms: number; activity?: string; isGap?: boolean }

function buildStripParts(
  segments: FocusSegment[],
  winStartMs: number,
  winEndMs: number
): StripPart[] {
  const windowMs = winEndMs - winStartMs
  if (windowMs <= 0) return []

  const sorted = [...segments].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  )

  const parts: StripPart[] = []
  let cursor = winStartMs

  for (const seg of sorted) {
    const s = Math.max(new Date(seg.startTime).getTime(), winStartMs)
    const e = Math.min(new Date(seg.endTime).getTime(), winEndMs)
    if (e <= s) continue
    if (s > cursor) parts.push({ ms: s - cursor, isGap: true })
    parts.push({ ms: e - s, activity: seg.activity })
    cursor = Math.max(cursor, e)
  }
  if (cursor < winEndMs) parts.push({ ms: winEndMs - cursor, isGap: true })

  return parts
}

interface FocusComputerUseSectionProps {
  title: string
  aggregates: FocusAggregate[]
  segments: FocusSegment[]
  windowStart: string
  windowEnd: string
}

export function FocusComputerUseSection({
  title,
  aggregates,
  segments,
  windowStart,
  windowEnd,
}: FocusComputerUseSectionProps) {
  const [open, setOpen] = useState(false)

  const totalMs = aggregates.reduce((acc, a) => acc + a.ms, 0)
  const winStartMs = new Date(windowStart).getTime()
  const winEndMs = new Date(windowEnd).getTime()
  const stripParts = buildStripParts(segments, winStartMs, winEndMs)
  const windowMs = Math.max(1, winEndMs - winStartMs)

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-3 text-cyan-300">{title}</h2>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left rounded-lg border border-white/15 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium text-white">
          {open ? (
            <ChevronDown className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 text-cyan-400 shrink-0" />
          )}
          Computer use
        </span>
        <span className="text-white/80 tabular-nums shrink-0">
          {formatDurationMs(totalMs)}
        </span>
      </button>

      {open && (
        <div className="mt-3 pl-2 border-l-2 border-cyan-500/30 space-y-4">
          <ul className="space-y-2">
            {aggregates.length === 0 ? (
              <li className="text-white/40 text-sm">No focus data in this window.</li>
            ) : (
              aggregates.map(({ activity, ms }) => (
                <li
                  key={activity}
                  className="flex justify-between border-b border-white/10 py-2 text-sm"
                >
                  <span>{activity}</span>
                  <span className="text-white/70">{formatDurationMs(ms)}</span>
                </li>
              ))
            )}
          </ul>

          {stripParts.some((p) => !p.isGap) && (
            <div>
              <p className="text-xs text-white/45 mb-2">
                Timeline in this window (gaps = no segment in data)
              </p>
              <div
                className="flex h-8 w-full rounded overflow-hidden border border-white/10 bg-black/50"
                title="Computer use segments"
              >
                {stripParts.map((p, i) => {
                  const w = (p.ms / windowMs) * 100
                  if (w < 0.05) return null
                  return (
                    <div
                      key={i}
                      className={`h-full min-w-0 ${
                        p.isGap
                          ? 'bg-white/[0.07]'
                          : getBarColorClass(p.activity ?? '')
                      }`}
                      style={{ width: `${w}%` }}
                      title={
                        p.isGap
                          ? 'Gap'
                          : `${p.activity} (${formatDurationMs(p.ms)})`
                      }
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
