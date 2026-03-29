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

function getRangePosition(start: Date, end: Date) {
  const startPercent =
    ((start.getHours() * 60 + start.getMinutes()) / (24 * 60)) * 100
  const endPercent =
    ((end.getHours() * 60 + end.getMinutes()) / (24 * 60)) * 100
  const height = endPercent - startPercent
  return {
    top: `${startPercent}%`,
    height: `${Math.max(height, 0.6)}%`,
  }
}

function getSessionPosition(session: TimeSession) {
  const end = session.endTime ?? new Date()
  return getRangePosition(session.startTime, end)
}

export function TimelineGraph({ sessions, onSessionClick }: TimelineGraphProps) {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null)
  const [hoveredBeamIndex, setHoveredBeamIndex] = useState<number | null>(null)
  const [beamModal, setBeamModal] = useState<{
    start: Date
    end: Date
  } | null>(null)

  const timecheckerSessions = sessions.filter((s) => s.source === 'timechecker')
  const otherSessions = sessions.filter((s) => s.source !== 'timechecker')

  const computerBlocks = mergeComputerUseBlocks(
    timecheckerSessions,
    COMPUTER_USE_VISUAL_MERGE_GAP_MS
  )

  const breakdownForModal = beamModal
    ? aggregateFocusByActivity(
        timecheckerSessions.map((s) => ({
          activity: s.activity,
          startTime: s.startTime,
          endTime: s.endTime ?? new Date(),
          healthData: s.healthData,
        })),
        beamModal.start,
        beamModal.end
      )
    : []

  useEffect(() => {
    if (!beamModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBeamModal(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [beamModal])

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDuration = (session: TimeSession) => {
    const end = session.endTime || new Date()
    const ms = end.getTime() - session.startTime.getTime()
    const minutes = Math.floor(ms / 60000)
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
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
      <div className="flex gap-2">
        <div className="flex flex-col justify-between text-xs text-white/40 w-12 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-10 flex items-start">
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
          <div className="h-0 flex items-start">24:00</div>
        </div>

        <div className="flex-1 relative border-l border-white/10">
          {hours.map((hour) => (
            <div key={hour} className="h-10 border-b border-white/5" />
          ))}

          {/* Merged computer use (TimeChecker) — one beam per continuous stretch */}
          {computerBlocks.map((block, index) => {
            const position = getRangePosition(block.start, block.end)
            const isHovered = hoveredBeamIndex === index
            const totalMs = block.end.getTime() - block.start.getTime()

            return (
              <button
                key={`beam-${index}-${block.start.getTime()}`}
                type="button"
                className={`absolute left-0 right-0 mx-0.5 rounded-lg border-2 border-cyan-400/60 bg-cyan-600/35 hover:bg-cyan-500/45 transition-all text-left z-[5] antialiased ${
                  isHovered ? 'z-[6] ring-2 ring-cyan-300/40' : ''
                }`}
                style={position}
                onMouseEnter={() => setHoveredBeamIndex(index)}
                onMouseLeave={() => setHoveredBeamIndex(null)}
                onClick={() => setBeamModal({ start: block.start, end: block.end })}
              >
                <div className="px-2 py-1 h-full flex flex-col justify-center overflow-hidden pointer-events-none select-none">
                  <div className="font-semibold text-cyan-100 text-sm truncate leading-tight">
                    Computer use
                  </div>
                  <div className="text-xs text-cyan-200/90 leading-tight mt-0.5 truncate">
                    {formatTime(block.start)} – {formatTime(block.end)}
                  </div>
                  {isHovered && (
                    <div className="text-xs text-white/70 mt-0.5">
                      {formatDurationMs(totalMs)} · Click for app breakdown
                    </div>
                  )}
                </div>
              </button>
            )
          })}

          {otherSessions.map((session) => {
            const position = getSessionPosition(session)
            const isHovered = hoveredSession === session.id
            const isActive = !session.endTime

            return (
              <div
                key={session.id}
                className={`absolute left-0 right-0 mx-1 rounded border-l-4 cursor-pointer transition-all z-[8] ${
                  isActive
                    ? 'bg-green-500/70 hover:bg-green-500/90 border-green-400 animate-pulse'
                    : getColorForActivity(session.activity)
                } ${isHovered ? 'z-[9] scale-[1.02]' : ''}`}
                style={position}
                onMouseEnter={() => setHoveredSession(session.id)}
                onMouseLeave={() => setHoveredSession(null)}
                onClick={() => onSessionClick?.(session)}
              >
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

      {beamModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="computer-use-modal-title"
          onClick={() => setBeamModal(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-cyan-500/30 bg-zinc-950 shadow-xl shadow-cyan-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-white/10 px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <h2
                  id="computer-use-modal-title"
                  className="text-lg font-bold text-white"
                >
                  Computer use
                </h2>
                <p className="text-sm text-cyan-200/80 mt-1">
                  {formatTime(beamModal.start)} – {formatTime(beamModal.end)} ·{' '}
                  {formatDurationMs(
                    beamModal.end.getTime() - beamModal.start.getTime()
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBeamModal(null)}
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
