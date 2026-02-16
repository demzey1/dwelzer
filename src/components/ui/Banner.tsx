import React from 'react'
import { cn } from '@/lib/utils'
import { Megaphone, X } from 'lucide-react'

export interface BannerProps {
    children: React.ReactNode
    variant?: 'gold' | 'navy' | 'mesh'
    onClose?: () => void
    className?: string
}

const Banner: React.FC<BannerProps> = ({ children, variant = 'gold', onClose, className }) => {
    const variants = {
        gold: 'bg-dwelzer-gold text-dwelzer-navy animate-gold-pulse',
        navy: 'bg-dwelzer-navy text-white',
        mesh: 'bg-gradient-mesh text-white',
    }

    return (
        <div className={cn(
            'w-full py-3 px-6 flex items-center justify-between text-sm font-black tracking-tight z-40',
            variants[variant],
            className
        )}>
            <div className="flex-grow flex items-center justify-center gap-3">
                <Megaphone size={18} />
                <div className="max-w-4xl">{children}</div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Close notification"
                    className="shrink-0 ml-4 hover:opacity-60 transition-opacity"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    )
}

export { Banner }
