import React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps {
    src?: string
    name?: string
    tier?: 'DEALING' | 'REALTOR' | 'EXECUTIVE' | 'DIRECTOR' | 'LORD'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, name, tier, size = 'md', className }) => {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-xl',
        xl: 'w-24 h-24 text-3xl',
    }

    const initials = name
        ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'DW'

    return (
        <div className={cn(
            'relative rounded-2xl overflow-hidden bg-surface border-2 border-border flex items-center justify-center font-black transition-all duration-500 hover:scale-105 select-none',
            tier === 'LORD' && 'border-dwelzer-gold shadow-gold-glow bg-gradient-mesh',
            sizes[size],
            className
        )}>
            {src ? (
                <img src={src} alt={name} className="w-full h-full object-cover" />
            ) : (
                <span className={cn(
                    'text-dwelzer-navy',
                    tier === 'LORD' && 'text-dwelzer-gold'
                )}>
                    {initials}
                </span>
            )}

            {tier && (
                <div
                    className={cn(
                        'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                        tier === 'LORD' ? 'bg-dwelzer-gold' : 'bg-accent-blue'
                    )}
                    title={tier}
                />
            )}
        </div>
    )
}

export { Avatar }
