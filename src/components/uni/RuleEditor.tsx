'use client'

import { WEEKDAYS, todayYmd } from '@/lib/uni/dates'
import type { UniDueRule } from '@/lib/uni/types'

export function defaultRule(): UniDueRule {
  return { weekday: 1, time: '23:59', start: todayYmd() }
}

export function RuleEditor({
  label,
  rule,
  onChange,
}: {
  label: string
  rule: UniDueRule | null
  onChange: (rule: UniDueRule | null) => void
}) {
  const field = 'rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-white'
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
      <label className="flex items-center gap-2 text-sm font-medium text-white">
        <input type="checkbox" checked={!!rule} onChange={(e) => onChange(e.target.checked ? defaultRule() : null)} />
        {label} has a weekly deadline
      </label>
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
