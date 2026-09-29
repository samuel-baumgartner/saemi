'use client'

import { createContext, useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Clock } from 'lucide-react'
import { UniStoreProvider, useUni } from './UniStore'
import { ItemSheet } from './ItemSheet'

const OpenItemContext = createContext<(itemId: string | null) => void>(() => {})

export function useOpenItem() {
  return useContext(OpenItemContext)
}

const TABS = [
  { href: '/personal/uni', label: 'Overview' },
  { href: '/personal/uni/upcoming', label: 'Upcoming' },
]

function Body({ children }: { children: React.ReactNode }) {
  const { loading, error } = useUni()
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <OpenItemContext.Provider value={setOpenItemId}>
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-[1500px] items-center gap-2 px-3 sm:px-6">
            <Link href="/" className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white" title="Home">
              <Home size={18} />
            </Link>
            <Link
              href="/personal/dashboard"
              className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              title="Time Tracker"
            >
              <Clock size={18} />
            </Link>
            <h1 className="mr-2 text-lg font-bold">Uni</h1>
            <nav className="flex gap-1">
              {TABS.map((t) => {
                const active =
                  t.href === '/personal/uni'
                    ? pathname === t.href || pathname.startsWith('/personal/uni/course')
                    : pathname.startsWith(t.href)
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`rounded-lg px-3 py-1.5 text-sm ${active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    {t.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] px-3 pb-16 pt-4 sm:px-6">
          {error && (
            <div className="mb-3 rounded-lg border border-red-900 bg-red-950/60 px-3 py-2 text-sm text-red-300">{error}</div>
          )}
          {loading ? <div className="py-20 text-center text-zinc-500">Loading your courses...</div> : children}
        </main>
        <ItemSheet itemId={openItemId} onClose={() => setOpenItemId(null)} />
      </div>
    </OpenItemContext.Provider>
  )
}

export function UniShell({ children }: { children: React.ReactNode }) {
  return (
    <UniStoreProvider>
      <Body>{children}</Body>
    </UniStoreProvider>
  )
}
