'use client'

import { TimeSession } from '@/types/task'
import { effectiveSessionDurationMs } from '@/lib/goalConfig'
import { Trash2, Edit2, Check, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SessionCardProps {
  session: TimeSession
  onUpdate: (id: string, updates: Partial<TimeSession>) => void | Promise<void>
  onDelete: (id: string) => void
  isActive?: boolean
  onAfterSave?: () => void
}

export function SessionCard({
  session,
  onUpdate,
  onDelete,
  isActive = false,
  onAfterSave,
}: SessionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editActivity, setEditActivity] = useState(session.activity)
  const [editDescription, setEditDescription] = useState(session.description || '')
  
  // Helper to convert Date to HH:MM format for time input
  const dateToTimeString = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }
  
  const [editStartTime, setEditStartTime] = useState(dateToTimeString(session.startTime))
  const [editEndTime, setEditEndTime] = useState(
    session.endTime ? dateToTimeString(session.endTime) : ''
  )

  useEffect(() => {
    if (isEditing) return
    setEditActivity(session.activity)
    setEditDescription(session.description || '')
    setEditStartTime(dateToTimeString(session.startTime))
    setEditEndTime(session.endTime ? dateToTimeString(session.endTime) : '')
  }, [session, isEditing])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDuration = () =>
    effectiveSessionDurationMs(session, isActive ? session.id : undefined)

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    if (minutes > 0) {
      return `${minutes}m`
    }
    return `${seconds}s`
  }

  const handleSave = async () => {
    // Convert time strings back to Date objects
    const [startHours, startMinutes] = editStartTime.split(':').map(Number)
    const newStartTime = new Date(session.startTime)
    newStartTime.setHours(startHours, startMinutes, 0, 0)

    let newEndTime: Date | undefined = undefined
    if (editEndTime) {
      const [endHours, endMinutes] = editEndTime.split(':').map(Number)
      newEndTime = new Date(session.endTime || session.startTime)
      newEndTime.setHours(endHours, endMinutes, 0, 0)
    }

    await onUpdate(session.id, {
      activity: editActivity,
      description: editDescription,
      startTime: newStartTime,
      endTime: newEndTime,
    })
    setIsEditing(false)
    onAfterSave?.()
  }

  return (
    <div
      className={`group relative rounded-lg p-4 transition-all ${
        isActive
          ? 'bg-green-500/20 border-2 border-green-500/50'
          : 'bg-black/40 border border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2 mb-3">
              <input
                type="text"
                value={editActivity}
                onChange={(e) => setEditActivity(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white outline-none focus:border-white/30"
                autoFocus
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white/80 text-sm outline-none focus:border-white/30"
                placeholder="Description..."
              />
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <label className="text-white/60 text-xs mb-1 block">Start Time</label>
                  <input
                    type="time"
                    value={editStartTime}
                    onChange={(e) => setEditStartTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-white/60 text-xs mb-1 block">End Time</label>
                  <input
                    type="time"
                    value={editEndTime}
                    onChange={(e) => setEditEndTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-semibold text-white text-lg truncate">
                  {session.activity}
                </h4>
                {session.source === 'phone' && session.userOverridden ? (
                  <span
                    className="shrink-0 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border border-amber-400/40 text-amber-200/90 bg-amber-500/10"
                    title="Edited on web; kept when the phone widget re-syncs"
                  >
                    Web override
                  </span>
                ) : null}
              </div>
              {session.description && (
                <p className="text-white/60 text-sm mb-2">{session.description}</p>
              )}
            </>
          )}

          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/60">
              {formatTime(session.startTime)}
              {session.endTime && ` - ${formatTime(session.endTime)}`}
            </span>
            <span className="flex items-center gap-1 text-white/80 font-medium">
              <Clock size={14} />
              {formatDuration(getDuration())}
            </span>
          </div>
        </div>

        {!isActive && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="p-1.5 rounded hover:bg-green-500/20 text-green-400 transition-colors"
              >
                <Check size={18} />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Edit2 size={18} />
              </button>
            )}
            <button
              onClick={() => onDelete(session.id)}
              className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}









