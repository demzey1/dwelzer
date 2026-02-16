'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Building2, Bed, Bath, Maximize2, MapPin, Star, Heart } from 'lucide-react'

interface ListingCardProps {
    listing: {
        id: string
        title: string
        price: number
        type: string
        category: string
        bedrooms: number
        bathrooms: number
        area: number
        city: string
        country: string
        images: string
        featured?: boolean
        verified?: boolean
    }
}

export default function ListingCard({ listing }: ListingCardProps) {
    const images = JSON.parse(listing.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'

    return (
        <Link href={`/real-estate/${listing.id}`}>
            <Card className="group p-0 overflow-hidden flex flex-col h-full border-white/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={mainImage}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {listing.featured && <Badge variant="gold" className="glass items-center">Featured</Badge>}
                        {listing.verified && <Badge variant="blue" className="glass">Verified Asset</Badge>}
                    </div>
                    <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-red-500 transition-colors"
                        aria-label="Add to favorites"
                        title="Add to favorites"
                    >
                        <Heart size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-bold text-xl">{formatPrice(listing.price)}</p>
                        <p className="text-white/70 text-xs font-medium uppercase tracking-widest">{listing.type === 'SALE' ? 'For Sale' : 'Monthly Rent'}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow">
                    <Badge variant="outline" className="mb-2">{listing.category}</Badge>
                    <h3 className="text-lg font-bold text-dwelzer-navy mb-2 line-clamp-1 group-hover:text-dwelzer-gold transition-colors">{listing.title}</h3>

                    <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                        <MapPin size={14} className="text-dwelzer-gold" />
                        <span className="line-clamp-1">{listing.city}, {listing.country}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-border/50 pt-4">
                        <div className="flex flex-col items-center gap-1">
                            <Bed size={16} className="text-dwelzer-gold" />
                            <span className="text-[10px] font-bold text-text-secondary">{listing.bedrooms} Beds</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 border-x border-border/50 px-2">
                            <Bath size={16} className="text-dwelzer-gold" />
                            <span className="text-[10px] font-bold text-text-secondary">{listing.bathrooms} Baths</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Maximize2 size={16} className="text-dwelzer-gold" />
                            <span className="text-[10px] font-bold text-text-secondary">{listing.area} sqft</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
