'use client'

import { useEffect, useState } from 'react'
import { TimeSession } from '@/types/task'
import { SessionCard } from './SessionCard'
import { TimelineGraph } from './TimelineGraph'
import { ManualSessionForm } from './ManualSessionForm'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  List,
  BarChart3,
  ClipboardCopy,
  X,
} from 'lucide-react'
import {
  getCalendarTodayString,
  getCalendarYesterdayString,
  getLocalDateString,
} from '@/lib/dateUtils'
import { useSubjectSuggestions } from '@/hooks/useSubjectSuggestions'
import {
  effectiveSessionDurationMs,
  DEFAULT_DAILY_GOALS,
  normalizeStoredGoals,
  type DailyGoalDef,
} from '@/lib/goalConfig'
import {
  buildDayTimelineExport,
  buildMonthTimelineExport,
  copyTextToClipboard,
} from '@/lib/timelineChatExport'

interface TimelineViewProps {
  sessions: TimeSession[]
  onUpdate: (id: string, updates: Partial<TimeSession>) => void | Promise<void>
  onDelete: (id: string) => void | Promise<void>
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
  const [selectedDate, setSelectedDate] = useState(getCalendarTodayString())
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [copyNote, setCopyNote] = useState<{ text: string; ok: boolean } | null>(
    null
  )
  const [graphEditSession, setGraphEditSession] = useState<TimeSession | null>(null)
  const [exportGoals, setExportGoals] = useState<DailyGoalDef[]>(() =>
    normalizeStoredGoals(null)
  )
  const SHORT_SESSION_MS = 5 * 60 * 1000

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const r = await fetch('/api/user/goals', { cache: 'no-store' })
        if (!r.ok) throw new Error('goals fetch failed')
        const data = await r.json()
        const g = normalizeStoredGoals(data.goals)
        if (!cancelled) setExportGoals(g)
      } catch {
        if (!cancelled) setExportGoals(normalizeStoredGoals(null))
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  /** Drop very short wall-time-only crumbs; duration uses Anki study timers when present. */
  const hideAsShortSession = (durationMs: number) =>
    durationMs > 0 && durationMs < SHORT_SESSION_MS

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const subjectSuggestions = useSubjectSuggestions(sessions)
  const activitySuggestions = Array.from(
    new Set([
      ...DEFAULT_DAILY_GOALS.map((g) => g.label),
      ...exportGoals.map((g) => g.label),
      ...subjectSuggestions,
    ])
  )
  const effectiveViewMode = isSmallScreen ? 'list' : viewMode

  const sortedSessionDates = [...new Set(sessions.map((s) => s.date))].sort()
  const sessionDateRangeHint =
    sortedSessionDates.length > 0
      ? `${sortedSessionDates[0]} → ${sortedSessionDates[sortedSessionDates.length - 1]}`
      : null

  const isToday = selectedDate === getCalendarTodayString()

  const daySessionsAll = sessions
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

  const daySessions = daySessionsAll.filter((session) => {
    if (!session.endTime && session.id === activeSessionId) return true
    if (!session.endTime) return false
    const ms = effectiveSessionDurationMs(session, activeSessionId)
    return !hideAsShortSession(ms)
  })

  const shortHiddenCount = daySessionsAll.reduce((acc, session) => {
    if (!session.endTime) return acc
    const ms = effectiveSessionDurationMs(session, activeSessionId)
    return hideAsShortSession(ms) ? acc + 1 : acc
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
    setSelectedDate(getCalendarTodayString())
  }

  const goToLatestSessionDay = () => {
    if (sortedSessionDates.length === 0) return
    setSelectedDate(sortedSessionDates[sortedSessionDates.length - 1])
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')

    if (dateStr === getCalendarTodayString()) {
      return 'Today'
    }
    if (dateStr === getCalendarYesterdayString()) {
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
    return daySessionsAll.reduce(
      (total, session) => total + effectiveSessionDurationMs(session, activeSessionId),
      0
    )
  }

  const getWorkTime = () => {
    // Exclude Google Fit health data (sleep and exercise)
    return daySessionsAll
      .filter((session) => {
        // Exclude sleep sessions
        if (session.source === 'google-fit' && session.healthData?.type === 'sleep') {
          return false
        }
        // Exclude workout/exercise sessions
        if (session.source === 'google-fit' && session.healthData?.type === 'workout') {
          return false
        }
        return true
      })
      .reduce(
        (total, session) =>
          total + effectiveSessionDurationMs(session, activeSessionId),
        0
      )
  }

  const formatTotalTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const flashCopy = (text: string, ok: boolean) => {
    setCopyNote({ text, ok })
    window.setTimeout(() => setCopyNote(null), 2500)
  }

  const handleCopyDayForChat = async () => {
    const text = buildDayTimelineExport(
      sessions,
      selectedDate,
      activeSessionId,
      exportGoals
    )
    const ok = await copyTextToClipboard(text)
    flashCopy(
      ok ? 'Day copied — paste into ChatGPT (Cmd+V)' : 'Could not copy (clipboard denied)',
      ok
    )
  }

  const handleCopyMonthForChat = async () => {
    const text = buildMonthTimelineExport(
      sessions,
      selectedDate,
      activeSessionId,
      exportGoals
    )
    const ok = await copyTextToClipboard(text)
    flashCopy(
      ok ? 'Month copied — paste into ChatGPT (Cmd+V)' : 'Could not copy (clipboard denied)',
      ok
    )
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

        <div className="flex items-center gap-3 flex-wrap">
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

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyDayForChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/30 text-violet-100 text-sm transition-colors"
                title="Raw timeline for this day (overlaps kept). Excludes phone/laptop under 2m."
              >
                <ClipboardCopy size={16} />
                Copy day for ChatGPT
              </button>
              <button
                type="button"
                onClick={handleCopyMonthForChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 border border-violet-400/25 text-violet-200/90 text-sm transition-colors"
                title="Whole calendar month of the selected day. Same rules as day export."
              >
                <ClipboardCopy size={16} />
                Copy month
              </button>
            </div>
            {copyNote && (
              <p
                className={`text-xs max-w-[280px] ${
                  copyNote.ok ? 'text-emerald-300/90' : 'text-amber-200/90'
                }`}
              >
                {copyNote.text}
              </p>
            )}
          </div>

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
          <p className="text-white/60 max-w-md mx-auto">
            {sessions.length > 0 ? (
              <>
                No entries on <span className="text-white/80">{selectedDate}</span>. The timeline
                only shows rows for the day you select — sleep and Fit sync are stored on their
                calendar dates (often not &quot;today&quot;).
                {sessionDateRangeHint ? (
                  <>
                    {' '}
                    Loaded data spans <span className="text-white/80">{sessionDateRangeHint}</span>
                    .
                  </>
                ) : null}{' '}
                Use ← → or the button below ({sessions.length} session
                {sessions.length !== 1 ? 's' : ''} loaded).
              </>
            ) : isToday ? (
              'Start tracking or add a manual entry'
            ) : (
              'No activity tracked on this day'
            )}
          </p>
          {sessions.length > 0 && sessionDateRangeHint ? (
            <button
              type="button"
              onClick={goToLatestSessionDay}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-100 text-sm font-medium"
            >
              Go to latest day with data
            </button>
          ) : null}
        </div>
      ) : effectiveViewMode === 'graph' ? (
        <TimelineGraph
          sessions={daySessions}
          onSessionClick={(session) => setGraphEditSession(session)}
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
              activitySuggestions={activitySuggestions}
            />
          ))}
        </div>
      )}

      {graphEditSession ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="presentation"
          onClick={() => setGraphEditSession(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-zinc-950 p-4 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="graph-edit-session-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 id="graph-edit-session-title" className="text-lg font-semibold text-white">
                Edit session
              </h3>
              <button
                type="button"
                onClick={() => setGraphEditSession(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-white/50 mb-3">
              Phone rows you save here stay as you set them when the widget syncs again.
            </p>
            <SessionCard
              key={graphEditSession.id}
              session={graphEditSession}
              onUpdate={onUpdate}
              onDelete={async (id) => {
                await onDelete(id)
                setGraphEditSession(null)
              }}
              isActive={graphEditSession.id === activeSessionId}
              onAfterSave={() => setGraphEditSession(null)}
              activitySuggestions={activitySuggestions}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

