'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Building2,
    Hotel,
    ShoppingBag,
    Scale,
    Settings,
    LogOut,
    MessageSquare,
    Calendar,
    ShieldCheck,
    CreditCard,
    Menu,
    X
} from 'lucide-react'

const MENU_ITEMS = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'listings', name: 'My Listings', icon: Building2, href: '/dashboard/listings' },
    { id: 'bookings', name: 'My Bookings', icon: Calendar, href: '/dashboard/bookings' },
    { id: 'messages', name: 'Messages', icon: MessageSquare, href: '/dashboard/messages' },
    { id: 'subscription', name: 'Subscription', icon: CreditCard, href: '/dashboard/subscription' },
    { id: 'kyc', name: 'Identity (KYC)', icon: ShieldCheck, href: '/dashboard/kyc' },
    { id: 'settings', name: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const pathname = usePathname()
    const { data: session } = useSession()

    const isActive = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard'
        return pathname?.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-surface flex">
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 bg-dwelzer-navy text-white transition-all duration-300 overflow-hidden",
                    isSidebarOpen ? "w-72" : "w-20"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 mb-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-dwelzer-gold rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover:rotate-12 transition-transform">
                                <span className="text-dwelzer-navy font-display text-2xl font-black">D</span>
                            </div>
                            {isSidebarOpen && (
                                <span className="font-display text-2xl font-black text-white tracking-tighter animate-fade-in whitespace-nowrap">DWELZER</span>
                            )}
                        </Link>
                    </div>

                    <nav className="flex-grow px-3 space-y-2">
                        {MENU_ITEMS.map((item) => {
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group overflow-hidden",
                                        active
                                            ? "bg-dwelzer-gold text-dwelzer-navy shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                            : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={22} className={cn("flex-shrink-0", active ? "text-dwelzer-navy" : "group-hover:text-dwelzer-gold transition-colors")} />
                                    {isSidebarOpen && (
                                        <span className="font-bold text-sm tracking-wide whitespace-nowrap">{item.name}</span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 mt-auto border-t border-white/5">
                        <div className={cn(
                            "p-4 rounded-[28px] bg-white/5 border border-white/5 flex items-center transition-all",
                            isSidebarOpen ? "gap-4" : "justify-center"
                        )}>
                            <div className="w-10 h-10 rounded-full bg-dwelzer-gold flex items-center justify-center text-dwelzer-navy font-black shadow-lg flex-shrink-0">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                            {isSidebarOpen && (
                                <div className="flex-grow min-w-0">
                                    <p className="text-sm font-black text-white truncate leading-none mb-1">{session?.user?.name}</p>
                                    <p className="text-[10px] text-dwelzer-gold font-bold uppercase tracking-widest truncate">{(session?.user as any)?.tierName || 'Dealing'}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => signOut()}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-4 mt-4 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all",
                                !isSidebarOpen && "justify-center"
                            )}
                        >
                            <LogOut size={22} className="flex-shrink-0" />
                            {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            <div
                className={cn(
                    "flex-grow flex flex-col transition-all duration-300 min-w-0",
                    isSidebarOpen ? "ml-72" : "ml-20"
                )}
            >
                <header className="h-24 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-3 rounded-xl bg-surface hover:bg-dwelzer-gold/10 text-text-secondary hover:text-dwelzer-gold transition-all"
                            aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            {isSidebarOpen ? <Menu size={20} /> : <X size={20} />}
                        </button>
                        <h2 className="text-xl font-black text-dwelzer-navy font-display uppercase tracking-widest">
                            {MENU_ITEMS.find(i => isActive(i.href))?.name || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-surface rounded-full border border-border">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">System Online</span>
                        </div>
                        <div className="h-10 w-px bg-border hidden sm:block" />
                        <button
                            className="relative p-2 text-text-secondary hover:text-dwelzer-gold transition-all"
                            aria-label="View Messages"
                            title="Messages"
                        >
                            <MessageSquare size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                        </button>
                    </div>
                </header>

                <main className="p-8 pb-12 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
