import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import ListingsTabs from './ListingsTabs'

export const dynamic = 'force-dynamic'

export default async function ListingsPage() {
    const session = await getServerSession()
    // Fallback to demo user if no session (for development/preview)
    const userEmail = session?.user?.email || 'sarah@dwelzer.com'

    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    })

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-dwelzer-navy mb-2">Access Denied</h2>
                <p className="text-text-muted mb-6">Please sign in to view your listings.</p>
                <Link href="/login">
                    <Button variant="gold">Sign In</Button>
                </Link>
            </div>
        )
    }

    const [realEstateListings, marketplaceItems] = await Promise.all([
        prisma.realEstateListing.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        }),
        prisma.marketplaceItem.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        })
    ])

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-dwelzer-navy font-display">My Listings</h1>
                    <p className="text-text-secondary font-medium">Manage your property portfolio and marketplace assets.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/listings/new">
                        <Button variant="gold" className="animate-gold-pulse">
                            <Plus size={18} className="mr-2" />
                            Create Listing
                        </Button>
                    </Link>
                </div>
            </div>

            <ListingsTabs 
                realEstate={realEstateListings} 
                marketplace={marketplaceItems} 
            />
        </div>
    )
}
