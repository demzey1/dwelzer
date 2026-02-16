import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            role: string
            tierId: string
            tierName: string
        } & DefaultSession['user']
    }

    interface User {
        role: string
        tierId: string
        tierName: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
        tierId: string
        tierName: string
    }
}

// ─── App Types ──────────────────────────────────────────────

export type UserRole = 'USER' | 'ADMIN'
export type ListingStatus = 'ACTIVE' | 'PENDING' | 'SOLD' | 'RENTED'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
export type EscrowStatus = 'INITIATED' | 'PENDING' | 'CONFIRMED' | 'DISPUTED' | 'RELEASED' | 'REFUNDED'
export type KYCStatus = 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED'
export type AuctionStatus = 'ACTIVE' | 'ENDED' | 'CANCELLED'

export interface PortalConfig {
    id: string
    name: string
    href: string
    icon: string
    description: string
    color: string
}

export const PORTALS: PortalConfig[] = [
    {
        id: 'real-estate',
        name: 'Real Estate',
        href: '/real-estate',
        icon: 'Building2',
        description: 'Buy, sell or rent premium properties worldwide',
        color: '#3b82f6',
    },
    {
        id: 'hotels',
        name: 'Hotels',
        href: '/hotels',
        icon: 'Hotel',
        description: 'Discover luxury hotels and accommodations',
        color: '#8b5cf6',
    },
    {
        id: 'shortlets',
        name: 'Shortlets',
        href: '/shortlets',
        icon: 'Home',
        description: 'Short-term furnished apartments and villas',
        color: '#f59e0b',
    },
    {
        id: 'marketplace',
        name: 'Marketplace',
        href: '/marketplace',
        icon: 'ShoppingBag',
        description: 'Buy, sell and auction premium items',
        color: '#10b981',
    },
    {
        id: 'legal-search',
        name: 'Legal Search',
        href: '/legal-search',
        icon: 'Scale',
        description: 'Property law and legal document search',
        color: '#ef4444',
    },
]

export interface DashboardStat {
    label: string
    value: string | number
    change?: number
    icon: string
}
