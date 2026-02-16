'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface DrawerProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    side?: 'left' | 'right'
    className?: string
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, side = 'right', className }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const sides = {
        left: 'left-0 h-full w-[400px] rounded-r-[48px] animate-in slide-in-from-left duration-700',
        right: 'right-0 h-full w-[400px] rounded-l-[48px] animate-in slide-in-from-right duration-700',
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dwelzer-navy/80 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Content */}
            <div className={cn(
                'absolute bg-white shadow-2xl flex flex-col',
                sides[side],
                className
            )}>
                <div className="flex items-center justify-between p-8 border-b border-border/50">
                    <h3 className="text-2xl font-black text-dwelzer-navy tracking-tight">{title}</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close drawer"
                        className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-dwelzer-gold hover:border-dwelzer-gold transition-all duration-300"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Drawer }
