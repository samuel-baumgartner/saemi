import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { toCourse, toItem, uniUserId } from '@/lib/uni/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const [courses, items] = await Promise.all([
      prisma.uniCourse.findMany({ where: { userId }, orderBy: [{ position: 'asc' }, { createdAt: 'asc' }] }),
      prisma.uniItem.findMany({ where: { userId }, orderBy: { week: 'asc' } }),
    ])
    return NextResponse.json({ courses: courses.map(toCourse), items: items.map(toItem) })
  } catch (e) {
    console.error('GET /api/uni', e)
    return NextResponse.json({ error: 'Failed to load uni data' }, { status: 500 })
  }
}
