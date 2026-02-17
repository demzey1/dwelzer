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
import { Home, Users, MapPin, Star, Sparkles, Clock, ShieldCheck, ChevronRight, Calendar, Info, BedDouble, Bath } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ShortletDetailPage({ params }: { params: { id: string } }) {
    const shortlet = await prisma.shortlet.findUnique({
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

    if (!shortlet) notFound()

    const images = JSON.parse(shortlet.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200'

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12 px-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest mb-8">
                    <Link href="/shortlets" className="hover:text-dwelzer-gold transition-colors">Shortlets</Link>
                    <ChevronRight size={12} />
                    <span className="text-dwelzer-navy">{shortlet.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <Badge variant="purple" size="md">{shortlet.type}</Badge>
                                {shortlet.featured && <Badge variant="gold" size="md">Elite Collection</Badge>}
                                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full border border-dwelzer-gold/20">
                                    <Star size={14} className="fill-dwelzer-gold text-dwelzer-gold" />
                                    <span className="text-sm font-black text-dwelzer-navy">4.9 (85 reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-dwelzer-navy font-display mb-4 leading-tight">
                                {shortlet.title}
                            </h1>
                            <div className="flex items-center gap-2 text-text-secondary font-medium">
                                <MapPin size={18} className="text-dwelzer-gold" />
                                <span>{shortlet.address}, {shortlet.city}, {shortlet.country}</span>
                            </div>
                        </div>

                        <div className="relative aspect-[21/10] rounded-[40px] overflow-hidden shadow-2xl group">
                            <img
                                src={mainImage}
                                alt={shortlet.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>

                        {/* Quick Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: Users, label: 'Guests', value: shortlet.maxGuests },
                                { icon: BedDouble, label: 'Bedrooms', value: shortlet.bedrooms },
                                { icon: Bath, label: 'Bathrooms', value: 2 },
                                { icon: Home, label: 'Category', value: shortlet.type },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center gap-2 text-center">
                                    <item.icon size={24} className="text-dwelzer-gold" />
                                    <span className="text-xs font-black text-text-muted uppercase tracking-widest">{item.label}</span>
                                    <span className="text-lg font-black text-dwelzer-navy">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <section className="bg-white p-10 rounded-[40px] border border-border">
                            <h3 className="text-2xl font-black text-dwelzer-navy font-display mb-6">About this Stay</h3>
                            <div className="prose prose-slate max-w-none text-text-secondary font-medium leading-relaxed">
                                {shortlet.description.split('\n').map((para: string, i: number) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-8 border-none shadow-premium relative">
                                <div className="mb-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-dwelzer-navy font-display">{formatPrice(shortlet.pricePerNight)}</span>
                                        <span className="text-text-muted font-bold">/night</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="p-4 rounded-2xl bg-surface border border-border">
                                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Check-in / Check-out</p>
                                        <p className="text-sm font-bold text-dwelzer-navy">Select your dates</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-surface border border-border">
                                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Total Guests</p>
                                        <p className="text-sm font-bold text-dwelzer-navy">{shortlet.maxGuests} Guests Max</p>
                                    </div>
                                </div>

                                <Button variant="gold" className="w-full py-5 text-lg font-black shadow-xl mb-4">
                                    Check Availability
                                </Button>

                                <p className="text-center text-[10px] text-text-muted font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Clock size={12} /> Instant Confirmation
                                </p>
                            </Card>

                            <div className="p-6 rounded-[32px] border border-border flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-dwelzer-gold flex items-center justify-center text-dwelzer-navy font-black shadow-lg">
                                    {shortlet.user?.name?.[0] || 'O'}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Hosted by</p>
                                    <h4 className="text-sm font-black text-dwelzer-navy">{shortlet.user?.name}</h4>
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
