'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { 
    Building2, 
    ShoppingBag, 
    Eye, 
    Edit, 
    Trash2, 
    MapPin,
    Search,
    Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ListingsTabsProps {
    realEstate: any[]
    marketplace: any[]
}

export default function ListingsTabs({ realEstate, marketplace }: ListingsTabsProps) {
    const [activeTab, setActiveTab] = useState<'real-estate' | 'marketplace'>('real-estate')
    const [searchQuery, setSearchQuery] = useState('')

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price)
    }

    const filteredRealEstate = realEstate.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredMarketplace = marketplace.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Tabs & Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex p-1 bg-white/5 border border-border rounded-xl">
                    <button
                        onClick={() => setActiveTab('real-estate')}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === 'real-estate' 
                                ? "bg-dwelzer-gold text-dwelzer-navy shadow-lg" 
                                : "text-text-muted hover:text-white"
                        )}
                    >
                        <Building2 size={16} />
                        Real Estate
                        <Badge variant="outline" className="ml-2 bg-black/10 border-none text-current px-1.5 py-0 h-5">
                            {realEstate.length}
                        </Badge>
                    </button>
                    <button
                        onClick={() => setActiveTab('marketplace')}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                            activeTab === 'marketplace' 
                                ? "bg-dwelzer-gold text-dwelzer-navy shadow-lg" 
                                : "text-text-muted hover:text-white"
                        )}
                    >
                        <ShoppingBag size={16} />
                        Marketplace
                        <Badge variant="outline" className="ml-2 bg-black/10 border-none text-current px-1.5 py-0 h-5">
                            {marketplace.length}
                        </Badge>
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input 
                            type="text"
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-dwelzer-gold transition-colors"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            {/* Table Content */}
            <Card className="overflow-hidden border-border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface border-b border-border">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Asset Details</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Location / Category</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Price</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-center">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-center">Views</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {activeTab === 'real-estate' ? (
                                filteredRealEstate.length > 0 ? (
                                    filteredRealEstate.map((item) => (
                                        <tr key={item.id} className="hover:bg-surface transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-surface-muted overflow-hidden flex-shrink-0">
                                                        {item.images?.[0] && (
                                                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-dwelzer-navy line-clamp-1">{item.title}</p>
                                                        <p className="text-xs text-text-muted">{item.type}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                                                    <MapPin size={14} className="text-dwelzer-gold" />
                                                    {item.city}, {item.country}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-black text-dwelzer-navy">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={item.status === 'ACTIVE' ? 'emerald' : 'outline'}>
                                                    {item.status || 'Active'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-text-secondary">
                                                {item.views.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-dwelzer-navy">
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-dwelzer-gold">
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-red-500">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                                            No real estate listings found.
                                        </td>
                                    </tr>
                                )
                            ) : (
                                filteredMarketplace.length > 0 ? (
                                    filteredMarketplace.map((item) => (
                                        <tr key={item.id} className="hover:bg-surface transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-surface-muted overflow-hidden flex-shrink-0">
                                                        {item.images?.[0] && (
                                                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-dwelzer-navy line-clamp-1">{item.title}</p>
                                                        <p className="text-xs text-text-muted">{item.condition}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className="uppercase text-[10px]">
                                                    {item.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 font-black text-dwelzer-navy">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={item.isAuction ? 'amber' : 'emerald'}>
                                                    {item.isAuction ? 'Auction' : 'Sale'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-text-secondary">
                                                {item.views.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-dwelzer-navy">
                                                        <Eye size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-dwelzer-gold">
                                                        <Edit size={16} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-red-500">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                                            No marketplace items found.
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}