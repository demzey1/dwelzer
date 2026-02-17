'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Bell, Building2, ChevronDown, Gavel, Menu, Scale, ShoppingBag, Wallet, X } from 'lucide-react'
import { PORTALS } from '@/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/useUIStore'
import { Modal } from '@/components/ui/Modal'

type PortalAction = {
  label: string
  href: string
  icon: React.ElementType
}

const portalActionMap: Record<string, PortalAction[]> = {
  'real-estate': [
    { label: 'Buy Property', href: '/real-estate/buy', icon: Building2 },
    { label: 'Rent Property', href: '/real-estate/rent', icon: Building2 },
    { label: 'List Property', href: '/dashboard/listings/new', icon: Building2 },
  ],
  marketplace: [
    { label: 'Purchase Items', href: '/marketplace/buy', icon: ShoppingBag },
    { label: 'Auction House', href: '/marketplace/auctions', icon: Gavel },
  ],
  'legal-search': [
    { label: 'Find Lawyers', href: '/legal-search/lawyers', icon: Scale },
    { label: 'Property Legal Information', href: '/legal-search/information', icon: Scale },
  ],
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { activePortal, setActivePortal } = useUIStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [actionPortal, setActionPortal] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const selectedPortal = useMemo(() => {
    if (activePortal) {
      return PORTALS.find((item) => item.id === activePortal) ?? PORTALS[0]
    }
    return PORTALS.find((item) => pathname?.startsWith(item.href)) ?? PORTALS[0]
  }, [activePortal, pathname])

  const onSelectPortal = (portalId: string, href: string) => {
    setActivePortal(portalId)
    setSwitcherOpen(false)
    setMobileOpen(false)
    router.push(href)
  }

  const onPortalClick = (portalId: string, href: string) => {
    setActivePortal(portalId)
    setSwitcherOpen(false)
    setMobileOpen(false)
    if (portalActionMap[portalId]) {
      setActionPortal(portalId)
      return
    }
    router.push(href)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-out',
        isScrolled ? 'px-4 pt-3' : 'px-4 pt-5'
      )}
    >
      <div
        className={cn(
          'mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-2xl border border-slate-200/60 bg-white/90 px-3 shadow-lg backdrop-blur-xl',
          isScrolled && 'h-14'
        )}
      >
        <Link href="/" className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-slate-100/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-[#D4AF37] shadow-gold">
            <Building2 size={18} />
          </div>
          <div className="leading-none">
            <p className="font-[ui-serif] text-xl font-semibold tracking-tight text-slate-900">DWELZER</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Global Super App</p>
          </div>
        </Link>

        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setSwitcherOpen((open) => !open)}
            className="flex min-w-[240px] items-center justify-between rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 shadow-sm transition hover:border-[#D4AF37]/60"
          >
            <span>{selectedPortal.name}</span>
            <ChevronDown size={16} className={cn('transition-transform', switcherOpen && 'rotate-180')} />
          </button>

          {switcherOpen && (
            <div className="absolute left-0 top-[calc(100%+8px)] w-full rounded-2xl border border-slate-800 bg-slate-900 text-slate-50 p-2 shadow-2xl">
              {PORTALS.map((portal) => (
                <button
                  key={portal.id}
                  type="button"
                  onClick={() => onPortalClick(portal.id, portal.href)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition',
                    selectedPortal.id === portal.id
                      ? 'bg-[#D4AF37] text-slate-900'
                      : 'text-slate-100 hover:bg-white/10'
                  )}
                >
                  <span>{portal.name}</span>
                  {selectedPortal.id === portal.id && <span className="text-slate-900 font-semibold">Active</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
            <Wallet size={16} className="text-[#D4AF37]" />
            <span>$0.00</span>
          </div>
          <button
            type="button"
            className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-[#D4AF37]/60"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#D4AF37]" />
          </button>
          {session ? (
            <Link href="/dashboard" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
              {session.user?.name ?? 'Dashboard'}
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="!rounded-xl !text-slate-700">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="gold" size="sm" className="!rounded-xl">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-[1440px] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl md:hidden">
          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
            <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Switch Portal</p>
            <div className="grid grid-cols-2 gap-2">
              {PORTALS.map((portal) => (
                <button
                  key={portal.id}
                  type="button"
                  onClick={() => onPortalClick(portal.id, portal.href)}
                  className={cn(
                    'rounded-xl px-3 py-2 text-left text-sm font-medium',
                    selectedPortal.id === portal.id ? 'bg-slate-900 text-slate-50' : 'bg-white text-slate-700'
                  )}
                >
                  {portal.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <span className="flex items-center gap-2"><Wallet size={14} className="text-[#D4AF37]" /> Wallet</span>
            <span>$0.00</span>
          </div>
        </div>
      )}

      <Modal
        isOpen={Boolean(actionPortal)}
        onClose={() => setActionPortal(null)}
        title={
          actionPortal
            ? PORTALS.find((portal) => portal.id === actionPortal)?.name ?? 'Portal Actions'
            : 'Portal Actions'
        }
        size="sm"
        className="rounded-3xl"
      >
        <div className="space-y-3">
          {(actionPortal ? portalActionMap[actionPortal] : []).map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                setActionPortal(null)
                router.push(action.href)
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-slate-800 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="flex items-center gap-3 font-semibold">
                <action.icon size={16} className="text-[#D4AF37]" />
                {action.label}
              </span>
              <ChevronDown size={14} className="-rotate-90 text-slate-400" />
            </button>
          ))}
        </div>
      </Modal>
    </header>
  )
}
