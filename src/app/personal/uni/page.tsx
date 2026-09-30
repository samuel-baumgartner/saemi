'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, Plus } from 'lucide-react'
import { formatDue, itemStatus, kindLabel } from '@/lib/uni/dates'
import { KIND_SHORT, UNI_WEEKS, type UniCourse, type UniItem, type UniKind } from '@/lib/uni/types'
import { useUni } from '@/components/uni/UniStore'
import { useOpenItem } from '@/components/uni/UniShell'
import { AddCourse } from '@/components/uni/AddCourse'
import { STATUS_CELL } from '@/components/uni/status'
import { HScroll } from '@/components/uni/HScroll'

const weeks = Array.from({ length: UNI_WEEKS }, (_, i) => i + 1)

function Cell({
  item,
  kind,
  week,
  now,
  onOpen,
}: {
  item?: UniItem
  kind: UniKind
  week: number
  now: number
  onOpen: (id: string) => void
}) {
  if (!item) return <div className="h-8 w-8" />
  const status = itemStatus(item, now)
  return (
    <button
      onClick={() => onOpen(item.id)}
      title={kind === 'lecture' ? kindLabel(kind, week) : `${kindLabel(kind, week)} \u00b7 ${formatDue(item.dueAt)}`}
      className={`relative flex h-8 w-8 items-center justify-center rounded-lg border text-[11px] font-semibold transition duration-150 hover:-translate-y-px hover:brightness-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 ${STATUS_CELL[status]}`}
    >
      {item.done ? <Check size={14} strokeWidth={3} /> : KIND_SHORT[kind]}
      {item.notes && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-zinc-950" />
      )}
    </button>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded border ${className}`} /> {label}
    </span>
  )
}

function Badge({ tone, children }: { tone: 'red' | 'amber'; children: React.ReactNode }) {
  const styles =
    tone === 'red' ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-amber-400/30 bg-amber-400/10 text-amber-200'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}>
      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${tone === 'red' ? 'bg-red-400' : 'bg-amber-400'}`} />
      {children}
    </span>
  )
}

