import React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    suffix?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, label, suffix, min = 0, max = 100, ...props }, ref) => {
        return (
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    {label && (
                        <label className="text-sm font-black text-dwelzer-navy uppercase tracking-widest ml-1">
                            {label}
                        </label>
                    )}
                    {suffix && <span className="text-sm font-black text-dwelzer-gold italic">{suffix}</span>}
                </div>
                <div className="relative flex items-center group">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        className={cn(
                            'w-full h-2 bg-surface rounded-full appearance-none cursor-pointer border border-border/50 outline-none',
                            'accent-dwelzer-gold',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
            </div>
        )
    }
)

Slider.displayName = 'Slider'

export { Slider }
