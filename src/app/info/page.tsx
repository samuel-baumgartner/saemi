import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { aggregateFocusByActivity, overlapMs } from '@/lib/focusInfo'
import { FocusComputerUseSection } from '@/components/FocusComputerUseSection'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function InfoPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/personal')
  }

  const userId = session.user.email
  const now = new Date()
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const [logs, focusSessions] = await Promise.all([
    prisma.focusSyncLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 30,
    }),
    prisma.timeSession.findMany({
      where: {
        userId,
        source: 'timechecker',
        endTime: { not: null },
        OR: [
          { startTime: { gte: dayAgo } },
          { endTime: { gte: dayAgo } },
        ],
      },
      orderBy: { startTime: 'asc' },
      select: { activity: true, startTime: true, endTime: true },
    }),
  ])

  const lastHour = aggregateFocusByActivity(focusSessions, hourAgo, now)
  const last24h = aggregateFocusByActivity(focusSessions, dayAgo, now)

  const toSegments = (winStart: Date, winEnd: Date) =>
    focusSessions
      .filter(
        (s) =>
          s.endTime &&
          overlapMs(s.startTime, s.endTime, winStart, winEnd) > 0
      )
      .map((s) => ({
        activity: s.activity,
        startTime: s.startTime.toISOString(),
        endTime: s.endTime!.toISOString(),
      }))

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Focus / sync info</h1>
        <Link
          href="/personal/dashboard"
          className="text-sm text-cyan-400 hover:underline"
        >
          Dashboard
        </Link>
      </div>

      <p className="text-white/50 text-sm mb-6">
        TimeChecker uploads and recent focus totals (source: timechecker).
      </p>

      <FocusComputerUseSection
        title="Last hour"
        aggregates={lastHour}
        segments={toSegments(hourAgo, now)}
        windowStart={hourAgo.toISOString()}
        windowEnd={now.toISOString()}
      />

      <FocusComputerUseSection
        title="Last 24 hours"
        aggregates={last24h}
        segments={toSegments(dayAgo, now)}
        windowStart={dayAgo.toISOString()}
        windowEnd={now.toISOString()}
      />

      <section>
        <h2 className="text-lg font-semibold mb-3 text-cyan-300">
          Recent syncs (API log)
        </h2>
        {logs.length === 0 ? (
          <p className="text-white/40">
            No sync events yet. Run <code className="text-white/60">timechecker sync</code> from your machine.
          </p>
        ) : (
          <ul className="text-sm space-y-2 font-mono text-white/70">
            {logs.map((l) => (
              <li key={l.id} className="border-b border-white/5 py-2">
                {l.createdAt.toISOString()} — sessions: {l.sessionCount}{' '}
                {l.message ? `(${l.message})` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
