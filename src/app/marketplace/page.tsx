import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MarketplaceMasonry from '@/components/portals/MarketplaceMasonry'
import { Badge } from '@/components/ui/Badge'
import { Gavel } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function MarketplacePage() {
    const items = await prisma.marketplaceItem.findMany({
        include: {
            auction: {
                select: {
                    endTime: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow container-app mx-auto py-12">
                <div className="mb-10">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <Badge variant="amber" size="md">Marketplace Portal</Badge>
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{items.length} Assets</span>
                        </div>
                        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                            Masonry Commerce + Auction Velocity
                        </h1>
                        <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-600">
                            <Gavel size={16} className="text-[#D4AF37]" />
                            Auction lots display live countdown overlays.
                        </p>
                    </div>
                </div>

                <MarketplaceMasonry
                    items={items.map((item: any) => ({
                        ...item,
                        auctionEndTime: item.auction?.endTime ? new Date(item.auction.endTime).toISOString() : null,
                    }))}
                />
            </main>

            <Footer />
        </div>
    )
}
