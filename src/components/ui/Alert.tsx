import React from 'react'
import { cn } from '@/lib/utils'
import { Info, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

export interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'error' | 'premium'
    title?: string
    children: React.ReactNode
    className?: string
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, className }) => {
    const styles = {
        info: 'bg-accent-blue/5 border-accent-blue/10 text-accent-blue',
        success: 'bg-accent-emerald/5 border-accent-emerald/10 text-accent-emerald',
        warning: 'bg-accent-amber/5 border-accent-amber/10 text-accent-amber',
        error: 'bg-accent-rose/5 border-accent-rose/10 text-accent-rose',
        premium: 'bg-gradient-mesh border-dwelzer-gold/20 text-dwelzer-gold',
    }

    const icons = {
        info: Info,
        success: CheckCircle2,
        warning: AlertCircle,
        error: XCircle,
        premium: CheckCircle2,
    }

    const Icon = icons[variant]

    return (
        <div className={cn(
            'flex gap-4 p-6 rounded-[32px] border-2 transition-all duration-500',
            styles[variant],
            className
        )}>
            <div className="shrink-0 pt-1">
                <Icon size={24} />
            </div>
            <div className="space-y-1">
                {title && <h5 className="text-lg font-black tracking-tight">{title}</h5>}
                <div className={cn(
                    'text-sm font-medium leading-relaxed',
                    variant === 'premium' ? 'text-white/80' : 'text-current opacity-80'
                )}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { Alert }
