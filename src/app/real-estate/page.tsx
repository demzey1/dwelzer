import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RealEstateSplitView from '@/components/portals/RealEstateSplitView'
import { Badge } from '@/components/ui/Badge'
import { MapPinned } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function RealEstatePage() {
    const listings = await prisma.realEstateListing.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12">
                <div className="mb-10">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <Badge variant="gold" size="md">Real Estate Portal</Badge>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{listings.length} Listings</span>
                        </div>
                        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                            Split-Screen Property Intelligence
                        </h1>
                        <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
                            <MapPinned size={16} className="text-[#D4AF37]" />
                            Scroll listings on the left, keep map context sticky on the right.
                        </p>
                    </div>
                </div>
                <RealEstateSplitView listings={listings as any} />
            </main>

            <Footer />
        </div>
    )
}
