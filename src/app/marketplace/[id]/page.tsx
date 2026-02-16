import React from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, Tag, Box, ArrowRight, Gavel, ShieldCheck, Clock, MapPin, ChevronRight, Share2, Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MarketplaceDetailPage({ params }: { params: { id: string } }) {
    const item = await prisma.marketplaceItem.findUnique({
        where: { id: params.id },
        include: {
            user: {
                select: {
                    name: true,
                    tier: { select: { name: true } }
                }
            },
            auction: {
                include: {
                    bids: {
                        orderBy: { amount: 'desc' },
                        take: 1
                    }
                }
            }
        }
    })

    if (!item) notFound()

    const images = JSON.parse(item.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12 px-6">
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest mb-8">
                    <Link href="/marketplace" className="hover:text-dwelzer-gold transition-colors">Marketplace</Link>
                    <ChevronRight size={12} />
                    <span className="text-dwelzer-navy">{item.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white flex items-center justify-center p-12 border border-border group">
                            <img
                                src={mainImage}
                                alt={item.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                <Badge variant="gold" size="md">Premium Asset</Badge>
                                <Badge variant="outline" size="md" className="bg-white/80 backdrop-blur-sm">{item.condition}</Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img: string, i: number) => (
                                <div key={i} className="aspect-square rounded-2xl border border-border overflow-hidden cursor-pointer hover:border-dwelzer-gold transition-all">
                                    <img src={img} alt={`${item.title} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Badge variant="amber">{item.category}</Badge>
                                {item.status === 'SOLD' && <Badge variant="red">Sold Out</Badge>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-dwelzer-navy font-display mb-4 leading-tight">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-xs text-text-muted font-black uppercase tracking-widest mb-1">
                                        {item.isAuction ? 'Current Bid' : 'Transaction Value'}
                                    </p>
                                    <p className="text-4xl font-black text-dwelzer-navy font-display">{formatPrice(item.price)}</p>
                                </div>
                                {item.isAuction && (
                                    <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 flex items-center gap-2">
                                        <Clock size={16} className="text-red-500 animate-pulse" />
                                        <span className="text-xs font-black text-red-600 uppercase tracking-widest">Ending in 4h 12m</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-text-secondary font-medium leading-relaxed">
                            <p>{item.description}</p>
                        </div>

                        <div className="p-8 bg-dwelzer-navy rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-dwelzer-gold/10 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="flex flex-col gap-4 relative z-10">
                                {item.isAuction ? (
                                    <>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                placeholder="Enter bid amount..."
                                                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-dwelzer-gold transition-all"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-black tracking-widest text-xs uppercase">DWELZER-ESCROW</div>
                                        </div>
                                        <Button variant="gold" className="w-full py-5 text-lg font-black">Place Strategic Bid</Button>
                                    </>
                                ) : (
                                    <Button variant="gold" className="w-full py-5 text-lg font-black" disabled={item.status === 'SOLD'}>
                                        {item.status === 'SOLD' ? 'Sold to Lord Member' : 'Secure with Escrow'}
                                    </Button>
                                )}

                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                    <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-dwelzer-gold" /> Institutionally Protected</div>
                                    <div className="flex items-center gap-2"><Box size={14} className="text-dwelzer-gold" /> Global Logistics Incl.</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-6 border-y border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-dwelzer-navy font-black shadow-sm">
                                    {item.user?.name?.[0]}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Verified Seller</p>
                                    <h4 className="text-sm font-black text-dwelzer-navy">{item.user?.name}</h4>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button aria-label="Add to favorites" className="p-3 rounded-xl border border-border hover:border-dwelzer-gold text-dwelzer-navy transition-all"><Heart size={20} /></button>
                                <button aria-label="Share listing" className="p-3 rounded-xl border border-border hover:border-dwelzer-gold text-dwelzer-navy transition-all"><Share2 size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
