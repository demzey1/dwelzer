'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Bolt, Building2, Scale, ShoppingBag, X } from 'lucide-react'
import { Drawer } from './Drawer'

const quickActions = [
  { label: 'List Property', href: '/dashboard/listings/new', icon: Building2 },
  { label: 'Open Marketplace', href: '/marketplace', icon: ShoppingBag },
  { label: 'Legal Consultation', href: '/legal-search/lawyers', icon: Scale },
]

export const FloatingAction = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF37,#F3D06A)] text-slate-900 shadow-gold animate-gold-pulse"
        aria-label="Global Quick Actions"
      >
        <Bolt size={28} />
      </button>

      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Global Quick Actions" className="w-[380px] rounded-l-3xl">
        <div className="space-y-3">
          {quickActions.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-800 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="flex items-center gap-3 font-semibold">
                <item.icon size={18} className="text-[#D4AF37]" />
                {item.label}
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-slate-500">Open</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100"
          >
            <X size={14} />
            Close
          </button>
        </div>
      </Drawer>
    </>
  )
}
