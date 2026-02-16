import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MarketplaceCard from '@/components/portals/MarketplaceCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, SlidersHorizontal, ShoppingBag, ChevronDown, Gavel } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MarketplacePage() {
    const items = await prisma.marketplaceItem.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="amber" size="md">Global commerce</Badge>
                            <span className="text-text-muted text-sm font-bold uppercase tracking-widest">{items.length} Premium Goods</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-dwelzer-navy">
                            Ecosystem <span className="text-dwelzer-gold">Marketplace</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="navy" leftIcon={<Gavel size={18} />}>Auctions</Button>
                        <Button variant="outline" leftIcon={<SlidersHorizontal size={18} />}>Filters</Button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-premium border border-border flex flex-col lg:flex-row gap-4 mb-12">
                    <div className="flex-grow flex items-center gap-4 px-4 py-3 bg-surface rounded-xl border border-border/50">
                        <Search className="text-dwelzer-gold" size={20} />
                        <input
                            type="text"
                            placeholder="Search for luxury goods, vehicles, furniture..."
                            className="bg-transparent border-none outline-none w-full text-dwelzer-navy font-medium placeholder:text-text-muted"
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['Category', 'Condition', 'Price Range', 'Delivery'].map((label, i) => (
                            <button key={i} className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-dwelzer-gold hover:bg-dwelzer-gold/5 transition-all text-sm font-bold text-dwelzer-navy">
                                {label} <ChevronDown size={14} className="text-dwelzer-gold" />
                            </button>
                        ))}
                    </div>
                    <Button variant="gold" className="px-10">Search</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map((item) => (
                        <MarketplaceCard key={item.id} item={item as any} />
                    ))}
                </div>

                {items.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-dwelzer-gold/10 rounded-full flex items-center justify-center text-dwelzer-gold mb-6">
                            <ShoppingBag size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-dwelzer-navy mb-2">Marketplace is empty</h3>
                        <p className="text-text-muted">New items are added daily by verified sellers.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
