import React from 'react'
import prisma from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LegalPortalView from '@/components/portals/LegalPortalView'
import { Badge } from '@/components/ui/Badge'
import { Scale } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function LegalSearchPage() {
    const entries = await prisma.legalEntry.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />

            <main className="flex-grow py-12">
                <section className="container-app mx-auto mb-8">
                    <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                        <div className="flex items-center gap-3">
                            <Badge variant="gold">Legal Portal</Badge>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                <Scale size={13} className="text-[#D4AF37]" />
                                Trust-Centered Search
                            </span>
                        </div>
                    </div>
                </section>
                <section className="container-app mx-auto">
                    <LegalPortalView entries={entries as any} />
                </section>
            </main>

            <Footer />
        </div>
    )
}
