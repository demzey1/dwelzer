'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Clock3, Filter, Search } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type MarketItem = {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  images: string
  isAuction: boolean
  auctionEndTime: string | null
}

function parseImages(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getRemaining(endTime: string | null): string {
  if (!endTime) return 'No timer'
  const diff = new Date(endTime).getTime() - Date.now()
  if (diff <= 0) return 'Auction ended'
  const totalSeconds = Math.floor(diff / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
}

export default function MarketplaceMasonry({ items }: { items: MarketItem[] }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const categories = useMemo(() => ['ALL', ...new Set(items.map((item) => item.category))], [items])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const passCategory = selectedCategory === 'ALL' || item.category === selectedCategory
      const passQuery = `${item.title} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(query.toLowerCase().trim())
      return passCategory && passQuery
    })
  }, [items, query, selectedCategory])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:sticky lg:top-28">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
          <Filter size={17} className="text-[#D4AF37]" />
          Filters
        </h3>
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search size={16} className="text-[#D4AF37]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-slate-900 text-slate-50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </aside>

      <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
        {filtered.map((item) => {
          const image = parseImages(item.images)[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=900'
          return (
            <Link
              key={item.id}
              href={`/marketplace/${item.id}`}
              className="mb-5 block break-inside-avoid rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img src={image} alt={item.title} className="h-auto w-full object-cover" />
                {item.isAuction && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white">
                    <Clock3 size={12} className="text-[#D4AF37]" />
                    {getRemaining(item.auctionEndTime)}
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{item.category}</p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.description}</p>
                <p className="mt-3 text-xl font-black text-slate-900">{formatPrice(item.price)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
