import { useMemo } from 'react'
import { TimeSession } from '@/types/task'

export function useSubjectSuggestions(sessions: TimeSession[]): string[] {
  return useMemo(() => {
    const subjects = new Set<string>()
    
    sessions.forEach((session) => {
      const activity = session.activity?.trim()
      if (activity && activity !== 'Untitled') {
        subjects.add(activity)
      }
    })

    // Return sorted array
    return Array.from(subjects).sort()
  }, [sessions])
}

