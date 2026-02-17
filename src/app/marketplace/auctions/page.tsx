import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Gavel, Clock, TrendingUp, ShieldCheck } from 'lucide-react'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AuctionsPage() {
    const auctions = await prisma.auction.findMany({
        where: { status: 'ACTIVE' },
        include: { item: true },
        orderBy: { endTime: 'asc' }
    })

    return (
        <div className="container-app py-24">
            <div className="mb-16">
                <Badge variant="gold" size="md" className="mb-4">Institutional Grade</Badge>
                <h1 className="text-5xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Sovereign Auctions</h1>
                <p className="text-text-secondary font-medium mt-4 max-w-2xl">
                    High-stakes bidding environment for assets with subjective institutional value. Secured by multi-signature escrow.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {auctions.map((auction: any) => (
                    <Card key={auction.id} className="group overflow-hidden border-dwelzer-gold/20 hover:border-dwelzer-gold transition-all">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <img src={JSON.parse(auction.item.images)[0]} alt={auction.item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute top-4 right-4">
                                <Badge variant="gold" className="shadow-lg backdrop-blur-md bg-dwelzer-navy/80">
                                    <Clock size={12} className="mr-1" />
                                    {new Date(auction.endTime).toLocaleDateString()}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-dwelzer-navy mb-2 group-hover:text-dwelzer-gold transition-colors">{auction.item.title}</h3>
                                <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">{auction.item.description}</p>
                            </div>

                            <div className="flex justify-between items-end p-4 bg-surface rounded-2xl border border-border">
                                <div>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Current Bid</p>
                                    <p className="text-2xl font-black text-dwelzer-navy tracking-tight">${auction.currentPrice.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Trending</p>
                                    <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                                        <TrendingUp size={14} /> +12%
                                    </p>
                                </div>
                            </div>

                            <Button variant="gold" className="w-full py-4 font-black uppercase tracking-widest text-xs" leftIcon={<Gavel size={18} />}>
                                Place Institutional Bid
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
