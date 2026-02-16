import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    // Simplified page logic: show first, last, current, and neighboring pages
    const visiblePages = pages.filter(p =>
        p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
    )

    return (
        <div className={cn('flex items-center gap-2 select-none', className)}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-12 h-12 rounded-2xl border-2 border-border flex items-center justify-center text-dwelzer-navy hover:border-dwelzer-gold disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                aria-label="Previous page"
            >
                <ChevronLeft size={20} />
            </button>

            {visiblePages.map((page, index) => {
                const prev = visiblePages[index - 1]
                const showEllipsis = prev && page - prev > 1

                return (
                    <React.Fragment key={page}>
                        {showEllipsis && (
                            <div className="w-12 h-12 flex items-center justify-center text-text-muted">
                                <MoreHorizontal size={16} />
                            </div>
                        )}
                        <button
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'w-12 h-12 rounded-2xl border-2 font-black transition-all duration-300',
                                currentPage === page
                                    ? 'bg-dwelzer-navy border-dwelzer-navy text-white shadow-lg'
                                    : 'border-border text-text-secondary hover:border-dwelzer-gold hover:text-dwelzer-navy'
                            )}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                )
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="w-12 h-12 rounded-2xl border-2 border-border flex items-center justify-center text-dwelzer-navy hover:border-dwelzer-gold disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                aria-label="Next page"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}

export { Pagination }
