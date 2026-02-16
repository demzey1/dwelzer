import React from 'react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

export interface PriceTagProps {
    price: number
    currency?: string
    period?: string
    variant?: 'gold' | 'navy' | 'glass'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const PriceTag: React.FC<PriceTagProps> = ({ price, currency = 'USD', period, variant = 'gold', size = 'md', className }) => {
    const variants = {
        gold: 'bg-dwelzer-gold text-dwelzer-navy',
        navy: 'bg-dwelzer-navy text-white',
        glass: 'glass text-dwelzer-navy',
    }

    const sizes = {
        sm: 'px-3 py-1 text-sm rounded-lg',
        md: 'px-5 py-2 text-xl rounded-2xl',
        lg: 'px-8 py-3 text-3xl rounded-[24px]',
    }

    return (
        <div className={cn(
            'inline-flex items-end gap-1 font-black transition-all duration-500 shadow-xl',
            variants[variant],
            sizes[size],
            className
        )}>
            <span>{formatPrice(price, currency)}</span>
            {period && (
                <span className={cn(
                    'text-[10px] uppercase tracking-widest mb-1 opacity-60',
                    size === 'lg' && 'text-sm'
                )}>
                    / {period}
                </span>
            )}
        </div>
    )
}

export { PriceTag }
