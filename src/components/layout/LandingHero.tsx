'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, Hotel, Home, Scale, ShoppingBag, ShieldCheck, CheckCircle2, Lock, Headphones, ArrowRight } from 'lucide-react'
import { PORTALS } from '@/types'
import { useUIStore } from '@/stores/useUIStore'
import { Button } from '@/components/ui/Button'

export default function LandingHero() {
  const router = useRouter()
  const { activePortal, setActivePortal } = useUIStore()
  const currentPortal = PORTALS.find((portal) => portal.id === activePortal) ?? PORTALS[0]

  return (
    <section className="relative overflow-hidden bg-[#f2f5f8] pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.08),transparent_35%)]" />
      <div className="container-app relative mx-auto flex flex-col gap-14 pb-20">
        <div className="text-center space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
            <ShieldCheck size={14} className="text-[#D4AF37]" />
            Premium Multi-Portal Ecosystem
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Four Portals. <span className="text-[#D4AF37]">One Ecosystem.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
            Every service you need — connected, protected, and premium by default.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { id: 'real-estate', title: 'Real Estate', desc: 'Buy, rent, or list premium properties with escrow-backed transactions and verified sellers.', icon: Building2, bg: 'bg-blue-50' },
            { id: 'hotels', title: 'Hotels & Shortlets', desc: 'Book verified accommodations with real-time availability and instant confirmation.', icon: Hotel, bg: 'bg-emerald-50' },
            { id: 'marketplace', title: 'Marketplace', desc: 'Trade goods, join live auctions, and transact safely with built-in escrow protection.', icon: ShoppingBag, bg: 'bg-amber-50' },
            { id: 'legal-search', title: 'Legal Services', desc: 'Find verified lawyers, access property legal information, and book consultations.', icon: Scale, bg: 'bg-purple-50' },
          ].map((card) => (
            <motion.button
              key={card.id}
              type="button"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => {
                setActivePortal(card.id)
                router.push(PORTALS.find((p) => p.id === card.id)?.href ?? '/')
              }}
              className="flex flex-col gap-3 rounded-2xl border border-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] bg-white text-left p-6 hover:shadow-2xl"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg}`}>
                <card.icon className="text-slate-700" size={22} />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* How it works (dark band) */}
        <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f172a,#111827)] text-slate-50 shadow-2xl">
          <div className="px-6 py-12 md:px-12">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black tracking-tight">How <span className="text-[#D4AF37]">DWELZER</span> Works</h2>
              <p className="text-slate-200/80 text-lg">From signup to sealed deal — in four simple steps.</p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-4">
              {[
                { label: 'Create Your Account', copy: 'Sign up free and verify your identity to unlock premium features.' },
                { label: 'Explore Portals', copy: 'Browse real estate, hotels, marketplace items, or legal services.' },
                { label: 'Transact with Escrow', copy: 'Every transaction is protected. Funds are held until both parties confirm.' },
                { label: 'Deal with Confidence', copy: 'Complete your deal knowing you’re protected by DWELZER’s trust system.' },
              ].map((item, idx) => (
                <div key={item.label} className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37] text-slate-900 font-black">{idx + 1}</span>
                    <p className="font-bold text-lg">{item.label}</p>
                  </div>
                  <p className="mt-3 text-sm text-slate-200/80">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust features */}
        <div className="text-center space-y-3">
          <h3 className="text-4xl font-black text-slate-900">Built on <span className="text-[#D4AF37]">Trust</span></h3>
          <p className="text-slate-600 text-lg">Security isn’t a feature — it’s the foundation.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Escrow Protected', copy: 'Funds held securely until both parties confirm.' },
            { icon: CheckCircle2, title: 'KYC Verified', copy: 'Every premium user is identity-verified.' },
            { icon: Lock, title: 'Bank-Grade Security', copy: '256-bit encryption on all sensitive flows.' },
            { icon: Headphones, title: '24/7 Support', copy: 'Dedicated team ready to assist every step.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
              <item.icon className="text-[#D4AF37]" size={24} />
              <h4 className="mt-4 text-lg font-extrabold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-col items-center gap-3">
          <Link href={currentPortal.href}>
            <Button variant="gold" size="lg" className="!rounded-full px-6">
              Enter {currentPortal.name}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Fully responsive • No overlaps • Mobile ready</p>
        </div>
      </div>
    </section>
  )
}
