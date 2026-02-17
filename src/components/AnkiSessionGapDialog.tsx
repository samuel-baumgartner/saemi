'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface AnkiSessionGapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (gapMinutes: number, importDays: number) => void
  defaultGapValue?: number
  defaultImportDays?: number
}

export function AnkiSessionGapDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  defaultGapValue = 10,
  defaultImportDays = 14
}: AnkiSessionGapDialogProps) {
  const [gapMinutes, setGapMinutes] = useState(defaultGapValue)
  const [importDays, setImportDays] = useState(defaultImportDays)

  useEffect(() => {
    setGapMinutes(defaultGapValue)
    setImportDays(defaultImportDays)
  }, [defaultGapValue, defaultImportDays, isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(gapMinutes, importDays)
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-xl p-6 shadow-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            Anki Sync Configuration
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        <p className="text-white/70 text-sm mb-6">
          Configure how Anki reviews are imported and grouped into study sessions.
        </p>

        {/* Import Time Range */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Import Time Range
          </label>
          <select
            value={importDays}
            onChange={(e) => setImportDays(parseInt(e.target.value))}
            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="7">Last 7 days (1 week)</option>
            <option value="14">Last 14 days (2 weeks)</option>
            <option value="30">Last 30 days (1 month)</option>
            <option value="60">Last 60 days (2 months)</option>
            <option value="90">Last 90 days (3 months)</option>
            <option value="180">Last 180 days (6 months)</option>
            <option value="365">Last 365 days (1 year)</option>
          </select>
          <p className="text-white/50 text-xs mt-2">
            How far back to fetch Anki review data
          </p>
        </div>

        {/* Session Gap */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Session Gap (minutes)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max="60"
              value={gapMinutes}
              onChange={(e) => setGapMinutes(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
              className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <span className="text-white/60 text-sm">minutes</span>
          </div>
          <p className="text-white/50 text-xs mt-2">
            Gap of inactivity before starting a new session
          </p>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-6">
          <p className="text-purple-300 text-xs">
            💡 <strong>Tip:</strong> Longer import ranges give you more historical data. 
            Smaller session gaps create more distinct sessions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
          >
            Confirm & Sync
          </button>
        </div>
      </div>
    </div>
  )
}


