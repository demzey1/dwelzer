import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
    label: string
    value: string
    description?: string
}

export interface RadioGroupProps {
    options: RadioOption[]
    value: string
    onChange: (value: string) => void
    name: string
    className?: string
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name, className }) => {
    return (
        <div className={cn('grid grid-cols-1 gap-4', className)}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={cn(
                        'flex items-start gap-4 p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-500 bg-white select-none',
                        value === option.value
                            ? 'border-dwelzer-gold shadow-lg shadow-dwelzer-gold/5 bg-dwelzer-gold/5'
                            : 'border-border hover:border-border-hover'
                    )}
                >
                    <div className="relative pt-1">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="peer sr-only"
                        />
                        <div className={cn(
                            'w-6 h-6 rounded-full border-2 border-border transition-all duration-300',
                            'peer-checked:border-dwelzer-gold',
                            'peer-focus:ring-4 peer-focus:ring-dwelzer-gold/10'
                        )}>
                            <div className={cn(
                                'absolute inset-0 m-auto w-3 h-3 rounded-full bg-dwelzer-gold transition-transform duration-300 scale-0',
                                value === option.value && 'scale-100'
                            )} />
                        </div>
                    </div>
                    <div>
                        <p className={cn(
                            'text-lg font-black tracking-tight leading-none mb-2 transition-colors',
                            value === option.value ? 'text-dwelzer-navy' : 'text-text-secondary'
                        )}>
                            {option.label}
                        </p>
                        {option.description && (
                            <p className="text-sm text-text-muted font-medium leading-relaxed italic">
                                {option.description}
                            </p>
                        )}
                    </div>
                </label>
            ))}
        </div>
    )
}

export { RadioGroup }
