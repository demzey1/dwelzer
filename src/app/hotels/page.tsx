import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HotelCard from '@/components/portals/HotelCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, SlidersHorizontal, Map as MapIcon, ChevronDown, Hotel as HotelIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HotelsPage() {
    const hotels = await prisma.hotel.findMany({
        orderBy: { starRating: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="blue" size="md">Luxury stays</Badge>
                            <span className="text-text-muted text-sm font-bold uppercase tracking-widest">{hotels.length} Verified Hotels</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-dwelzer-navy">
                            Premium <span className="text-dwelzer-gold">Hotels</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="navy" leftIcon={<MapIcon size={18} />}>Map View</Button>
                        <Button variant="outline" leftIcon={<SlidersHorizontal size={18} />}>Filters</Button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-premium border border-border flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="flex-grow flex items-center gap-4 px-4 py-3 bg-surface rounded-xl border border-border/50">
                        <Search className="text-dwelzer-gold" size={20} />
                        <input
                            type="text"
                            placeholder="Search by hotel name, city, or destination..."
                            className="bg-transparent border-none outline-none w-full text-dwelzer-navy font-medium placeholder:text-text-muted"
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['Star Rating', 'Stay Dates', 'Guests', 'Amenities'].map((label, i) => (
                            <button key={i} className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-dwelzer-gold hover:bg-dwelzer-gold/5 transition-all text-sm font-bold text-dwelzer-navy">
                                {label} <ChevronDown size={14} className="text-dwelzer-gold" />
                            </button>
                        ))}
                    </div>
                    <Button variant="gold" className="px-10">Find Hotels</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel as any} />
                    ))}
                </div>

                {hotels.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-dwelzer-gold/10 rounded-full flex items-center justify-center text-dwelzer-gold mb-6">
                            <HotelIcon size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-dwelzer-navy mb-2">No hotels found</h3>
                        <p className="text-text-muted">Try refining your search or destination.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
