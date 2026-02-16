import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'gold' | 'blue' | 'purple' | 'amber' | 'emerald' | 'red' | 'outline'
    size?: 'sm' | 'md'
}

export function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
    const variants = {
        default: 'bg-surface-muted text-text-secondary',
        gold: 'bg-dwelzer-gold/10 text-dwelzer-gold border-dwelzer-gold/20',
        blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
        purple: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
        amber: 'bg-accent-amber/10 text-accent-amber border-accent-amber/20',
        emerald: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20',
        red: 'bg-accent-red/10 text-accent-red border-accent-red/20',
        outline: 'bg-transparent border-border text-text-muted',
    }

    const sizes = {
        sm: 'px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider',
        md: 'px-3 py-1 text-xs font-bold uppercase tracking-wider',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border transition-colors',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
}
