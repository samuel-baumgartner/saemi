'use client'

import { TimeSession } from '@/types/task'
import { getTodayString } from '@/lib/dateUtils'
import {
  DAILY_GOALS,
  minutesTowardGoal,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import { AlertTriangle } from 'lucide-react'

interface GoalsTabProps {
  sessions: TimeSession[]
}

function formatDoneTarget(done: number, target: number) {
  const h = Math.floor(done / 60)
  const m = done % 60
  const doneStr = h > 0 ? `${h}h ${m}m` : `${m} min`
  const tH = Math.floor(target / 60)
  const tM = target % 60
  const targetStr = tH > 0 ? `${tH}h ${tM > 0 ? `${tM}m` : ''}`.trim() : `${target} min`
  return { doneStr, targetStr }
}

export function GoalsTab({ sessions }: GoalsTabProps) {
  const todayStr = getTodayString()
  const todaySessions = sessions.filter((s) => s.date === todayStr)

  const unproductive = unproductiveMinutesToday(todaySessions)

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-amber-500/60 bg-amber-950/40 px-5 py-4 shadow-[0_0_24px_rgba(245,158,11,0.12)]">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="w-8 h-8 shrink-0 text-amber-400 mt-0.5"
            aria-hidden
          />
          <div>
            <h2 className="text-lg font-bold text-amber-100 tracking-tight">
              Unproductive time today
            </h2>
            <p className="mt-1 text-3xl font-bold tabular-nums text-amber-50">
              {unproductive} min
            </p>
            <p className="mt-2 text-sm text-amber-200/80 max-w-xl">
              TimeChecker activities marked as not productive (or distracted).
              Hold yourself accountable — this total resets at midnight local
              time.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Daily goals</h3>
        <p className="text-sm text-white/50 mb-4">
          Progress for today ({todayStr}), all session sources.
        </p>
        <div className="space-y-5">
          {DAILY_GOALS.map((g) => {
            const done = minutesTowardGoal(g.id, todaySessions)
            const pct = Math.min(100, (done / g.targetMinutes) * 100)
            const { doneStr, targetStr } = formatDoneTarget(done, g.targetMinutes)
            const met = done >= g.targetMinutes

            return (
              <div
                key={g.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-medium text-white">{g.label}</span>
                  <span className="text-sm text-white/70 tabular-nums">
                    {doneStr}
                    <span className="text-white/40"> / </span>
                    {targetStr}
                    {met && (
                      <span className="ml-2 text-emerald-400 font-medium">
                        {done > g.targetMinutes
                          ? `(+${done - g.targetMinutes} min over)`
                          : '(goal met)'}
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      met
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
