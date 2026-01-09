'use client'

import { useState } from 'react'
import { Database, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export function MigrateLocalData() {
  const [isChecking, setIsChecking] = useState(false)
  const [localDataCount, setLocalDataCount] = useState(0)
  const [hasChecked, setHasChecked] = useState(false)
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const checkLocalData = () => {
    setIsChecking(true)
    try {
      const stored = localStorage.getItem('timeSessions')
      if (stored) {
        const sessions = JSON.parse(stored)
        setLocalDataCount(sessions.length)
      } else {
        setLocalDataCount(0)
      }
      setHasChecked(true)
    } catch (error) {
      console.error('Failed to check local data:', error)
      setLocalDataCount(0)
    } finally {
      setIsChecking(false)
    }
  }

  const migrateData = async () => {
    setIsMigrating(true)
    setMigrationStatus('idle')

    try {
      const stored = localStorage.getItem('timeSessions')
      if (!stored) {
        setMigrationStatus('error')
        return
      }

      const localSessions = JSON.parse(stored)

      // Convert and upload each session
      for (const session of localSessions) {
        await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            activity: session.activity,
            description: session.description,
            startTime: session.startTime,
            endTime: session.endTime,
            date: session.date,
            source: session.source || 'tracked',
            healthData: session.healthData
              ? {
                  type: session.healthData.type,
                  details: session.healthData.details,
                }
              : undefined,
          }),
        })
      }

      // Clear localStorage after successful migration
      localStorage.removeItem('timeSessions')
      
      setMigrationStatus('success')
      setTimeout(() => {
        window.location.reload() // Reload to fetch from database
      }, 2000)
    } catch (error) {
      console.error('Migration failed:', error)
      setMigrationStatus('error')
    } finally {
      setIsMigrating(false)
    }
  }

  if (!hasChecked) {
    return (
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Database className="text-blue-400" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Migrate Your Data
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Check if you have existing time tracking data to migrate to the database
            </p>

            <button
              onClick={checkLocalData}
              disabled={isChecking}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Database size={18} />
              {isChecking ? 'Checking...' : 'Check for Local Data'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (localDataCount === 0) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400" size={20} />
          <p className="text-white text-sm">
            No local data found. You're all set! Your data will now sync across devices.
          </p>
        </div>
      </div>
    )
  }

  if (migrationStatus === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400" size={24} />
          <div>
            <h4 className="text-white font-semibold">Migration Complete!</h4>
            <p className="text-white/60 text-sm">
              {localDataCount} sessions migrated to database. Reloading...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (migrationStatus === 'error') {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-400" size={24} />
          <div>
            <h4 className="text-white font-semibold">Migration Failed</h4>
            <p className="text-white/60 text-sm">
              Please try again or contact support if the issue persists.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-500/20 rounded-lg">
          <Database className="text-yellow-400" size={24} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            Found {localDataCount} Local Session{localDataCount !== 1 ? 's' : ''}
          </h3>
          <p className="text-white/60 text-sm mb-4">
            Migrate your existing data to the database so it syncs across all your devices
          </p>

          <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
            <span>Local Storage</span>
            <ArrowRight size={16} />
            <span>Database (Synced)</span>
          </div>

          <button
            onClick={migrateData}
            disabled={isMigrating}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Database size={18} />
            {isMigrating ? 'Migrating...' : 'Migrate to Database'}
          </button>

          <p className="text-xs text-white/40 mt-3">
            This is a one-time migration. Your local data will be moved to the database.
          </p>
        </div>
      </div>
    </div>
  )
}








