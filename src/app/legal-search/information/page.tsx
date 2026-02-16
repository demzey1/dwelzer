import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FileText, Globe, Scale, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function LegalSearchInfoPage() {
    const topics = [
        { title: 'EU Data Sovereignty', desc: 'Regulatory standards for digital asset ownership in Europe.' },
        { title: 'High-Net-Worth Residency', desc: 'Golden visa and citizenship requirements via property investment.' },
        { title: 'Escrow Compliance', desc: 'Legal frameworks governing institutional multi-signature accounts.' },
    ]

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-surface">
            <Navbar />
            <main className="flex-grow container-app mx-auto py-12">
                <div className="mb-16">
                    <Badge variant="gold" className="mb-4">Knowledge Base</Badge>
                    <h1 className="text-5xl font-black text-dwelzer-navy font-display uppercase tracking-tight">Legal Information</h1>
                    <p className="text-text-secondary font-medium mt-4 max-w-2xl">
                        Comprehensive institutional repository of global property laws and transactional regulations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topics.map((topic, i) => (
                        <Card key={i} className="p-8 border-border bg-white shadow-sm hover:shadow-premium transition-all">
                            <div className="w-12 h-12 bg-surface text-dwelzer-navy rounded-xl flex items-center justify-center mb-6">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-dwelzer-navy mb-4">{topic.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">{topic.desc}</p>
                            <button className="text-dwelzer-gold font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                                Download Whitepaper <Globe size={14} />
                            </button>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
