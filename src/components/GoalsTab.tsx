'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { TimeSession } from '@/types/task'
import { getTodayString } from '@/lib/dateUtils'
import type { DailyGoalDef } from '@/lib/goalConfig'
import {
  DEFAULT_DAILY_GOALS,
  minutesTowardGoal,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import { AlertTriangle, Loader2, RotateCcw, Save } from 'lucide-react'

interface GoalsTabProps {
  sessions: TimeSession[]
}

function cloneGoals(g: DailyGoalDef[]) {
  return g.map((x) => ({ ...x }))
}

function goalsEqual(a: DailyGoalDef[], b: DailyGoalDef[]) {
  if (a.length !== b.length) return false
  return a.every(
    (g, i) =>
      g.id === b[i].id &&
      g.label === b[i].label &&
      g.targetMinutes === b[i].targetMinutes
  )
}

function formatDoneTarget(done: number, target: number) {
  const h = Math.floor(done / 60)
  const m = done % 60
  const doneStr = h > 0 ? `${h}h ${m}m` : `${m} min`
  const tH = Math.floor(target / 60)
  const tM = target % 60
  const targetStr =
    tH > 0 ? `${tH}h${tM > 0 ? ` ${tM}m` : ''}`.trim() : `${target} min`
  return { doneStr, targetStr }
}

export function GoalsTab({ sessions }: GoalsTabProps) {
  const todayStr = getTodayString()
  const todaySessions = sessions.filter((s) => s.date === todayStr)

  const [goals, setGoals] = useState<DailyGoalDef[] | null>(null)
  const [draft, setDraft] = useState<DailyGoalDef[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch('/api/user/goals')
      if (!r.ok) throw new Error('Failed to load goals')
      const data = await r.json()
      const g = data.goals as DailyGoalDef[]
      setGoals(cloneGoals(g))
      setDraft(cloneGoals(g))
    } catch {
      const fallback = cloneGoals(DEFAULT_DAILY_GOALS)
      setGoals(fallback)
      setDraft(cloneGoals(fallback))
      setError('Could not load saved goals — using defaults until you save.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const displayGoals = draft ?? goals ?? DEFAULT_DAILY_GOALS

  const dirty = useMemo(() => {
    if (!draft || !goals) return false
    return !goalsEqual(draft, goals)
  }, [draft, goals])

  const updateDraft = (id: string, patch: Partial<DailyGoalDef>) => {
    setDraft((d) => {
      const base = d ?? goals ?? DEFAULT_DAILY_GOALS
      return base.map((row) => (row.id === id ? { ...row, ...patch } : row))
    })
  }

  const save = async () => {
    if (!draft) return
    setSaving(true)
    setError(null)
    try {
      const r = await fetch('/api/user/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals: draft }),
      })
      if (!r.ok) throw new Error('Save failed')
      const data = await r.json()
      const g = data.goals as DailyGoalDef[]
      setGoals(cloneGoals(g))
      setDraft(cloneGoals(g))
    } catch {
      setError('Could not save goals. Try again.')
    } finally {
      setSaving(false)
    }
  }

  const resetDraftToDefaults = () => {
    setDraft(cloneGoals(DEFAULT_DAILY_GOALS))
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Daily goals</h3>
            <p className="text-sm text-white/50 mt-1">
              Edit labels and targets (minutes per day). Progress for today (
              {todayStr}).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={resetDraftToDefaults}
              disabled={loading || saving}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 text-sm text-white/80 hover:bg-white/10 disabled:opacity-40"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to defaults
            </button>
            <button
              type="button"
              onClick={save}
              disabled={loading || saving || !dirty}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-500 text-white text-sm font-medium disabled:opacity-40 disabled:pointer-events-none"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save goals
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-amber-300/90 mb-4 bg-amber-950/30 border border-amber-500/25 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-white/50 py-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading your goals…
          </div>
        ) : (
          <div className="space-y-5">
            {displayGoals.map((g) => {
              const done = minutesTowardGoal(g.id, todaySessions)
              const pct = Math.min(100, (done / g.targetMinutes) * 100)
              const { doneStr, targetStr } = formatDoneTarget(
                done,
                g.targetMinutes
              )
              const met = done >= g.targetMinutes

              return (
                <div
                  key={g.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4 mb-3">
                    <label className="flex-1 min-w-0 block">
                      <span className="text-xs text-white/45 block mb-1">
                        Label
                      </span>
                      <input
                        type="text"
                        value={g.label}
                        onChange={(e) =>
                          updateDraft(g.id, { label: e.target.value })
                        }
                        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                        maxLength={100}
                      />
                    </label>
                    <label className="w-full sm:w-36 shrink-0 block">
                      <span className="text-xs text-white/45 block mb-1">
                        Target (min/day)
                      </span>
                      <input
                        type="number"
                        min={1}
                        max={1440}
                        value={g.targetMinutes}
                        onChange={(e) => {
                          const v = parseInt(e.target.value, 10)
                          updateDraft(g.id, {
                            targetMinutes: Number.isFinite(v)
                              ? Math.min(1440, Math.max(1, v))
                              : 1,
                          })
                        }}
                        className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs text-white/40">
                      Matched by activity rules in code (id: {g.id})
                    </span>
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
        )}
      </div>
    </div>
  )
}
