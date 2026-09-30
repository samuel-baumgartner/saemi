'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MIN_THUMB_PCT = 8

function ArrowButton({ dir, disabled, onClick }: { dir: 'left' | 'right'; disabled: boolean; onClick: () => void }) {
  const Icon = dir === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25"
    >
      <Icon size={15} />
    </button>
  )
}

/**
 * Horizontal scroll container with its own slider instead of the native scrollbar.
 * `focus` is a selector for an element to scroll into view on mount, placed right after
 * the element marked `data-sticky` (e.g. a sticky first column).
 */
export function HScroll({ children, focus }: { children: React.ReactNode; focus?: string }) {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const [thumb, setThumb] = useState(100)
  const [pos, setPos] = useState(0)
  const [dragging, setDragging] = useState(false)

  const measure = useCallback(() => {
    const el = viewport.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setThumb(max > 1 ? Math.max(MIN_THUMB_PCT, (el.clientWidth / el.scrollWidth) * 100) : 100)
    setPos(max > 1 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    el.addEventListener('scroll', measure, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', measure)
    }
  }, [measure])

  useEffect(() => {
    const el = viewport.current
    const target = focus ? el?.querySelector<HTMLElement>(focus) : null
    if (!el || !target) return
    const sticky = el.querySelector<HTMLElement>('[data-sticky]')?.offsetWidth ?? 0
    el.scrollLeft = target.offsetLeft - sticky
  }, [focus])

  const maxScroll = () => {
    const el = viewport.current
    return el ? el.scrollWidth - el.clientWidth : 0
  }

  const step = (dir: 1 | -1) => {
    const el = viewport.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: 'smooth' })
  }

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = viewport.current
    if (!el || e.target !== e.currentTarget) return
    const rect = e.currentTarget.getBoundingClientRect()
    const t = thumb / 100
    const centered = (e.clientX - rect.left) / rect.width - t / 2
    const next = Math.min(1, Math.max(0, centered / (1 - t)))
    el.scrollTo({ left: next * maxScroll(), behavior: 'smooth' })
  }

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = viewport.current
    if (!el) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, left: el.scrollLeft }
    setDragging(true)
  }

  const onThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = viewport.current
    const d = drag.current
    const free = (track.current?.clientWidth ?? 0) * (1 - thumb / 100)
    if (!el || !d || free <= 0) return
    el.scrollLeft = d.left + ((e.clientX - d.x) / free) * maxScroll()
  }

  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  const overflow = thumb < 100

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-2xl shadow-black/60">
      <div className="relative">
        <div ref={viewport} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent transition-opacity duration-300 ${
            overflow && pos < 0.995 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {overflow && (
        <div className="flex items-center gap-2 border-t border-white/[0.06] px-2 py-1.5">
          <ArrowButton dir="left" disabled={pos <= 0.005} onClick={() => step(-1)} />
          <div ref={track} onPointerDown={onTrackPointerDown} className="group/track relative h-5 flex-1 cursor-pointer">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/[0.06]" />
            <div
              onPointerDown={onThumbPointerDown}
              onPointerMove={onThumbPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{ width: `${thumb}%`, left: `${pos * (100 - thumb)}%` }}
              className={`absolute inset-y-0 flex touch-none items-center ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
              <div
                className={`w-full rounded-full transition-[height,background-color] duration-150 ${
                  dragging ? 'h-2 bg-indigo-400' : 'h-1.5 bg-white/25 group-hover/track:h-2 group-hover/track:bg-white/40'
                }`}
              />
            </div>
          </div>
          <ArrowButton dir="right" disabled={pos >= 0.995} onClick={() => step(1)} />
        </div>
      )}
    </div>
  )
}
