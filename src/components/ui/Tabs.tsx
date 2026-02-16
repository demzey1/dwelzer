'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export interface Tab {
    id: string
    label: string
    content: React.ReactNode
}

export interface TabsProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
    variant?: 'navy' | 'gold' | 'glass'
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className, variant = 'navy' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    return (
        <div className={cn('w-full', className)}>
            <div className="flex gap-2 p-1.5 bg-surface rounded-[24px] border border-border w-fit mb-8">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'px-6 py-2.5 rounded-[18px] text-sm font-black transition-all duration-500 select-none tracking-tight',
                                isActive
                                    ? variant === 'gold'
                                        ? 'bg-dwelzer-gold text-dwelzer-navy shadow-lg shadow-dwelzer-gold/20'
                                        : 'bg-dwelzer-navy text-white shadow-lg shadow-dwelzer-navy/20'
                                    : 'text-text-muted hover:text-dwelzer-navy hover:bg-white/5'
                            )}
                        >
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {tabs.find(t => t.id === activeTab)?.content}
            </div>
        </div>
    )
}

export { Tabs }
