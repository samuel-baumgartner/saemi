import { createHash, timingSafeEqual } from 'crypto'
import { Prisma } from '@prisma/client'
import type { UniCourse as DbCourse, UniItem as DbItem } from '@prisma/client'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import type { UniCourse, UniDueRule, UniItem, UniKind } from './types'

/** Same owner as the Android widget (`WIDGET_USER_ID`) so phone and web see one dataset. */
export async function uniUserId(): Promise<string | null> {
  const id = getDbUserId(await auth())
  return id ? resolveSessionsOwnerUserId(id) : null
}

function tokenEqual(a: string, b: string): boolean {
  const da = createHash('sha256').update(a, 'utf8').digest()
  const db = createHash('sha256').update(b, 'utf8').digest()
  return timingSafeEqual(da, db)
}

/** Bearer `WIDGET_API_TOKEN` auth for the Android app; returns the owner id or null. */
export function widgetUserId(authorization: string | null): string | null {
  const expected = process.env.WIDGET_API_TOKEN?.trim()
  const userId = process.env.WIDGET_USER_ID?.trim()
  if (!expected || !userId || !authorization?.startsWith('Bearer ')) return null
  const provided = authorization.slice(7).trim()
  return provided && tokenEqual(provided, expected) ? userId : null
}

export function parseRule(raw: unknown): UniDueRule | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const weekday = Number(r.weekday)
  const time = String(r.time ?? '')
  const start = String(r.start ?? '')
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) return null
  if (!/^\d{2}:\d{2}$/.test(time) || !/^\d{4}-\d{2}-\d{2}$/.test(start)) return null
  return { weekday, time, start }
}

export function parseDue(raw: unknown): Date | null | undefined {
  if (raw === undefined) return undefined
  if (raw === null || raw === '') return null
  const d = new Date(String(raw))
  return Number.isNaN(d.getTime()) ? undefined : d
}

export function toCourse(c: DbCourse): UniCourse {
  return {
    id: c.id,
    name: c.name,
    color: c.color,
    hasQuiz: c.hasQuiz,
    position: c.position,
    notes: c.notes,
    exerciseRule: parseRule(c.exerciseRule),
    quizRule: parseRule(c.quizRule),
  }
}

export function toItem(i: DbItem): UniItem {
  return {
    id: i.id,
    courseId: i.courseId,
    week: i.week,
    kind: i.kind as UniKind,
    done: i.done,
    skipped: i.skipped,
    notes: i.notes,
    dueAt: i.dueAt ? i.dueAt.toISOString() : null,
    dueManual: i.dueManual,
    points: i.points,
  }
}

export function ruleJson(rule: UniDueRule | null): Prisma.InputJsonValue | typeof Prisma.DbNull {
  return rule ? (rule as unknown as Prisma.InputJsonValue) : Prisma.DbNull
}
