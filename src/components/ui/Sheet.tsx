'use client'

import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheetContext() {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error('Sheet components must be used within <Sheet>.')
  }
  return context
}

type SheetProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Sheet({ open, onOpenChange, children }: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = typeof open === 'boolean'
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  return (
    <SheetContext.Provider value={{ open: currentOpen, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

type SheetTriggerProps = {
  asChild?: boolean
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>
}

function SheetTrigger({ asChild = false, children }: SheetTriggerProps) {
  const { setOpen } = useSheetContext()

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (event: React.MouseEvent) => {
        children.props.onClick?.(event)
        setOpen(true)
      },
    })
  }

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

type SheetContentProps = {
  side?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

function SheetContent({ side = 'right', className, children }: SheetContentProps) {
  const { open, setOpen } = useSheetContext()

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) {
    return null
  }

  const sideClass =
    side === 'left'
      ? 'left-0 h-full w-[280px] border-r'
      : 'right-0 h-full w-[280px] border-l'

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute top-0 bg-dwelzer-navy p-0 text-white shadow-xl',
          sideClass,
          className
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1 text-white/70 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}

export { Sheet, SheetContent, SheetTrigger }
