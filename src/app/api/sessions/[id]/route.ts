import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDbUserId } from '@/lib/authDbUser'
import { resolveSessionsOwnerUserId } from '@/lib/sessionsOwnerUserId'
import { prisma } from '@/lib/prisma'

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
    const body = await request.json()
    const { activity, description, startTime, endTime, healthData } = body

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

    const updatedSession = await prisma.timeSession.update({
      where: { id },
      data: {
        ...(activity && { activity }),
        ...(description !== undefined && { description }),
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime !== undefined && {
          endTime: endTime ? new Date(endTime) : null,
        }),
        ...(healthData && {
          healthDataType: healthData.type,
          healthDataDetails: healthData.details,
        }),
      },
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

    await prisma.timeSession.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/sessions/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}

