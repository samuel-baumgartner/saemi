'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTimeTracker } from '@/hooks/useTimeTracker'
import { useSubjectSuggestions } from '@/hooks/useSubjectSuggestions'
import { ActiveSessionTracker } from '@/components/ActiveSessionTracker'
import { TimelineView } from '@/components/TimelineView'
import { GoogleFitConnect } from '@/components/GoogleFitConnect'
import { AnkiConnect } from '@/components/AnkiConnect'
import SummaryView from '@/components/SummaryView'
import { GoalsTab } from '@/components/GoalsTab'
import { Calendar, BarChart3, Target } from 'lucide-react'

/** Set to `true` to show AnkiConnect sync UI again. */
const SHOW_ANKI_SYNC = false

interface TaskDashboardProps {
  userId: string
  accessToken?: string
}

export function TaskDashboard({ userId, accessToken }: TaskDashboardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabFromQuery = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState<'goals' | 'timeline' | 'summary'>(() => {
    if (tabFromQuery === 'goals' || tabFromQuery === 'timeline' || tabFromQuery === 'summary') {
      return tabFromQuery
    }
    if (typeof window === 'undefined') return 'goals'
    try {
      const saved = localStorage.getItem('taskDashboard.activeTab')
      if (saved === 'goals' || saved === 'timeline' || saved === 'summary') {
        return saved
      }
    } catch {
      // ignore storage failures
    }
    return 'goals'
  })

  useEffect(() => {
    try {
      localStorage.setItem('taskDashboard.activeTab', activeTab)
    } catch {
      // ignore storage failures
    }
  }, [activeTab])

  useEffect(() => {
    if (tabFromQuery === 'goals' || tabFromQuery === 'timeline' || tabFromQuery === 'summary') {
      if (tabFromQuery !== activeTab) setActiveTab(tabFromQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabFromQuery])

  const setTab = (tab: 'goals' | 'timeline' | 'summary') => {
    setActiveTab(tab)
    const next = new URLSearchParams(searchParams.toString())
    next.set('tab', tab)
    router.replace(`${pathname}?${next.toString()}`, { scroll: false })
  }

  const previewPhone = searchParams.get('preview') === 'phone'
  const togglePreviewPhone = () => {
    const next = new URLSearchParams(searchParams.toString())
    if (previewPhone) next.delete('preview')
    else next.set('preview', 'phone')
    router.replace(`${pathname}?${next.toString()}`, { scroll: false })
  }
  
  const {
    sessions,
    activeSession,
    isLoading,
    startSession,
    stopSession,
    addManualSession,
    syncHealthSessions,
    updateSession,
    deleteSession,
  } = useTimeTracker()

  const subjectSuggestions = useSubjectSuggestions(sessions)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white/60">Loading sessions...</div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${previewPhone ? 'max-w-[430px] mx-auto rounded-2xl border border-white/10 p-3 bg-black/40' : ''}`}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={togglePreviewPhone}
          className="text-xs px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:bg-white/10"
        >
          {previewPhone ? 'Exit phone preview' : 'Phone preview'}
        </button>
      </div>
      {/* Google Fit Integration */}
      <GoogleFitConnect
        userId={userId}
        accessToken={accessToken}
        onSync={syncHealthSessions}
      />

      {SHOW_ANKI_SYNC && (
        <AnkiConnect userId={userId} onSync={syncHealthSessions} />
      )}

      {/* Active Session Tracker */}
      <ActiveSessionTracker
        activeSession={activeSession}
        onStart={startSession}
        onStop={stopSession}
        subjectSuggestions={subjectSuggestions}
      />

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        <button
          type="button"
          onClick={() => setTab('goals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'goals'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
          }`}
        >
          <Target className="w-4 h-4" />
          Goals
        </button>
        <button
          type="button"
          onClick={() => setTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'timeline'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Timeline
        </button>
        <button
          type="button"
          onClick={() => setTab('summary')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'summary'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Summary
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'goals' ? (
        <GoalsTab sessions={sessions} />
      ) : activeTab === 'timeline' ? (
        <TimelineView
          sessions={sessions}
          onUpdate={updateSession}
          onDelete={deleteSession}
          onAddManual={addManualSession}
          activeSessionId={activeSession?.id}
        />
      ) : (
        <SummaryView sessions={sessions} />
      )}
    </div>
  )
}

