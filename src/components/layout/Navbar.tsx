'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { PORTALS } from '@/types'
import { cn } from '@/lib/utils'
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard, Building2, Hotel, Home, ShoppingBag, Scale, Plus, TrendingUp } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
    Building2,
    Hotel,
    Home,
    ShoppingBag,
    Scale,
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)
    const { data: session } = useSession()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path: string) => pathname?.startsWith(path)

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                isScrolled ? 'glass-dark py-3' : 'bg-transparent'
            )}
        >
            <div className="container-app mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                        {/* Institutional Globe Base */}
                        <div className="absolute inset-0 bg-gradient-to-br from-dwelzer-gold via-amber-500 to-dwelzer-gold rounded-2xl rotate-12 group-hover:rotate-[25deg] transition-transform duration-700 shadow-gold-glow" />
                        <div className="absolute inset-0.5 bg-dwelzer-navy rounded-[14px] flex items-center justify-center overflow-hidden">
                            {/* Inner Globe/Building Logic */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            <Building2 className="text-dwelzer-gold z-10 animate-pulse-slow" size={24} />
                        </div>
                        {/* Sovereign Ring */}
                        <div className="absolute -inset-1 border border-dwelzer-gold/20 rounded-3xl animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-2xl font-black tracking-tighter text-white group-hover:text-dwelzer-gold transition-colors leading-none">
                            DWELZER
                        </span>
                        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-dwelzer-gold/70 mt-1 leading-none">
                            Institutional Property Ecosystem
                        </span>
                    </div>
                </Link>

                {/* Desktop Portal Switcher */}
                <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl backdrop-blur-sm border border-white/10">
                    {PORTALS.map((portal) => {
                        const Icon = ICON_MAP[portal.icon]
                        const hasSubmenu = ['real-estate', 'marketplace', 'legal-search'].includes(portal.id)

                        return (
                            <div
                                key={portal.id}
                                className="relative group/portal"
                                onMouseEnter={() => setHoveredPortal(portal.id)}
                                onMouseLeave={() => setHoveredPortal(null)}
                            >
                                <Link
                                    href={portal.href}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                        isActive(portal.href)
                                            ? 'bg-dwelzer-gold text-dwelzer-navy shadow-lg shadow-dwelzer-gold/20'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                    )}
                                    onClick={(e) => {
                                        if (hasSubmenu) {
                                            e.preventDefault()
                                            // Toggle logic if needed for mobile, but this is desktop
                                        }
                                    }}
                                >
                                    {Icon && <Icon size={18} />}
                                    <span>{portal.name}</span>
                                    {hasSubmenu && <ChevronDown size={14} className="opacity-50 group-hover/portal:rotate-180 transition-transform" />}
                                </Link>

                                {/* Submenu Popup */}
                                {hasSubmenu && (
                                    <div className={cn(
                                        "absolute top-full left-0 mt-2 w-56 bg-dwelzer-navy border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden transition-all duration-300 z-[60]",
                                        hoveredPortal === portal.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                                    )}>
                                        {portal.id === 'real-estate' && (
                                            <>
                                                <Link href="/real-estate/buy" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                                        <Building2 size={16} />
                                                    </div>
                                                    <span>Outright Purchase</span>
                                                </Link>
                                                <Link href="/real-estate/rent" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-dwelzer-gold/20 text-dwelzer-gold flex items-center justify-center">
                                                        <Home size={16} />
                                                    </div>
                                                    <span>Executive Rent</span>
                                                </Link>
                                                <Link href="/dashboard/listings/new" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all border-t border-white/5 mt-1 pt-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                                                        <Plus size={16} />
                                                    </div>
                                                    <span>List Your Asset</span>
                                                </Link>
                                            </>
                                        )}
                                        {portal.id === 'marketplace' && (
                                            <>
                                                <Link href="/marketplace/buy" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                                        <ShoppingBag size={16} />
                                                    </div>
                                                    <span>Normal Purchase</span>
                                                </Link>
                                                <Link href="/marketplace/auctions" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                                                        <TrendingUp size={16} />
                                                    </div>
                                                    <span>Institutional Auction</span>
                                                </Link>
                                            </>
                                        )}
                                        {portal.id === 'legal-search' && (
                                            <>
                                                <Link href="/legal-search/lawyers" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                                                        <Scale size={16} />
                                                    </div>
                                                    <span>Elite Law Firms</span>
                                                </Link>
                                                <Link href="/legal-search/information" className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                                                        <Scale size={16} />
                                                    </div>
                                                    <span>Legal Information</span>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 pl-3 bg-white/10 rounded-full border border-white/20 hover:bg-white/20 transition-all"
                            >
                                <div className="flex flex-col items-end mr-1">
                                    <span className="text-xs text-white/60 font-medium tracking-wide uppercase">{(session.user as any).tierName}</span>
                                    <span className="text-sm text-white font-semibold leading-none">{session.user?.name?.split(' ')[0]}</span>
                                </div>
                                <div className="w-10 h-10 bg-dwelzer-gold rounded-full flex items-center justify-center text-dwelzer-navy font-bold shadow-lg shadow-dwelzer-gold/30 ring-2 ring-white/20">
                                    {session.user?.name?.[0]}
                                </div>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-dwelzer-navy border border-white/10 rounded-2xl shadow-2xl animate-scale-in p-2 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                                        <p className="text-sm font-medium text-white">{session.user?.name}</p>
                                        <p className="text-xs text-white/50 truncate">{session.user?.email}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <LayoutDashboard size={18} className="text-dwelzer-gold" />
                                        <span>Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="ghost" className={cn(
                                    "hover:bg-white/10",
                                    isScrolled || pathname !== '/' ? "text-white" : "text-dwelzer-navy"
                                )}>
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="gold" className="animate-gold-pulse">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "lg:hidden p-2 rounded-xl transition-all",
                            isScrolled || pathname !== '/' ? "text-white glass" : "text-dwelzer-navy bg-dwelzer-navy/5"
                        )}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-dwelzer-navy border-b border-white/10 animate-slide-down p-6">
                    <div className="flex flex-col gap-4">
                        {PORTALS.map((portal) => {
                            const Icon = ICON_MAP[portal.icon]
                            return (
                                <Link
                                    key={portal.id}
                                    href={portal.href}
                                    className={cn(
                                        'flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all duration-200',
                                        isActive(portal.href)
                                            ? 'bg-dwelzer-gold text-dwelzer-navy'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                        isActive(portal.href) ? "bg-dwelzer-navy/10" : "bg-white/5"
                                    )}>
                                        {Icon && <Icon size={24} />}
                                    </div>
                                    <span>{portal.name}</span>
                                </Link>
                            )
                        })}
                        {!session && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full text-white hover:bg-white/5">Sign In</Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="gold" className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
