import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { parseDue, parseRule, ruleJson, uniUserId } from '@/lib/uni/server'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

/**
 * Body: any of name/color/hasQuiz/notes/position/exerciseRule/quizRule, plus optional
 * `items: [{ id, dueAt }]` with due dates recomputed by the browser after a rule change.
 */
export async function PATCH(request: NextRequest, { params }: Ctx) {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const data: Prisma.UniCourseUpdateInput = {}
  if (typeof body.name === 'string' && body.name.trim()) data.name = body.name.trim().slice(0, 120)
  if (typeof body.color === 'string') data.color = body.color.slice(0, 20)
  if (typeof body.hasQuiz === 'boolean') data.hasQuiz = body.hasQuiz
  if (typeof body.notes === 'string') data.notes = body.notes.slice(0, 50_000)
  if (typeof body.position === 'number') data.position = Math.round(body.position)
  if ('exerciseRule' in body) data.exerciseRule = ruleJson(parseRule(body.exerciseRule))
  if ('quizRule' in body) data.quizRule = ruleJson(parseRule(body.quizRule))

  try {
    const course = await prisma.uniCourse.findFirst({ where: { id, userId } })
    if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const itemUpdates = Array.isArray(body.items)
      ? (body.items as Record<string, unknown>[]).flatMap((raw) => {
          const due = parseDue(raw?.dueAt)
          return typeof raw?.id === 'string' && due !== undefined ? [{ id: raw.id, dueAt: due }] : []
        })
      : []
    await prisma.$transaction([
      prisma.uniCourse.update({ where: { id }, data }),
      ...itemUpdates.map((u) =>
        prisma.uniItem.updateMany({ where: { id: u.id, courseId: id, userId }, data: { dueAt: u.dueAt } }),
      ),
    ])
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('PATCH /api/uni/courses/[id]', e)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  try {
    await prisma.uniCourse.deleteMany({ where: { id, userId } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/uni/courses/[id]', e)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
