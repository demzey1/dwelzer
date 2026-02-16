import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
    className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'bg-surface-muted animate-shimmer rounded-xl relative overflow-hidden',
                className
            )}
        />
    )
}

export { Skeleton }
