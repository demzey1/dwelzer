import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, ChevronRight, Filter } from 'lucide-react'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function MarketplaceBuyPage() {
    const items = await prisma.marketplaceItem.findMany({
        where: { status: 'ACTIVE', isAuction: false },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="container-app py-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                <div>
                    <Badge variant="gold" size="md" className="mb-4">Global Trading</Badge>
                    <h1 className="text-5xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Marketplace</h1>
                    <p className="text-text-secondary font-medium mt-4 max-w-2xl">
                        Direct acquisition of premium global assets. Institutional scale commerce with verified logistics.
                    </p>
                </div>
                <Button variant="outline" leftIcon={<Filter size={18} />}>Filter Collection</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item: any) => (
                    <Card key={item.id} className="group overflow-hidden border-border hover:border-dwelzer-gold/50 transition-all flex flex-col">
                        <div className="aspect-square relative overflow-hidden">
                            <img src={JSON.parse(item.images)[0]} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="p-6 space-y-4 flex-grow flex flex-col">
                            <div>
                                <Badge variant="outline" size="sm" className="mb-2">{item.category}</Badge>
                                <h3 className="text-xl font-bold text-dwelzer-navy group-hover:text-dwelzer-gold transition-colors">{item.title}</h3>
                            </div>
                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                                <span className="text-2xl font-black text-dwelzer-navy">${item.price.toLocaleString()}</span>
                                <Button variant="navy" size="sm" className="w-10 h-10 p-0 rounded-xl">
                                    <ShoppingBag size={18} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
