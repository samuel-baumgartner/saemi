'use client'

import { TimeSession } from '@/types/task'
import { useState } from 'react'

interface TimelineGraphProps {
  sessions: TimeSession[]
  onSessionClick?: (session: TimeSession) => void
}

export function TimelineGraph({ sessions, onSessionClick }: TimelineGraphProps) {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null)

  // Generate hours array (0-24)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getSessionPosition = (session: TimeSession) => {
    const startHour = session.startTime.getHours()
    const startMinute = session.startTime.getMinutes()
    const startPercent = ((startHour * 60 + startMinute) / (24 * 60)) * 100

    let endHour, endMinute
    if (session.endTime) {
      endHour = session.endTime.getHours()
      endMinute = session.endTime.getMinutes()
    } else {
      // If no end time (active session), use current time
      const now = new Date()
      endHour = now.getHours()
      endMinute = now.getMinutes()
    }
    
    const endPercent = ((endHour * 60 + endMinute) / (24 * 60)) * 100
    const height = endPercent - startPercent

    return {
      top: `${startPercent}%`,
      height: `${Math.max(height, 1)}%`, // Minimum 1% height
    }
  }

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
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  // Generate colors for sessions (consistent per activity)
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
        {/* Time labels */}
        <div className="flex flex-col justify-between text-xs text-white/40 w-12 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-10 flex items-start">
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
          <div className="h-0 flex items-start">24:00</div>
        </div>

        {/* Timeline */}
        <div className="flex-1 relative border-l border-white/10">
          {/* Hour lines */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-10 border-b border-white/5"
            />
          ))}

          {/* Sessions */}
          {sessions.map((session) => {
            const position = getSessionPosition(session)
            const isHovered = hoveredSession === session.id
            const isActive = !session.endTime

            return (
              <div
                key={session.id}
                className={`absolute left-0 right-0 mx-1 rounded border-l-4 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-green-500/70 hover:bg-green-500/90 border-green-400 animate-pulse'
                    : getColorForActivity(session.activity)
                } ${isHovered ? 'z-10 scale-[1.02]' : 'z-0'}`}
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
                    {formatTime(session.startTime)} - {session.endTime ? formatTime(session.endTime) : 'now'}
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

          {/* Current time indicator */}
          {(() => {
            const now = new Date()
            const currentPercent = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * 100
            
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
  )
}









