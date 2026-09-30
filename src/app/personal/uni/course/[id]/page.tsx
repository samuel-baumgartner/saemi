'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { formatDue, itemStatus, relativeDue } from '@/lib/uni/dates'
import { KIND_NAME, KIND_SHORT, UNI_WEEKS, type UniCourse, type UniItem, type UniKind } from '@/lib/uni/types'
import { useUni } from '@/components/uni/UniStore'
import { useOpenItem } from '@/components/uni/UniShell'
import { EXERCISE_HINT, RuleEditor, defaultRule } from '@/components/uni/RuleEditor'
import { COURSE_COLORS, STATUS_CELL, STATUS_LABEL } from '@/components/uni/status'

const weeks = Array.from({ length: UNI_WEEKS }, (_, i) => i + 1)

function ItemCell({ item, kind, now, onOpen }: { item?: UniItem; kind: UniKind; now: number; onOpen: (id: string) => void }) {
  if (!item) return <td className="px-2 py-2 text-zinc-600">-</td>
  const status = itemStatus(item, now)
  return (
    <td className="px-2 py-1.5">
      <button onClick={() => onOpen(item.id)} className="flex w-full items-center gap-3 rounded-lg p-1.5 text-left hover:bg-zinc-900">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${STATUS_CELL[status]}`}>
          {item.done ? '\u2713' : KIND_SHORT[kind]}
        </span>
        <span className="min-w-0">
          <span className="block text-sm">
            {STATUS_LABEL[status]}
            {item.points && <span className="text-zinc-400"> &middot; {item.points}</span>}
          </span>
          <span className="block truncate text-xs text-zinc-500">
            {item.dueAt
              ? `${formatDue(item.dueAt)} \u00b7 ${relativeDue(item.dueAt, now)}`
              : kind === 'lecture'
                ? KIND_NAME.lecture
                : 'No deadline'}
          </span>
          {item.notes && <span className="block max-w-[16rem] truncate text-xs text-sky-400/80">{item.notes}</span>}
        </span>
      </button>
    </td>
  )
}

export default function UniCoursePage() {
  const { id } = useParams<{ id: string }>()
  const { courses } = useUni()
  const course = courses.find((c) => c.id === id)
  if (!course) {
    return (
      <div className="py-16 text-center text-zinc-400">
        Course not found.{' '}
        <Link href="/personal/uni" className="text-indigo-400 underline">
          Back to overview
        </Link>
      </div>
    )
  }
  return <CourseView key={course.id} course={course} />
}

function CourseView({ course }: { course: UniCourse }) {
  const router = useRouter()
  const { getItem, updateCourse, deleteCourse, markPastDone, now } = useUni()
  const openItem = useOpenItem()
  const [name, setName] = useState(course.name)
  const [notes, setNotes] = useState(course.notes)
  const [showSettings, setShowSettings] = useState(false)
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function saveNotes(value: string) {
    if (notesTimer.current) clearTimeout(notesTimer.current)
    notesTimer.current = setTimeout(() => updateCourse(course.id, { notes: value }), 800)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/personal/uni" className="text-zinc-500 hover:text-white" aria-label="Back">
          <ChevronLeft size={24} />
        </Link>
        <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: course.color }} />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => name.trim() && name !== course.name && updateCourse(course.id, { name: name.trim() })}
          className="min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none focus:underline"
        />
        <button
          onClick={() => setShowSettings((s) => !s)}
          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          {showSettings ? 'Close settings' : 'Deadlines & settings'}
        </button>
      </div>

      {showSettings && (
        <section className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <RuleEditor
            label="Exercise"
            rule={course.exerciseRule}
            onChange={(r) => updateCourse(course.id, { exerciseRule: r })}
            hint={EXERCISE_HINT}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={course.hasQuiz}
              onChange={(e) =>
                updateCourse(
                  course.id,
                  e.target.checked && !course.quizRule
                    ? { hasQuiz: true, quizRule: course.exerciseRule ?? defaultRule() }
                    : { hasQuiz: e.target.checked },
                )
              }
            />
            This course has a weekly quiz
          </label>
          {course.hasQuiz && (
            <RuleEditor
              label="Quiz"
              rule={course.quizRule}
              onChange={(r) => updateCourse(course.id, { quizRule: r })}
              required
            />
          )}
          <p className="text-xs text-zinc-500">
            A Vorlesung never has a deadline. Changing a rule recalculates all deadlines of that type, except ones you set by
            hand on a single exercise or quiz.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-400">Color</span>
            {COURSE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => updateCourse(course.id, { color: c })}
                className={`h-7 w-7 rounded-full border-2 ${course.color === c ? 'border-white' : 'border-transparent'}`}
                style={{ background: c }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => confirm('Mark every exercise/quiz whose deadline already passed as done?') && markPastDone(course.id)}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              Mark all past deadlines as done
            </button>
            <button
              onClick={async () => {
                if (!confirm(`Delete "${course.name}" and all its notes? This cannot be undone.`)) return
                await deleteCourse(course.id)
                router.push('/personal/uni')
              }}
              className="rounded-lg border border-red-900 px-3 py-1.5 text-sm text-red-400 hover:bg-red-950"
            >
              Delete course
            </button>
          </div>
        </section>
      )}

      <section>
        <label className="mb-1 block text-sm text-zinc-400">Course notes</label>
        <textarea
          value={notes}
          rows={4}
          placeholder="Lecture times, TA email, exam info, links..."
          onChange={(e) => {
            setNotes(e.target.value)
            saveNotes(e.target.value)
          }}
          onBlur={() => notes !== course.notes && updateCourse(course.id, { notes })}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2"
        />
      </section>

      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-zinc-400">
              <th className="w-16 px-3 py-2 font-medium">Week</th>
              <th className="px-3 py-2 font-medium">{KIND_NAME.lecture}</th>
              <th className="px-3 py-2 font-medium">Exercise</th>
              {course.hasQuiz && <th className="px-3 py-2 font-medium">Quiz</th>}
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w} className="border-b border-zinc-900 last:border-0">
                <td className="px-3 py-2 font-medium text-zinc-400">{w}</td>
                <ItemCell item={getItem(course.id, w, 'lecture')} kind="lecture" now={now} onOpen={openItem} />
                <ItemCell item={getItem(course.id, w, 'exercise')} kind="exercise" now={now} onOpen={openItem} />
                {course.hasQuiz && <ItemCell item={getItem(course.id, w, 'quiz')} kind="quiz" now={now} onOpen={openItem} />}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
