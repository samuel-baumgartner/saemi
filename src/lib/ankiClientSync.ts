import { AnkiConnectService } from '@/lib/anki'
import { getLocalDateString } from '@/lib/dateUtils'

const DEFAULT_GAP_MIN = 10
const DEFAULT_IMPORT_DAYS = 14

export type AnkiSyncPayload = {
  id: string
  activity: string
  description: string
  startTime: string
  endTime: string
  date: string
  source: 'anki'
  healthData: {
    type: 'study'
    details: {
      cards: number
      deck?: string
      studyTimeMs: number
    }
  }
}

export type AnkiFetchResult = {
  sessions: AnkiSyncPayload[]
  /** AnkiConnect reachable (desktop Anki running with add-on). */
  connectOk: boolean
}

function parsePrefs(userId: string): { gapMinutes: number; days: number } {
  const gapStr = localStorage.getItem(`anki_session_gap_${userId}`)
  const daysStr = localStorage.getItem(`anki_import_days_${userId}`)
  const gapMinutes = gapStr ? parseInt(gapStr, 10) : DEFAULT_GAP_MIN
  const days = daysStr ? parseInt(daysStr, 10) : DEFAULT_IMPORT_DAYS
  return {
    gapMinutes: Number.isFinite(gapMinutes) && gapMinutes > 0 ? gapMinutes : DEFAULT_GAP_MIN,
    days: Number.isFinite(days) && days > 0 ? days : DEFAULT_IMPORT_DAYS,
  }
}

/**
 * Pull Anki sessions via AnkiConnect (localhost). Safe to call on every health sync:
 * returns empty sessions with connectOk false when desktop Anki is not running.
 */
export async function fetchAnkiSessionsForUser(
  userId: string
): Promise<AnkiFetchResult> {
  try {
    const service = new AnkiConnectService()
    const connectOk = await service.testConnection()
    if (!connectOk) return { sessions: [], connectOk: false }

    const { gapMinutes, days } = parsePrefs(userId)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const reviews = await service.getReviews(startDate, endDate)
    if (reviews.length === 0) return { sessions: [], connectOk: true }

    const studySessions = AnkiConnectService.convertToStudySessions(
      reviews,
      gapMinutes
    )
    const sessions: AnkiSyncPayload[] = studySessions.map((session, index) => ({
      id: `anki-${session.startTime.getTime()}-${index}`,
      activity: '📚 Anki Study',
      description: `${session.cards} cards reviewed`,
      startTime: session.startTime.toISOString(),
      endTime: session.endTime.toISOString(),
      date: getLocalDateString(session.startTime),
      source: 'anki',
      healthData: {
        type: 'study',
        details: {
          cards: session.cards,
          deck: session.deck,
          studyTimeMs: session.studyTimeMs,
        },
      },
    }))
    return { sessions, connectOk: true }
  } catch {
    return { sessions: [], connectOk: false }
  }
}
