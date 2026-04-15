'use client'

import { TimeSession } from '@/types/task'
import { effectiveSessionDurationMs } from '@/lib/goalConfig'
import { Trash2, Edit2, Check, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubjectAutocomplete } from './SubjectAutocomplete'

interface SessionCardProps {
  session: TimeSession
  onUpdate: (id: string, updates: Partial<TimeSession>) => void | Promise<void>
  onDelete: (id: string) => void
  isActive?: boolean
  onAfterSave?: () => void
  activitySuggestions?: string[]
}

function sourceBadge(session: TimeSession): { label: string; className: string } {
  switch (session.source) {
    case 'timechecker':
      return {
        label: 'Laptop · TimeChecker',
        className:
          'border-cyan-500/35 text-cyan-200/90 bg-cyan-500/10',
      }
    case 'phone':
      return {
        label: 'Phone',
        className:
          'border-violet-500/35 text-violet-200/90 bg-violet-500/10',
      }
    case 'anki':
      return {
        label: 'Anki',
        className:
          'border-purple-500/35 text-purple-200/90 bg-purple-500/10',
      }
    case 'google-fit':
      return {
        label: 'Google Fit',
        className:
          'border-blue-500/35 text-blue-200/90 bg-blue-500/10',
      }
    case 'manual':
      return {
        label: 'Manual',
        className:
          'border-white/20 text-white/70 bg-white/5',
      }
    case 'tracked':
      return {
        label: 'Tracked',
        className:
          'border-emerald-500/35 text-emerald-200/90 bg-emerald-500/10',
      }
    default:
      return {
        label: session.source ?? 'Unknown',
        className: 'border-white/15 text-white/50 bg-white/5',
      }
  }
}

export function SessionCard({
  session,
  onUpdate,
  onDelete,
  isActive = false,
  onAfterSave,
  activitySuggestions = [],
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

  const rawDetailsJson =
    session.healthData?.details != null &&
    typeof session.healthData.details === 'object'
      ? JSON.stringify(session.healthData.details, null, 2)
      : null

  const srcBadge = sourceBadge(session)

  const handleSave = async () => {
    const updates: Partial<TimeSession> = {}

    if (editActivity !== session.activity) {
      updates.activity = editActivity
    }
    if (editDescription !== (session.description || '')) {
      updates.description = editDescription
    }

    const originalStart = dateToTimeString(session.startTime)
    if (editStartTime !== originalStart) {
      const [startHours, startMinutes] = editStartTime.split(':').map(Number)
      const newStartTime = new Date(session.startTime)
      newStartTime.setHours(startHours, startMinutes, 0, 0)
      updates.startTime = newStartTime
    }

    const originalEnd = session.endTime ? dateToTimeString(session.endTime) : ''
    if (editEndTime !== originalEnd) {
      if (editEndTime) {
        const [endHours, endMinutes] = editEndTime.split(':').map(Number)
        const newEndTime = new Date(session.endTime || session.startTime)
        newEndTime.setHours(endHours, endMinutes, 0, 0)
        updates.endTime = newEndTime
      }
    }

    if (Object.keys(updates).length > 0) {
      await onUpdate(session.id, updates)
    }
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
              <SubjectAutocomplete
                value={editActivity}
                onChange={setEditActivity}
                placeholder="Activity"
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white outline-none focus:border-white/30"
                suggestions={activitySuggestions}
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
                <span
                  className={`shrink-0 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border ${srcBadge.className}`}
                  title="Where this row came from. Laptop = desktop TimeChecker sync only."
                >
                  {srcBadge.label}
                </span>
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
                <p className="text-white/60 text-sm mb-2 whitespace-pre-wrap break-words">
                  {session.description}
                </p>
              )}
              {rawDetailsJson != null && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer text-white/45 hover:text-white/65 select-none">
                    Raw tracker / health details (JSON)
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto rounded-lg border border-white/10 bg-black/50 p-2 text-left text-[11px] leading-relaxed text-cyan-100/80 font-mono whitespace-pre-wrap break-all">
                    {rawDetailsJson}
                  </pre>
                </details>
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









