import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Search, Scale, ShieldCheck, FileText, Globe, Box, ChevronRight, Gavel, Landmark } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LegalSearchPage() {
    const entries = await prisma.legalEntry.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow py-12">
                {/* Hero Banner */}
                <section className="bg-dwelzer-navy text-white py-20 mb-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-dwelzer-gold/5 rounded-full blur-[120px]" />
                    <div className="container-app mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <Badge variant="gold" className="mb-6">Executive Benefit</Badge>
                            <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
                                Institutional <span className="text-gradient-gold">Legal Search</span>
                            </h1>
                            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
                                Access verified legal precedents, property laws, and regulatory frameworks across multiple jurisdictions. Integrated directly into the Dwelzer ecosystem for secure transactions.
                            </p>
                            <div className="flex gap-4">
                                <Button variant="gold" size="lg">Request Dedicated Counsel</Button>
                                <Button variant="glass" size="lg" className="text-white">Learn About Compliance</Button>
                            </div>
                        </div>
                        <div className="hidden lg:flex justify-center">
                            <div className="w-80 h-80 rounded-[60px] border-2 border-white/10 flex items-center justify-center relative">
                                <Scale size={120} className="text-dwelzer-gold animate-float" />
                                <div className="absolute -top-10 -right-10 glass p-6 rounded-3xl border border-white/20">
                                    <ShieldCheck size={32} className="text-emerald-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-app mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h4 className="font-bold text-dwelzer-navy mb-4 uppercase tracking-widest text-xs">Categories</h4>
                            <div className="flex flex-col gap-2">
                                {['Property Law', 'Contracts', 'Dispute Resolution', 'Regulatory', 'Corporate'].map((cat, i) => (
                                    <button key={cat} className="flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:bg-white hover:border-dwelzer-gold transition-all text-sm font-bold text-text-secondary">
                                        {cat} <ChevronRight size={14} className="text-dwelzer-gold" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Card variant="navy" className="p-8 group overflow-hidden">
                            <div className="absolute inset-0 bg-dwelzer-gold opacity-0 group-hover:opacity-5 transition-opacity" />
                            <h4 className="font-display text-lg font-bold mb-4 text-dwelzer-gold">Need Professional Advice?</h4>
                            <p className="text-white/60 text-sm mb-6">Consult with our network of specialized lawyers for your specific transaction.</p>
                            <Button variant="gold" className="w-full">Book Consultant</Button>
                        </Card>
                    </div>

                    {/* Search & Results */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-3xl shadow-premium border border-border mb-12">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow flex items-center gap-4 px-4 py-3 bg-surface rounded-2xl border border-border/50">
                                    <Search className="text-dwelzer-gold" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by case number, jurisdiction, or keyword..."
                                        className="bg-transparent border-none outline-none w-full text-dwelzer-navy font-medium placeholder:text-text-muted"
                                    />
                                </div>
                                <Button variant="navy" className="px-10">Search Database</Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {entries.map((entry) => (
                                <Card key={entry.id} className="p-8 hover:border-dwelzer-gold/50 cursor-pointer">
                                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-dwelzer-gold/10 text-dwelzer-gold flex items-center justify-center flex-shrink-0">
                                                <FileText size={28} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-bold text-dwelzer-navy font-display">{entry.title}</h3>
                                                    <Badge variant="blue">{entry.category}</Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-text-muted font-bold tracking-wider uppercase">
                                                    <Globe size={14} /> {entry.jurisdiction}
                                                    <span className="text-border">|</span>
                                                    <span className="flex items-center gap-1"><Landmark size={14} /> Case #{entry.caseNumber || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-1">
                                            <Badge variant={entry.status === 'RESOLVED' ? 'emerald' : 'amber'}>{entry.status}</Badge>
                                            <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Priority: {entry.priority}</span>
                                        </div>
                                    </div>
                                    <p className="text-text-secondary leading-relaxed mb-6 line-clamp-2">{entry.description}</p>
                                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                        <div className="flex gap-4">
                                            {['Legal Text', 'Filing Doc', 'Precedent'].map((tag, i) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter text-text-muted border border-border px-2 py-0.5 rounded-md">{tag}</span>
                                            ))}
                                        </div>
                                        <Button variant="outline" size="sm">Read Full Entry</Button>
                                    </div>
                                </Card>
                            ))}

                            {entries.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
                                    <Scale size={60} className="text-dwelzer-gold/20 mx-auto mb-6" />
                                    <h3 className="text-xl font-bold text-dwelzer-navy">Legal Database is Offline</h3>
                                    <p className="text-text-muted">Requires Lord or Director level clearance for full access.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
