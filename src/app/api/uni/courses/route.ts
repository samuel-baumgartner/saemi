import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseDue, parseRule, ruleJson, toCourse, toItem, uniUserId } from '@/lib/uni/server'
import { UNI_KINDS, UNI_WEEKS } from '@/lib/uni/types'

export const dynamic = 'force-dynamic'

/** Creates a course plus its Week 1-14 lecture, exercise and quiz rows (due dates computed in the browser's timezone). */
export async function POST(request: NextRequest) {
  const userId = await uniUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  const name = String(body?.name ?? '').trim().slice(0, 120)
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const hasQuiz = Boolean(body?.hasQuiz)
  const quizRule = parseRule(body?.quizRule)
  if (hasQuiz && !quizRule) return NextResponse.json({ error: 'A quiz always needs a deadline' }, { status: 400 })

  const dueByKey = new Map<string, Date | null>()
  if (Array.isArray(body?.items)) {
    for (const raw of body.items as Record<string, unknown>[]) {
      const due = parseDue(raw?.dueAt)
      if (due !== undefined) dueByKey.set(`${raw.week}:${raw.kind}`, due)
    }
  }

  try {
    const last = await prisma.uniCourse.findFirst({ where: { userId }, orderBy: { position: 'desc' } })
    const course = await prisma.$transaction(async (tx) => {
      const created = await tx.uniCourse.create({
        data: {
          userId,
          name,
          color: String(body?.color ?? '#6366f1').slice(0, 20),
          hasQuiz,
          position: (last?.position ?? -1) + 1,
          exerciseRule: ruleJson(parseRule(body?.exerciseRule)),
          quizRule: ruleJson(quizRule),
        },
      })
      await tx.uniItem.createMany({
        data: UNI_KINDS.flatMap((kind) =>
          Array.from({ length: UNI_WEEKS }, (_, w) => ({
            userId,
            courseId: created.id,
            week: w + 1,
            kind,
            dueAt: kind === 'lecture' ? null : (dueByKey.get(`${w + 1}:${kind}`) ?? null),
          })),
        ),
      })
      return created
    })
    const items = await prisma.uniItem.findMany({ where: { courseId: course.id }, orderBy: { week: 'asc' } })
    return NextResponse.json({ course: toCourse(course), items: items.map(toItem) })
  } catch (e) {
    console.error('POST /api/uni/courses', e)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
