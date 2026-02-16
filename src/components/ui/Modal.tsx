'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md', className }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    if (!isOpen) return null

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-[95vw]',
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dwelzer-navy/80 backdrop-blur-md animate-in fade-in duration-500"
                onClick={onClose}
            />

            {/* Content */}
            <div className={cn(
                'relative w-full bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-500',
                sizes[size],
                className
            )}>
                <div className="flex items-center justify-between p-8 border-b border-border/50">
                    <h3 className="text-2xl font-black text-dwelzer-navy tracking-tight">{title}</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-dwelzer-gold hover:border-dwelzer-gold transition-all duration-300"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Modal }
