import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/portals/ListingCard'
import { Badge } from '@/components/ui/Badge'
import { Key } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function RealEstateRentPage() {
    const listings = await prisma.realEstateListing.findMany({
        where: { type: 'RENT', status: 'ACTIVE' },
        orderBy: { price: 'asc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />
            <main className="flex-grow container-app mx-auto py-12">
                <div className="mb-12">
                    <Badge variant="gold" className="mb-4">Executive Presence</Badge>
                    <h1 className="text-5xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Executive Rent</h1>
                    <p className="text-text-secondary font-medium mt-4 max-w-2xl">
                        Short-to-long term leasehold positions in prime global business hubs. Curated for institutional delegates and elite residents.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {listings.map((listing: any) => (
                        <ListingCard key={listing.id} listing={listing as any} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
