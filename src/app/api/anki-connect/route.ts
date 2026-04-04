import { NextRequest, NextResponse } from 'next/server'

/** AnkiConnect bind address (server-side only; avoids browser CORS to localhost:8765). */
const ANKI_CONNECT_URL = 'http://127.0.0.1:8765'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: string
  try {
    body = await req.text()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    const response = await fetch(ANKI_CONNECT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body || '{}',
    })
    const text = await response.text()
    return new NextResponse(text, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return NextResponse.json(
      { error: 'AnkiConnect unreachable — is Anki running with the add-on?' },
      { status: 502 }
    )
  }
}
