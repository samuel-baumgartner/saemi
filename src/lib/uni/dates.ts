import type { UniDueRule, UniItem, UniStatus } from './types'

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const SOON_MS = 48 * 3600 * 1000

export function computeDue(rule: UniDueRule, week: number): Date {
  const [y, m, d] = rule.start.split('-').map(Number)
  const [hh, mm] = rule.time.split(':').map(Number)
  const due = new Date(y, m - 1, d, hh || 0, mm || 0)
  const shift = (rule.weekday - due.getDay() + 7) % 7
  due.setDate(due.getDate() + shift + 7 * (week - 1))
  return due
}

export function itemStatus(item: UniItem, now: number): UniStatus {
  if (item.done) return 'done'
  if (item.skipped) return 'skipped'
  if (!item.dueAt) return 'open'
  const diff = new Date(item.dueAt).getTime() - now
  if (diff < 0) return 'overdue'
  if (diff < SOON_MS) return 'soon'
  return 'open'
}

export function formatDue(iso: string | null): string {
  if (!iso) return 'No deadline'
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function relativeDue(iso: string | null, now: number): string {
  if (!iso) return ''
  const diff = new Date(iso).getTime() - now
  const abs = Math.abs(diff)
  const h = Math.round(abs / 3600000)
  const text =
    abs < 3600000 ? `${Math.max(1, Math.round(abs / 60000))} min` : h < 48 ? `${h} h` : `${Math.round(h / 24)} days`
  return diff < 0 ? `${text} ago` : `in ${text}`
}

/** Value for <input type="datetime-local"> in the browser's timezone. */
export function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function kindLabel(kind: UniItem['kind'], week: number): string {
  return `${kind === 'exercise' ? 'Exercise' : 'Quiz'} ${week}`
}

export function todayYmd(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
