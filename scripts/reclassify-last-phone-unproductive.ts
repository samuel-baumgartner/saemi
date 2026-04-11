/**
 * One-off: reclassify the most recent block of phone "unproductive" time as listening.
 *
 * Usage:
 *   node --env-file=.env.local ./node_modules/tsx/dist/cli.mjs scripts/reclassify-last-phone-unproductive.ts [--dry-run]
 *
 * Selects phone sessions whose activity matches unproductive markers (same as goalConfig),
 * calendar day = today in CALENDAR_TIMEZONE, ordered by endTime descending, until cumulative
 * duration reaches TARGET_MINUTES (default 79).
 */

import { PrismaClient } from '@prisma/client'
import { formatDateYmdInCalendarTz } from '../src/lib/dateUtils'
import {
  matchesUnproductiveTimechecker,
  sessionDurationMinutes,
} from '../src/lib/goalConfig'
import type { TimeSession } from '../src/types/task'

const TARGET_MINUTES = Number(process.env.RECLASSIFY_TARGET_MINUTES ?? 79)
const DRY_RUN = process.argv.includes('--dry-run')

const prisma = new PrismaClient()

function toTaskSession(r: {
  id: string
  userId: string
  activity: string
  description: string | null
  startTime: Date
  endTime: Date | null
  date: string
  source: string
  healthDataType: string | null
  healthDataDetails: unknown
}): TimeSession {
  return {
    id: r.id,
    userId: r.userId,
    activity: r.activity,
    description: r.description,
    startTime: r.startTime,
    endTime: r.endTime,
    date: r.date,
    source: r.source as TimeSession['source'],
    healthData:
      r.healthDataType != null || r.healthDataDetails != null
        ? {
            type: r.healthDataType ?? undefined,
            details: r.healthDataDetails ?? undefined,
          }
        : undefined,
  }
}

function correctedActivity(old: string): string {
  let s = old
  for (const m of ['not productive', 'distracted'] as const) {
    s = s.split(new RegExp(m, 'gi')).join(' ')
  }
  s = s.replace(/\s+/g, ' ').trim()
  if (/listening/i.test(s)) return s.slice(0, 200)
  return `Listening · ${s || 'phone'}`.slice(0, 200)
}

async function main() {
  const today = formatDateYmdInCalendarTz(new Date())
  const widgetUser = process.env.WIDGET_USER_ID?.trim()

  const where: {
    date: string
    source: string
    userId?: string
  } = { date: today, source: 'phone' }
  if (widgetUser) where.userId = widgetUser

  const rows = await prisma.timeSession.findMany({
    where,
    orderBy: { endTime: 'desc' },
  })

  const unproductive = rows.filter(
    (r) =>
      r.source === 'phone' &&
      matchesUnproductiveTimechecker(r.activity)
  )

  const asSessions = unproductive.map(toTaskSession)
  const picked: typeof unproductive = []
  let sum = 0
  for (const r of unproductive) {
    const s = toTaskSession(r)
    const m = sessionDurationMinutes(s, null)
    if (m <= 0) continue
    picked.push(r)
    sum += m
    if (sum >= TARGET_MINUTES) break
  }

  if (picked.length === 0) {
    console.log(
      `No phone unproductive sessions for ${today}${widgetUser ? ` userId=${widgetUser}` : ''}.`
    )
    return
  }

  console.log(
    `${DRY_RUN ? '[dry-run] ' : ''}Calendar day ${today}, target ≥${TARGET_MINUTES} min, picked ${picked.length} session(s), total ${sum} min`
  )
  for (const r of picked) {
    const s = toTaskSession(r)
    const m = sessionDurationMinutes(s, null)
    const next = correctedActivity(r.activity)
    console.log(`  ${m}m  ${r.id}  "${r.activity}" -> "${next}"`)
  }

  if (DRY_RUN) return

  for (const r of picked) {
    const next = correctedActivity(r.activity)
    await prisma.timeSession.update({
      where: { id: r.id },
      data: { activity: next },
    })
  }
  console.log('Updated.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
