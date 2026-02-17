import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export const runtime = 'nodejs'

function verifySignature(body: string, signature: string | null, secret: string | undefined) {
  if (!secret || !signature) return true // allow when not configured
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body)
  const digest = hmac.digest('hex')
  return digest === signature
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-veriff-signature')

  if (!verifySignature(rawBody, signature, process.env.VERIFF_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(rawBody)
  const sessionId = event?.verification?.id
  const status = event?.verification?.status?.toUpperCase?.() || 'PENDING'
  const reason = event?.verification?.reason

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  const verification = await prisma.kYCVerification.findFirst({
    where: { veriffSessionId: sessionId },
  })

  if (!verification) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const mappedStatus =
    status === 'APPROVED' || status === 'VERIFIED'
      ? 'VERIFIED'
      : status === 'DECLINED' || status === 'REJECTED'
        ? 'REJECTED'
        : 'PENDING'

  await prisma.kYCVerification.update({
    where: { id: verification.id },
    data: {
      status: mappedStatus,
      rejectionReason: mappedStatus === 'REJECTED' ? reason ?? 'Rejected by Veriff' : null,
      verifiedAt: mappedStatus === 'VERIFIED' ? new Date() : null,
    },
  })

  await prisma.transactionLog.create({
    data: {
      userId: verification.userId,
      action: 'KYC',
      entityType: 'USER',
      entityId: verification.userId,
      details: JSON.stringify({ sessionId, status }),
    },
  })

  return NextResponse.json({ received: true })
}
