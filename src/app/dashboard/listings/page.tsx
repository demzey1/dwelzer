import React from 'react'
import prisma from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Plus, Search, Filter, MoreHorizontal, Building2, Hotel, Home, ShoppingBag } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MyListingsPage() {
    // In a real app, we'd filter by user ID from session
    const realEstate = await prisma.realEstateListing.findMany({ take: 3 })
    const hotels = await prisma.hotel.findMany({ take: 2 })
    const shortlets = await prisma.shortlet.findMany({ take: 2 })

    const allListings = [
        ...realEstate.map(r => ({ ...r, portal: 'Real Estate', icon: Building2 })),
        ...hotels.map(h => ({ ...h, portal: 'Hotels', icon: Hotel })),
        ...shortlets.map(s => ({ ...s, portal: 'Shortlets', icon: Home })),
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-dwelzer-navy font-display">My Assets</h1>
                    <p className="text-text-secondary font-medium">Manage and monitor your global portfolio across portals.</p>
                </div>
                <Button variant="gold" leftIcon={<Plus size={18} />}>Create New Listing</Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                    <input
                        type="text"
                        placeholder="Search assets by title, location or ID..."
                        className="w-full bg-white border border-border rounded-xl py-3 pl-12 pr-4 text-dwelzer-navy font-medium outline-none focus:border-dwelzer-gold transition-all"
                    />
                </div>
                <Button variant="outline" leftIcon={<Filter size={18} />}>Filter Portals</Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {allListings.map((listing: any, i) => (
                    <Card key={i} className="p-6 hover:border-dwelzer-gold transition-all cursor-pointer">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                <img
                                    src={JSON.parse(listing.images || '[]')[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=200'}
                                    className="w-full h-full object-cover"
                                    alt={listing.title || listing.name || 'Listing'}
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" size="sm" className="flex items-center gap-1">
                                        <listing.icon size={10} /> {listing.portal}
                                    </Badge>
                                    <Badge variant={listing.status === 'PUBLISHED' || listing.status === 'AVAILABLE' ? 'emerald' : 'amber'} size="sm">
                                        {listing.status || 'ACTIVE'}
                                    </Badge>
                                </div>
                                <h3 className="text-lg font-bold text-dwelzer-navy">{listing.title || listing.name}</h3>
                                <p className="text-xs text-text-muted font-bold tracking-wider uppercase">{listing.city}, {listing.country}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-right">
                                <p className="text-lg font-black text-dwelzer-navy">
                                    {listing.price ? `$${listing.price.toLocaleString()}` : `$${listing.pricePerNight?.toLocaleString()}/night`}
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="glass" size="sm">Edit</Button>
                                    <button
                                        className="p-2 text-text-muted hover:text-dwelzer-navy transition-colors"
                                        aria-label="More options"
                                        title="Options"
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
