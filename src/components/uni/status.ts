import type { UniStatus } from '@/lib/uni/types'

export const STATUS_CELL: Record<UniStatus, string> = {
  done: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  skipped: 'bg-transparent text-zinc-600 border-dashed border-zinc-800 line-through',
  overdue: 'bg-red-500/20 text-red-200 border-red-500/60 shadow-[0_0_14px_-3px_rgba(239,68,68,0.7)]',
  soon: 'bg-amber-400/20 text-amber-200 border-amber-400/60 shadow-[0_0_14px_-3px_rgba(251,191,36,0.7)]',
  open: 'bg-white/[0.03] text-zinc-400 border-white/10',
}

export const STATUS_LABEL: Record<UniStatus, string> = {
  done: 'Done',
  skipped: 'Skipped',
  overdue: 'Overdue',
  soon: 'Due soon',
  open: 'Open',
}

export const COURSE_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#a855f7', '#84cc16']
