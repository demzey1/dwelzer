'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PORTALS } from '@/types'
import { Building2, Hotel, Home, ShoppingBag, Scale, ArrowRight, Play, Globe, ShieldCheck, Zap } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
    Building2,
    Hotel,
    Home,
    ShoppingBag,
    Scale,
}

export default function LandingHero() {
    return (
        <section className="relative min-h-screen bg-dwelzer-navy overflow-hidden flex items-center pt-20 bg-gradient-mesh">
            {/* Premium Animated Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-dwelzer-gold/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-accent-purple/10 rounded-full blur-[150px] animate-float pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-[150px] h-[150px] bg-dwelzer-accent-blue/20 rounded-full blur-[80px] animate-float pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-dot-pattern" />

            <div className="container-app mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-dwelzer-gold text-sm font-semibold mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-dwelzer-gold animate-pulse" />
                        Empowering the Future of Global Commerce
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
                        The Ultimate <span className="text-gradient-gold">Property Ecosystem</span> for the Digital Age.
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                        Experience the world's first unified platform combining real estate, luxury hotels, shortlets, and marketplace with secure escrow and legal search.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button variant="gold" size="lg" className="w-full text-lg group">
                                Enter Ecosystem
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button variant="glass" size="lg" className="w-full sm:w-auto text-lg text-white">
                            <Play className="mr-2 fill-white" size={20} />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                        {[
                            { label: 'Asset Value', value: '$12.4B+', icon: Globe },
                            { label: 'Escrow Secured', value: '100%', icon: ShieldCheck },
                            { label: 'Tiers Available', value: '5 Meta', icon: Zap },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="flex items-center gap-2 text-dwelzer-gold mb-1">
                                    <stat.icon size={16} />
                                    <span className="text-2xl font-bold text-white font-display">{stat.value}</span>
                                </div>
                                <span className="text-xs text-white/40 uppercase tracking-widest font-bold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Portal Cards Visual */}
                <div className="relative hidden lg:block">
                    <div className="grid grid-cols-2 gap-6 relative">
                        {PORTALS.slice(0, 4).map((portal, i) => {
                            const Icon = ICON_MAP[portal.icon]
                            return (
                                <motion.div
                                    key={portal.id}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.15 + 0.4 }}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="group relative p-8 rounded-3xl glass-dark border border-white/10 hover:border-dwelzer-gold/50 transition-all cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-dwelzer-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:rotate-6 portal-icon-${portal.id}-dark`}
                                    >
                                        {Icon && <Icon size={32} />}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-display">{portal.name}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                                        {portal.description}
                                    </p>
                                    <div className="flex items-center text-dwelzer-gold text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                                        Explore Portal <ArrowRight size={14} />
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Floating Lord Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        >
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-dwelzer-gold to-dwelzer-gold-dark shadow-[0_0_50px_rgba(212,175,55,0.4)] border border-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-dwelzer-navy rounded-xl flex items-center justify-center">
                                        <Zap className="text-dwelzer-gold" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-dwelzer-navy/60 font-black uppercase tracking-tighter">Elite Access</div>
                                        <div className="text-lg font-black text-dwelzer-navy font-display leading-none">LORD TIER</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
