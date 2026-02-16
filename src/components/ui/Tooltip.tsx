import React from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
    content: string
    children: React.ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className }) => {
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
        left: 'right-full top-1/2 -translate-y-1/2 mr-3',
        right: 'left-full top-1/2 -translate-y-1/2 ml-3',
    }

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-dwelzer-navy',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-dwelzer-navy',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-dwelzer-navy',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-dwelzer-navy',
    }

    return (
        <div className={cn('relative group inline-block', className)}>
            {children}
            <div className={cn(
                'absolute z-50 px-3 py-1.5 bg-dwelzer-navy text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap shadow-xl',
                positionClasses[position]
            )}>
                {content}
                <div className={cn(
                    'absolute border-[6px] border-transparent',
                    arrowClasses[position]
                )} />
            </div>
        </div>
    )
}

export { Tooltip }
