'use client'

import { useEffect, useState } from 'react'
import { TimeSession } from '@/types/task'
import { SessionCard } from './SessionCard'
import { TimelineGraph } from './TimelineGraph'
import { ManualSessionForm } from './ManualSessionForm'
import { ChevronLeft, ChevronRight, Calendar, Clock, List, BarChart3 } from 'lucide-react'
import { getTodayString, getLocalDateString } from '@/lib/dateUtils'
import { useSubjectSuggestions } from '@/hooks/useSubjectSuggestions'

interface TimelineViewProps {
  sessions: TimeSession[]
  onUpdate: (id: string, updates: Partial<TimeSession>) => void
  onDelete: (id: string) => void
  onAddManual: (activity: string, startTime: Date, endTime: Date, description?: string) => void
  activeSessionId?: string
}

export function TimelineView({
  sessions,
  onUpdate,
  onDelete,
  onAddManual,
  activeSessionId,
}: TimelineViewProps) {
  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const SHORT_SESSION_MS = 5 * 60 * 1000

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const subjectSuggestions = useSubjectSuggestions(sessions)
  const effectiveViewMode = isSmallScreen ? 'list' : viewMode
  
  const isToday = selectedDate === getTodayString()

  const daySessionsAll = sessions
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

  const getSessionDurationMs = (session: TimeSession) => {
    if (!session.endTime && session.id !== activeSessionId) return 0
    const endTime = session.endTime ? session.endTime.getTime() : new Date().getTime()
    return Math.max(0, endTime - session.startTime.getTime())
  }

  const daySessions = daySessionsAll.filter((session) => {
    if (!session.endTime && session.id === activeSessionId) return true
    if (!session.endTime) return false
    return getSessionDurationMs(session) >= SHORT_SESSION_MS
  })

  const shortHiddenCount = daySessionsAll.reduce((acc, session) => {
    if (!session.endTime) return acc
    return getSessionDurationMs(session) > 0 && getSessionDurationMs(session) < SHORT_SESSION_MS
      ? acc + 1
      : acc
  }, 0)

  const navigateDay = (direction: 'prev' | 'next') => {
    const current = new Date(selectedDate + 'T00:00:00')
    if (direction === 'prev') {
      current.setDate(current.getDate() - 1)
    } else {
      current.setDate(current.getDate() + 1)
    }
    setSelectedDate(getLocalDateString(current))
  }

  const goToToday = () => {
    setSelectedDate(getTodayString())
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateStr === getTodayString()) {
      return 'Today'
    }
    if (dateStr === getLocalDateString(yesterday)) {
      return 'Yesterday'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getTotalTime = () => {
    return daySessionsAll.reduce((total, session) => {
      if (!session.endTime && session.id !== activeSessionId) {
        return total
      }
      const endTime = session.endTime
        ? session.endTime.getTime()
        : new Date().getTime()
      return total + (endTime - session.startTime.getTime())
    }, 0)
  }

  const getWorkTime = () => {
    // Exclude Google Fit health data (sleep and exercise)
    return daySessionsAll
      .filter((session: any) => {
        // Exclude sleep sessions
        if (session.source === 'google-fit' && session.healthDataType === 'sleep') {
          return false
        }
        // Exclude workout/exercise sessions
        if (session.source === 'google-fit' && session.healthDataType === 'workout') {
          return false
        }
        return true
      })
      .reduce((total, session) => {
        if (!session.endTime && session.id !== activeSessionId) {
          return total
        }
        const endTime = session.endTime
          ? session.endTime.getTime()
          : new Date().getTime()
        return total + (endTime - session.startTime.getTime())
      }, 0)
  }

  const formatTotalTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateDay('prev')}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              {formatDate(selectedDate)}
            </h2>
            <p className="text-white/60 text-sm mt-1">
              {daySessions.length} session{daySessions.length !== 1 ? 's' : ''}
              {shortHiddenCount > 0 ? (
                <span className="text-white/40">
                  {' '}
                  (+{shortHiddenCount} under 5m hidden)
                </span>
              ) : null}{' '}
              •{' '}
              {formatTotalTime(getTotalTime())} total
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {formatTotalTime(getWorkTime())} work
            </p>
          </div>

          <button
            onClick={() => navigateDay('next')}
            disabled={isToday}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1">
            {!isSmallScreen && (
              <button
                onClick={() => setViewMode('graph')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'graph'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <BarChart3 size={18} />
                Graph
              </button>
            )}
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                effectiveViewMode === 'list'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <List size={18} />
              List
            </button>
          </div>

          <ManualSessionForm
            onAdd={onAddManual}
            selectedDate={selectedDate}
            subjectSuggestions={subjectSuggestions}
          />

          {!isToday && (
            <button
              onClick={goToToday}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Calendar size={18} />
              Today
            </button>
          )}
        </div>
      </div>

      {/* Timeline Content */}
      {daySessions.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={64} className="text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No sessions recorded
          </h3>
          <p className="text-white/60">
            {isToday
              ? 'Start tracking or add a manual entry'
              : 'No activity tracked on this day'}
          </p>
        </div>
      ) : effectiveViewMode === 'graph' ? (
        <TimelineGraph
          sessions={daySessions}
          onSessionClick={(session) => {
            // Could open edit modal here
            console.log('Clicked session:', session)
          }}
        />
      ) : (
        <div className="space-y-3">
          {daySessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isActive={session.id === activeSessionId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

