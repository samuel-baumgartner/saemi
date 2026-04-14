import type { Prisma } from '@prisma/client'

/**
 * Marker for phone sessions deleted on web.
 * We keep a tombstone row so phone re-sync cannot re-create it.
 */
export const PHONE_DELETION_TOMBSTONE_TYPE = 'phone_deleted'

export const PHONE_DELETION_TOMBSTONE_WHERE: Prisma.TimeSessionWhereInput = {
  source: 'phone',
  userOverridden: true,
  healthDataType: PHONE_DELETION_TOMBSTONE_TYPE,
}

export function excludePhoneDeletionTombstones(
  where: Prisma.TimeSessionWhereInput
): Prisma.TimeSessionWhereInput {
  return {
    AND: [where, { NOT: PHONE_DELETION_TOMBSTONE_WHERE }],
  }
}
