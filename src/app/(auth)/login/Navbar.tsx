'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Bell, Menu, X, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { usePathname } from 'next/navigation'

// Placeholder for a real logo component
const DwelzerLogo = () => (
    <Link href="/" className="inline-flex items-center gap-2 group">
        <div className="w-10 h-10 bg-dwelzer-gold rounded-lg flex items-center justify-center shadow-sm transition-transform group-hover:rotate-12">
            <span className="text-dwelzer-navy font-display text-2xl font-black">D</span>
        </div>
        <span className="hidden sm:block font-display text-2xl font-black text-white tracking-tighter">
            DWELZER
        </span>
    </Link>
)

// Placeholder for a real portal switcher component
const PortalSwitcher = () => (
    <Button variant="glass" className="text-white/80 hover:text-white hidden lg:flex border-white/10 hover:bg-white/5">
        <LayoutGrid size={18} className="mr-2" />
        Portals
    </Button>
)

// Placeholder for a real profile menu component
const ProfileMenu = () => (
    <Link href="/dashboard">
        <div className="w-10 h-10 rounded-full bg-dwelzer-navy-light border-2 border-dwelzer-gold/50 flex items-center justify-center cursor-pointer hover:border-dwelzer-gold transition-colors">
            <span className="font-bold text-white">A</span>
        </div>
    </Link>
)

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Don't show navbar on auth pages for a focused experience
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        return null
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navClass = isScrolled
        ? 'py-2 bg-dwelzer-navy/80 backdrop-blur-lg border-b border-white/10'
        : 'py-4 bg-transparent'

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
            <div className="container-app flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <DwelzerLogo />
                </div>

                {/* Center: Search Bar (Desktop) */}
                <div className="hidden lg:flex flex-1 justify-center px-8">
                    <div className="w-full max-w-xl relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <Input
                            type="search"
                            placeholder="Search assets, hotels, or legal cases..."
                            className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-12 pr-16 py-2.5 rounded-md"
                        />
                         <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/30 font-mono bg-white/10 px-1.5 py-0.5 rounded-[4px] border border-white/10">
                            ⌘K
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-3">
                        <PortalSwitcher />
                        <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
                            <Bell size={20} />
                        </Button>
                        <ProfileMenu />
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden mt-2 p-4 bg-dwelzer-navy/95 backdrop-blur-lg">
                    <div className="w-full relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-12 pr-4 py-2.5 rounded-md"
                        />
                    </div>
                    <nav className="flex flex-col gap-2">
                        <Link href="/dashboard" className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/5">Dashboard</Link>
                        <Link href="/portals/real-estate" className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/5">Real Estate</Link>
                        <Link href="/portals/hotels" className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/5">Hotels</Link>
                        <Link href="/portals/marketplace" className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/5">Marketplace</Link>
                        <Link href="/profile" className="text-white/80 hover:text-white p-2 rounded-md hover:bg-white/5">Profile</Link>
                    </nav>
                </div>
            )}
        </header>
    )
}