'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
    id: string
    title: string
    content: React.ReactNode
}

export interface AccordionProps {
    items: AccordionItem[]
    className?: string
    allowMultiple?: boolean
}

const Accordion: React.FC<AccordionProps> = ({ items, className, allowMultiple = false }) => {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggle = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
        } else {
            setOpenItems(prev => prev.includes(id) ? [] : [id])
        }
    }

    return (
        <div className={cn('space-y-3', className)}>
            {items.map((item) => {
                const isOpen = openItems.includes(item.id)
                return (
                    <div
                        key={item.id}
                        className={cn(
                            'border-2 border-border rounded-2xl overflow-hidden transition-all duration-500 bg-white',
                            isOpen && 'border-dwelzer-gold shadow-lg shadow-dwelzer-gold/5'
                        )}
                    >
                        <button
                            onClick={() => toggle(item.id)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-surface/50 transition-colors"
                        >
                            <span className={cn(
                                'text-lg font-black tracking-tight transition-colors',
                                isOpen ? 'text-dwelzer-navy' : 'text-text-secondary'
                            )}>
                                {item.title}
                            </span>
                            <ChevronDown
                                className={cn(
                                    'text-dwelzer-gold transition-transform duration-500',
                                    isOpen && 'rotate-180'
                                )}
                                size={20}
                            />
                        </button>
                        <div
                            className={cn(
                                'grid transition-all duration-500 ease-premium overflow-hidden',
                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="p-6 pt-0 text-text-secondary leading-relaxed font-medium">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export { Accordion }
