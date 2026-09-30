'use client'

import { useMemo, useState } from 'react'
import { formatDue, itemStatus, kindLabel, relativeDue } from '@/lib/uni/dates'
import type { UniCourse, UniItem } from '@/lib/uni/types'
import { useUni } from '@/components/uni/UniStore'
import { useOpenItem } from '@/components/uni/UniShell'
import { STATUS_CELL } from '@/components/uni/status'

interface RowProps {
  item: UniItem
  course: UniCourse
  now: number
  onToggle: (item: UniItem) => void
  onOpen: (id: string) => void
}

function Row({ item, course, now, onToggle, onOpen }: RowProps) {
  const status = itemStatus(item, now)
  return (
    <li className="flex items-center gap-3 border-b border-zinc-900 px-3 py-2.5 last:border-0">
      <button
        onClick={() => onToggle(item)}
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${STATUS_CELL[status]}`}
        aria-label={item.done ? 'Mark not done' : 'Mark done'}
      >
        {item.done ? '\u2713' : ''}
      </button>
      <button onClick={() => onOpen(item.id)} className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: course.color }} />
          <span className="truncate font-medium">{course.name}</span>
          <span className="shrink-0 text-zinc-400">{kindLabel(item.kind, item.week)}</span>
        </span>
        <span className="block text-xs text-zinc-500">
          {formatDue(item.dueAt)}
          {item.dueAt && ` \u00b7 ${relativeDue(item.dueAt, now)}`}
        </span>
      </button>
    </li>
  )
}

function Section({
  title,
  list,
  courseById,
  ...rest
}: { title: string; list: UniItem[]; courseById: Map<string, UniCourse> } & Omit<RowProps, 'item' | 'course'>) {
  if (!list.length) return null
  return (
    <section>
      <h3 className="mb-2 text-sm font-medium text-zinc-400">{title}</h3>
      <ul className="rounded-xl border border-zinc-800 bg-zinc-950/60">
        {list.map((i) => (
          <Row key={i.id} item={i} course={courseById.get(i.courseId)!} {...rest} />
        ))}
      </ul>
    </section>
  )
}

export default function UniUpcoming() {
  const { items, courses, updateItem, now } = useUni()
  const openItem = useOpenItem()
  const [showDone, setShowDone] = useState(false)

  const courseById = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses])

  const { overdue, upcoming, noDate } = useMemo(() => {
    const visible = items.filter((i) => {
      const c = courseById.get(i.courseId)
      if (!c || i.kind === 'lecture' || (i.kind === 'quiz' && !c.hasQuiz) || i.skipped) return false
      return showDone || !i.done
    })
    const dated = visible.filter((i) => i.dueAt).sort((a, b) => a.dueAt!.localeCompare(b.dueAt!))
    return {
      overdue: dated.filter((i) => !i.done && new Date(i.dueAt!).getTime() < now),
      upcoming: dated.filter((i) => i.done || new Date(i.dueAt!).getTime() >= now),
      noDate: visible.filter((i) => !i.dueAt && !i.done),
    }
  }, [items, courseById, showDone, now])

  const shared = { courseById, now, onToggle: (i: UniItem) => updateItem(i.id, { done: !i.done }), onOpen: openItem }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold">Upcoming</h2>
        <label className="ml-auto flex items-center gap-2 text-sm text-zinc-400">
          <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
          Show done
        </label>
      </div>
      <Section title="Overdue" list={overdue} {...shared} />
      <Section title="Next deadlines" list={upcoming} {...shared} />
      <Section title="No deadline set" list={noDate} {...shared} />
      {!overdue.length && !upcoming.length && !noDate.length && (
        <p className="py-16 text-center text-zinc-500">Nothing to do. Nice.</p>
      )}
    </div>
  )
}
