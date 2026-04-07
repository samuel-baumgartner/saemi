/**
 * Timeline, session CRUD, and `/api/user/goals/today` share the same Prisma
 * user as the Android widget when `WIDGET_USER_ID` is set.
 */
export function resolveSessionsOwnerUserId(signedInUserId: string): string {
  return process.env.WIDGET_USER_ID?.trim() || signedInUserId
}
