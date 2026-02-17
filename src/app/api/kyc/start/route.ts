import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  // If Veriff API key is provided, create a real session; otherwise simulate
  const apiKey = process.env.VERIFF_API_KEY
  let sessionId = crypto.randomUUID()
  let checkUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard/kyc`

  if (apiKey) {
    try {
      const res = await fetch('https://api.veriff.com/v1/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-CLIENT': apiKey,
        },
        body: JSON.stringify({
          verification: {
            callback: `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/kyc/webhook`,
            person: {
              givenName: session.user.name || 'Dwelzer User',
            },
          },
        }),
      })

      const data = await res.json()
      sessionId = data?.verification?.id || sessionId
      checkUrl = data?.verification?.url || checkUrl
    } catch (error) {
      console.error('Veriff session error', error)
    }
  }

  await prisma.kYCVerification.upsert({
    where: { userId },
    update: {
      status: 'PENDING',
      veriffSessionId: sessionId,
      submittedAt: new Date(),
    },
    create: {
      userId,
      documentType: 'PASSPORT',
      status: 'PENDING',
      veriffSessionId: sessionId,
      submittedAt: new Date(),
    },
  })

  return NextResponse.json({ sessionId, checkUrl })
}
