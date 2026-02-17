'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShieldCheck, TimerReset, Video } from 'lucide-react'
import { PORTALS } from '@/types'
import { useUIStore } from '@/stores/useUIStore'
import { Button } from '@/components/ui/Button'

const previewContent: Record<string, { title: string; sub: string; cta: string }> = {
  'real-estate': {
    title: 'Acquire and lease premium global property with verified title depth.',
    sub: 'Split-view inventory, escrow-first purchase flow, and institutional visibility.',
    cta: 'Enter Real Estate',
  },
  hotels: {
    title: 'Book hospitality inventory with enterprise reliability and cleaner underwriting.',
    sub: 'Premium stays, instant verification, and transparent booking management.',
    cta: 'Browse Hotels',
  },
  shortlets: {
    title: 'Short-stay inventory for executives and relocation teams.',
    sub: 'Fast search, trusted hosts, and clean escrow-backed transactions.',
    cta: 'View Shortlets',
  },
  marketplace: {
    title: 'Trade premium goods with direct buy and auction mechanisms.',
    sub: 'Masonry feed, timed offers, and tracked settlement.',
    cta: 'Open Marketplace',
  },
  'legal-search': {
    title: 'Search legal records, counsel options, and cross-jurisdiction insights.',
    sub: 'Trust-first interface built for high-stakes property decisions.',
    cta: 'Open Legal Portal',
  },
}

export default function LandingHero() {
  const router = useRouter()
  const { activePortal, setActivePortal } = useUIStore()
  const currentPortal = PORTALS.find((portal) => portal.id === activePortal) ?? PORTALS[0]
  const details = previewContent[currentPortal.id]

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.14),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.12),transparent_35%)]" />
      <div className="container-app relative mx-auto pb-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              Series-A Quality Interface
            </p>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-tight">
              DWELZER is your multi-portal command layer for global assets.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Built for Airbnb-level exploration, Zillow-grade property depth, marketplace velocity, and legal trust in one premium interface.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={currentPortal.href}>
                <Button variant="gold" size="lg" className="!rounded-2xl shadow-gold">
                  {details.cta}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="!rounded-2xl border-slate-300 text-slate-700">
                <Video size={18} className="mr-2 text-[#D4AF37]" />
                Watch Product Tour
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2">
              <p className="text-sm font-semibold text-slate-700">Hero Video Placeholder</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <TimerReset size={14} className="text-[#D4AF37]" />
                01:28
              </span>
            </div>
            <div className="mt-3 aspect-[16/9] rounded-2xl bg-[linear-gradient(135deg,#0F172A,#1E293B)] p-6">
              <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-200/70">Now Previewing</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white">{currentPortal.name}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-200/80">{details.sub}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PORTALS.map((portal) => (
            <motion.button
              key={portal.id}
              type="button"
              onClick={() => {
                setActivePortal(portal.id)
                router.push(portal.href)
              }}
              whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`premium-card text-left ${currentPortal.id === portal.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40' : ''}`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Portal</p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">{portal.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{portal.description}</p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPortal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Active View</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{currentPortal.name}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">{details.title}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
