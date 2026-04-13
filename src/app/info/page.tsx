import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { prisma } from '@/lib/prisma'
import {
  aggregateFocusByActivity,
  formatDurationMs,
} from '@/lib/focusInfo'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function InfoPage() {
  const session = await auth()
  const userId = getDbUserId(session)
  if (!userId) {
    redirect('/personal')
  }
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
      select: {
        activity: true,
        startTime: true,
        endTime: true,
        healthDataDetails: true,
      },
    }),
  ])

  const focusSlices = focusSessions.map((s) => ({
    activity: s.activity,
    startTime: s.startTime,
    endTime: s.endTime,
    healthData:
      s.healthDataDetails !== null && typeof s.healthDataDetails === 'object'
        ? { details: s.healthDataDetails as { focusSeconds?: number } }
        : undefined,
  }))

  const lastHour = aggregateFocusByActivity(focusSlices, hourAgo, now)
  const last24h = aggregateFocusByActivity(focusSlices, dayAgo, now)

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

      <section className="mb-10 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <h2 className="text-base font-semibold mb-2 text-cyan-300">
          TimeChecker → StartUp goal
        </h2>
        <p className="text-white/55 text-sm leading-relaxed mb-2">
          The <strong className="text-white/80">StartUp</strong> daily goal counts
          TimeChecker rows when the desktop client sets{' '}
          <code className="text-cyan-200/90">healthData.details.saemiGoals</code> to{' '}
          <code className="text-cyan-200/90">[&quot;startup&quot;]</code>.{' '}
          <code className="text-cyan-200/90">sync.json</code> →{' '}
          <code className="text-cyan-200/90">startup_rule_ids</code> marks whole rules
          (e.g. Cursor). Generic browser rules use title matching on the computer so
          not every Chrome minute counts — see the TimeChecker README. Sessions whose
          text still matches “Cursor” also count (e.g. rule label Cursor).
        </p>
        <p className="text-white/55 text-sm leading-relaxed mb-2">
          Optional: if your tracker puts tab title or URL inside{' '}
          <code className="text-cyan-200/90">healthData.details</code>, we merge those
          strings into <code className="text-cyan-200/90">description</code> for the
          timeline (keys like title, url, href…).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-cyan-300">
          Last hour
        </h2>
        {lastHour.length === 0 ? (
          <p className="text-white/40">No focus data in the last 60 minutes.</p>
        ) : (
          <ul className="space-y-2">
            {lastHour.map(({ activity, ms }) => (
              <li
                key={activity}
                className="flex justify-between border-b border-white/10 py-2"
              >
                <span>{activity}</span>
                <span className="text-white/70">{formatDurationMs(ms)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-3 text-cyan-300">
          Last 24 hours
        </h2>
        {last24h.length === 0 ? (
          <p className="text-white/40">No focus data in the last 24 hours.</p>
        ) : (
          <ul className="space-y-2">
            {last24h.map(({ activity, ms }) => (
              <li
                key={activity}
                className="flex justify-between border-b border-white/10 py-2"
              >
                <span>{activity}</span>
                <span className="text-white/70">{formatDurationMs(ms)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

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
