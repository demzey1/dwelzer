import React from 'react'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

export interface RatingProps {
    value: number
    max?: number
    onChange?: (value: number) => void
    readonly?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const Rating: React.FC<RatingProps> = ({ value, max = 5, onChange, readonly = false, size = 'md', className }) => {
    const stars = Array.from({ length: max }, (_, i) => i + 1)

    const sizes = {
        sm: 16,
        md: 20,
        lg: 28,
    }

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {stars.map((star) => {
                const isSelected = star <= value
                return (
                    <button
                        key={star}
                        type="button"
                        disabled={readonly}
                        onClick={() => onChange?.(star)}
                        aria-label={`Rate ${star} stars`}
                        className={cn(
                            'transition-all duration-300',
                            !readonly && 'hover:scale-125 cursor-pointer',
                            isSelected ? 'text-dwelzer-gold' : 'text-border'
                        )}
                    >
                        <Star
                            size={sizes[size]}
                            fill={isSelected ? 'currentColor' : 'none'}
                            strokeWidth={isSelected ? 0 : 2}
                        />
                    </button>
                )
            })}
        </div>
    )
}

export { Rating }
