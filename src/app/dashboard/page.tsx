import React from 'react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Building2, CalendarCheck2, CircleDollarSign, ShieldCheck, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

type EscrowStep = 'DEPOSIT' | 'LOCK' | 'RELEASE'

function mapEscrowStep(status?: string): EscrowStep {
  if (status === 'RELEASED') return 'RELEASE'
  if (status === 'CONFIRMED' || status === 'DISPUTED') return 'LOCK'
  return 'DEPOSIT'
}

const escrowLabels: EscrowStep[] = ['DEPOSIT', 'LOCK', 'RELEASE']

export default async function DashboardOverviewPage() {
  const session = await getServerSession()
  const userEmail = session?.user?.email || 'sarah@dwelzer.com'

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      kycVerification: true,
    },
  })

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Access Unavailable</h1>
        <p className="mt-2 text-slate-600">Please sign in to load your account dashboard.</p>
        <Link href="/login" className="mt-4 inline-block">
          <Button variant="gold">Go to Login</Button>
        </Link>
      </div>
    )
  }

  const [listingCount, bookingCount, recentBookings, latestEscrow] = await Promise.all([
    prisma.realEstateListing.count({ where: { userId: user.id } }),
    prisma.booking.count({ where: { userId: user.id } }),
    prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.escrowTransaction.findFirst({
      where: {
        OR: [{ buyerId: user.id }, { sellerId: user.id }],
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const activeEscrowStep = mapEscrowStep(latestEscrow?.status)
  const activeStepIndex = escrowLabels.findIndex((label) => label === activeEscrowStep)
  const kycStatus = user.kycVerification?.status ?? 'PENDING'

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Dashboard</p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="mt-2 text-slate-600">Your cross-portal activity and trust metrics in one premium command view.</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button variant="gold">
            Register New Asset
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="premium-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Listings</p>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-3xl font-black tracking-tight text-slate-900">{listingCount}</h3>
            <Building2 className="text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="premium-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Bookings</p>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-3xl font-black tracking-tight text-slate-900">{bookingCount}</h3>
            <CalendarCheck2 className="text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="premium-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">KYC Level</p>
          <div className="mt-3 flex items-center justify-between">
            <Badge variant={kycStatus === 'VERIFIED' ? 'emerald' : kycStatus === 'SUBMITTED' ? 'amber' : 'outline'}>
              {kycStatus}
            </Badge>
            <ShieldCheck className="text-[#D4AF37]" />
          </div>
        </Card>
        <Card className="premium-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Latest Escrow</p>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-black tracking-tight text-slate-900">
              {latestEscrow ? `$${latestEscrow.amount.toLocaleString()}` : '$0'}
            </h3>
            <CircleDollarSign className="text-[#D4AF37]" />
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="premium-card p-6 xl:col-span-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Escrow Status</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Progress flow: Deposit {'->'} Lock {'->'} Release</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {escrowLabels.map((step, index) => {
              const isActive = index <= activeStepIndex
              return (
                <div
                  key={step}
                  className={`rounded-2xl border p-4 transition ${
                    isActive ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 shadow-gold' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Step {index + 1}</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">{step}</p>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="premium-card p-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Recent Bookings</h2>
          <div className="mt-4 space-y-3">
            {recentBookings.length === 0 && (
              <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                No recent bookings yet.
              </p>
            )}
            {recentBookings.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">#{booking.id.slice(0, 8)}</p>
                  <Badge variant={booking.status === 'CONFIRMED' ? 'emerald' : booking.status === 'PENDING' ? 'amber' : 'outline'}>
                    {booking.status}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">${booking.totalPrice.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
