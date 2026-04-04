import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { getWidgetDailyGoalsPayload } from '@/lib/widgetDailyGoalsPayload'
import { getServerCalendarDateString } from '@/lib/dateUtils'
import Link from 'next/link'

/** Sample rows when not signed in (matches Android widget layout). */
const MOCK_ITEMS = [
  {
    id: 'unproductive',
    label: 'Unproductive',
    targetMinutes: 72,
    doneMinutes: 35,
    progressPercent: 49,
    progressLabel: '35 min / 1h 12m',
    met: false,
  },
  {
    id: 'deep',
    label: 'Deep work',
    targetMinutes: 180,
    doneMinutes: 120,
    progressPercent: 67,
    progressLabel: '2h / 3h',
    met: false,
  },
  {
    id: 'exercise',
    label: 'Exercise',
    targetMinutes: 45,
    doneMinutes: 45,
    progressPercent: 100,
    progressLabel: '45 min / 45 min',
    met: true,
  },
]

function ProgressBar({
  percent,
  unproductive,
}: {
  percent: number
  unproductive: boolean
}) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-[width]"
        style={{
          width: `${Math.min(100, percent)}%`,
          backgroundColor: unproductive ? '#fca5a5' : '#22d3ee',
        }}
      />
    </div>
  )
}

export default async function WidgetPreviewPage() {
  const session = await auth()
  const userId = getDbUserId(session) || session?.user?.email || session?.user?.id
  const today = getServerCalendarDateString(new Date())

  let date = today
  let items = MOCK_ITEMS

  if (userId) {
    try {
      const payload = await getWidgetDailyGoalsPayload(userId, today)
      date = payload.date
      items = payload.items
    } catch {
      // keep mock on failure
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <p className="text-white/50 text-sm mb-6 text-center max-w-md">
        Browser preview of the Android home screen goals widget (read-only cards,
        same data as{' '}
        <code className="text-cyan-400/90">/api/widget/daily-goals</code> when
        signed in).
      </p>

      <div
        className="w-full max-w-[360px] rounded-2xl border border-white/10 p-2.5 bg-black"
        style={{ minHeight: 280 }}
      >
        {items.length === 0 ? (
          <p className="text-white/50 text-center py-8 text-sm">
            No goals configured.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((row) => {
              const unproductive = row.id === 'unproductive'
              return (
                <div
                  key={row.id}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-3.5 py-3"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[15px] font-medium text-white leading-tight">
                      {row.label}
                    </span>
                  </div>
                  <p
                    className={`text-[13px] mb-2 ${
                      unproductive ? 'text-red-300/90' : 'text-white/70'
                    }`}
                  >
                    {row.progressLabel}
                  </p>
                  <ProgressBar
                    percent={row.progressPercent}
                    unproductive={unproductive}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-white/40">Calendar day: {date}</p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
        {!session?.user ? (
          <Link
            href="/personal"
            className="text-cyan-400/90 hover:text-cyan-300 underline underline-offset-2"
          >
            Sign in to load your real goals
          </Link>
        ) : (
          <Link
            href="/personal/dashboard"
            className="text-white/50 hover:text-white/80"
          >
            ← Dashboard
          </Link>
        )}
        <Link href="/" className="text-white/50 hover:text-white/80">
          Home
        </Link>
      </div>
    </div>
  )
}
