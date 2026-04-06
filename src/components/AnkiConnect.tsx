'use client'

import { useState, useEffect } from 'react'
import { BookOpen, RefreshCw, Unplug, CheckCircle2, AlertCircle, ExternalLink, Settings } from 'lucide-react'
import { AnkiConnectService, getAnkiConnected, storeAnkiConnected } from '@/lib/anki'
import { fetchAnkiSessionsForUser } from '@/lib/ankiClientSync'
import { AnkiSessionGapDialog } from './AnkiSessionGapDialog'
import type { HealthSyncSession } from '@/lib/ankiClientSync'

interface AnkiConnectProps {
  userId: string
  onSync: (sessions: HealthSyncSession[]) => void
}

export function AnkiConnect({ userId, onSync }: AnkiConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showGapDialog, setShowGapDialog] = useState(false)
  const [sessionGapMinutes, setSessionGapMinutes] = useState(10)
  const [importDays, setImportDays] = useState(14)

  useEffect(() => {
    // Check if Anki was previously connected
    const wasConnected = getAnkiConnected(userId)
    if (wasConnected) {
      // Test connection on mount
      testConnection()
    }

    // Load last sync time
    const lastSyncStr = localStorage.getItem(`anki_last_sync_${userId}`)
    if (lastSyncStr) {
      setLastSync(new Date(lastSyncStr))
    }

    // Load saved session gap preference
    const savedGap = localStorage.getItem(`anki_session_gap_${userId}`)
    if (savedGap) {
      setSessionGapMinutes(parseInt(savedGap))
    }

    // Load saved import days preference
    const savedImportDays = localStorage.getItem(`anki_import_days_${userId}`)
    if (savedImportDays) {
      setImportDays(parseInt(savedImportDays))
    }
  }, [userId])

  const testConnection = async () => {
    setIsTesting(true)
    setErrorMessage('')

    try {
      const service = new AnkiConnectService()
      const connected = await service.testConnection()
      
      if (connected) {
        const version = await service.getVersion()
        console.log('✅ Connected to AnkiConnect, version:', version)
        setIsConnected(true)
        storeAnkiConnected(userId, true)
      } else {
        throw new Error('Could not connect to AnkiConnect')
      }
    } catch (error: unknown) {
      console.error('AnkiConnect test failed:', error)
      setIsConnected(false)
      setErrorMessage(
        error instanceof Error ? error.message : 'Connection failed'
      )
      storeAnkiConnected(userId, false)
    } finally {
      setIsTesting(false)
    }
  }

  const handleConnect = async () => {
    await testConnection()
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    storeAnkiConnected(userId, false)
    setLastSync(null)
    localStorage.removeItem(`anki_last_sync_${userId}`)
  }

  const handleSync = async () => {
    // Check if user has saved preferences
    const savedGap = localStorage.getItem(`anki_session_gap_${userId}`)
    const savedImportDays = localStorage.getItem(`anki_import_days_${userId}`)
    
    if (savedGap && savedImportDays) {
      // Use saved preferences and sync directly
      performSync(parseInt(savedGap), parseInt(savedImportDays))
    } else {
      // First time - show the dialog
      setShowGapDialog(true)
    }
  }

  const handleConfigureGap = () => {
    // Show dialog to reconfigure
    setShowGapDialog(true)
  }

  const performSync = async (gapMinutes: number, days: number) => {
    setIsSyncing(true)
    setSyncStatus('idle')
    setErrorMessage('')

    // Save the preferences
    localStorage.setItem(`anki_session_gap_${userId}`, gapMinutes.toString())
    localStorage.setItem(`anki_import_days_${userId}`, days.toString())
    setSessionGapMinutes(gapMinutes)
    setImportDays(days)

    try {
      const { sessions: ankiSessions, connectOk } =
        await fetchAnkiSessionsForUser(userId)

      if (!connectOk) {
        throw new Error('Could not connect to AnkiConnect')
      }

      if (ankiSessions.length === 0) {
        console.log('No Anki reviews to import in range')
        setSyncStatus('success')
        const now = new Date()
        setLastSync(now)
        localStorage.setItem(`anki_last_sync_${userId}`, now.toISOString())
        return
      }

      console.log(`Found ${ankiSessions.length} Anki study sessions`)
      onSync(ankiSessions)

      const now = new Date()
      setLastSync(now)
      localStorage.setItem(`anki_last_sync_${userId}`, now.toISOString())

      setSyncStatus('success')
    } catch (error: unknown) {
      console.error('Anki sync failed:', error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Sync failed'
      )
      setSyncStatus('error')
    } finally {
      setIsSyncing(false)
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <BookOpen className="text-purple-400" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Anki Integration
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Automatically import your Anki study sessions
              <br />
              <span className="text-xs">⚠️ Requires Anki Desktop running with AnkiConnect installed</span>
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                {errorMessage}
                <br />
                <span className="text-xs text-red-400/60">
                  Make sure Anki Desktop is running and AnkiConnect is installed
                </span>
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={isTesting}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <BookOpen size={20} />
              {isTesting ? 'Connecting...' : 'Connect Anki'}
            </button>

            <a
              href="https://ankiweb.net/shared/info/2055492159"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 mt-3"
            >
              <ExternalLink size={12} />
              Install AnkiConnect Add-on
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black/40 border border-white/10 rounded-lg p-4">
      <AnkiSessionGapDialog
        isOpen={showGapDialog}
        onClose={() => setShowGapDialog(false)}
        onConfirm={performSync}
        defaultGapValue={sessionGapMinutes}
        defaultImportDays={importDays}
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BookOpen className="text-purple-400" size={20} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">Anki</span>
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
            onClick={handleConfigureGap}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title={`Import: ${importDays} days, Gap: ${sessionGapMinutes} min`}
          >
            <Settings size={16} />
          </button>

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














