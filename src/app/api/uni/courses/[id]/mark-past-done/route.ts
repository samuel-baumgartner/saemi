import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { uniUserId } from '@/lib/uni/server'

export const dynamic = 'force-dynamic'

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    const { count } = await prisma.uniItem.updateMany({
      where: { courseId: id, userId, skipped: false, dueAt: { lt: new Date() } },
      data: { done: true },
    })
    return NextResponse.json({ updated: count })
  } catch (e) {
    console.error('POST /api/uni/courses/[id]/mark-past-done', e)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