export default function UniOverview() {
  const { courses, items, getItem, now } = useUni()
  const openItem = useOpenItem()
  const [adding, setAdding] = useState(false)
  const anyQuiz = courses.some((c) => c.hasQuiz)

  const { overdue, soon, currentWeek, progress } = useMemo(() => {
    const visible = items.filter((i) => i.kind !== 'quiz' || courses.find((c) => c.id === i.courseId)?.hasQuiz)
    const upcoming = visible
      .filter((i) => i.dueAt && new Date(i.dueAt).getTime() >= now)
      .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!))
    const progress = new Map<string, { done: number; total: number }>()
    for (const i of visible) {
      if (i.skipped) continue
      const p = progress.get(i.courseId) ?? { done: 0, total: 0 }
      p.total++
      if (i.done) p.done++
      progress.set(i.courseId, p)
    }
    return {
      overdue: visible.filter((i) => itemStatus(i, now) === 'overdue').length,
      soon: visible.filter((i) => itemStatus(i, now) === 'soon').length,
      currentWeek: upcoming[0]?.week ?? null,
      progress,
    }
  }, [items, courses, now])

  if (!courses.length) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h2 className="mb-2 text-2xl font-semibold">No courses yet</h2>
        <p className="mb-6 text-zinc-400">
          Add your first course. It gets Weeks 1 to 14 with a Vorlesung and an exercise (and optionally a quiz) each week.
        </p>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-500"
        >
          + Add course
        </button>
        {adding && <AddCourse onClose={() => setAdding(false)} />}
      </div>
    )
  }

  const colBg = (w: number) => (w === currentWeek ? 'bg-indigo-500/[0.07]' : '')

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'}
            {currentWeek && (
              <>
                {' \u00b7 '}Week <span className="text-zinc-300">{currentWeek}</span> of {UNI_WEEKS}
              </>
            )}
          </p>
        </div>
        <div className="mb-0.5 flex flex-wrap gap-2">
          {overdue > 0 && <Badge tone="red">{overdue} overdue</Badge>}
          {soon > 0 && <Badge tone="amber">{soon} due within 48h</Badge>}
        </div>
        <button
          onClick={() => setAdding(true)}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-indigo-500 to-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-950/60 ring-1 ring-inset ring-white/15 transition hover:from-indigo-400 hover:to-indigo-500"
        >
          <Plus size={16} /> Course
        </button>
      </div>

      <HScroll focus={currentWeek ? `[data-week="${currentWeek}"]` : undefined}>
        <table className="border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th
                data-sticky
                className="sticky left-0 z-10 border-b border-r border-white/[0.06] bg-zinc-950 px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-500"
              >
                Course
              </th>
              {weeks.map((w) => (
                <th
                  key={w}
                  data-week={w}
                  colSpan={anyQuiz ? 3 : 2}
                  className={`border-b border-l border-white/[0.06] px-1 py-3 text-center text-[11px] font-medium uppercase tracking-wider ${
                    w === currentWeek ? 'bg-indigo-500/[0.12] text-indigo-200' : 'text-zinc-500'
                  }`}
                >
                  {w === currentWeek ? (
                    <span className="rounded-full bg-indigo-500/25 px-2 py-0.5 ring-1 ring-indigo-400/40">W{w}</span>
                  ) : (
                    `W${w}`
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course: UniCourse) => {
              const p = progress.get(course.id) ?? { done: 0, total: 0 }
              const pct = p.total ? Math.round((p.done / p.total) * 100) : 0
              return (
                <tr key={course.id} className="group [&:last-child>td]:border-b-0">
                  <td className="sticky left-0 z-10 w-[11rem] min-w-[11rem] border-b border-r border-white/[0.06] bg-zinc-950 px-4 py-2 transition-colors group-hover:bg-[#111114] sm:w-[16rem] sm:min-w-[16rem]">
                    <Link href={`/personal/uni/course/${course.id}`} className="group/link flex items-center gap-3">
                      <span className="h-8 w-1 shrink-0 rounded-full" style={{ background: course.color }} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-zinc-200 transition-colors group-hover/link:text-white">
                          {course.name}
                        </span>
                        <span className="mt-1.5 flex items-center gap-2">
                          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                            <span
                              className="block h-full rounded-full transition-[width] duration-500"
                              style={{ width: `${pct}%`, background: course.color }}
                            />
                          </span>
                          <span className="text-[10px] tabular-nums text-zinc-500">
                            {p.done}/{p.total}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </td>
                  {weeks.map((w) => (
                    <WeekCells key={w} course={course} week={w} anyQuiz={anyQuiz} bg={colBg(w)}>
                      {(kind) => <Cell item={getItem(course.id, w, kind)} kind={kind} week={w} now={now} onOpen={openItem} />}
                    </WeekCells>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </HScroll>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
        <Legend className={STATUS_CELL.open} label="Open" />
        <Legend className={STATUS_CELL.soon} label="Due within 48h" />
        <Legend className={STATUS_CELL.overdue} label="Overdue" />
        <Legend className={STATUS_CELL.done} label="Done" />
        <Legend className={STATUS_CELL.skipped} label="Skipped" />
        <span className="h-3 w-px bg-white/10" />
        <span>
          <b className="font-semibold text-zinc-400">V</b> Vorlesung &middot; <b className="font-semibold text-zinc-400">E</b>{' '}
          Exercise &middot; <b className="font-semibold text-zinc-400">Q</b> Quiz
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-400" /> has notes
        </span>
      </div>

      {adding && <AddCourse onClose={() => setAdding(false)} />}
    </div>
  )
}

function WeekCells({
  course,
  anyQuiz,
  bg,
  children,
}: {
  course: UniCourse
  week: number
  anyQuiz: boolean
  bg: string
  children: (kind: UniKind) => React.ReactNode
}) {
  const base = `border-b border-white/[0.04] py-2 transition-colors group-hover:bg-white/[0.015] ${bg}`
  return (
    <>
      <td className={`${base} border-l border-l-white/[0.06] pl-2 pr-[3px]`}>{children('lecture')}</td>
      <td className={`${base} px-[3px] ${anyQuiz ? '' : 'pr-2'}`}>{children('exercise')}</td>
      {anyQuiz && (
        <td className={`${base} pl-[3px] pr-2`}>
          {course.hasQuiz ? children('quiz') : <div className="h-8 w-8" />}
        </td>
      )}
    </>
  )
}
