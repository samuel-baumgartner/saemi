'use client'

import { useState, useEffect } from 'react'
import { TimeSession } from '@/types/task'
import { Play, Square, Clock } from 'lucide-react'

interface ActiveSessionTrackerProps {
  activeSession: TimeSession | null
  onStart: (activity: string, description?: string) => void
  onStop: () => void
}

export function ActiveSessionTracker({
  activeSession,
  onStart,
  onStop,
}: ActiveSessionTrackerProps) {
  const [activity, setActivity] = useState('')
  const [description, setDescription] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)

  // Update elapsed time for active session
  useEffect(() => {
    if (!activeSession) {
      setElapsedTime(0)
      return
    }

    const updateTime = () => {
      const elapsed = new Date().getTime() - activeSession.startTime.getTime()
      setElapsedTime(elapsed)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [activeSession])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const h = hours.toString().padStart(2, '0')
    const m = (minutes % 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')

    return `${h}:${m}:${s}`
  }

  const handleStart = () => {
    if (!activity.trim()) return
    onStart(activity, description)
    setActivity('')
    setDescription('')
  }

  const handleStop = () => {
    onStop()
  }

  if (activeSession) {
    return (
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 font-semibold">Currently Tracking</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {activeSession.activity}
        </h3>
        {activeSession.description && (
          <p className="text-white/60 mb-4">{activeSession.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="text-white/60" size={24} />
            <span className="text-3xl font-mono font-bold text-white">
              {formatTime(elapsedTime)}
            </span>
          </div>

          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Square size={20} />
            Stop Tracking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Start Tracking</h3>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="What are you working on?"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors text-lg"
            autoFocus
          />
        </div>

        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Additional notes (optional)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!activity.trim()}
          className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 disabled:bg-white/10 disabled:text-white/40 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          <Play size={20} />
          Start Tracking
        </button>
      </div>
    </div>
  )
}










