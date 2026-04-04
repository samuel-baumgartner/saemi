'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { TimeSession } from '@/types/task'
import { getLocalDateString } from '@/lib/dateUtils'

function sessionFromApiRow(session: any): TimeSession {
  const healthFromDb =
    session.healthDataType != null || session.healthDataDetails != null
      ? {
          type: session.healthDataType ?? undefined,
          details: session.healthDataDetails ?? undefined,
        }
      : session.healthData
  return {
    ...session,
    startTime: new Date(session.startTime),
    endTime: session.endTime ? new Date(session.endTime) : null,
    ...(healthFromDb ? { healthData: healthFromDb } : {}),
  } as TimeSession
}

export function useTimeTracker() {
  const [sessions, setSessions] = useState<TimeSession[]>([])
  const [activeSession, setActiveSession] = useState<TimeSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadSessions = useCallback(async () => {
    try {
      const response = await fetch('/api/sessions')
      if (!response.ok) throw new Error('Failed to fetch sessions')

      const data = await response.json()

      const sessionsWithDates = data.map(sessionFromApiRow)

      setSessions(sessionsWithDates)

      const active = sessionsWithDates.find((s: TimeSession) => !s.endTime)
      setActiveSession(active ?? null)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const scheduleRefetch = () => {
      if (document.visibilityState !== 'visible') return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null
        loadSessions()
      }, 150)
    }

    document.addEventListener('visibilitychange', scheduleRefetch)
    window.addEventListener('focus', scheduleRefetch)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      document.removeEventListener('visibilitychange', scheduleRefetch)
      window.removeEventListener('focus', scheduleRefetch)
    }
  }, [loadSessions])

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
      const sessionWithDates = sessionFromApiRow(created)

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
      const sessionWithDates = sessionFromApiRow(updated)

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
      const sessionWithDates = sessionFromApiRow(created)

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
      const sessionWithDates = sessionFromApiRow(updated)

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
    loadSessions,
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
