'use client'

import { useState } from 'react'
import { Database } from 'lucide-react'

type RecoverTimelineDataProps = {
  currentEmail: string
  onRecovered: () => void
}

export function RecoverTimelineData({ currentEmail, onRecovered }: RecoverTimelineDataProps) {
  const [fromUserId, setFromUserId] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  const merge = async () => {
    setStatus('loading')
    setMessage(null)
    try {
      const r = await fetch('/api/account/claim-legacy-timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromUserId: fromUserId.trim() }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setStatus('err')
        setMessage(typeof data.error === 'string' ? data.error : 'Merge failed')
        return
      }
      setStatus('ok')
      setMessage(
        `Merged ${data.sessions ?? 0} sessions${data.goalsMigrated ? ', goals' : ''}${
          data.focusLogs ? `, ${data.focusLogs} focus log rows` : ''
        }.`
      )
      onRecovered()
    } catch {
      setStatus('err')
      setMessage('Network error')
    }
  }

  return (
    <div className="rounded-lg border border-amber-500/35 bg-amber-500/10 p-4 text-sm">
      <div className="flex gap-3">
        <div className="rounded-lg bg-amber-500/20 p-2 text-amber-300">
          <Database size={20} />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="font-semibold text-white">Timeline empty after signing in?</h3>
          <p className="text-white/65">
            Your timeline is keyed to <span className="text-white/90">{currentEmail}</span> (primary
            Google email). Sign-in usually merges old work-address rows automatically; use this if
            something is still missing.
          </p>
          <div className="flex flex-wrap items-end gap-2 pt-1">
            <label className="block min-w-[200px] flex-1">
              <span className="mb-1 block text-xs text-white/50">Previous account id (email)</span>
              <input
                type="email"
                value={fromUserId}
                onChange={(e) => setFromUserId(e.target.value)}
                placeholder="e.g. you@work.example"
                className="w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-white placeholder:text-white/35"
              />
            </label>
            <button
              type="button"
              disabled={status === 'loading' || !fromUserId.trim()}
              onClick={merge}
              className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-black hover:bg-amber-400 disabled:opacity-40"
            >
              {status === 'loading' ? 'Merging…' : 'Merge into this account'}
            </button>
          </div>
          {message && (
            <p className={status === 'ok' ? 'text-emerald-300/90' : 'text-red-300/90'}>{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
