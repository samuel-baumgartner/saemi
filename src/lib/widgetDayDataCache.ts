import { prisma } from '@/lib/prisma'
import { excludePhoneDeletionTombstones } from '@/lib/phoneSessionDeletion'
import { normalizeStoredGoals } from '@/lib/goalConfig'
import type { DailyGoalDef } from '@/lib/goalConfig'
import type { TimeSession } from '@/types/task'

const TTL_MS = 45_000
const MAX_ENTRIES = 96

type CacheEntry = {
  at: number
  goals: DailyGoalDef[]
  sessions: TimeSession[]
}

const cache = new Map<string, CacheEntry>()

function cacheKey(userId: string, date: string) {
  return `${userId.toLowerCase()}\n${date}`
}

function prune() {
  while (cache.size > MAX_ENTRIES) {
    let oldestKey: string | null = null
    let oldestAt = Infinity
    for (const [k, v] of cache) {
      if (v.at < oldestAt) {
        oldestAt = v.at
        oldestKey = k
      }
    }
    if (oldestKey) cache.delete(oldestKey)
    else break
  }
}

function rowToTimeSession(row: {
  id: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
  healthDataType?: string | null
  healthDataDetails?: unknown | null
}): TimeSession {
  const healthData =
    row.healthDataType != null || row.healthDataDetails != null
      ? ({
          type: row.healthDataType,
          details: row.healthDataDetails ?? undefined,
        } as TimeSession['healthData'])
      : undefined
  return {
    id: row.id,
    activity: row.activity,
    description: row.description ?? undefined,
    startTime: row.startTime,
    endTime: row.endTime ?? undefined,
    date: row.date,
    source: row.source as TimeSession['source'],
    ...(healthData ? { healthData } : {}),
  }
}

/**
 * One calendar day of goals + sessions for widget-style endpoints.
 * Short TTL in-memory cache cuts duplicate Prisma reads when the phone widget
 * hits several routes or polls frequently (warm serverless instance).
 */
export async function loadWidgetDayBundleCached(
  userId: string,
  date: string,
): Promise<{ goals: DailyGoalDef[]; sessions: TimeSession[] }> {
  const key = cacheKey(userId, date)
  const now = Date.now()
  const hit = cache.get(key)
  if (hit && now - hit.at < TTL_MS) {
    return { goals: hit.goals, sessions: hit.sessions }
  }

  const userIdMatch = { userId: { equals: userId, mode: 'insensitive' as const } }
  const [goalRow, sessionRows] = await Promise.all([
    prisma.userGoalSettings.findFirst({ where: userIdMatch }),
    prisma.timeSession.findMany({
      where: excludePhoneDeletionTombstones({ ...userIdMatch, date }),
      orderBy: { startTime: 'asc' },
    }),
  ])

  const goals = normalizeStoredGoals(goalRow?.goalsJson ?? null)
  const sessions = sessionRows.map(rowToTimeSession)
  cache.set(key, { at: now, goals, sessions })
  prune()
  return { goals, sessions }
}

/** Call after any mutation that affects this user's timeline or goal settings. */
export function invalidateWidgetDayCacheForUser(userId: string) {
  const prefix = `${userId.toLowerCase()}\n`
  for (const k of cache.keys()) {
    if (k.startsWith(prefix)) cache.delete(k)
  }
}
