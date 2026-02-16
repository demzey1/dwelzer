import React from 'react'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { MapPin, Bed, Bath, Maximize2, Share2, Heart, ShieldCheck, CheckCircle2, ChevronRight, Calendar, Building2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const listing = await prisma.realEstateListing.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    tier: { select: { name: true } }
                }
            }
        }
    })

    if (!listing) notFound()

    const images = JSON.parse(listing.images || '[]')
    const mainImage = images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            <main className="flex-grow pt-24">
                {/* Breadcrumbs & Actions */}
                <div className="container-app mx-auto py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-text-muted font-bold uppercase tracking-widest">
                        <span>Dwelzer</span> <ChevronRight size={14} />
                        <span className="text-dwelzer-gold">Real Estate</span> <ChevronRight size={14} />
                        <span className="text-dwelzer-navy">{listing.title}</span>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" leftIcon={<Share2 size={16} />}>Share</Button>
                        <Button variant="outline" size="sm" leftIcon={<Heart size={16} />}>Save</Button>
                    </div>
                </div>

                {/* Hero Gallery (Simple Version) */}
                <div className="container-app mx-auto mb-12">
                    <div className="grid grid-cols-4 gap-4 h-[500px]">
                        <div className="col-span-4 lg:col-span-2 overflow-hidden rounded-3xl relative group">
                            <img src={mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={listing.title} />
                            <div className="absolute bottom-6 left-6 flex gap-3">
                                <Badge variant="gold" size="md" className="glass">Featured Listing</Badge>
                                <Badge variant="blue" size="md" className="glass">Institutional Grade</Badge>
                            </div>
                        </div>
                        <div className="hidden lg:grid col-span-2 grid-cols-2 grid-rows-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="overflow-hidden rounded-3xl relative group">
                                    <img
                                        src={images[i] || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&sig=${i}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt="Property detail"
                                    />
                                    {i === 4 && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer hover:bg-black/50 transition-colors">
                                            <span className="text-white font-bold text-lg">+ View All Photos</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="container-app mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 pb-24">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-6 mb-12">
                            <h1 className="font-display text-4xl md:text-5xl font-black text-dwelzer-navy">{listing.title}</h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2 text-text-secondary font-bold">
                                    <MapPin className="text-dwelzer-gold" size={20} />
                                    <span>{listing.address}, {listing.city}, {listing.country}</span>
                                </div>
                                <div className="flex items-center gap-4 py-2 px-4 bg-surface rounded-full border border-border">
                                    <Badge variant="emerald" className="font-black">Active Listing</Badge>
                                    <span className="text-text-muted text-xs font-bold uppercase tracking-widest">ID: {listing.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-surface rounded-[40px] border border-border mb-12">
                            {[
                                { label: 'Bedrooms', value: listing.bedrooms, icon: Bed },
                                { label: 'Bathrooms', value: listing.bathrooms, icon: Bath },
                                { label: 'Area', value: `${listing.area} sqft`, icon: Maximize2 },
                                { label: 'Property Type', value: listing.category, icon: Building2 },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-dwelzer-gold">
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{stat.label}</p>
                                        <p className="text-lg font-black text-dwelzer-navy">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-12">
                            <h2 className="font-display text-2xl font-black text-dwelzer-navy mb-6">Property Description</h2>
                            <p className="text-text-secondary text-lg leading-relaxed mb-8">
                                {listing.description} This exceptional {listing.category} in {listing.city} represents the pinnacle of premium living. Carefully selected for our exclusive network, it offers an unparalleled combination of luxury, security, and investment potential.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Institutional-grade security', 'Premium finishing materials', 'Verified legal status', 'Escrow-ready transaction'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border">
                                        <CheckCircle2 className="text-emerald-500" size={20} />
                                        <span className="text-text-primary font-bold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="p-8 rounded-[40px] border border-border flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-dwelzer-gold flex items-center justify-center text-dwelzer-navy font-black text-3xl shadow-xl">
                                    {listing.user.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-dwelzer-navy">{listing.user.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="gold" size="sm">{listing.user.tier.name} Tier Holder</Badge>
                                        <span className="text-text-muted text-xs font-bold uppercase tracking-widest">• Verified Seller</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="hidden sm:flex">View Profile</Button>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-32 p-10 shadow-premium border-border rounded-[48px] overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dwelzer-gold to-dwelzer-gold-dark" />
                            <div className="mb-10">
                                <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-1">Total Asset Value</p>
                                <h3 className="text-5xl font-black text-dwelzer-navy font-display mb-2">{formatPrice(listing.price)}</h3>
                                {listing.type === 'RENT' && <p className="text-text-muted text-sm font-bold uppercase tracking-wide">PER MONTH • MIN 12 MONTHS</p>}
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="p-6 bg-surface rounded-2xl border border-border">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldCheck className="text-dwelzer-gold" size={20} />
                                        <p className="text-dwelzer-navy font-bold">Escrow Protected</p>
                                    </div>
                                    <p className="text-text-muted text-xs leading-relaxed">
                                        Transaction handled exclusively through Dwelzer Escrow. Funds released only upon legal confirmation.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-text-muted">Platform Fee</span>
                                        <span className="text-dwelzer-navy">$0.00 (Tier Benefit)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-text-muted">Legal Verification</span>
                                        <span className="text-emerald-500">Included</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="gold" className="w-full py-5 text-xl font-black mb-4">
                                Initiate Purchase
                            </Button>
                            <Button variant="navy" className="w-full py-5 text-xl font-black">
                                Send Message
                            </Button>

                            <p className="text-center mt-6 text-xs text-text-muted font-bold leading-relaxed">
                                Requires <span className="text-dwelzer-navy uppercase">Executive</span> tier or higher for direct purchase initiation.
                            </p>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
