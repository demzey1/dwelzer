'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Building2,
  Hotel,
  Wallet,
  Settings,
  ShieldCheck,
  MessageSquare,
  Users,
  Briefcase,
  Gavel,
} from 'lucide-react'

const mainNav = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Wallet & Escrow', href: '/dashboard/wallet', icon: Wallet },
]

const portalNav = [
  { name: 'My Listings', href: '/dashboard/listings', icon: Building2 },
  { name: 'My Bookings', href: '/dashboard/bookings', icon: Hotel },
]

const accountNav = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'KYC Verification', href: '/dashboard/kyc', icon: ShieldCheck },
]

const adminNav = [
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Listing Moderation', href: '/admin/listings', icon: Briefcase },
  { name: 'Legal Entries', href: '/admin/legal', icon: Gavel },
]

export function Sidebar({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = (session?.user as any)?.role === 'ADMIN'

  const renderNavLinks = (links: typeof mainNav) =>
    links.map((link) => {
      const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
      return (
        <Link
          key={link.name}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
            isActive
              ? 'bg-dwelzer-gold/10 text-dwelzer-gold'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          )}
        >
          <div className="w-6 flex items-center justify-center">
            <link.icon className="h-5 w-5" />
          </div>
          {link.name}
        </Link>
      )
    })

  return (
    <div className={cn('h-full bg-dwelzer-navy', className)}>
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start gap-1 p-4">
            <h3 className="px-3 py-2 text-xs font-semibold uppercase text-white/40 tracking-wider">Main</h3>
            {renderNavLinks(mainNav)}
            
            <h3 className="px-3 pt-6 pb-2 text-xs font-semibold uppercase text-white/40 tracking-wider">Portals</h3>
            {renderNavLinks(portalNav)}

            <h3 className="px-3 pt-6 pb-2 text-xs font-semibold uppercase text-white/40 tracking-wider">Account</h3>
            {renderNavLinks(accountNav)}

            {isAdmin && (
                <>
                    <div className="my-4 border-t border-white/10" />
                    <h3 className="px-3 pt-2 pb-2 text-xs font-semibold uppercase text-dwelzer-gold/60 tracking-wider">Admin</h3>
                    {renderNavLinks(adminNav)}
                </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}