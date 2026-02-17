'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface AnkiSessionGapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (gapMinutes: number) => void
  defaultValue?: number
}

export function AnkiSessionGapDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  defaultValue = 10 
}: AnkiSessionGapDialogProps) {
  const [gapMinutes, setGapMinutes] = useState(defaultValue)

  useEffect(() => {
    setGapMinutes(defaultValue)
  }, [defaultValue, isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(gapMinutes)
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
            Session Gap Configuration
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        <p className="text-white/70 text-sm mb-6">
          Define how many minutes of inactivity should create a new study session.
          Reviews within this time window will be grouped together.
        </p>

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
            Current: {gapMinutes} minute{gapMinutes !== 1 ? 's' : ''} gap between sessions
          </p>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-6">
          <p className="text-purple-300 text-xs">
            💡 <strong>Tip:</strong> A smaller gap (e.g., 5 min) creates more sessions, 
            while a larger gap (e.g., 15 min) groups more reviews together.
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

