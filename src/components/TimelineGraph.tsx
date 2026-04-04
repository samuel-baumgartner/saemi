'use client'

import { TimeSession } from '@/types/task'
import { useState, useEffect } from 'react'
import {
  aggregateFocusByActivity,
  COMPUTER_USE_VISUAL_MERGE_GAP_MS,
  formatDurationMs,
  mergeComputerUseBlocks,
} from '@/lib/focusInfo'

interface TimelineGraphProps {
  sessions: TimeSession[]
  onSessionClick?: (session: TimeSession) => void
}

type FocusSource = 'timechecker' | 'phone'
type FocusBlock = { source: FocusSource; start: Date; end: Date }

const DAY_MS = 24 * 60 * 60 * 1000
const MIN_BAR_HEIGHT_PCT = (20 * 1000 / DAY_MS) * 100 // ~20s of the day column

function msIntoLocalDay(d: Date): number {
  const z = new Date(d)
  z.setHours(0, 0, 0, 0)
  return d.getTime() - z.getTime()
}

/** Full-ms positioning (old code used only clock minutes, which broke short sessions). */
function getRangePosition(start: Date, end: Date) {
  const startMs = msIntoLocalDay(start)
  const rawDur = Math.max(0, end.getTime() - start.getTime())
  const topPct = (startMs / DAY_MS) * 100
  const heightPct = Math.min((rawDur / DAY_MS) * 100, 100 - topPct)
  return {
    top: `${topPct}%`,
    height: `${Math.max(heightPct, MIN_BAR_HEIGHT_PCT)}%`,
  }
}

/** Anki bars use summed review timers so height matches goals / Anki stats. */
function getSessionPosition(session: TimeSession) {
  const end = session.endTime ?? new Date()
  const startMs = msIntoLocalDay(session.startTime)
  let durMs = Math.max(0, end.getTime() - session.startTime.getTime())
  if (session.source === 'anki') {
    const st = session.healthData?.details?.studyTimeMs
    if (st != null && Number.isFinite(Number(st)) && Number(st) > 0) {
      durMs = Number(st)
    }
  }
  const topPct = (startMs / DAY_MS) * 100
  const heightPct = Math.min((durMs / DAY_MS) * 100, 100 - topPct)
  return {
    top: `${topPct}%`,
    height: `${Math.max(heightPct, MIN_BAR_HEIGHT_PCT)}%`,
  }
}

function resolveFocusBlocksNoOverlap(
  computerBlocks: { start: Date; end: Date }[],
  phoneBlocks: { start: Date; end: Date }[]
): FocusBlock[] {
  type Raw = { source: FocusSource; start: number; end: number }
  const raws: Raw[] = [
    ...computerBlocks.map((b) => ({
      source: 'timechecker' as const,
      start: b.start.getTime(),
      end: b.end.getTime(),
    })),
    ...phoneBlocks.map((b) => ({
      source: 'phone' as const,
      start: b.start.getTime(),
      end: b.end.getTime(),
    })),
  ].filter((x) => x.end > x.start)

  if (!raws.length) return []

  const points = Array.from(new Set(raws.flatMap((r) => [r.start, r.end]))).sort(
    (a, b) => a - b
  )
  const out: FocusBlock[] = []

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    if (b <= a) continue

    const active = raws.filter((r) => r.start < b && r.end > a)
    if (!active.length) continue

    let winner = active[0]
    for (const r of active.slice(1)) {
      // Overlap rule:
      // - session ending earlier wins the overlap (matches user examples)
      // - if same end, later start wins (more specific inner slice)
      if (r.end < winner.end || (r.end === winner.end && r.start > winner.start)) {
        winner = r
      }
    }

    const last = out[out.length - 1]
    if (
      last &&
      last.source === winner.source &&
      last.end.getTime() === a
    ) {
      last.end = new Date(b)
    } else {
      out.push({
        source: winner.source,
        start: new Date(a),
        end: new Date(b),
      })
    }
  }
  return out
}

