'use client'

import { useState, useEffect } from 'react'
import { TimeSession } from '@/types/task'
import { getLocalDateString } from '@/lib/dateUtils'

export function useTimeTracker() {
  const [sessions, setSessions] = useState<TimeSession[]>([])
  const [activeSession, setActiveSession] = useState<TimeSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load sessions from database on mount
  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/sessions')
      if (!response.ok) throw new Error('Failed to fetch sessions')
      
      const data = await response.json()
      
      // Convert date strings back to Date objects
      const sessionsWithDates = data.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : null,
      }))
      
      setSessions(sessionsWithDates)
      
      // Check if there's an active session
      const active = sessionsWithDates.find((s: TimeSession) => !s.endTime)
      if (active) {
        setActiveSession(active)
      }
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const startSession = async (activity: string, description?: string) => {
    // Stop any active session first
    if (activeSession) {
      await stopSession()
    }

    const now = new Date()
    const newSession: Partial<TimeSession> = {
      activity,
      description,
      startTime: now,
      endTime: undefined,
      date: getLocalDateString(now),
      source: 'tracked',
    }

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession),
      })

      if (!response.ok) throw new Error('Failed to create session')

      const created = await response.json()
      const sessionWithDates = {
        ...created,
        startTime: new Date(created.startTime),
        endTime: created.endTime ? new Date(created.endTime) : null,
      }

      setSessions((prev) => [...prev, sessionWithDates])
      setActiveSession(sessionWithDates)
      return sessionWithDates
    } catch (error) {
      console.error('Failed to start session:', error)
      throw error
    }
  }

  const stopSession = async () => {
    if (!activeSession) return

    const now = new Date()

    try {
      const response = await fetch(`/api/sessions/${activeSession.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endTime: now }),
      })

      if (!response.ok) throw new Error('Failed to stop session')

      const updated = await response.json()
      const sessionWithDates = {
        ...updated,
        startTime: new Date(updated.startTime),
        endTime: new Date(updated.endTime),
      }

      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSession.id ? sessionWithDates : session
        )
      )
      setActiveSession(null)
    } catch (error) {
      console.error('Failed to stop session:', error)
      throw error
    }
  }

  const addManualSession = async (
    activity: string,
    startTime: Date,
    endTime: Date,
    description?: string
  ) => {
    const newSession: Partial<TimeSession> = {
      activity,
      description,
      startTime,
      endTime,
      date: getLocalDateString(startTime),
      source: 'manual',
    }

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession),
      })

      if (!response.ok) throw new Error('Failed to create session')

      const created = await response.json()
      const sessionWithDates = {
        ...created,
        startTime: new Date(created.startTime),
        endTime: new Date(created.endTime),
      }

      setSessions((prev) => [...prev, sessionWithDates])
      return sessionWithDates
    } catch (error) {
      console.error('Failed to add manual session:', error)
      throw error
    }
  }

  const syncHealthSessions = async (healthSessions: TimeSession[]) => {
    try {
      console.log('📤 Sending sessions to sync:', {
        count: healthSessions.length,
        firstSession: healthSessions[0],
        sample: healthSessions.slice(0, 2)
      })
      
      const response = await fetch('/api/sessions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessions: healthSessions }),
      })

      console.log('📡 Sync response status:', response.status)
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Sync failed:', errorText)
        throw new Error('Failed to sync health sessions')
      }

      // Reload all sessions from database
      await loadSessions()
    } catch (error) {
      console.error('Failed to sync health sessions:', error)
      throw error
    }
  }

  const updateSession = async (id: string, updates: Partial<TimeSession>) => {
    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error('Failed to update session')

      const updated = await response.json()
      const sessionWithDates = {
        ...updated,
        startTime: new Date(updated.startTime),
        endTime: updated.endTime ? new Date(updated.endTime) : null,
      }

      setSessions((prev) =>
        prev.map((session) => (session.id === id ? sessionWithDates : session))
      )

      if (activeSession?.id === id) {
        setActiveSession(sessionWithDates)
      }
    } catch (error) {
      console.error('Failed to update session:', error)
      throw error
    }
  }

  const deleteSession = async (id: string) => {
    try {
      const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete session')

      setSessions((prev) => prev.filter((session) => session.id !== id))
      if (activeSession?.id === id) {
        setActiveSession(null)
      }
    } catch (error) {
      console.error('Failed to delete session:', error)
      throw error
    }
  }

  const getSessionsByDate = (date: string) => {
    return sessions
      .filter((session) => session.date === date)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  }

  const getTodaySessions = () => {
    const today = new Date().toISOString().split('T')[0]
    return getSessionsByDate(today)
  }

  const getTotalTimeForDate = (date: string) => {
    const daySessions = getSessionsByDate(date)
    return daySessions.reduce((total, session) => {
      if (!session.endTime) {
        return total + (new Date().getTime() - session.startTime.getTime())
      }
      return total + (session.endTime.getTime() - session.startTime.getTime())
    }, 0)
  }

  return {
    sessions,
    activeSession,
    isLoading,
    startSession,
    stopSession,
    addManualSession,
    syncHealthSessions,
    updateSession,
    deleteSession,
    getSessionsByDate,
    getTodaySessions,
    getTotalTimeForDate,
  }
}
