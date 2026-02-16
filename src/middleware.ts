import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/real-estate/new', '/admin']
// Routes that require admin role
const adminRoutes = ['/admin']
// Routes only accessible when NOT logged in
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    // Redirect authenticated users away from auth pages
    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }

    // Check if route requires authentication
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))
    if (isProtected && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Check admin routes
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
    if (isAdminRoute && token) {
        // Must be admin or lord tier
        if (token.role !== 'ADMIN' && token.tierId !== 'lord') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    // API route protection
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
        // Most API routes require auth except GET for public browsing
        if (request.method !== 'GET' && !token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/login',
        '/register',
        '/real-estate/new',
        '/api/:path*',
    ],
}
