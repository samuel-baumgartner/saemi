import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { isOwnerAccount } from '@/lib/sessionsOwnerUserId'

export async function reassignTimelineUserData(
  fromUserId: string,
  toUserId: string
): Promise<{ sessions: number; goalsMigrated: boolean; focusLogs: number }> {
  const from = fromUserId.trim()
  const to = toUserId.trim()
  if (!from || !to || from.toLowerCase() === to.toLowerCase()) {
    return { sessions: 0, goalsMigrated: false, focusLogs: 0 }
  }

  return prisma.$transaction(async (tx) => {
    const movedSessions = await tx.timeSession.updateMany({
      where: { userId: { equals: from, mode: 'insensitive' } },
      data: { userId: to },
    })

    const goalRow = await tx.userGoalSettings.findFirst({
      where: { userId: { equals: from, mode: 'insensitive' } },
    })

    const existingGoals = await tx.userGoalSettings.findUnique({
      where: { userId: to },
    })

    let goalsMigrated = false
    if (goalRow) {
      goalsMigrated = true
      const oldKey = goalRow.userId
      const goalsJson = goalRow.goalsJson as Prisma.InputJsonValue
      if (existingGoals) {
        await tx.userGoalSettings.update({
          where: { userId: to },
          data: { goalsJson },
        })
        if (oldKey !== to) {
          await tx.userGoalSettings.delete({ where: { userId: oldKey } })
        }
      } else {
        await tx.userGoalSettings.create({
          data: { userId: to, goalsJson },
        })
        if (oldKey !== to) {
          await tx.userGoalSettings.delete({ where: { userId: oldKey } })
        }
      }
    }

    const movedLogs = await tx.focusSyncLog.updateMany({
      where: { userId: { equals: from, mode: 'insensitive' } },
      data: { userId: to },
    })

    return {
      sessions: movedSessions.count,
      goalsMigrated,
      focusLogs: movedLogs.count,
    }
  })
}

/**
 * On Google OAuth sign-in, fold rows stored under the account's alternate Google emails into
 * the primary one. Owner accounts are skipped: their data lives under `WIDGET_USER_ID`.
 */
export async function mergeLegacyTimelineSourcesIntoPrimaryEmail(args: {
  primaryEmail: string
  userEmail?: string | null
  profileEmail?: string | null
}): Promise<void> {
  const target = args.primaryEmail.trim()
  if (!target || isOwnerAccount(target)) return

  const sources = new Set<string>()
  for (const s of [args.userEmail, args.profileEmail]) {
    const t = s?.trim()
    if (t && t.toLowerCase() !== target.toLowerCase() && !isOwnerAccount(t)) sources.add(t)
  }
  for (const from of sources) {
    await reassignTimelineUserData(from, target)
  }
}
