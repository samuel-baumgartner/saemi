import { auth, signOut } from '@/auth'
import { TaskDashboard } from '@/components/TaskDashboard'
import { LogOut, Home } from 'lucide-react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()

  // If not logged in, redirect to login
  if (!session?.user) {
    redirect('/personal')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                title="Back to home"
              >
                <Home size={20} />
              </Link>
              <h1 className="text-xl font-bold text-white">Time Tracker</h1>
            </div>

            <div className="flex items-center gap-4">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {session.user.name}
                </p>
                <p className="text-xs text-white/60">{session.user.email}</p>
              </div>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/personal' })
                }}
              >
                <button
                  type="submit"
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskDashboard userId={session.user.email || session.user.id || ''} />
      </main>
    </div>
  )
}

