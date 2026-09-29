'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { computeDue } from '@/lib/uni/dates'
import { UNI_WEEKS, type UniCourse, type UniDueRule, type UniItem, type UniKind } from '@/lib/uni/types'

export interface NewUniCourse {
  name: string
  color: string
  hasQuiz: boolean
  exerciseRule: UniDueRule | null
  quizRule: UniDueRule | null
}

interface Store {
  loading: boolean
  error: string | null
  courses: UniCourse[]
  items: UniItem[]
  /** Current time, ticking once a minute so deadline colours stay fresh. */
  now: number
  getItem: (courseId: string, week: number, kind: UniKind) => UniItem | undefined
  addCourse: (c: NewUniCourse) => Promise<void>
  updateCourse: (id: string, patch: Partial<UniCourse>) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  updateItem: (id: string, patch: Partial<UniItem>) => Promise<void>
  markPastDone: (courseId: string) => Promise<void>
}

const StoreContext = createContext<Store | null>(null)

function ruleFor(course: Pick<UniCourse, 'exerciseRule' | 'quizRule'>, kind: UniKind) {
  return kind === 'exercise' ? course.exerciseRule : course.quizRule
}

async function api(path: string, method: string, body?: unknown) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`)
  return json
}

export function UniStoreProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<UniCourse[]>([])
  const [items, setItems] = useState<UniItem[]>([])
  const [now, setNow] = useState(() => Date.now())

  const refresh = useCallback(async () => {
    try {
      const data = await api('/api/uni', 'GET')
      setCourses(data.courses)
      setItems(data.items)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }, [])

  useEffect(() => {
    refresh().finally(() => setLoading(false))
    const tick = setInterval(() => setNow(Date.now()), 60_000)
    const onVisible = () => document.visibilityState === 'visible' && refresh()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(tick)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [refresh])

  const run = useCallback(
    async (fn: () => Promise<unknown>) => {
      try {
        await fn()
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        refresh()
      }
    },
    [refresh],
  )

  const itemIndex = useMemo(() => {
    const m = new Map<string, UniItem>()
    for (const i of items) m.set(`${i.courseId}:${i.week}:${i.kind}`, i)
    return m
  }, [items])

  const getItem = useCallback(
    (courseId: string, week: number, kind: UniKind) => itemIndex.get(`${courseId}:${week}:${kind}`),
    [itemIndex],
  )

  const addCourse = useCallback(
    (c: NewUniCourse) =>
      run(async () => {
        const dueItems = (['exercise', 'quiz'] as UniKind[]).flatMap((kind) =>
          Array.from({ length: UNI_WEEKS }, (_, w) => {
            const rule = ruleFor(c, kind)
            return { week: w + 1, kind, dueAt: rule ? computeDue(rule, w + 1).toISOString() : null }
          }),
        )
        const data = await api('/api/uni/courses', 'POST', { ...c, items: dueItems })
        setCourses((prev) => [...prev, data.course])
        setItems((prev) => [...prev, ...data.items])
      }),
    [run],
  )

  const updateCourse = useCallback(
    (id: string, patch: Partial<UniCourse>) =>
      run(async () => {
        const current = courses.find((c) => c.id === id)
        if (!current) return
        const next = { ...current, ...patch }
        setCourses((prev) => prev.map((c) => (c.id === id ? next : c)))

        const changedKinds = (['exercise', 'quiz'] as UniKind[]).filter((k) => `${k}Rule` in patch)
        const recomputed = items
          .filter((i) => i.courseId === id && changedKinds.includes(i.kind) && !i.dueManual)
          .map((i) => {
            const rule = ruleFor(next, i.kind)
            return { ...i, dueAt: rule ? computeDue(rule, i.week).toISOString() : null }
          })
        if (recomputed.length) {
          const byId = new Map(recomputed.map((i) => [i.id, i]))
          setItems((prev) => prev.map((i) => byId.get(i.id) ?? i))
        }
        await api(`/api/uni/courses/${id}`, 'PATCH', {
          ...patch,
          items: recomputed.map((i) => ({ id: i.id, dueAt: i.dueAt })),
        })
      }),
    [run, courses, items],
  )

  const deleteCourse = useCallback(
    (id: string) =>
      run(async () => {
        setCourses((prev) => prev.filter((c) => c.id !== id))
        setItems((prev) => prev.filter((i) => i.courseId !== id))
        await api(`/api/uni/courses/${id}`, 'DELETE')
      }),
    [run],
  )

  const updateItem = useCallback(
    (id: string, patch: Partial<UniItem>) =>
      run(async () => {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
        await api(`/api/uni/items/${id}`, 'PATCH', patch)
      }),
    [run],
  )

  const markPastDone = useCallback(
    (courseId: string) =>
      run(async () => {
        const cutoff = new Date().toISOString()
        setItems((prev) =>
          prev.map((i) =>
            i.courseId === courseId && !i.skipped && i.dueAt && i.dueAt < cutoff ? { ...i, done: true } : i,
          ),
        )
        await api(`/api/uni/courses/${courseId}/mark-past-done`, 'POST')
      }),
    [run],
  )

  const value: Store = {
    loading,
    error,
    courses,
    items,
    now,
    getItem,
    addCourse,
    updateCourse,
    deleteCourse,
    updateItem,
    markPastDone,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useUni() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useUni must be used inside UniStoreProvider')
  return ctx
}
