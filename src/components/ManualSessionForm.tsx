'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface ManualSessionFormProps {
  onAdd: (activity: string, startTime: Date, endTime: Date, description?: string) => void
  selectedDate: string
}

export function ManualSessionForm({ onAdd, selectedDate }: ManualSessionFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activity, setActivity] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activity.trim() || !startTime || !endTime) return

    const start = new Date(`${selectedDate}T${startTime}:00`)
    const end = new Date(`${selectedDate}T${endTime}:00`)

    if (end <= start) {
      alert('End time must be after start time')
      return
    }

    onAdd(activity, start, end, description)
    
    // Reset form
    setActivity('')
    setDescription('')
    setStartTime('')
    setEndTime('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-colors"
      >
        <Plus size={18} />
        Add Manual Entry
      </button>
    )
  }

  return (
    <div className="bg-black/40 border border-white/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Add Manual Entry</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Activity *
          </label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-colors"
            placeholder="What did you work on?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-colors"
            placeholder="Additional details (optional)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              End Time *
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-white/30 transition-colors"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors"
        >
          Add Session
        </button>
      </form>
    </div>
  )
}


