import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Scale, ShieldCheck, Globe, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'


export default function LegalSearchLawyersPage() {
    const firms = [
        { name: 'Sovereign Counsel LLP', specialty: 'Property Law', region: 'Global', rating: 5.0 },
        { name: 'Elite Juris Global', specialty: 'Asset Protection', region: 'EU/US', rating: 4.9 },
        { name: 'Squire Estate Law', specialty: 'Conveyancing', region: 'UK/Asia', rating: 4.8 },
    ]

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />
            <main className="flex-grow container-app mx-auto py-12">
                <div className="mb-16">
                    <Badge variant="gold" className="mb-4">Legal Network</Badge>
                    <h1 className="text-5xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Elite Law Firms</h1>
                    <p className="text-text-secondary font-medium mt-4 max-w-2xl">
                        Direct connection to DWELZER-verified legal partners specializing in multi-jurisdictional property acquisition.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {firms.map((firm, i) => (
                        <Card key={i} className="p-8 border-border hover:border-dwelzer-gold transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-dwelzer-navy text-dwelzer-gold rounded-2xl flex items-center justify-center shadow-lg">
                                    <Scale size={28} />
                                </div>
                                <div className="flex items-center gap-1 text-dwelzer-gold">
                                    <Star size={14} className="fill-dwelzer-gold" />
                                    <span className="font-bold text-sm">{firm.rating}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-dwelzer-navy mb-2">{firm.name}</h3>
                            <p className="text-text-muted font-bold text-xs uppercase tracking-widest mb-6">{firm.specialty} · {firm.region}</p>
                            <Button variant="gold" className="w-full">Initialize Consultation</Button>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}


