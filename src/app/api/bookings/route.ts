import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const body = await req.json()
        const {
            bookingType,
            hotelId,
            shortletId,
            checkIn,
            checkOut,
            guests,
            notes
        } = body

        if (!checkIn || !checkOut || !bookingType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays <= 0) {
            return NextResponse.json({ error: 'Invalid date range' }, { status: 400 })
        }

        let totalPrice = 0
        let currency = 'USD'

        if (bookingType === 'HOTEL' && hotelId) {
            const hotel = await prisma.hotel.findUnique({ where: { id: hotelId } })
            if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 })
            totalPrice = hotel.pricePerNight * diffDays
            currency = hotel.currency
        } else if (bookingType === 'SHORTLET' && shortletId) {
            const shortlet = await prisma.shortlet.findUnique({ where: { id: shortletId } })
            if (!shortlet) return NextResponse.json({ error: 'Shortlet not found' }, { status: 404 })
            totalPrice = shortlet.pricePerNight * diffDays
            currency = shortlet.currency
        } else {
            return NextResponse.json({ error: 'Invalid booking type or missing ID' }, { status: 400 })
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                bookingType,
                hotelId: bookingType === 'HOTEL' ? hotelId : null,
                shortletId: bookingType === 'SHORTLET' ? shortletId : null,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: parseInt(guests) || 1,
                totalPrice,
                currency,
                notes,
                status: 'PENDING'
            }
        })

        return NextResponse.json(booking)
    } catch (error) {
        console.error('BOOKING_POST_ERROR', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: {
                hotel: true,
                shortlet: true,
                listing: true
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
