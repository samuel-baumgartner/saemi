'use client'

import { useTimeTracker } from '@/hooks/useTimeTracker'
import { ActiveSessionTracker } from '@/components/ActiveSessionTracker'
import { TimelineView } from '@/components/TimelineView'
import { GoogleFitConnect } from '@/components/GoogleFitConnect'
import { MigrateLocalData } from '@/components/MigrateLocalData'

interface TaskDashboardProps {
  userId: string
}

export function TaskDashboard({ userId }: TaskDashboardProps) {
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
      {/* Migration Tool (shows only if local data exists) */}
      <MigrateLocalData />

      {/* Google Fit Integration */}
      <GoogleFitConnect
        userId={userId}
        onSync={syncHealthSessions}
      />

      {/* Active Session Tracker */}
      <ActiveSessionTracker
        activeSession={activeSession}
        onStart={startSession}
        onStop={stopSession}
      />

      {/* Timeline View */}
      <TimelineView
        sessions={sessions}
        onUpdate={updateSession}
        onDelete={deleteSession}
        onAddManual={addManualSession}
        activeSessionId={activeSession?.id}
      />
    </div>
  )
}

