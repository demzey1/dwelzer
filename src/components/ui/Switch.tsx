import React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="peer sr-only"
                        ref={ref}
                        {...props}
                    />
                    <div className={cn(
                        'w-12 h-6 rounded-full bg-border transition-all duration-500',
                        'peer-checked:bg-dwelzer-gold',
                        'peer-focus:ring-4 peer-focus:ring-dwelzer-gold/10',
                        className
                    )}>
                        <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-500 peer-checked:translate-x-6 shadow-sm" />
                    </div>
                </div>
                {label && (
                    <span className="text-sm font-bold text-text-secondary group-hover:text-dwelzer-navy transition-colors">
                        {label}
                    </span>
                )}
            </label>
        )
    }
)

Switch.displayName = 'Switch'

export { Switch }
