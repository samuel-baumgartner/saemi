'use client'

import { TimeSession } from '@/types/task'
import { Trash2, Edit2, Check, Clock } from 'lucide-react'
import { useState } from 'react'

interface SessionCardProps {
  session: TimeSession
  onUpdate: (id: string, updates: Partial<TimeSession>) => void
  onDelete: (id: string) => void
  isActive?: boolean
}

export function SessionCard({
  session,
  onUpdate,
  onDelete,
  isActive = false,
}: SessionCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editActivity, setEditActivity] = useState(session.activity)
  const [editDescription, setEditDescription] = useState(session.description || '')

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDuration = () => {
    if (!session.endTime) {
      const now = new Date()
      return now.getTime() - session.startTime.getTime()
    }
    return session.endTime.getTime() - session.startTime.getTime()
  }

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

  const handleSave = () => {
    onUpdate(session.id, {
      activity: editActivity,
      description: editDescription,
    })
    setIsEditing(false)
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
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-white text-lg mb-1 truncate">
                {session.activity}
              </h4>
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




