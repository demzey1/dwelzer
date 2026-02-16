import React from 'react'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import {
    Building2,
    Calendar,
    TrendingUp,
    CircleDollarSign,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck,
    Briefcase,
    Globe,
    ChevronRight,
    Settings,
    Scale
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    // Mocking stats for overview
    const stats = [
        { label: 'Active Listings', value: '12', icon: Building2, trend: '+2', trendUp: true },
        { label: 'Total Bookings', value: '48', icon: Calendar, trend: '+12%', trendUp: true },
        { label: 'Revenue (MTD)', value: '$124,500', icon: CircleDollarSign, trend: '+18.4%', trendUp: true },
        { label: 'Escrow Volume', value: '$840,000', icon: ShieldCheck, trend: '-2.1%', trendUp: false },
    ]

    const recentTransactions = [
        { id: '1', type: 'SALE', item: 'Luxury Villa in Malibu', amount: '$4,200,000', status: 'RELEASED', date: '2 hours ago' },
        { id: '2', type: 'BOOKING', item: 'The Ritz-Carlton NYC', amount: '$2,400', status: 'PENDING', date: '5 hours ago' },
        { id: '3', type: 'MARKET', item: 'Bespoke Oak Dining Set', amount: '$12,000', status: 'INITIATED', date: '1 day ago' },
        { id: '4', type: 'RENT', item: 'Penthouse Apartment', amount: '$15,000', status: 'CONFIRMED', date: '2 days ago' },
    ]

    return (
        <div className="space-y-10">
            {/* Welcome Banner */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-dwelzer-navy font-display mb-2">Ecosystem Overview</h1>
                    <p className="text-text-secondary font-medium">Welcome back. Your global assets are performing at 98.4% efficiency.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline">Download Report</Button>
                    <Button variant="gold" leftIcon={<ArrowUpRight size={18} />}>Institutional Access</Button>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-8 border-none shadow-premium group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-dwelzer-navy text-dwelzer-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <stat.icon size={24} />
                            </div>
                            <Badge
                                variant={stat.trendUp ? 'emerald' : 'red'}
                                className="flex items-center gap-1"
                            >
                                {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </Badge>
                        </div>
                        <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-dwelzer-navy font-display tracking-tight">{stat.value}</h3>
                    </Card>
                ))}
            </section>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-dwelzer-navy font-display">Recent Activity</h2>
                        <Link href="/dashboard/transactions" className="text-dwelzer-gold font-bold text-sm hover:underline">View All</Link>
                    </div>
                    <Card className="p-0 overflow-hidden border-border shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-surface border-b border-border">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Type</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Item / Description</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Amount</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-dwelzer-gold/5 transition-colors group cursor-pointer">
                                            <td className="px-6 py-5">
                                                <Badge variant="outline" className="group-hover:bg-dwelzer-navy group-hover:text-white transition-colors">{tx.type}</Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-dwelzer-navy mb-0.5">{tx.item}</p>
                                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-1">
                                                    <Clock size={10} /> {tx.date}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-dwelzer-navy">
                                                {tx.amount}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <Badge
                                                    variant={tx.status === 'RELEASED' ? 'emerald' : tx.status === 'PENDING' ? 'amber' : 'blue'}
                                                >
                                                    {tx.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-surface text-center">
                            <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Showing 4 of 124 transactions this month</p>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info Panels */}
                <div className="space-y-10">
                    {/* Subscription Card */}
                    <Card className="p-8 bg-dwelzer-navy text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-dwelzer-gold/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-dwelzer-gold/20 transition-all" />
                        <h4 className="text-dwelzer-gold font-display text-lg font-bold mb-6">Subscription</h4>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-dwelzer-gold text-dwelzer-navy flex items-center justify-center shadow-lg">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <p className="text-2xl font-black font-display tracking-tight text-gradient-gold leading-none">LORD TIER</p>
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Elite Lifetime Access</p>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {['Unlimited Premium Listings', 'Institutional Escrow', 'Global Legal Search', 'Priority Support'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                                    <ShieldCheck size={16} className="text-dwelzer-gold" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <Button variant="gold" className="w-full">Upgrade Services</Button>
                    </Card>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h4 className="font-display font-black text-dwelzer-navy uppercase tracking-widest text-xs px-2">Quick Actions</h4>
                        {[
                            { label: 'Create New Listing', icon: Building2 },
                            { label: 'Browse Global Portals', icon: Globe },
                            { label: 'Open Legal Search', icon: Scale },
                            { label: 'System Settings', icon: Settings },
                        ].map((action, i) => (
                            <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-border hover:border-dwelzer-gold hover:translate-x-2 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-surface group-hover:bg-dwelzer-gold/10 text-text-muted group-hover:text-dwelzer-gold transition-colors flex items-center justify-center">
                                        <action.icon size={20} />
                                    </div>
                                    <span className="font-bold text-dwelzer-navy text-sm">{action.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-border group-hover:text-dwelzer-gold" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

