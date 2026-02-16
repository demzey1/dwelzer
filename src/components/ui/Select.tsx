'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
    label: string
    value: string
}

export interface SelectProps {
    options: SelectOption[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
    className?: string
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, placeholder = 'Select an option', label, className }) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find(opt => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={cn('w-full space-y-2', className)} ref={selectRef}>
            {label && (
                <label className="text-sm font-black text-dwelzer-navy uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        'w-full flex items-center justify-between bg-white border-2 border-border rounded-2xl px-6 py-4 text-left transition-all duration-300',
                        'hover:border-border-hover focus:border-dwelzer-gold focus:ring-4 focus:ring-dwelzer-gold/10',
                        isOpen && 'border-dwelzer-gold ring-4 ring-dwelzer-gold/10'
                    )}
                >
                    <span className={cn(
                        'font-medium transition-colors',
                        selectedOption ? 'text-dwelzer-navy' : 'text-text-muted'
                    )}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className={cn(
                        'text-text-muted transition-transform duration-500',
                        isOpen && 'rotate-180 text-dwelzer-gold'
                    )} size={20} />
                </button>

                {isOpen && (
                    <div className="absolute top-full mt-3 w-full bg-white border-2 border-border rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-300 max-h-[300px] overflow-y-auto no-scrollbar">
                        {options.map((option) => {
                            const isSelected = option.value === value
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value)
                                        setIsOpen(false)
                                    }}
                                    className={cn(
                                        'w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all',
                                        isSelected
                                            ? 'bg-dwelzer-gold text-dwelzer-navy'
                                            : 'text-text-secondary hover:bg-surface hover:text-dwelzer-navy'
                                    )}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && <Check size={16} strokeWidth={4} />}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export { Select }
