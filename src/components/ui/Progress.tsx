import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps {
    value: number
    max?: number
    className?: string
    variant?: 'gold' | 'navy' | 'blue'
}

const Progress: React.FC<ProgressProps> = ({ value, max = 100, className, variant = 'gold' }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const barRef = useCallback(
        (el: HTMLDivElement | null) => {
            if (el) {
                el.style.setProperty('--progress-width', `${percentage}%`)
            }
        },
        [percentage]
    )

    const colors = {
        gold: 'bg-gradient-gold',
        navy: 'bg-dwelzer-navy',
        blue: 'bg-accent-blue',
    }

    return (
        <div className={cn('w-full h-3 bg-surface rounded-full overflow-hidden border border-border/50', className)}>
            <div
                ref={barRef}
                className={cn(
                    'h-full transition-all duration-1000 ease-premium rounded-full progress-bar-fill',
                    colors[variant]
                )}
            />
        </div>
    )
}

export { Progress }
