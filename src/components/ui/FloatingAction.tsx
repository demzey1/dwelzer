'use client'

import React, { useState } from 'react'
import { Plus, MessageSquare, ShieldCheck, Building2, ShoppingBag, Scale, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

export const FloatingAction = () => {
    const [isOpen, setIsOpen] = useState(false)

    const actions = [
        { label: 'Register Asset', icon: Building2, color: 'bg-blue-500', href: '/dashboard/listings/new' },
        { label: 'List Item', icon: ShoppingBag, color: 'bg-emerald-500', href: '/dashboard/marketplace/new' },
        { label: 'Legal Inquiry', icon: Scale, color: 'bg-red-500', href: '/legal-search' },
        { label: 'Support Terminal', icon: ShieldCheck, color: 'bg-dwelzer-gold', href: '/dashboard/messages' },
    ]

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            {/* Action Menu */}
            {isOpen && (
                <div className="flex flex-col items-end gap-3 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {actions.map((action, i) => (
                        <div key={i} className="flex items-center gap-3 group cursor-pointer" onClick={() => (window.location.href = action.href)}>
                            <span className="bg-dwelzer-navy text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                {action.label}
                            </span>
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:scale-110",
                                action.color
                            )}>
                                <action.icon size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-[24px] flex items-center justify-center shadow-premium transition-all duration-500",
                    isOpen
                        ? "bg-dwelzer-navy text-dwelzer-gold rotate-90 border border-dwelzer-gold/30"
                        : "bg-gradient-gold text-dwelzer-navy hover:scale-110 hover:shadow-gold-glow"
                )}
                aria-label="Institutional Actions"
                title="Institutional Actions"
            >
                {isOpen ? <X size={32} /> : <Plus size={32} />}
            </button>
        </div>
    )
}
