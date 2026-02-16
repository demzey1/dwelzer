import React from 'react'
import prisma from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MyBookingsPage() {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-dwelzer-navy font-display">My Bookings</h1>
                <p className="text-text-secondary font-medium">History and status of your reservations within the ecosystem.</p>
            </div>

            <div className="space-y-6">
                {bookings.map((booking, i) => (
                    <Card key={i} className="p-8 border-border hover:shadow-premium transition-all">
                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                            <div className="flex gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-dwelzer-gold/10 text-dwelzer-gold flex items-center justify-center flex-shrink-0">
                                    <Calendar size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant={
                                            booking.status === 'CONFIRMED' ? 'emerald' :
                                                booking.status === 'PENDING' ? 'amber' : 'red'
                                        }>
                                            {booking.status}
                                        </Badge>
                                        <span className="text-xs text-text-muted font-bold tracking-widest uppercase">ID: BR-{booking.id.slice(0, 8)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-dwelzer-navy mb-1">Reservation at Premium Property</h3>
                                    <div className="flex items-center gap-4 text-sm text-text-secondary font-medium">
                                        <div className="flex items-center gap-1"><Clock size={14} /> {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</div>
                                        <div className="flex items-center gap-1"><MapPin size={14} /> Global Destination</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="text-right">
                                    <p className="text-xs text-text-muted font-black uppercase tracking-widest">Total Transaction</p>
                                    <p className="text-2xl font-black text-dwelzer-navy">${booking.totalPrice.toLocaleString()}</p>
                                </div>
                                <div className="h-10 w-px bg-border hidden md:block" />
                                <div className="flex gap-3">
                                    <Button variant="outline">View Receipt</Button>
                                    <Button variant="navy">Manage</Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap gap-8 items-center">
                            <div className="flex items-center gap-2 text-emerald-600">
                                <CheckCircle2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Identity Verified</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600">
                                <CheckCircle2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Escrow Initialized</span>
                            </div>
                            <div className="flex items-center gap-2 text-dwelzer-gold">
                                <Clock size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Await Release</span>
                            </div>
                        </div>
                    </Card>
                ))}

                {bookings.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-border">
                        <Calendar size={48} className="text-dwelzer-gold/20 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-dwelzer-navy">No active bookings</h3>
                        <p className="text-text-muted">Explore our portals to find your next destination.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
