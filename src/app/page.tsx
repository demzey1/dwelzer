import Navbar from '@/components/layout/Navbar'
import LandingHero from '@/components/layout/LandingHero'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PORTALS } from '@/types'
import { Building2, Hotel, ShoppingBag, Scale, ArrowRight, CheckCircle2, Star, ShieldCheck, TrendingUp } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Hotel,
  Home,
  ShoppingBag,
  Scale,
  TrendingUp,
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <LandingHero />

        {/* Portals Showcase */}
        <section className="py-24 bg-surface">
          <div className="container-app mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-dwelzer-navy">
              Institutional <span className="text-dwelzer-gold underline decoration-dwelzer-gold/30 underline-offset-8">Portals</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
              The DWELZER ecosystem integrates five specialized asset terminals into one sovereign environment, secured by multi-jurisdictional legal logic and institutional-grade escrow.
            </p>
          </div>

          <div className="container-app mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTALS.map((portal) => {
              const Icon = ICON_MAP[portal.icon]
              return (
                <Card key={portal.id} className="group h-full flex flex-col pt-10">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110 portal-icon-${portal.id}`}
                  >
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-display text-dwelzer-navy">{portal.name}</h3>
                  <p className="text-text-secondary mb-8 flex-grow leading-relaxed">
                    Access the {portal.name} terminal for verified sovereign listings, real-time capital analytics, and institutional transaction management tailored for global wealth.
                  </p>
                  <Button variant="navy" className="w-full group-hover:btn-gold transition-all">
                    Enter Terminal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Features / Why Dwelzer */}
        <section className="py-24 bg-dwelzer-navy text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-dwelzer-gold/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container-app mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-dwelzer-gold/30 rounded-tl-[60px]" />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Property"
                className="rounded-[40px] shadow-2xl relative z-10 border border-white/10"
              />
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl z-20 animate-float border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-dwelzer-navy font-bold text-lg">Escrow Confirmed</p>
                    <p className="text-dwelzer-navy/60 text-xs">$8,200,000 RELEASED</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} className="fill-dwelzer-gold text-dwelzer-gold" />)}
                  <span className="ml-2 text-dwelzer-navy/80 font-bold text-sm">4.9/5 Trust Score</span>
                </div>
              </div>
            </div>

            <div>
              <Badge variant="gold" size="md" className="mb-6">Institutional Grade</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Built for <span className="text-gradient-gold">Maximum Trust</span> and Performance.
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Verified Global Inventory', desc: 'All listings across real estate and hotels undergo a rigorous verification process before appearing on Dwelzer.', icon: CheckCircle2 },
                  { title: 'Tiered Access Economy', desc: 'Our unique 5-tier system ensures specialized tools and lower fees for high-volume users and companies.', icon: TrendingUp },
                  { title: 'Unified Legal Search', desc: 'Instantly search property laws and legal cases across multiple jurisdictions directly within your dashboard.', icon: Scale },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-dwelzer-gold">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-display">{feature.title}</h4>
                      <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-surface relative">
          <div className="container-app mx-auto">
            <div className="bg-dwelzer-navy rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-gradient opacity-50" />
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 max-w-3xl">
                  Establish Your <br /> <span className="text-gradient-gold">Global Sovereignty</span>
                </h2>
                <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                  Secure your seat in the world's most elite property network. Initialize your terminal, select your tier, and command premium assets with institutional backing.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button variant="gold" size="lg" className="px-10 py-5 text-xl font-black">
                    Initialize Access
                  </Button>
                  <Button variant="outline" size="lg" className="px-10 py-5 text-xl font-black text-white border-white hover:bg-white/10">
                    Institutional Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
