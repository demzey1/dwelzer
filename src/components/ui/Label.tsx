import React from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean
}

const Label: React.FC<LabelProps> = ({ children, className, required, ...props }) => {
    return (
        <label
            className={cn('text-sm font-black text-dwelzer-navy uppercase tracking-widest flex items-center gap-1', className)}
            {...props}
        >
            {children}
            {required && <span className="text-accent-rose">*</span>}
        </label>
    )
}

export { Label }
