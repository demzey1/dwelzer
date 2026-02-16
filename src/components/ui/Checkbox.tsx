import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
                        'w-6 h-6 rounded-lg border-2 border-border bg-white transition-all duration-300',
                        'peer-checked:bg-dwelzer-gold peer-checked:border-dwelzer-gold',
                        'peer-focus:ring-4 peer-focus:ring-dwelzer-gold/10',
                        'group-hover:border-dwelzer-gold/50',
                        className
                    )}>
                        <Check
                            className="absolute inset-0 m-auto text-dwelzer-navy opacity-0 peer-checked:opacity-100 transition-opacity"
                            size={16}
                            strokeWidth={4}
                        />
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

Checkbox.displayName = 'Checkbox'

export { Checkbox }
