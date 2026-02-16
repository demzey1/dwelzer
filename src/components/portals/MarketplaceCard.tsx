'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, Tag, Box, ArrowRight, Gavel } from 'lucide-react'

interface MarketplaceCardProps {
    item: {
        id: string
        title: string
        price: number
        category: string
        condition: string
        images: string
        featured?: boolean
        isAuction?: boolean
        status: string
    }
}

export default function MarketplaceCard({ item }: MarketplaceCardProps) {
    const images = JSON.parse(item.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'

    return (
        <Link href={`/marketplace/${item.id}`}>
            <Card className="group p-0 overflow-hidden flex flex-col h-full border-white/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-surface">
                    <img
                        src={mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {item.featured && <Badge variant="gold" className="glass">Featured</Badge>}
                        {item.isAuction && <Badge variant="red" className="glass flex items-center gap-1 animate-pulse"><Gavel size={10} /> Active Auction</Badge>}
                    </div>
                    {item.status === 'SOLD' && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                            <Badge variant="red" size="md" className="py-2 px-6 text-sm font-black rotate-[-12deg] border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]">SOLD OUT</Badge>
                        </div>
                    )}
                </div>

                <div className="p-5 flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <Badge variant="default" className="bg-dwelzer-navy/5 text-dwelzer-navy border-none">{item.condition}</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-dwelzer-navy line-clamp-2 group-hover:text-dwelzer-gold transition-colors mb-4">{item.title}</h3>

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{item.isAuction ? 'Starting Bid' : 'Price'}</p>
                            <p className="text-xl font-black text-dwelzer-navy leading-none">{formatPrice(item.price)}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-dwelzer-navy text-white flex items-center justify-center group-hover:bg-dwelzer-gold group-hover:text-dwelzer-navy transition-all duration-300">
                            {item.isAuction ? <Gavel size={18} /> : <ShoppingBag size={18} />}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}
