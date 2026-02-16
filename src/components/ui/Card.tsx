'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean
    variant?: 'default' | 'glass' | 'navy'
}

export function Card({ className, hover = true, variant = 'default', children, ...props }: CardProps) {
    const variants = {
        default: 'bg-white border-border shadow-card',
        glass: 'glass border-white/10',
        navy: 'bg-dwelzer-navy-light border-white/5 text-white',
    }

    return (
        <div
            className={cn(
                'rounded-2xl border p-6 transition-all duration-300',
                variants[variant],
                hover && 'hover:translate-y-[-4px] hover:shadow-card-hover hover:border-dwelzer-gold/30',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('mb-4', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('mt-6 pt-6 border-t border-border/50', className)} {...props} />
}
