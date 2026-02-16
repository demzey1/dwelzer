import React from 'react'
import { cn } from '@/lib/utils'

export interface Column<T> {
    header: string
    accessor: keyof T | ((item: T) => React.ReactNode)
    className?: string
}

export interface TableProps<T> {
    columns: Column<T>[]
    data: T[]
    className?: string
    onRowClick?: (item: T) => void
}

function Table<T>({ columns, data, className, onRowClick }: TableProps<T>) {
    return (
        <div className={cn('w-full overflow-hidden rounded-[32px] border border-border bg-white', className)}>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface/50 border-b border-border">
                            {columns.map((column, i) => (
                                <th
                                    key={i}
                                    className={cn(
                                        'px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted',
                                        column.className
                                    )}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {data.length > 0 ? (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(
                                        'group transition-colors',
                                        onRowClick && 'cursor-pointer hover:bg-surface/50'
                                    )}
                                >
                                    {columns.map((column, colIndex) => {
                                        const content = typeof column.accessor === 'function'
                                            ? column.accessor(item)
                                            : (item[column.accessor] as React.ReactNode)

                                        return (
                                            <td
                                                key={colIndex}
                                                className={cn(
                                                    'px-8 py-5 text-sm font-bold text-text-secondary group-hover:text-dwelzer-navy transition-colors',
                                                    column.className
                                                )}
                                            >
                                                {content}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-8 py-20 text-center text-text-muted font-medium italic">
                                    No records found in this view.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { Table }
