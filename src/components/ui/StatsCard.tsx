import React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from './Card'

export interface StatsCardProps {
    label: string
    value: string | number
    trend?: {
        value: string
        isUp: boolean
    }
    icon: React.ElementType
    className?: string
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, icon: Icon, className }) => {
    return (
        <Card className={cn('p-8 border-border hover:border-dwelzer-gold transition-all duration-500 group', className)}>
            <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center text-dwelzer-gold transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={cn(
                        'flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider',
                        trend.isUp ? 'bg-accent-emerald/10 text-accent-emerald' : 'bg-accent-rose/10 text-accent-rose'
                    )}>
                        {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {trend.value}
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs text-text-muted font-black uppercase tracking-widest mb-1">{label}</p>
                <h3 className="text-3xl font-black text-dwelzer-navy leading-none">{value}</h3>
            </div>
        </Card>
    )
}

export { StatsCard }
