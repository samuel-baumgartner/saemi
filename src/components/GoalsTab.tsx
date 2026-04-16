'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { TimeSession } from '@/types/task'
import {
  formatCalendarWeekRangeLabel,
  formatDateYmdInCalendarTz,
  getCalendarTodayString,
  getCalendarWeekDateStringsContaining,
  resolveInstantOnCalendarYmd,
} from '@/lib/dateUtils'
import type { DailyGoalDef } from '@/lib/goalConfig'
import {
  DEFAULT_DAILY_GOALS,
  UNPRODUCTIVE_BUDGET_MAX_MIN,
  unproductiveBudgetLimitMinutesFromDones,
  unproductiveBudgetProgressPartsFromDones,
  weeklyGoalRollups,
  weeklyGoalsMetCount,
} from '@/lib/goalConfig'
import type { WidgetGoalItem } from '@/lib/widgetDailyGoalsPayload'
import { CalendarRange, ChevronLeft, ChevronRight, Loader2, RotateCcw, Save } from 'lucide-react'

interface GoalsTabProps {
  /** Used only to refetch server progress when sessions change (same DB as widget). */
  sessions: TimeSession[]
  /** Kept for Timeline parity; goal progress uses the same rules as the phone widget (no active-session bonus). */
  activeSessionId?: string | null
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

function shiftCalendarYmd(ymd: string, deltaDays: number): string {
  const base =
    resolveInstantOnCalendarYmd(ymd).getTime() + deltaDays * 86_400_000
  return formatDateYmdInCalendarTz(new Date(base))
}

export function GoalsTab({
  sessions,
  activeSessionId = null,
}: GoalsTabProps) {
  const todayStr = getCalendarTodayString()
  const yesterdayStr = useMemo(() => shiftCalendarYmd(todayStr, -1), [todayStr])
  const [progressDate, setProgressDate] = useState(() => getCalendarTodayString())
  const sessionsSig = useMemo(
    () =>
      sessions
        .map(
          (s) =>
            [
              s.id,
              s.date,
              s.activity,
              s.description ?? '',
              s.source ?? '',
              s.startTime.getTime(),
              s.endTime?.getTime() ?? 0,
            ].join(':')
        )
        .join('|'),
    [sessions]
  )

  const [goals, setGoals] = useState<DailyGoalDef[] | null>(null)
  const [draft, setDraft] = useState<DailyGoalDef[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [progressPayload, setProgressPayload] = useState<{
    date: string
    items: WidgetGoalItem[]
  } | null>(null)
  const [progressLoading, setProgressLoading] = useState(true)
  const [progressError, setProgressError] = useState<string | null>(null)

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true)
      setError(null)
    }
    try {
      const r = await fetch('/api/user/goals', { cache: 'no-store' })
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

  const loadProgress = useCallback(async () => {
    setProgressLoading(true)
    setProgressError(null)
    try {
      const q = new URLSearchParams()
      q.set('date', progressDate)
      const r = await fetch(`/api/user/goals/today?${q.toString()}`, {
        cache: 'no-store',
      })
      if (!r.ok) throw new Error('Failed to load progress')
      const data = (await r.json()) as {
        date: string
        items: WidgetGoalItem[]
      }
      setProgressPayload({ date: data.date, items: data.items })
    } catch {
      setProgressError('Could not load goal progress for that day.')
      setProgressPayload(null)
    } finally {
      setProgressLoading(false)
    }
  }, [progressDate])

  useEffect(() => {
    void loadProgress()
  }, [loadProgress, sessionsSig])

  const doneByGoalId = useMemo(() => {
    if (!progressPayload) return null
    const m: Record<string, number> = {}
    for (const it of progressPayload.items) {
      if (it.id !== 'unproductive') m[it.id] = it.doneMinutes
    }
    return m
  }, [progressPayload])

  const unproductiveRow = progressPayload?.items.find(
    (i) => i.id === 'unproductive'
  )

  const displayGoals = draft ?? goals ?? DEFAULT_DAILY_GOALS

  const weekDayStrings = useMemo(
    () => getCalendarWeekDateStringsContaining(todayStr),
    [todayStr]
  )
  const weekDaySet = useMemo(() => new Set(weekDayStrings), [weekDayStrings])
  const weekRangeLabel = useMemo(
    () => formatCalendarWeekRangeLabel(weekDayStrings),
    [weekDayStrings]
  )

  const weeklyRollups = useMemo(
    () =>
      weeklyGoalRollups(displayGoals, sessions, weekDaySet, activeSessionId),
    [displayGoals, sessions, weekDaySet, activeSessionId]
  )

  const weeklyMetCount = useMemo(
    () => weeklyGoalsMetCount(weeklyRollups),
    [weeklyRollups]
  )

  const weeklyOverallPct = useMemo(() => {
    let num = 0
    let den = 0
    for (const r of weeklyRollups) {
      den += r.weekTargetMinutes
      num += Math.min(r.weekDoneMinutes, r.weekTargetMinutes)
    }
    if (den <= 0) return null
    return Math.round((num / den) * 100)
  }, [weeklyRollups])

  const progressDateLabel = useMemo(() => {
    if (progressDate === todayStr) return 'Today'
    if (progressDate === yesterdayStr) return 'Yesterday'
    const d = resolveInstantOnCalendarYmd(progressDate)
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }, [progressDate, todayStr, yesterdayStr])

  const canStepProgressNext = progressDate < todayStr

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
      void loadProgress()
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
  }, [load, loadProgress])

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
      void loadProgress()
    } catch {
      setError('Could not save goals. Try again.')
    } finally {
      setSaving(false)
    }
  }

  const resetDraftToDefaults = () => {
    setDraft(cloneGoals(DEFAULT_DAILY_GOALS))
  }

  const progressReady = progressPayload != null

  const budgetProgress = progressReady
    ? unproductiveBudgetProgressPartsFromDones(displayGoals, doneByGoalId ?? {})
    : { creditedMinutes: 0, totalTargetMinutes: 0, fraction: 0 }
  const unproductiveTarget = progressReady
    ? unproductiveBudgetLimitMinutesFromDones(displayGoals, doneByGoalId ?? {})
    : 0
  const unproductive = progressReady ? (unproductiveRow?.doneMinutes ?? 0) : 0
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
      <section
        className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/35 via-black/30 to-black/40 p-4 sm:p-5"
        aria-label="Weekly goals summary"
      >
        <div className="flex flex-wrap items-start gap-3 mb-2">
          <CalendarRange className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-white">
              This week <span className="text-white/50 font-normal">(Mon–Sun)</span>
            </h3>
            <p className="text-sm text-indigo-200/80 mt-0.5">{weekRangeLabel}</p>
            <p className="text-xs text-white/45 mt-2 leading-relaxed">
              Progress sums the same rules as daily goals, across calendar days in
              your configured timezone. Each bar compares this week&apos;s total to{' '}
              <span className="text-white/60">7×</span> that goal&apos;s daily target
              (minutes).
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm mb-4">
          <span className="text-white/90">
            <span className="font-semibold text-emerald-300 tabular-nums">
              {weeklyMetCount}
            </span>
            <span className="text-white/50"> / </span>
            <span className="tabular-nums">{weeklyRollups.length}</span>
            <span className="text-white/55"> goals met</span>
          </span>
          {weeklyOverallPct != null && (
            <span className="text-white/55">
              Overall{' '}
              <span className="text-white font-medium tabular-nums">
                {weeklyOverallPct}%
              </span>{' '}
              of weekly targets
              <span className="text-white/40"> (capped per goal)</span>
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {weeklyRollups.map((r) => {
            const { doneStr, targetStr } = formatDoneTarget(
              r.weekDoneMinutes,
              r.weekTargetMinutes
            )
            return (
              <div
                key={r.goalId}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white truncate">
                    {r.label}
                  </span>
                  {r.met ? (
                    <span className="shrink-0 text-[11px] uppercase tracking-wide text-emerald-300/95 border border-emerald-500/30 rounded px-1.5 py-0.5">
                      Met
                    </span>
                  ) : (
                    <span className="shrink-0 text-[11px] uppercase tracking-wide text-white/35 border border-white/10 rounded px-1.5 py-0.5">
                      Open
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/55 tabular-nums text-right">
                  {doneStr}
                  <span className="text-white/35"> / </span>
                  {targetStr}
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      r.met
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                        : 'bg-gradient-to-r from-indigo-500 to-violet-500'
                    }`}
                    style={{ width: `${r.progressPercent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Daily goals</h3>
            <p className="text-sm text-white/50 mt-1">
              Edit labels and targets (minutes per day). Bars below show progress for
              the selected calendar day (same rules as the phone widget).
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/45 mr-1">View day</span>
              <button
                type="button"
                onClick={() => setProgressDate(todayStr)}
                disabled={progressDate === todayStr}
                className="px-2.5 py-1 rounded-md border border-white/15 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setProgressDate(yesterdayStr)}
                disabled={progressDate === yesterdayStr}
                className="px-2.5 py-1 rounded-md border border-white/15 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none"
              >
                Yesterday
              </button>
              <button
                type="button"
                aria-label="Previous day"
                onClick={() => setProgressDate((d) => shiftCalendarYmd(d, -1))}
                className="p-1 rounded-md border border-white/15 text-white/80 hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next day"
                onClick={() =>
                  setProgressDate((d) =>
                    d < todayStr ? shiftCalendarYmd(d, 1) : d
                  )
                }
                disabled={!canStepProgressNext}
                className="p-1 rounded-md border border-white/15 text-white/80 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/55 tabular-nums ml-1">
                {progressDateLabel}{' '}
                <span className="text-white/35">({progressPayload?.date ?? progressDate})</span>
              </span>
            </div>
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

        {progressError && (
          <p className="text-sm text-amber-300/90 mb-4 bg-amber-950/30 border border-amber-500/25 rounded-lg px-3 py-2">
            {progressError}
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
                    {progressReady ? unproductiveTarget : '—'}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5 mb-2">
                <span className="text-xs text-white/40 tabular-nums">
                  Goal progress for budget:{' '}
                  {progressReady && budgetProgress.totalTargetMinutes > 0
                    ? `${budgetProgress.creditedMinutes} / ${budgetProgress.totalTargetMinutes} min (${Math.round(budgetProgress.fraction * 100)}%)`
                    : progressReady
                      ? '—'
                      : progressLoading
                        ? '…'
                        : '—'}
                </span>
                <span className="text-sm text-red-300 tabular-nums">
                  {progressReady ? (
                    <>
                      {unproductiveFmt.doneStr}
                      <span className="text-red-400/70"> / </span>
                      {unproductiveFmt.targetStr}
                    </>
                  ) : (
                    <span className="text-white/40">
                      {progressLoading ? '…' : '—'}
                    </span>
                  )}
                  {progressReady && unproductiveOver && (
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
              const done = progressReady
                ? (doneByGoalId?.[g.id] ?? 0)
                : null
              const pct =
                done == null
                  ? 0
                  : Math.min(100, (done / g.targetMinutes) * 100)
              const { doneStr, targetStr } =
                done == null
                  ? { doneStr: '', targetStr: '' }
                  : formatDoneTarget(done, g.targetMinutes)
              const met = done != null && done >= g.targetMinutes

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
                      {done == null ? (
                        <span className="text-white/40">
                          {progressLoading ? '…' : '—'}
                        </span>
                      ) : (
                        <>
                          {doneStr}
                          <span className="text-white/40"> / </span>
                          {targetStr}
                        </>
                      )}
                      {progressReady && met && (
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
