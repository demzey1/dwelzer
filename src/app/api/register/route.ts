import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const exists = await prisma.user.findUnique({
            where: { email }
        })

        if (exists) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                tierId: 'dealing', // Default tier
                role: 'USER',
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('REGISTRATION_ERROR', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
