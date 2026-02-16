import React from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { Button } from './Button'

export interface EmptyStateProps {
    icon: React.ElementType
    title: string
    description: string
    action?: {
        label: string
        onClick: () => void
    }
    className?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action, className }) => {
    return (
        <div className={cn(
            'flex flex-col items-center text-center py-20 px-8 border-2 border-dashed border-border rounded-[60px]',
            className
        )}>
            <div className="w-20 h-20 bg-surface rounded-[24px] flex items-center justify-center text-dwelzer-gold mb-8 animate-float">
                <Icon size={40} />
            </div>
            <h3 className="text-2xl font-black text-dwelzer-navy mb-3 tracking-tight">{title}</h3>
            <p className="text-text-muted font-medium mb-10 max-w-sm leading-relaxed">
                {description}
            </p>
            {action && (
                <Button
                    variant="gold"
                    size="lg"
                    onClick={action.onClick}
                    leftIcon={<Plus size={20} />}
                    className="shadow-xl"
                >
                    {action.label}
                </Button>
            )}
        </div>
    )
}

export { EmptyState }
