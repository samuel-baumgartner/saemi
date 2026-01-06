'use client'

import { useState } from 'react'
import { useTimeTracker } from '@/hooks/useTimeTracker'
import { ActiveSessionTracker } from '@/components/ActiveSessionTracker'
import { TimelineView } from '@/components/TimelineView'
import { GoogleFitConnect } from '@/components/GoogleFitConnect'
import { AnkiConnect } from '@/components/AnkiConnect'
import SummaryView from '@/components/SummaryView'
import { Calendar, BarChart3 } from 'lucide-react'

interface TaskDashboardProps {
  userId: string
  accessToken?: string
}

export function TaskDashboard({ userId, accessToken }: TaskDashboardProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'summary'>('timeline')
  
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white/60">Loading sessions...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Google Fit Integration */}
      <GoogleFitConnect
        userId={userId}
        accessToken={accessToken}
        onSync={syncHealthSessions}
      />

      {/* Anki Integration */}
      <AnkiConnect
        userId={userId}
        onSync={syncHealthSessions}
      />

      {/* Active Session Tracker */}
      <ActiveSessionTracker
        activeSession={activeSession}
        onStart={startSession}
        onStop={stopSession}
      />

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('timeline')}
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
          onClick={() => setActiveTab('summary')}
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
      {activeTab === 'timeline' ? (
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

