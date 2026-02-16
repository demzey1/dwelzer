import React from 'react'
import { cn } from '@/lib/utils'
import { ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export interface EscrowStatusProps {
    status: 'PENDING' | 'IN_ESCROW' | 'RELEASED' | 'DISPUTED'
    amount?: string
    className?: string
}

const EscrowStatus: React.FC<EscrowStatusProps> = ({ status, amount, className }) => {
    const config = {
        PENDING: {
            label: 'Awaiting Escrow',
            icon: Clock,
            color: 'text-accent-amber',
            bg: 'bg-accent-amber/5',
            border: 'border-accent-amber/10',
        },
        IN_ESCROW: {
            label: 'Vault Secured',
            icon: ShieldCheck,
            color: 'text-accent-blue',
            bg: 'bg-accent-blue/5',
            border: 'border-accent-blue/10',
        },
        RELEASED: {
            label: 'Funds Released',
            icon: CheckCircle2,
            color: 'text-accent-emerald',
            bg: 'bg-accent-emerald/5',
            border: 'border-accent-emerald/10',
        },
        DISPUTED: {
            label: 'Dispute Active',
            icon: AlertCircle,
            color: 'text-accent-rose',
            bg: 'bg-accent-rose/5',
            border: 'border-accent-rose/10',
        },
    }

    const { label, icon: Icon, color, bg, border } = config[status]

    return (
        <div className={cn(
            'flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500',
            bg, border, className
        )}>
            <div className={cn('shrink-0', color)}>
                <Icon size={24} />
            </div>
            <div className="flex-grow">
                <p className={cn('text-[10px] font-black uppercase tracking-widest leading-none mb-1', color)}>
                    {label}
                </p>
                {amount && <p className="text-dwelzer-navy font-black text-lg leading-none">{amount}</p>}
            </div>
            {status === 'RELEASED' && (
                <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            )}
        </div>
    )
}

export { EscrowStatus }
