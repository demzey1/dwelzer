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
import { Star, MapPin, Coffee, Wifi, Car, Tv, Users, ShieldCheck, ChevronRight, Calendar, Info } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HotelDetailPage({ params }: { params: { id: string } }) {
    const hotel = await prisma.hotel.findUnique({
        where: { id: params.id },
        include: {
            user: {
                select: {
                    name: true,
                    tier: { select: { name: true } }
                }
            }
        }
    })

    if (!hotel) notFound()

    const images = JSON.parse(hotel.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12 px-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest mb-8">
                    <Link href="/hotels" className="hover:text-dwelzer-gold transition-colors">Hotels</Link>
                    <ChevronRight size={12} />
                    <span className="text-dwelzer-navy">{hotel.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Header */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <Badge variant="gold" size="md">Institutionally Verified</Badge>
                                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full border border-dwelzer-gold/20">
                                    <Star size={14} className="fill-dwelzer-gold text-dwelzer-gold" />
                                    <span className="text-sm font-black text-dwelzer-navy">{hotel.starRating} Stars</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-dwelzer-navy font-display mb-4 leading-tight">
                                {hotel.name}
                            </h1>
                            <div className="flex items-center gap-2 text-text-secondary font-medium">
                                <MapPin size={18} className="text-dwelzer-gold" />
                                <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative aspect-[21/10] rounded-[40px] overflow-hidden shadow-2xl group">
                            <img
                                src={mainImage}
                                alt={hotel.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                                <p className="text-white text-lg font-bold">Experience the epitome of luxury at {hotel.name}.</p>
                            </div>
                        </div>

                        {/* Amenities Grid */}
                        <section>
                            <h3 className="text-2xl font-black text-dwelzer-navy font-display mb-8">Premium Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { icon: Wifi, label: 'High-Speed Wifi' },
                                    { icon: Coffee, label: 'Executive Lounge' },
                                    { icon: Car, label: 'Valet Parking' },
                                    { icon: Tv, label: 'Smart Tech' },
                                ].map((item, i) => (
                                    <Card key={i} className="p-6 flex flex-col items-center gap-4 text-center hover:border-dwelzer-gold transition-all group">
                                        <div className="w-12 h-12 rounded-2xl bg-surface group-hover:bg-dwelzer-gold/10 text-text-muted group-hover:text-dwelzer-gold transition-colors flex items-center justify-center">
                                            <item.icon size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-dwelzer-navy">{item.label}</span>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* Description */}
                        <section className="bg-white p-10 rounded-[40px] border border-border shadow-sm">
                            <h3 className="text-2xl font-black text-dwelzer-navy font-display mb-6">About the Estate</h3>
                            <div className="prose prose-slate max-w-none text-text-secondary font-medium leading-relaxed">
                                {hotel.description.split('\n').map((para: string, i: number) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-8 border-none shadow-premium relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-dwelzer-gold" />

                                <div className="mb-8">
                                    <p className="text-sm text-text-muted font-black uppercase tracking-widest mb-1">Standard Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-dwelzer-navy font-display">{formatPrice(hotel.pricePerNight)}</span>
                                        <span className="text-text-muted font-bold">/night</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="p-4 rounded-2xl bg-surface border border-border flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={20} className="text-dwelzer-gold" />
                                            <div>
                                                <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Check In / Out</p>
                                                <p className="text-sm font-bold text-dwelzer-navy">Select Dates</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-border" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-surface border border-border flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Users size={20} className="text-dwelzer-gold" />
                                            <div>
                                                <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">Occupancy</p>
                                                <p className="text-sm font-bold text-dwelzer-navy">2 Guests</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-border" />
                                    </div>
                                </div>

                                <Button variant="gold" className="w-full py-5 text-lg font-black shadow-xl hover:shadow-dwelzer-gold/50 transition-all mb-4">
                                    Reserve Elite Room
                                </Button>

                                <p className="text-center text-[10px] text-text-muted font-black uppercase tracking-widest">No immediate charge • Escrow Protected</p>
                            </Card>

                            {/* Trust Card */}
                            <Card variant="navy" className="p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-dwelzer-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                <h4 className="text-dwelzer-gold font-display text-lg font-bold mb-6 flex items-center gap-2">
                                    <ShieldCheck size={20} /> Dwelzer Guarantee
                                </h4>
                                <ul className="space-y-4">
                                    {[
                                        'Instant identity verification',
                                        'Escrow-secured payments',
                                        'Direct communication with concierge',
                                        '24/7 Institutional support'
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-xs font-medium text-white/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-dwelzer-gold mt-1" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            {/* Owner Info */}
                            <div className="p-6 rounded-[32px] border border-border flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-dwelzer-gold flex items-center justify-center text-dwelzer-navy font-black text-xl shadow-lg">
                                    {hotel.user?.name?.[0] || 'A'}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-dwelzer-navy">{hotel.user?.name || 'Authorized Agent'}</h4>
                                    <Badge variant="gold" size="sm">{hotel.user?.tier?.name || 'Lord'} Tier Provider</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
