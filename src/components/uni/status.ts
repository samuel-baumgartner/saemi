import type { UniStatus } from '@/lib/uni/types'

export const STATUS_CELL: Record<UniStatus, string> = {
  done: 'bg-emerald-600/90 text-white border-emerald-500',
  skipped: 'bg-zinc-900 text-zinc-600 border-zinc-800 line-through',
  overdue: 'bg-red-600/90 text-white border-red-500',
  soon: 'bg-amber-500/90 text-black border-amber-400',
  open: 'bg-zinc-800 text-zinc-300 border-zinc-700',
}

export const STATUS_LABEL: Record<UniStatus, string> = {
  done: 'Done',
  skipped: 'Skipped',
  overdue: 'Overdue',
  soon: 'Due soon',
  open: 'Open',
}

export const COURSE_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#a855f7', '#84cc16']
