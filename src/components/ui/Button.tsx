'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'gold' | 'navy' | 'outline' | 'ghost' | 'glass'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'navy', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        const variants = {
            gold: 'btn-gold',
            navy: 'btn-navy',
            outline: 'border-2 border-dwelzer-navy text-dwelzer-navy hover:bg-dwelzer-navy hover:text-white',
            ghost: 'bg-transparent text-dwelzer-navy hover:bg-dwelzer-navy/5',
            glass: 'glass text-dwelzer-navy hover:bg-white/40',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
            icon: 'p-2',
        }

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] outline-none select-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }
