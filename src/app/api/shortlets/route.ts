import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const city = searchParams.get('city')
        const type = searchParams.get('type')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')

        const where: any = { status: 'ACTIVE' }
        if (city) where.city = { contains: city }
        if (type) where.type = type
        if (minPrice || maxPrice) {
            where.pricePerNight = {}
            if (minPrice) where.pricePerNight.gte = parseFloat(minPrice)
            if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice)
        }

        const shortlets = await prisma.shortlet.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } }
        })

        return NextResponse.json(shortlets)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch shortlets' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = await req.json()
        const shortlet = await prisma.shortlet.create({
            data: {
                ...data,
                userId: session.user.id,
            }
        })
        return NextResponse.json(shortlet)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create shortlet' }, { status: 500 })
    }
}
