import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-black text-dwelzer-navy uppercase tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        'w-full bg-white border-2 border-border rounded-2xl px-4 py-4 text-dwelzer-navy font-medium placeholder:text-text-muted/50 outline-none transition-all duration-300 min-h-[120px] resize-none',
                        'hover:border-border-hover focus:border-dwelzer-gold focus:ring-4 focus:ring-dwelzer-gold/10',
                        error && 'border-accent-rose focus:border-accent-rose focus:ring-accent-rose/10',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="text-xs font-bold text-accent-rose ml-1">{error}</p>}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export { Textarea }
