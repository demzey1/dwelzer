'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { PanelLeft } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-dwelzer-navy">
        <div className="w-16 h-16 border-4 border-dwelzer-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/dashboard')
    return null
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface">
      <Navbar />
      <div className="flex w-full pt-[84px]"> {/* pt value should match navbar height */}
        <div className="hidden lg:block w-[260px] fixed top-[84px] left-0 h-[calc(100vh-84px)] border-r border-white/10">
            <Sidebar />
        </div>
        <div className="flex flex-col flex-1 lg:pl-[260px]">
          <header className="sticky top-[84px] z-30 flex h-14 items-center gap-4 border-b bg-surface px-4 sm:px-6 lg:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="lg:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-dwelzer-navy border-r-0 p-0">
                <Sidebar onLinkClick={() => setSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="font-bold text-lg">Dashboard</h1>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}