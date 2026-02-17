'use client'

import { useState, useEffect } from 'react'
import { BookOpen, RefreshCw, Unplug, CheckCircle2, AlertCircle, ExternalLink, Settings } from 'lucide-react'
import { AnkiConnectService, getAnkiConnected, storeAnkiConnected } from '@/lib/anki'
import { getLocalDateString } from '@/lib/dateUtils'
import { AnkiSessionGapDialog } from './AnkiSessionGapDialog'

interface AnkiConnectProps {
  userId: string
  onSync: (sessions: any[]) => void
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
    } catch (error: any) {
      console.error('AnkiConnect test failed:', error)
      setIsConnected(false)
      setErrorMessage(error.message || 'Connection failed')
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
    // Check if user has a saved preference
    const savedGap = localStorage.getItem(`anki_session_gap_${userId}`)
    
    if (savedGap) {
      // Use saved preference and sync directly
      performSync(parseInt(savedGap))
    } else {
      // First time - show the dialog
      setShowGapDialog(true)
    }
  }

  const handleConfigureGap = () => {
    // Show dialog to reconfigure
    setShowGapDialog(true)
  }

  const performSync = async (gapMinutes: number) => {
    setIsSyncing(true)
    setSyncStatus('idle')
    setErrorMessage('')

    // Save the preference
    localStorage.setItem(`anki_session_gap_${userId}`, gapMinutes.toString())
    setSessionGapMinutes(gapMinutes)

    try {
      const service = new AnkiConnectService()

      // Fetch last 14 days of reviews
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 14)

      console.log('📚 Fetching Anki reviews from', startDate, 'to', endDate)

      const reviews = await service.getReviews(startDate, endDate)
      
      if (reviews.length === 0) {
        console.log('No Anki reviews found in date range')
        setSyncStatus('success')
        const now = new Date()
        setLastSync(now)
        localStorage.setItem(`anki_last_sync_${userId}`, now.toISOString())
        return
      }

      // Group reviews into study sessions with configured gap
      const studySessions = AnkiConnectService.convertToStudySessions(reviews, gapMinutes)

      console.log(`Found ${studySessions.length} Anki study sessions`)

      // Convert to TimeSession format
      const ankiSessions = studySessions.map((session, index) => ({
        id: `anki-${session.startTime.getTime()}-${index}`,
        activity: '📚 Anki Study',
        description: `${session.cards} cards reviewed`,
        startTime: session.startTime.toISOString(),
        endTime: session.endTime.toISOString(),
        date: getLocalDateString(session.startTime),
        source: 'anki',
        healthData: {
          type: 'study',
          details: {
            cards: session.cards,
            deck: session.deck,
          },
        },
      }))

      // Notify parent component
      onSync(ankiSessions)

      // Update last sync time
      const now = new Date()
      setLastSync(now)
      localStorage.setItem(`anki_last_sync_${userId}`, now.toISOString())

      setSyncStatus('success')
    } catch (error: any) {
      console.error('Anki sync failed:', error)
      setErrorMessage(error.message || 'Sync failed')
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
        defaultValue={sessionGapMinutes}
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
            title={`Session gap: ${sessionGapMinutes} min`}
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














