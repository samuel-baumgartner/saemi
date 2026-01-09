'use client'

import { useState, useEffect } from 'react'
import { Activity, RefreshCw, Unplug, CheckCircle2, AlertCircle } from 'lucide-react'
import { GoogleFitService } from '@/lib/googleFit'

interface GoogleFitConnectProps {
  userId: string
  accessToken?: string
  onSync: (sessions: any[]) => void
}

export function GoogleFitConnect({ userId, accessToken, onSync }: GoogleFitConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Check if user has disabled Google Fit
    const isDisabled = localStorage.getItem(`google_fit_disabled_${userId}`) === 'true'
    
    // Check if Google Fit is connected (use session access token)
    setIsConnected(!!accessToken && !isDisabled)

    // Load last sync time
    const lastSyncStr = localStorage.getItem(`google_fit_last_sync_${userId}`)
    if (lastSyncStr) {
      setLastSync(new Date(lastSyncStr))
    }
  }, [userId, accessToken])

  const handleConnect = () => {
    // Re-enable Google Fit
    localStorage.removeItem(`google_fit_disabled_${userId}`)
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    if (confirm('Disconnect Google Fit? Your health data will stop syncing (you can reconnect anytime).')) {
      // Mark as disabled
      localStorage.setItem(`google_fit_disabled_${userId}`, 'true')
      localStorage.removeItem(`google_fit_last_sync_${userId}`)
      setIsConnected(false)
      setLastSync(null)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncStatus('idle')

    try {
      if (!accessToken) {
        throw new Error('Not connected - no access token')
      }

      console.log('🚀 Starting Google Fit sync...')
      const service = new GoogleFitService(accessToken)

      // Fetch last 14 days of data (extended range)
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 1) // Set to tomorrow to include all of today
      endDate.setHours(23, 59, 59, 999) // End of tomorrow
      
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 14)
      startDate.setHours(0, 0, 0, 0) // Start of day

      console.log('📅 Date range:', { 
        start: startDate.toISOString(), 
        end: endDate.toISOString(),
        days: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      })

      const [sleepData, workoutData] = await Promise.all([
        service.getSleepData(startDate, endDate),
        service.getWorkoutData(startDate, endDate),
      ])

      console.log('📊 Fetched data:', { sleep: sleepData.length, workouts: workoutData.length })

      // Convert to sessions
      const healthSessions = GoogleFitService.convertToSessions(
        sleepData,
        workoutData
      )

      console.log('📦 Final sessions to sync:', healthSessions.length)

      // Notify parent component
      onSync(healthSessions)

      // Update last sync time
      const now = new Date()
      setLastSync(now)
      localStorage.setItem(`google_fit_last_sync_${userId}`, now.toISOString())

      setSyncStatus('success')
    } catch (error) {
      console.error('Sync failed:', error)
      setSyncStatus('error')
    } finally {
      setIsSyncing(false)
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Activity className="text-blue-400" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Google Fit Integration
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Automatically import your sleep and workout data from Google Fit
              <br />
              <span className="text-xs">💡 Syncs with Samsung Health if connected!</span>
            </p>

            <button
              onClick={handleConnect}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Connect Google Fit
            </button>

            <p className="text-xs text-white/40 mt-3">
              Tip: Connect Samsung Health to Google Fit first for automatic sync
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Activity className="text-green-400" size={20} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">Google Fit</span>
              <CheckCircle2 className="text-green-400" size={16} />
            </div>
            {lastSync && (
              <p className="text-xs text-white/60">
                Last synced: {lastSync.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {syncStatus === 'success' && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <CheckCircle2 size={16} />
              Synced!
            </span>
          )}
          {syncStatus === 'error' && (
            <span className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle size={16} />
              Error
            </span>
          )}

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>

          <button
            onClick={handleDisconnect}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
            title="Disconnect"
          >
            <Unplug size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

