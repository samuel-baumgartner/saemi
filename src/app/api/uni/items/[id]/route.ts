import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { parseDue, toItem, uniUserId } from '@/lib/uni/server'

export const dynamic = 'force-dynamic'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const data: Prisma.UniItemUpdateManyMutationInput = {}
  if (typeof body.done === 'boolean') data.done = body.done
  if (typeof body.skipped === 'boolean') data.skipped = body.skipped
  if (typeof body.notes === 'string') data.notes = body.notes.slice(0, 50_000)
  if (typeof body.points === 'string') data.points = body.points.slice(0, 100)
  if (typeof body.dueManual === 'boolean') data.dueManual = body.dueManual
  const due = parseDue(body.dueAt)
  if (due !== undefined) data.dueAt = due

  try {
    const { count } = await prisma.uniItem.updateMany({ where: { id, userId }, data })
    if (!count) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const item = await prisma.uniItem.findUnique({ where: { id } })
    return NextResponse.json({ item: item ? toItem(item) : null })
  } catch (e) {
    console.error('PATCH /api/uni/items/[id]', e)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}
