import React from 'react'
import { cn } from '@/lib/utils'

export interface DividerProps {
    label?: string
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({ label, className, orientation = 'horizontal' }) => {
    if (orientation === 'vertical') {
        return <div className={cn('w-px h-full bg-border/50', className)} />
    }

    return (
        <div className={cn('relative flex items-center w-full my-8', className)}>
            <div className="flex-grow h-px bg-border/50" />
            {label && (
                <span className="shrink-0 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted italic">
                    {label}
                </span>
            )}
            <div className="flex-grow h-px bg-border/50" />
        </div>
    )
}

export { Divider }
