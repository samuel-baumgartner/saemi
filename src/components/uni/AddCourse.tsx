'use client'

import { useState } from 'react'
import type { UniDueRule } from '@/lib/uni/types'
import { useUni } from './UniStore'
import { RuleEditor, defaultRule } from './RuleEditor'
import { COURSE_COLORS } from './status'

export function AddCourse({ onClose }: { onClose: () => void }) {
  const { addCourse, courses } = useUni()
  const [name, setName] = useState('')
  const [color, setColor] = useState(COURSE_COLORS[courses.length % COURSE_COLORS.length])
  const [hasQuiz, setHasQuiz] = useState(false)
  const [exerciseRule, setExerciseRule] = useState<UniDueRule | null>(defaultRule)
  const [quizRule, setQuizRule] = useState<UniDueRule | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    await addCourse({ name: name.trim(), color, hasQuiz, exerciseRule, quizRule: hasQuiz ? quizRule : null })
    setBusy(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90dvh] w-full space-y-4 overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-950 p-5 text-white sm:max-w-lg sm:rounded-2xl"
      >
        <h2 className="text-xl font-semibold">New course</h2>
        <input
          autoFocus
          required
          placeholder="Course name, e.g. Analysis I"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
        />
        <div className="flex flex-wrap gap-2">
          {COURSE_COLORS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              className={`h-8 w-8 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
            />
          ))}
        </div>
        <RuleEditor label="Exercise" rule={exerciseRule} onChange={setExerciseRule} />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasQuiz}
            onChange={(e) => {
              setHasQuiz(e.target.checked)
              if (e.target.checked && !quizRule) setQuizRule(exerciseRule ?? defaultRule())
            }}
          />
          This course also has a weekly quiz
        </label>
        {hasQuiz && <RuleEditor label="Quiz" rule={quizRule} onChange={setQuizRule} />}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-zinc-400 hover:text-white">
            Cancel
          </button>
          <button
            disabled={busy}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {busy ? 'Creating...' : 'Create course'}
          </button>
        </div>
      </form>
    </div>
  )
}
