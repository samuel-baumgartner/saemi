import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Canonical timeline user id = primary Google email (see getDbUserId / auth merge)
  const userId = 'sbaumgartn12@gmail.com'

  console.log('🌱 Seeding database with past sessions...')

  // January 3, 2026 sessions
  const jan3Sessions = [
    { start: '11:46:07', end: '11:55:41' },
    { start: '11:57:15', end: '11:58:47' },
    { start: '12:26:20', end: '13:18:57' },
    { start: '14:26:34', end: '15:00:29' },
    { start: '16:07:51', end: '17:01:59' },
  ]

  for (const session of jan3Sessions) {
    await prisma.timeSession.create({
      data: {
        userId,
        activity: 'Dssp',
        description: 'Work session',
        startTime: new Date(`2026-01-03T${session.start}`),
        endTime: new Date(`2026-01-03T${session.end}`),
        date: '2026-01-03',
        source: 'manual',
      },
    })
  }

  console.log('✅ Added 5 sessions for January 3, 2026')

  // January 4, 2026 sessions
  const jan4Sessions = [
    { start: '13:09:13', end: '13:13:03' },
    { start: '14:04:44', end: '15:09:15' },
    { start: '15:15:00', end: '15:25:00' },
    { start: '15:37:41', end: '15:58:47' },
    { start: '16:06:13', end: '16:29:24' },
    { start: '17:23:25', end: '18:03:26' },
    { start: '19:40:17', end: '20:12:30' },
    { start: '20:30:38', end: '21:03:49' },
    { start: '21:08:22', end: '21:28:22' },
  ]

  for (const session of jan4Sessions) {
    await prisma.timeSession.create({
      data: {
        userId,
        activity: 'Dssp',
        description: 'Work session',
        startTime: new Date(`2026-01-04T${session.start}`),
        endTime: new Date(`2026-01-04T${session.end}`),
        date: '2026-01-04',
        source: 'manual',
      },
    })
  }

  console.log('✅ Added 9 sessions for January 4, 2026')
  console.log('🎉 Seeding complete! Total: 14 sessions')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

