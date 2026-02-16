import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, type, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-black text-dwelzer-navy uppercase tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-dwelzer-gold transition-colors">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            'w-full bg-white border-2 border-border rounded-2xl px-4 py-4 text-dwelzer-navy font-medium placeholder:text-text-muted/50 outline-none transition-all duration-300',
                            'hover:border-border-hover focus:border-dwelzer-gold focus:ring-4 focus:ring-dwelzer-gold/10',
                            leftIcon && 'pl-12',
                            error && 'border-accent-rose focus:border-accent-rose focus:ring-accent-rose/10',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs font-bold text-accent-rose ml-1">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'

export { Input }
