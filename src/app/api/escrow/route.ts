import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const body = await req.json()
        const { amount, listingId, sellerId } = body

        // Create an escrow record
        const escrow = await prisma.escrowTransaction.create({
            data: {
                amount,
                listingId,
                status: 'INITIATED',
                buyerId: (session.user as any).id,
                sellerId
            }
        })

        return NextResponse.json(escrow)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to initiate escrow' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const session = await getServerSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const transactionId = searchParams.get('id')

    if (transactionId) {
        const tx = await prisma.escrowTransaction.findUnique({
            where: { id: transactionId }
        })
        return NextResponse.json(tx)
    }

    const transactions = await prisma.escrowTransaction.findMany({
        where: {
            OR: [
                { buyerId: (session.user as any).id },
                { sellerId: (session.user as any).id }
            ]
        },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(transactions)
}
