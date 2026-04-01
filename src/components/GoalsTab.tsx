'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { TimeSession } from '@/types/task'
import { getTodayString } from '@/lib/dateUtils'
import type { DailyGoalDef } from '@/lib/goalConfig'
import {
  DEFAULT_DAILY_GOALS,
  minutesTowardGoal,
  UNPRODUCTIVE_BUDGET_MAX_MIN,
  unproductiveBudgetLimitMinutes,
  unproductiveBudgetProgressParts,
  unproductiveMinutesToday,
} from '@/lib/goalConfig'
import { Loader2, RotateCcw, Save } from 'lucide-react'

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

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true)
      setError(null)
    }
    try {
      const r = await fetch('/api/user/goals')
      if (!r.ok) throw new Error('Failed to load goals')
      const data = await r.json()
      const g = data.goals as DailyGoalDef[]
      setGoals(cloneGoals(g))
      setDraft(cloneGoals(g))
      if (silent) setError(null)
    } catch {
      if (!silent) {
        const fallback = cloneGoals(DEFAULT_DAILY_GOALS)
        setGoals(fallback)
        setDraft(cloneGoals(fallback))
        setError('Could not load saved goals — using defaults until you save.')
      }
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(false)
  }, [load])

  const displayGoals = draft ?? goals ?? DEFAULT_DAILY_GOALS

  const dirty = useMemo(() => {
    if (!draft || !goals) return false
    return !goalsEqual(draft, goals)
  }, [draft, goals])

  const dirtyRef = useRef(dirty)
  dirtyRef.current = dirty

  const goalsDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const scheduleRefetch = () => {
      if (document.visibilityState !== 'visible') return
      if (dirtyRef.current) return
      if (goalsDebounceRef.current) clearTimeout(goalsDebounceRef.current)
      goalsDebounceRef.current = setTimeout(() => {
        goalsDebounceRef.current = null
        void load(true)
      }, 150)
    }

    document.addEventListener('visibilitychange', scheduleRefetch)
    window.addEventListener('focus', scheduleRefetch)
    return () => {
      if (goalsDebounceRef.current) clearTimeout(goalsDebounceRef.current)
      document.removeEventListener('visibilitychange', scheduleRefetch)
      window.removeEventListener('focus', scheduleRefetch)
    }
  }, [load])

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
  const budgetProgress = unproductiveBudgetProgressParts(
    displayGoals,
    todaySessions
  )
  const unproductiveTarget = unproductiveBudgetLimitMinutes(
    displayGoals,
    todaySessions
  )
  const unproductivePct =
    unproductiveTarget > 0
      ? Math.min(100, (unproductive / unproductiveTarget) * 100)
      : unproductive > 0
        ? 100
        : 0
  const unproductiveFmt = formatDoneTarget(unproductive, unproductiveTarget)
  const unproductiveOver =
    unproductiveTarget > 0
      ? unproductive >= unproductiveTarget
      : unproductive > 0

  return (
    <div className="space-y-6">
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
          <div
            className="grid min-h-[calc(100dvh-24rem)] grid-cols-1 gap-4 sm:min-h-0 sm:gap-5 sm:[grid-template-rows:none]"
            style={{ gridTemplateRows: `repeat(${displayGoals.length + 1}, minmax(0,1fr))` }}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex flex-col">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4 mb-3">
                <div className="flex-1 min-w-0 block">
                  <span className="text-xs text-white/45 block mb-1">Label</span>
                  <div className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white text-sm">
                    <span className="block">Unproductive</span>
                    <span className="block text-[11px] text-white/45 font-normal mt-1 leading-snug">
                      Leisure budget = your progress through today's goals (time
                      counted up to each target) divided by the sum of all targets,
                      times {UNPRODUCTIVE_BUDGET_MAX_MIN} min max. Example: 2h done
                      of a 2h goal out of 3h total targets → two thirds unlocked.
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-36 shrink-0 block">
                  <span className="text-xs text-white/45 block mb-1">
                    Budget (min)
                  </span>
                  <div className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white text-sm tabular-nums">
                    {unproductiveTarget}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5 mb-2">
                <span className="text-xs text-white/40 tabular-nums">
                  Goal progress for budget:{' '}
                  {budgetProgress.totalTargetMinutes > 0
                    ? `${budgetProgress.creditedMinutes} / ${budgetProgress.totalTargetMinutes} min (${Math.round(budgetProgress.fraction * 100)}%)`
                    : '—'}
                </span>
                <span className="text-sm text-red-300 tabular-nums">
                  {unproductiveFmt.doneStr}
                  <span className="text-red-400/70"> / </span>
                  {unproductiveFmt.targetStr}
                  {unproductiveOver && (
                    <span className="ml-2 text-red-400 font-medium">
                      (
                      {unproductiveTarget > 0
                        ? `+${unproductive - unproductiveTarget} min over`
                        : `${unproductive} min (no budget yet)`}
                      )
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-auto h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-red-500 to-rose-500"
                  style={{ width: `${unproductivePct}%` }}
                />
              </div>
            </div>
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
                  className="bg-white/5 border border-white/10 rounded-lg p-4 h-full flex flex-col"
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
                  <div className="flex justify-end mb-2">
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
                  <div className="mt-auto h-3 w-full rounded-full bg-white/10 overflow-hidden">
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
