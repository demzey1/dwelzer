import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { Home, Users, MapPin, Star, Sparkles, Clock } from 'lucide-react'

interface ShortletCardProps {
    shortlet: {
        id: string
        title: string
        pricePerNight: number
        type: string
        maxGuests: number
        bedrooms: number
        city: string
        country: string
        images: string
        featured?: boolean
        rating?: number
        reviewCount?: number
    }
}

export default function ShortletCard({ shortlet }: ShortletCardProps) {
    const images = JSON.parse(shortlet.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600'

    return (
        <Link href={`/shortlets/${shortlet.id}`}>
            <Card className="group p-0 overflow-hidden flex flex-col h-full border-white/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={mainImage}
                        alt={shortlet.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {shortlet.featured && <Badge variant="gold" className="glass flex items-center gap-1"><Sparkles size={10} /> Exclusive</Badge>}
                        <Badge variant="purple" className="glass">{shortlet.type}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 glass px-3 py-1 flex items-center gap-2">
                        <Users size={14} className="text-white" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{shortlet.maxGuests} Guests • {shortlet.bedrooms} Br</span>
                    </div>
                </div>

                <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold text-dwelzer-navy line-clamp-1 group-hover:text-dwelzer-gold transition-colors mb-2">{shortlet.title}</h3>

                    <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                        <MapPin size={14} className="text-dwelzer-gold" />
                        <span className="line-clamp-1">{shortlet.city}, {shortlet.country}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 text-text-muted">
                            <Star size={14} className="fill-dwelzer-gold text-dwelzer-gold" />
                            <span className="text-xs font-bold">{shortlet.rating?.toFixed(1) || '4.9'}</span>
                            <span className="text-[10px] uppercase tracking-wider">({shortlet.reviewCount || 85} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-text-muted border-l border-border/50 pl-4">
                            <Clock size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Verified Stay</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <div className="text-lg font-black text-dwelzer-navy leading-none">
                            {formatPrice(shortlet.pricePerNight)}
                            <span className="text-xs font-bold ml-1 text-text-muted">/night</span>
                        </div>
                        <Badge variant="outline">Available Now</Badge>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
