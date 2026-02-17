import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import NextAuthProvider from '@/components/providers/NextAuthProvider'
import RouteTransition from '@/components/providers/RouteTransition'
import { Toaster } from 'react-hot-toast'
import { FloatingAction } from '@/components/ui/FloatingAction'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'DWELZER | Global Property & Commerce Ecosystem',
  description: 'Premium global real estate, hotels, shortlets, marketplace, and legal search ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-surface text-text-primary antialiased">
        <NextAuthProvider>
          <RouteTransition>{children}</RouteTransition>
          <FloatingAction />
          <Toaster position="bottom-right" />
        </NextAuthProvider>
      </body>
    </html>
  )
}