export function TimelineGraph({ sessions, onSessionClick }: TimelineGraphProps) {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null)
  const [hoveredFocusKey, setHoveredFocusKey] = useState<string | null>(null)
  const [focusModal, setFocusModal] = useState<{
    source: FocusSource
    start: Date
    end: Date
  } | null>(null)

  const timecheckerSessions = sessions.filter((s) => s.source === 'timechecker')
  const phoneSessions = sessions.filter((s) => s.source === 'phone')
  const otherSessions = sessions.filter(
    (s) => s.source !== 'timechecker' && s.source !== 'phone'
  )

  const computerBlocks = mergeComputerUseBlocks(
    timecheckerSessions,
    COMPUTER_USE_VISUAL_MERGE_GAP_MS
  )
  const phoneBlocks = mergeComputerUseBlocks(
    phoneSessions,
    COMPUTER_USE_VISUAL_MERGE_GAP_MS
  )
  const resolvedFocusBlocks = resolveFocusBlocksNoOverlap(computerBlocks, phoneBlocks)

  const breakdownForModal = focusModal
    ? aggregateFocusByActivity(
        (focusModal.source === 'phone' ? phoneSessions : timecheckerSessions).map((s) => ({
          activity: s.activity,
          startTime: s.startTime,
          endTime: s.endTime ?? new Date(),
          healthData: s.healthData,
        })),
        focusModal.start,
        focusModal.end
      )
    : []

  useEffect(() => {
    if (!focusModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocusModal(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusModal])

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDuration = (session: TimeSession) => {
    const end = session.endTime || new Date()
    let ms = end.getTime() - session.startTime.getTime()
    if (session.source === 'anki') {
      const st = session.healthData?.details?.studyTimeMs
      if (st != null && Number.isFinite(Number(st)) && Number(st) > 0) {
        ms = Number(st)
      }
    }
    const minutes = Math.floor(ms / 60000)
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    const secs = Math.floor((ms % 60000) / 1000)

    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    if (minutes > 0) {
      return `${mins}m`
    }
    return secs > 0 ? `${secs}s` : '0s'
  }

  const getColorForActivity = (activity: string) => {
    const colors = [
      'bg-blue-500/70 hover:bg-blue-500/90 border-blue-400/50',
      'bg-purple-500/70 hover:bg-purple-500/90 border-purple-400/50',
      'bg-green-500/70 hover:bg-green-500/90 border-green-400/50',
      'bg-yellow-500/70 hover:bg-yellow-500/90 border-yellow-400/50',
      'bg-pink-500/70 hover:bg-pink-500/90 border-pink-400/50',
      'bg-cyan-500/70 hover:bg-cyan-500/90 border-cyan-400/50',
      'bg-orange-500/70 hover:bg-orange-500/90 border-orange-400/50',
      'bg-red-500/70 hover:bg-red-500/90 border-red-400/50',
    ]

    let hash = 0
    for (let i = 0; i < activity.length; i++) {
      hash = activity.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="flex gap-2 min-w-[680px]">
        <div className="flex flex-col justify-between text-xs text-white/40 w-12 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-10 flex items-start">
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
          <div className="h-0 flex items-start">24:00</div>
        </div>

        <div className="flex-1 relative min-w-0 border-l border-white/10">
          {hours.map((hour) => (
            <div key={hour} className="h-10 border-b border-white/5" />
          ))}

          {/* Resolved focus beams (computer + phone, no overlap) */}
          {resolvedFocusBlocks.map((block, index) => {
            const position = getRangePosition(block.start, block.end)
            const key = `focus-${index}-${block.source}-${block.start.getTime()}`
            const isHovered = hoveredFocusKey === key
            const totalMs = block.end.getTime() - block.start.getTime()
            const showBeamLabel = totalMs >= 35 * 60 * 1000
            const isPhone = block.source === 'phone'
            const beamClass = isPhone
              ? 'border-violet-400/60 bg-violet-600/30 hover:bg-violet-500/40'
              : 'border-cyan-400/60 bg-cyan-600/35 hover:bg-cyan-500/45'
            const titleClass = isPhone ? 'text-violet-100' : 'text-cyan-100'
            const subtitleClass = isPhone ? 'text-violet-200/90' : 'text-cyan-200/90'
            const ringClass = isPhone ? 'ring-violet-300/40' : 'ring-cyan-300/40'

            return (
              <button
                key={key}
                type="button"
                className={`absolute left-0 right-0 mx-0.5 rounded-lg border-2 transition-all text-left z-[5] antialiased ${beamClass} ${
                  isHovered ? `z-[6] ring-2 ring-inset ${ringClass}` : ''
                }`}
                style={position}
                onMouseEnter={() => setHoveredFocusKey(key)}
                onMouseLeave={() => setHoveredFocusKey(null)}
                onClick={() =>
                  setFocusModal({
                    source: block.source,
                    start: block.start,
                    end: block.end,
                  })
                }
              >
                {showBeamLabel && (
                  <div className="px-2 py-1 h-full flex flex-col justify-center overflow-hidden pointer-events-none select-none">
                    <div className={`font-semibold text-sm truncate leading-tight ${titleClass}`}>
                      {isPhone ? 'Phone use' : 'Computer use'}
                    </div>
                    <div className={`text-xs leading-tight mt-0.5 truncate ${subtitleClass}`}>
                      {formatTime(block.start)} – {formatTime(block.end)}
                    </div>
                    {isHovered && (
                      <div className="text-xs text-white/70 mt-0.5">
                        {formatDurationMs(totalMs)} · Click for breakdown
                      </div>
                    )}
                  </div>
                )}
              </button>
            )
          })}

          {otherSessions.map((session) => {
            const position = getSessionPosition(session)
            const isHovered = hoveredSession === session.id
            const isActive = !session.endTime
            const ms = (session.endTime ?? new Date()).getTime() - session.startTime.getTime()
            const showSessionLabel = ms >= 25 * 60 * 1000

            return (
              <div
                key={session.id}
                className={`absolute left-0 right-0 mx-1 rounded border-l-4 cursor-pointer transition-[box-shadow,filter] z-[8] ${
                  isActive
                    ? 'bg-green-500/70 hover:bg-green-500/90 border-green-400 animate-pulse'
                    : getColorForActivity(session.activity)
                } ${
                  isHovered
                    ? 'z-[9] ring-2 ring-inset ring-white/35 brightness-110 shadow-md shadow-black/40'
                    : ''
                }`}
                style={position}
                onMouseEnter={() => setHoveredSession(session.id)}
                onMouseLeave={() => setHoveredSession(null)}
                onClick={() => onSessionClick?.(session)}
              >
                {showSessionLabel && (
                  <div className="px-2 py-1 h-full flex flex-col justify-center overflow-hidden">
                    <div className="font-semibold text-white text-sm truncate">
                      {session.activity}
                    </div>
                    <div className="text-xs text-white/80">
                      {formatTime(session.startTime)} -{' '}
                      {session.endTime ? formatTime(session.endTime) : 'now'}
                    </div>
                    {isHovered && (
                      <div className="text-xs text-white/60 mt-1">
                        {getDuration(session)}
                        {session.description && ` • ${session.description}`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {(() => {
            const now = new Date()
            const currentPercent =
              ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * 100

            return (
              <div
                className="absolute left-0 right-0 border-t-2 border-red-500 z-20 pointer-events-none"
                style={{ top: `${currentPercent}%` }}
              >
                <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full" />
              </div>
            )
          })()}
        </div>
      </div>
      </div>

      {focusModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="focus-modal-title"
          onClick={() => setFocusModal(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-cyan-500/30 bg-zinc-950 shadow-xl shadow-cyan-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-white/10 px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  id="focus-modal-title"
                  className="text-lg font-bold text-white"
                >
                  {focusModal.source === 'phone' ? 'Phone use' : 'Computer use'}
                </h2>
                <p className="text-sm text-cyan-200/80 mt-1">
                  {formatTime(focusModal.start)} – {formatTime(focusModal.end)} ·{' '}
                  {formatDurationMs(
                    focusModal.end.getTime() - focusModal.start.getTime()
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFocusModal(null)}
                className="rounded-lg px-3 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="px-5 py-4 max-h-[min(60vh,420px)] overflow-y-auto">
              {breakdownForModal.length === 0 ? (
                <p className="text-white/50 text-sm">
                  No app-level breakdown for this range (no TimeChecker segments
                  overlap).
                </p>
              ) : (
                <ul className="space-y-2">
                  {breakdownForModal.map(({ activity, ms }) => (
                    <li
                      key={activity}
                      className="flex justify-between gap-4 border-b border-white/10 py-2 text-sm"
                    >
                      <span className="text-white">{activity}</span>
                      <span className="text-white/70 shrink-0 tabular-nums">
                        {formatDurationMs(ms)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
