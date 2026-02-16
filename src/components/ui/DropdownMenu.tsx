'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface DropdownItem {
    id: string
    label: string
    icon?: React.ElementType
    onClick: () => void
    variant?: 'default' | 'danger'
}

export interface DropdownMenuProps {
    trigger: React.ReactNode
    items: DropdownItem[]
    className?: string
    align?: 'left' | 'right'
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items, className, align = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={cn('relative inline-block', className)} ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            <div className={cn(
                'absolute top-full mt-3 w-56 glass-dark border border-white/10 rounded-2xl shadow-2xl p-2 z-50 transition-all duration-300 origin-top',
                isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
                align === 'right' ? 'right-0' : 'left-0'
            )}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            item.onClick()
                            setIsOpen(false)
                        }}
                        className={cn(
                            'w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all',
                            item.variant === 'danger'
                                ? 'text-accent-rose hover:bg-accent-rose/10'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                        )}
                    >
                        {item.icon && <item.icon size={18} className={cn(item.variant !== 'danger' && 'text-dwelzer-gold')} />}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export { DropdownMenu }
