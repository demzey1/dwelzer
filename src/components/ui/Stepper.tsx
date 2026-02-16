'use client'

import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface Step {
    label: string
    description?: string
}

export interface StepperProps {
    steps: Step[]
    currentStep: number // 1-indexed
    className?: string
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
    const progressRef = useCallback(
        (el: HTMLDivElement | null) => {
            if (el) {
                el.style.setProperty('--dynamic-width', `${((currentStep - 1) / (steps.length - 1)) * 100}%`)
            }
        },
        [currentStep, steps.length]
    )

    return (
        <div className={cn('w-full', className)}>
            <div className="relative flex justify-between items-start">
                {/* Connecting lines */}
                <div className="absolute top-6 left-0 w-full h-1 bg-surface -translate-y-1/2 z-0">
                    <div
                        ref={progressRef}
                        className="h-full bg-dwelzer-gold transition-all duration-1000 ease-premium dynamic-width"
                    />
                </div>

                {steps.map((step, index) => {
                    const stepNumber = index + 1
                    const isCompleted = currentStep > stepNumber
                    const isActive = currentStep === stepNumber

                    return (
                        <div key={index} className="relative z-10 flex flex-col items-center group">
                            <div className={cn(
                                'w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 border-4',
                                isCompleted && 'bg-dwelzer-gold border-dwelzer-gold text-dwelzer-navy',
                                isActive && 'bg-white border-dwelzer-gold text-dwelzer-navy shadow-gold-glow scale-110',
                                !isCompleted && !isActive && 'bg-surface border-border text-text-muted'
                            )}>
                                {isCompleted ? <Check size={20} strokeWidth={4} /> : stepNumber}
                            </div>
                            <div className="mt-4 text-center">
                                <p className={cn(
                                    'text-xs font-black uppercase tracking-widest transition-colors',
                                    isActive || isCompleted ? 'text-dwelzer-navy' : 'text-text-muted'
                                )}>
                                    {step.label}
                                </p>
                                {step.description && (
                                    <p className="hidden md:block text-[10px] text-text-muted font-medium italic mt-1 max-w-[120px]">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { Stepper }
