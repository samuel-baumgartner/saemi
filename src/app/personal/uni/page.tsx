'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { formatDue, itemStatus, kindLabel } from '@/lib/uni/dates'
import { KIND_SHORT, UNI_WEEKS, type UniCourse, type UniItem, type UniKind } from '@/lib/uni/types'
import { useUni } from '@/components/uni/UniStore'
import { useOpenItem } from '@/components/uni/UniShell'
import { AddCourse } from '@/components/uni/AddCourse'
import { STATUS_CELL } from '@/components/uni/status'

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
  if (!item) return <div className="h-9 w-9" />
  const status = itemStatus(item, now)
  return (
    <button
      onClick={() => onOpen(item.id)}
      title={kind === 'lecture' ? kindLabel(kind, week) : `${kindLabel(kind, week)} \u00b7 ${formatDue(item.dueAt)}`}
      className={`relative flex h-9 w-9 items-center justify-center rounded-md border text-xs font-semibold transition hover:brightness-125 ${STATUS_CELL[status]}`}
    >
      {item.done ? '\u2713' : KIND_SHORT[kind]}
      {item.notes && <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-sky-400" />}
    </button>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`h-3 w-3 rounded border ${className}`} /> {label}
    </span>
  )
}

export default function UniOverview() {
  const { courses, items, getItem, now } = useUni()
  const openItem = useOpenItem()
  const [adding, setAdding] = useState(false)
  const anyQuiz = courses.some((c) => c.hasQuiz)

  const { overdue, soon, currentWeek } = useMemo(() => {
    const visible = items.filter((i) => i.kind !== 'quiz' || courses.find((c) => c.id === i.courseId)?.hasQuiz)
    const upcoming = visible
      .filter((i) => i.dueAt && new Date(i.dueAt).getTime() >= now)
      .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!))
    return {
      overdue: visible.filter((i) => itemStatus(i, now) === 'overdue').length,
      soon: visible.filter((i) => itemStatus(i, now) === 'soon').length,
      currentWeek: upcoming[0]?.week ?? null,
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

  const cellBg = (w: number) => (w === currentWeek ? 'bg-indigo-950/30' : '')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-semibold">Overview</h2>
        {overdue > 0 && <span className="rounded-md bg-red-600/90 px-2 py-0.5 text-xs text-white">{overdue} overdue</span>}
        {soon > 0 && <span className="rounded-md bg-amber-500/90 px-2 py-0.5 text-xs text-black">{soon} due within 48h</span>}
        <button
          onClick={() => setAdding(true)}
          className="ml-auto rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          + Course
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60">
        <table className="border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 border-b border-zinc-800 bg-zinc-950 px-3 py-2 text-left font-medium text-zinc-400">
                Course
              </th>
              {weeks.map((w) => (
                <th
                  key={w}
                  colSpan={anyQuiz ? 3 : 2}
                  className={`border-b border-l border-zinc-800 px-1 py-2 text-center font-medium ${
                    w === currentWeek ? 'bg-indigo-950/70 text-indigo-300' : 'text-zinc-400'
                  }`}
                >
                  W{w}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course: UniCourse) => (
              <tr key={course.id}>
                <td className="sticky left-0 z-10 max-w-[9rem] border-b border-zinc-900 bg-zinc-950 px-3 py-1 sm:max-w-[14rem]">
                  <Link href={`/personal/uni/course/${course.id}`} className="flex items-center gap-2 hover:underline">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: course.color }} />
                    <span className="truncate font-medium">{course.name}</span>
                  </Link>
                </td>
                {weeks.map((w) => (
                  <WeekCells key={w} course={course} week={w} anyQuiz={anyQuiz} bg={cellBg(w)}>
                    {(kind) => <Cell item={getItem(course.id, w, kind)} kind={kind} week={w} now={now} onOpen={openItem} />}
                  </WeekCells>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-500">
        <Legend className={STATUS_CELL.open} label="Open" />
        <Legend className={STATUS_CELL.soon} label="Due within 48h" />
        <Legend className={STATUS_CELL.overdue} label="Overdue" />
        <Legend className={STATUS_CELL.done} label="Done" />
        <Legend className={STATUS_CELL.skipped} label="Skipped" />
        <span>V = Vorlesung &middot; E = Exercise &middot; Q = Quiz</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> has notes
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
  return (
    <>
      <td className={`border-b border-l border-zinc-900 py-0.5 pl-1 pr-0.5 ${bg}`}>{children('lecture')}</td>
      <td className={`border-b border-zinc-900 px-0.5 py-0.5 ${anyQuiz ? '' : 'pr-1'} ${bg}`}>{children('exercise')}</td>
      {anyQuiz && (
        <td className={`border-b border-zinc-900 py-0.5 pl-0.5 pr-1 ${bg}`}>
          {course.hasQuiz ? children('quiz') : <div className="h-9 w-9" />}
        </td>
      )}
    </>
  )
}
