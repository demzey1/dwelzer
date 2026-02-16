import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
    label: string
    href: string
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
    return (
        <nav className={cn('flex items-center gap-2 text-sm font-bold', className)} aria-label="Breadcrumb">
            <Link
                href="/"
                className="text-text-muted hover:text-dwelzer-gold transition-colors flex items-center"
            >
                <Home size={14} />
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1
                return (
                    <React.Fragment key={item.href}>
                        <ChevronRight size={14} className="text-text-muted/30" />
                        {isLast ? (
                            <span className="text-dwelzer-navy font-black truncate max-w-[200px]">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-text-muted hover:text-dwelzer-navy transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}

export { Breadcrumbs }
