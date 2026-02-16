'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Hotel as HotelIcon, Star, MapPin, Coffee, Wifi, Car, Tv } from 'lucide-react'

interface HotelCardProps {
    hotel: {
        id: string
        name: string
        pricePerNight: number
        starRating: number
        category: string
        city: string
        country: string
        images: string
        featured?: boolean
        rating?: number
        reviewCount?: number
    }
}

export default function HotelCard({ hotel }: HotelCardProps) {
    const images = JSON.parse(hotel.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'

    return (
        <Link href={`/hotels/${hotel.id}`}>
            <Card className="group p-0 overflow-hidden flex flex-col h-full border-white/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={mainImage}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {hotel.featured && <Badge variant="gold" className="glass">Premier</Badge>}
                        <Badge variant="blue" className="glass">{hotel.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 glass px-2 py-1 flex items-center gap-1">
                        <Star size={12} className="fill-dwelzer-gold text-dwelzer-gold" />
                        <span className="text-xs font-black text-white">{hotel.starRating}</span>
                    </div>
                </div>

                <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-dwelzer-navy line-clamp-1 group-hover:text-dwelzer-gold transition-colors">{hotel.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                        <MapPin size={14} className="text-dwelzer-gold" />
                        <span className="line-clamp-1">{hotel.city}, {hotel.country}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 text-text-muted">
                            <Star size={14} className="fill-dwelzer-gold text-dwelzer-gold" />
                            <span className="text-xs font-bold">{hotel.rating?.toFixed(1) || '4.8'}</span>
                            <span className="text-[10px] uppercase tracking-wider">({hotel.reviewCount || 120} reviews)</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <div className="flex gap-2">
                            <Wifi size={16} className="text-text-muted" />
                            <Coffee size={16} className="text-text-muted" />
                            <Car size={16} className="text-text-muted" />
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Starting from</p>
                            <p className="text-lg font-black text-dwelzer-navy leading-none">{formatPrice(hotel.pricePerNight)}<span className="text-xs font-bold ml-1 text-text-muted">/night</span></p>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
