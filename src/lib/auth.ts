import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { tier: true },
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid email or password')
                }

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)
                if (!isValid) {
                    throw new Error('Invalid email or password')
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                    tierId: user.tierId,
                    tierName: user.tier.name,
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
                token.tierId = (user as any).tierId
                token.tierName = (user as any).tierName
            }
            // Handle session update (e.g., tier change)
            if (trigger === 'update' && session) {
                token.tierId = session.tierId
                token.tierName = session.tierName
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id
                    ; (session.user as any).role = token.role
                    ; (session.user as any).tierId = token.tierId
                    ; (session.user as any).tierName = token.tierName
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}
