import React from 'react'
import { cn } from '@/lib/utils'
import { Check, Shield, Star, Crown, Zap, Building2 } from 'lucide-react'

export interface TierOption {
    id: string
    name: string
    description: string
    benefits: string[]
    price?: string
    color: string
}

export interface TierSelectorProps {
    options: TierOption[]
    value: string
    onChange: (id: string) => void
    className?: string
}

const TierSelector: React.FC<TierSelectorProps> = ({ options, value, onChange, className }) => {
    return (
        <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
            {options.map((option) => {
                const isActive = value === option.id
                return (
                    <div
                        key={option.id}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            'relative p-8 rounded-[48px] border-2 cursor-pointer transition-all duration-700 bg-white flex flex-col h-full',
                            isActive
                                ? 'border-dwelzer-gold shadow-2xl shadow-dwelzer-gold/10 scale-[1.02] z-10'
                                : 'border-border hover:border-border-hover'
                        )}
                    >
                        {isActive && (
                            <div className="absolute top-6 right-6 w-8 h-8 bg-dwelzer-gold rounded-full flex items-center justify-center text-dwelzer-navy animate-in zoom-in-50 duration-500">
                                <Check size={16} strokeWidth={4} />
                            </div>
                        )}

                        <div className="mb-8">
                            <h4 className={cn(
                                'text-2xl font-black tracking-tighter mb-2',
                                isActive ? 'text-dwelzer-navy' : 'text-text-secondary'
                            )}>
                                {option.name}
                            </h4>
                            <p className="text-sm font-medium text-text-muted leading-relaxed italic">
                                {option.description}
                            </p>
                        </div>

                        {option.price && (
                            <div className="mb-8">
                                <span className="text-4xl font-black text-dwelzer-navy">{option.price}</span>
                                <span className="text-sm text-text-muted font-bold ml-2 italic">/ year</span>
                            </div>
                        )}

                        <ul className="space-y-4 mb-10 flex-grow">
                            {option.benefits.map((benefit, i) => (
                                <li key={i} className="flex gap-3 text-sm font-bold text-text-secondary">
                                    <div className="shrink-0 pt-1">
                                        <Check size={14} className="text-dwelzer-gold" strokeWidth={3} />
                                    </div>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={cn(
                            'w-full py-4 rounded-[20px] font-black transition-all duration-500',
                            isActive
                                ? 'bg-dwelzer-navy text-white shadow-xl'
                                : 'bg-surface text-text-muted hover:bg-dwelzer-gold hover:text-dwelzer-navy'
                        )}>
                            {isActive ? 'Current Selection' : 'Select Tier'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export { TierSelector }
