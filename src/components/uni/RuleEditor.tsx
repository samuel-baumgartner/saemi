'use client'

import { WEEKDAYS, todayYmd } from '@/lib/uni/dates'
import type { UniDueRule } from '@/lib/uni/types'

export const EXERCISE_HINT =
  'Only some weeks have a deadline? Leave this off and set the deadline on those weeks directly.'

export function defaultRule(): UniDueRule {
  return { weekday: 1, time: '23:59', start: todayYmd() }
}

export function RuleEditor({
  label,
  rule,
  onChange,
  required = false,
  hint,
}: {
  label: string
  rule: UniDueRule | null
  onChange: (rule: UniDueRule | null) => void
  /** Deadline cannot be turned off (quizzes always have one). */
  required?: boolean
  hint?: string
}) {
  const field = 'rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-white'
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
      {required ? (
        <p className="text-sm font-medium text-white">{label} deadline</p>
      ) : (
        <label className="flex items-center gap-2 text-sm font-medium text-white">
          <input type="checkbox" checked={!!rule} onChange={(e) => onChange(e.target.checked ? defaultRule() : null)} />
          {label} has a weekly deadline
        </label>
      )}
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
      {rule && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-300">
          <span>Every</span>
          <select className={field} value={rule.weekday} onChange={(e) => onChange({ ...rule, weekday: Number(e.target.value) })}>
            {WEEKDAYS.map((d, i) => (
              <option key={d} value={i}>
                {d}
              </option>
            ))}
          </select>
          <span>at</span>
          <input
            type="time"
            className={field}
            value={rule.time}
            onChange={(e) => onChange({ ...rule, time: e.target.value || '23:59' })}
          />
          <span>starting</span>
          <input
            type="date"
            className={field}
            value={rule.start}
            onChange={(e) => e.target.value && onChange({ ...rule, start: e.target.value })}
          />
        </div>
      )}
    </div>
  )
}
