import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

/** Optional env: extra DB `userId` values to fold into primary email on Google sign-in. */
function envLegacyIds(): string[] {
  const raw = process.env.TIMELINE_LEGACY_USER_IDS
  if (!raw?.trim()) return []
  return raw.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean)
}

/**
 * Old row keys that belonged to the same Google account as this primary email.
 * Keeps timeline data unified when Google used to expose a different login id.
 */
const PRIMARY_EMAIL_LEGACY_ROW_KEYS: Record<string, readonly string[]> = {
  'sbaumgartn12@gmail.com': ['samuel.baumgartner@ebmnet.ch'],
}

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

/** On Google OAuth sign-in, move any legacy `userId` rows into the primary email Google returns. */
export async function mergeLegacyTimelineSourcesIntoPrimaryEmail(args: {
  primaryEmail: string
  userEmail?: string | null
  profileEmail?: string | null
}): Promise<void> {
  const target = args.primaryEmail.trim()
  if (!target) return

  const sources = new Set<string>()
  const add = (s?: string | null) => {
    const t = s?.trim()
    if (t) sources.add(t)
  }
  add(args.userEmail)
  add(args.profileEmail)
  for (const x of envLegacyIds()) add(x)
  for (const x of PRIMARY_EMAIL_LEGACY_ROW_KEYS[target.toLowerCase()] ?? []) add(x)

  const fromList = [...sources].filter((s) => s.toLowerCase() !== target.toLowerCase())
  for (const from of fromList) {
    await reassignTimelineUserData(from, target)
  }
}
