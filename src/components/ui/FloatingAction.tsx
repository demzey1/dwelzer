'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Bolt, Building2, Scale, ShoppingBag, Home, Gavel, FileText, X } from 'lucide-react'
import { Drawer } from './Drawer'

export const FloatingAction = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF37,#f7e3a3)] text-slate-900 shadow-gold animate-gold-pulse"
        aria-label="Global Quick Actions"
      >
        <Bolt size={28} />
      </button>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Quick Actions"
        className="w-[360px] rounded-3xl bg-[#111827] text-slate-50 border-none"
      >
        <div className="space-y-5">
          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3">Real Estate</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Buy', href: '/real-estate/buy' },
                { label: 'Rent', href: '/real-estate/rent' },
                { label: 'List Property', href: '/dashboard/listings/new' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-slate-50 border border-white/10 hover:bg-white/10"
                >
                  <Home size={16} className="text-[#D4AF37]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3">Marketplace</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Purchase', href: '/marketplace/buy', icon: ShoppingBag },
                { label: 'Auction', href: '/marketplace/auctions', icon: Gavel },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-slate-50 border border-white/10 hover:bg-white/10"
                >
                  <item.icon size={16} className="text-[#D4AF37]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3">Legal</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Find Lawyers', href: '/legal-search/lawyers' },
                { label: 'Legal Info', href: '/legal-search/information' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-slate-50 border border-white/10 hover:bg-white/10"
                >
                  <Scale size={16} className="text-[#D4AF37]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <X size={14} />
            Close
          </button>
        </div>
      </Drawer>
    </>
  )
}
