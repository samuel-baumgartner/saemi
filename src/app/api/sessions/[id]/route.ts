import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PHONE_DELETION_TOMBSTONE_TYPE } from '@/lib/phoneSessionDeletion'

export const dynamic = 'force-dynamic'
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const sessionUserId = getDbUserId(session)
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = resolveSessionsOwnerUserId(sessionUserId)

    const { id } = await params
    const body = (await request.json()) as Record<string, unknown>
    const { activity, description, startTime, endTime, healthData } = body as {
      activity?: string
      description?: string | null
      startTime?: string
      endTime?: string | null
      healthData?: { type?: string; details?: unknown }
    }

    // Verify the session belongs to the user
    const existingSession = await prisma.timeSession.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const locksPhoneRow =
      existingSession.source === 'phone' &&
      ('activity' in body ||
        'description' in body ||
        'startTime' in body ||
        'endTime' in body)

    const data: Prisma.TimeSessionUpdateInput = {
      ...(activity && { activity }),
      ...(description !== undefined && { description }),
      ...(startTime && { startTime: new Date(startTime) }),
      ...(endTime !== undefined && {
        endTime: endTime ? new Date(endTime) : null,
      }),
      ...(healthData && {
        healthDataType: healthData.type ?? null,
        healthDataDetails:
          healthData.details === undefined || healthData.details === null
            ? undefined
            : (healthData.details as Prisma.InputJsonValue),
      }),
      ...(locksPhoneRow ? { userOverridden: true } : {}),
    }

    const updatedSession = await prisma.timeSession.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedSession)
  } catch (error) {
    console.error('PATCH /api/sessions/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update session' },
      { status: 500 }
    )
  }
}

// DELETE /api/sessions/[id] - Delete a session
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const sessionUserId = getDbUserId(session)
    if (!sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = resolveSessionsOwnerUserId(sessionUserId)

    const { id } = await params

    // Verify the session belongs to the user
    const existingSession = await prisma.timeSession.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!existingSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (existingSession.source === 'phone') {
      await prisma.timeSession.update({
        where: { id },
        data: {
          userOverridden: true,
          healthDataType: PHONE_DELETION_TOMBSTONE_TYPE,
          healthDataDetails: Prisma.JsonNull,
        },
      })
    } else {
      await prisma.timeSession.delete({
        where: { id },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/sessions/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}

