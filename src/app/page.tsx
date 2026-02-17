import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import LandingHero from '@/components/layout/LandingHero'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const dynamic = 'force-dynamic'

const sectionCards = [
  { title: 'Hotels Preview', body: 'Premium hospitality inventory with verified properties and instant booking controls.', href: '/hotels' },
  { title: 'Shortlets Preview', body: 'Flexible stays for executives with clean availability and transparent pricing.', href: '/shortlets' },
  { title: 'Real Estate Preview', body: 'Buy, rent, or list global assets with escrow-ready transaction paths.', href: '/real-estate' },
  { title: 'Marketplace Preview', body: 'Direct purchase and auction experiences in one curated commerce feed.', href: '/marketplace' },
  { title: 'Legal Portal Preview', body: 'Search lawyers and legal property intelligence by jurisdiction.', href: '/legal-search' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <LandingHero />

        <section className="container-app mx-auto py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Badge variant="gold" size="md">Portal Previews</Badge>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">Landing + Navigation Foundation</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                This phase establishes the premium command-center navigation and portal preview system.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sectionCards.map((card) => (
              <div key={card.title} className="premium-card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Preview</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
                <Link href={card.href} className="mt-6 inline-block">
                  <Button variant="gold" className="!rounded-xl">Open Portal</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
