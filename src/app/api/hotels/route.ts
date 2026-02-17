import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const city = searchParams.get('city')
        const category = searchParams.get('category')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')

        const where: any = { status: 'ACTIVE' }
        if (city) where.city = { contains: city }
        if (category) where.category = category
        if (minPrice || maxPrice) {
            where.pricePerNight = {}
            if (minPrice) where.pricePerNight.gte = parseFloat(minPrice)
            if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice)
        }

        const hotels = await prisma.hotel.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true } } }
        })

        return NextResponse.json(hotels)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const data = await req.json()
        const hotel = await prisma.hotel.create({
            data: {
                ...data,
                userId: session.user.id,
            }
        })
        return NextResponse.json(hotel)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create hotel' }, { status: 500 })
    }
}
