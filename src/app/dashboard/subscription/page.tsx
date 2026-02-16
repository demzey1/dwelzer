import React from 'react'
import prisma from '@/lib/prisma'
import { cn, formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Briefcase, ShieldCheck, Crown, Star, CheckCircle2, Globe, Clock, Landmark, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SubscriptionPage() {
    const tiers = await prisma.tier.findMany({
        orderBy: { price: 'asc' }
    })

    // User's current tier (Mocked for dashboard UI)
    const currentTier = tiers.find(t => t.name.toLowerCase() === 'lord') || tiers[0]

    return (
        <div className="space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-10">
                <div>
                    <Badge variant="gold" size="md" className="mb-4">Elite Tiers</Badge>
                    <h1 className="text-4xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Tier Management</h1>
                    <p className="text-text-secondary font-medium mt-2">Scale your presence within the Dwelzer ecosystem and unlock global assets.</p>
                </div>
                <div className="p-6 bg-dwelzer-navy text-white rounded-[32px] flex items-center gap-6 shadow-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-dwelzer-gold text-dwelzer-navy flex items-center justify-center shadow-lg">
                        <Crown size={32} />
                    </div>
                    <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-[0.2em] mb-1">Active Status</p>
                        <h3 className="text-2xl font-black text-gradient-gold tracking-tight">{currentTier.name.toUpperCase()} TIER</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {tiers.map((tier) => (
                    <Card
                        key={tier.id}
                        className={cn(
                            "p-8 flex flex-col h-full border-2 transition-all group overflow-hidden relative",
                            tier.name === currentTier.name ? "border-dwelzer-gold shadow-premium" : "border-border hover:border-dwelzer-gold/50"
                        )}
                    >
                        {tier.name === currentTier.name && (
                            <div className="absolute top-0 right-0 p-2">
                                <Badge variant="gold" size="sm" className="shadow-lg">Current</Badge>
                            </div>
                        )}

                        <div className="mb-10 pt-4">
                            <h4 className="text-lg font-black text-dwelzer-navy font-display uppercase tracking-widest group-hover:text-dwelzer-gold transition-colors">{tier.name}</h4>
                            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Ecosystem Grade</p>
                        </div>

                        <div className="mb-10">
                            <span className="text-3xl font-black text-dwelzer-navy font-display">{formatPrice(tier.price)}</span>
                            <span className="text-xs text-text-muted font-bold ml-1">/ LIFETIME</span>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex gap-3 text-xs font-bold text-dwelzer-navy items-start">
                                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{tier.maxListings === 9999 ? 'Unlimited' : tier.maxListings} Portal Listings</span>
                            </li>
                            <li className="flex gap-3 text-xs font-bold text-dwelzer-navy items-start">
                                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Global Asset Access</span>
                            </li>
                            {tier.prioritySupport && (
                                <li className="flex gap-3 text-xs font-bold text-dwelzer-navy items-start">
                                    <CheckCircle2 size={14} className="text-dwelzer-gold mt-0.5 flex-shrink-0" />
                                    <span>Lord Class Support</span>
                                </li>
                            )}
                        </ul>

                        <Button
                            variant={tier.name === currentTier.name ? 'glass' : 'gold'}
                            className="w-full mt-auto py-4 font-black text-xs uppercase"
                            disabled={tier.name === currentTier.name}
                        >
                            {tier.name === currentTier.name ? 'Tier Active' : 'Acquire Grade'}
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Compare Table */}
            <section className="pt-20">
                <h2 className="text-2xl font-black text-dwelzer-navy font-display mb-10 text-center uppercase tracking-widest">Institutional Comparison</h2>
                <Card className="p-0 overflow-hidden border-border bg-white shadow-premium">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface border-b border-border">
                                <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-text-muted">Benefit</th>
                                {tiers.map(t => (
                                    <th key={t.id} className="px-6 py-6 text-center text-xs font-black uppercase tracking-widest text-dwelzer-navy">{t.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { label: 'Ecosystem Access', values: ['Basic', 'Full', 'Elite', 'Lord', 'Ethereal'] },
                                { label: 'Escrow Priority', values: ['Standard', 'High', 'Institutional', 'Lord', 'Direct'] },
                                { label: 'Marketplace Fees', values: ['5%', '3%', '1.5%', '0%', '0%'] },
                                { label: 'Legal Counsel', values: ['-', '-', 'Verified', 'Dedicated', 'Institutional'] },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-surface/50 transition-colors">
                                    <td className="px-8 py-5 text-sm font-bold text-dwelzer-navy">{row.label}</td>
                                    {row.values.map((val, idx) => (
                                        <td key={idx} className="px-6 py-5 text-center text-xs font-medium text-text-secondary">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </section>
        </div>
    )
}
