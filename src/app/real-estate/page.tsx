import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingCard from '@/components/portals/ListingCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, Filter, SlidersHorizontal, Map as MapIcon, ChevronDown } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function RealEstatePage() {
    const listings = await prisma.realEstateListing.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="gold" size="md">Premium Inventory</Badge>
                            <span className="text-text-muted text-sm font-bold uppercase tracking-widest">{listings.length} Properties Available</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-dwelzer-navy">
                            Real Estate <span className="text-dwelzer-gold">Portal</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="navy" leftIcon={<MapIcon size={18} />}>Map View</Button>
                        <Button variant="outline" leftIcon={<SlidersHorizontal size={18} />}>Filters</Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-premium border border-border flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="flex-grow flex items-center gap-4 px-4 py-2 bg-surface rounded-xl border border-border/50">
                        <Search className="text-dwelzer-gold" size={20} />
                        <input
                            type="text"
                            placeholder="Search by city, neighborhood, or building name..."
                            className="bg-transparent border-none outline-none w-full text-dwelzer-navy font-medium placeholder:text-text-muted"
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['Property Type', 'Price Range', 'Bedrooms', 'More'].map((label, i) => (
                            <button key={i} className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-dwelzer-gold hover:bg-dwelzer-gold/5 transition-all text-sm font-bold text-dwelzer-navy">
                                {label} <ChevronDown size={14} className="text-dwelzer-gold" />
                            </button>
                        ))}
                    </div>
                    <Button variant="gold" className="px-10">Search</Button>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing as any} />
                    ))}
                </div>

                {/* Empty State */}
                {listings.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-dwelzer-gold/10 rounded-full flex items-center justify-center text-dwelzer-gold mb-6">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-dwelzer-navy mb-2">No listings found</h3>
                        <p className="text-text-muted">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
