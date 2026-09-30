'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { computeDue, formatDue, itemStatus, kindLabel, relativeDue, toLocalInput } from '@/lib/uni/dates'
import { KIND_NAME, type UniCourse, type UniItem } from '@/lib/uni/types'
import { ruleFor, useUni } from './UniStore'
import { STATUS_CELL, STATUS_LABEL } from './status'

export function ItemSheet({ itemId, onClose }: { itemId: string | null; onClose: () => void }) {
  const { items, courses, updateItem, now } = useUni()
  const item = items.find((i) => i.id === itemId)
  if (!item) return null
  return (
    <Sheet
      key={item.id}
      item={item}
      course={courses.find((c) => c.id === item.courseId)}
      now={now}
      onClose={onClose}
      updateItem={updateItem}
    />
  )
}

function Sheet({
  item,
  course,
  now,
  onClose,
  updateItem,
}: {
  item: UniItem
  course: UniCourse | undefined
  now: number
  onClose: () => void
  updateItem: ReturnType<typeof useUni>['updateItem']
}) {
  const [notes, setNotes] = useState(item.notes)
  const [points, setPoints] = useState(item.points)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function flush() {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    if (notes !== item.notes || points !== item.points) updateItem(item.id, { notes, points })
  }

  function close() {
    flush()
    onClose()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!course) return null
  const status = itemStatus(item, now)
  const rule = ruleFor(course, item.kind)
  const isLecture = item.kind === 'lecture'

  function scheduleSave(patch: { notes?: string; points?: string }) {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => updateItem(item.id, patch), 800)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 sm:items-center" onClick={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-950 p-5 text-white sm:max-w-lg sm:rounded-2xl"
      >
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full" style={{ background: course.color }} />
          <div className="min-w-0 flex-1">
            <Link
              href={`/personal/uni/course/${course.id}`}
              onClick={close}
              className="text-sm text-zinc-400 hover:underline"
            >
              {course.name} &middot; Week {item.week}
            </Link>
            <h2 className="text-xl font-semibold">{kindLabel(item.kind, item.week)}</h2>
          </div>
          <span className={`rounded-md border px-2 py-0.5 text-xs ${STATUS_CELL[status]}`}>{STATUS_LABEL[status]}</span>
          <button
            onClick={close}
            className="-mr-1 -mt-1 rounded-lg p-1 text-zinc-500 hover:text-white"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => updateItem(item.id, { done: !item.done, skipped: false })}
            className={`rounded-lg border py-2.5 font-medium ${
              item.done
                ? 'border-emerald-500 bg-emerald-600 text-white'
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800'
            }`}
          >
            {item.done ? 'Done' : 'Mark done'}
          </button>
          <button
            onClick={() => updateItem(item.id, { skipped: !item.skipped, done: false })}
            className={`rounded-lg border py-2.5 ${
              item.skipped
                ? 'border-zinc-500 bg-zinc-700 text-white'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            {item.skipped ? 'Skipped' : isLecture ? 'Skip this week' : 'No submission this week'}
          </button>
        </div>

        {isLecture ? (
          <p className="mb-4 text-xs text-zinc-500">A Vorlesung has no deadline.</p>
        ) : (
          <>
            <label className="mb-1 block text-sm text-zinc-400">Deadline</label>
            <div className="mb-1 flex gap-2">
              <input
                type="datetime-local"
                value={toLocalInput(item.dueAt)}
                required={item.kind === 'quiz'}
                onChange={(e) => {
                  if (!e.target.value && item.kind === 'quiz') return
                  updateItem(item.id, {
                    dueAt: e.target.value ? new Date(e.target.value).toISOString() : null,
                    dueManual: true,
                  })
                }}
                className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
              />
              {item.dueManual && (
                <button
                  onClick={() =>
                    updateItem(item.id, {
                      dueManual: false,
                      dueAt: rule ? computeDue(rule, item.week).toISOString() : null,
                    })
                  }
                  className="rounded-lg border border-zinc-700 px-3 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Reset
                </button>
              )}
            </div>
            <p className="mb-4 text-xs text-zinc-500">
              {item.dueAt ? `${formatDue(item.dueAt)} (${relativeDue(item.dueAt, now)})` : 'No deadline set'}
              {item.dueManual ? ' \u00b7 set manually' : rule ? " \u00b7 from the course's weekly rule" : ''}
            </p>
          </>
        )}

        {!isLecture && (
          <>
            <label className="mb-1 block text-sm text-zinc-400">Points / grade</label>
            <input
              value={points}
              placeholder="e.g. 8/10"
              onChange={(e) => {
                setPoints(e.target.value)
                scheduleSave({ points: e.target.value })
              }}
              onBlur={flush}
              className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
            />
          </>
        )}

        <label className="mb-1 block text-sm text-zinc-400">Notes</label>
        <textarea
          value={notes}
          placeholder={`Anything about this ${KIND_NAME[item.kind]}...`}
          rows={7}
          onChange={(e) => {
            setNotes(e.target.value)
            scheduleSave({ notes: e.target.value })
          }}
          onBlur={flush}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
      </div>
    </div>
  )
}
