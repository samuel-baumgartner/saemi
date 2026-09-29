/**
 * The site owner signs in with several Google accounts, while the Android widget and the
 * laptop TimeChecker write to `WIDGET_USER_ID`. Only the owner's accounts share that data;
 * anyone else who signs in (family, friends) keeps their own rows under their Google email.
 */
const OWNER_ACCOUNT_IDS = ['sbaumgartn12@gmail.com', 'samuel.baumgartner@ebmnet.ch']

function ownerAccountIds(): Set<string> {
  const ids = new Set(OWNER_ACCOUNT_IDS.map((s) => s.toLowerCase()))
  const extra = [
    process.env.WIDGET_USER_ID,
    process.env.TIMECHECKER_SYNC_USER_EMAIL,
    ...(process.env.OWNER_USER_ALIASES ?? '').split(/[,;\s]+/),
  ]
  for (const v of extra) {
    const t = v?.trim().toLowerCase()
    if (t) ids.add(t)
  }
  return ids
}

export function isOwnerAccount(userId: string): boolean {
  return ownerAccountIds().has(userId.trim().toLowerCase())
}

/** Timeline, sessions, goals, limits and Uni: the Prisma `userId` for a signed-in user. */
export function resolveSessionsOwnerUserId(signedInUserId: string): string {
  const owner = process.env.WIDGET_USER_ID?.trim()
  if (owner && isOwnerAccount(signedInUserId)) return owner
  return signedInUserId
}
