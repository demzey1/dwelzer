'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { MapPin, BedDouble, Bath, Maximize2, Search } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

type RealEstateItem = {
  id: string
  title: string
  description: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  area: number
  city: string
  country: string
  images: string
}

function parseImages(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function RealEstateSplitView({ listings }: { listings: RealEstateItem[] }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<RealEstateItem | null>(null)

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim()
    if (!value) return listings
    return listings.filter((item) =>
      `${item.title} ${item.city} ${item.country} ${item.type}`.toLowerCase().includes(value)
    )
  }, [listings, query])

  return (
    <>
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search size={18} className="text-[#D4AF37]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, title, or type..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          {filtered.map((item) => {
            const image = parseImages(item.images)[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
                  <img src={image} alt={item.title} className="h-[128px] w-full rounded-xl object-cover" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">{item.type}</p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                      <MapPin size={14} className="text-[#D4AF37]" />
                      {item.city}, {item.country}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><BedDouble size={13} /> {item.bedrooms} Beds</span>
                      <span className="inline-flex items-center gap-1"><Bath size={13} /> {item.bathrooms} Baths</span>
                      <span className="inline-flex items-center gap-1"><Maximize2 size={13} /> {item.area} sqft</span>
                    </div>
                    <p className="mt-3 text-xl font-black text-slate-900">{formatPrice(item.price)}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-lg xl:sticky xl:top-28">
          <div className="mb-4 rounded-xl bg-slate-900 p-4 text-slate-50">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Map View</p>
            <h4 className="mt-1 text-xl font-bold tracking-tight">Location Intelligence</h4>
          </div>
          <div className="flex h-[560px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <p className="max-w-[220px] text-sm leading-relaxed text-slate-500">
              Sticky map panel placeholder. Select a property card to inspect details in the side drawer.
            </p>
          </div>
        </aside>
      </div>

      <Drawer
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        side="right"
        title={selected?.title ?? 'Property Detail'}
        className="w-full max-w-[540px] rounded-l-3xl"
      >
        {selected && (
          <div className="space-y-5">
            <img
              src={parseImages(selected.images)[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900'}
              alt={selected.title}
              className="h-[240px] w-full rounded-2xl object-cover"
            />
            <p className="text-sm leading-relaxed text-slate-600">{selected.description}</p>
            <p className="text-2xl font-black text-slate-900">{formatPrice(selected.price)}</p>
            <div className="flex gap-3">
              <Link href={`/real-estate/${selected.id}`} className="flex-1">
                <Button variant="gold" className="w-full">View Full Listing</Button>
              </Link>
              <Button variant="outline" className="flex-1">Start Escrow</Button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}
