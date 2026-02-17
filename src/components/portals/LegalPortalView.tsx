'use client'

import React, { useMemo, useState } from 'react'
import { CalendarDays, Search } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

type LegalEntry = {
  id: string
  title: string
  description: string
  category: string
  jurisdiction: string
  status: string
}

export default function LegalPortalView({ entries }: { entries: LegalEntry[] }) {
  const [query, setQuery] = useState('')
  const [consultOpen, setConsultOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim()
    if (!value) return entries
    return entries.filter((entry) =>
      `${entry.title} ${entry.description} ${entry.category} ${entry.jurisdiction}`
        .toLowerCase()
        .includes(value)
    )
  }, [entries, query])

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h1 className="text-center text-4xl font-black tracking-tight text-slate-900">Legal Search Portal</h1>
          <p className="mt-3 text-center text-slate-600">Find property legal records and connect with verified legal professionals.</p>
          <div className="mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-[#D4AF37]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by jurisdiction, category, or case topic..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">{entry.category}</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">{entry.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{entry.jurisdiction} · {entry.status}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{entry.description}</p>
                </div>
                <Button variant="gold" onClick={() => setConsultOpen(true)}>
                  Book Consultation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={consultOpen} onClose={() => setConsultOpen(false)} title="Book Consultation" size="md" className="rounded-3xl">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Pick your preferred date and time for a legal consultation.</p>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Date</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#D4AF37]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Time Slot</span>
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#D4AF37]">
              <option>09:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </label>
          <Button variant="gold" className="w-full">
            <CalendarDays size={16} className="mr-2" />
            Confirm Booking
          </Button>
        </div>
      </Modal>
    </>
  )
}
