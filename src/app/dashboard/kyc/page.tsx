import React from 'react'
import prisma from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, FileCheck, Landmark, AlertCircle, Info, ArrowUpRight, Scale, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function KYCPage() {
    const verifications = await prisma.kYCVerification.findMany({
        orderBy: { createdAt: 'desc' }
    })


    const [isVerifying, setIsVerifying] = React.useState(false)

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-dwelzer-gold/10 rounded-full flex items-center justify-center text-dwelzer-gold mx-auto mb-6">
                    <ShieldCheck size={40} />
                </div>
                <h1 className="text-4xl font-black text-dwelzer-navy font-display">Institutional Verification</h1>
                <p className="text-text-secondary font-medium max-w-xl mx-auto">
                    Complete your Know Your Customer (KYC) verification via <span className="text-dwelzer-gold font-bold">Veriff</span> to unlock high-tier portals and unrestricted financial transactions.
                </p>
            </div>

            {/* Veriff Simulation Modal */}
            {isVerifying && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-dwelzer-navy/90 backdrop-blur-xl p-6">
                    <Card className="max-w-md w-full p-8 border-dwelzer-gold/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold animate-shimmer" />
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 rounded-full border-4 border-dwelzer-gold border-t-transparent animate-spin mx-auto flex items-center justify-center">
                                <ShieldCheck size={40} className="text-dwelzer-gold" />
                            </div>
                            <h2 className="text-2xl font-black text-dwelzer-navy tracking-tight">Veriff AI Analysis</h2>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                Our institutional AI is currently verifying your biometric data and government-issued documents across 12,000 global jurisdictions.
                            </p>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                    <div className="h-full bg-dwelzer-gold animate-progress-fast" />
                                </div>
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Cross-referencing Interpol Databases...</p>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setIsVerifying(false)}
                            >
                                Cancel Verification
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 text-center space-y-4 border-none shadow-premium bg-emerald-50">
                    <FileCheck className="mx-auto text-emerald-600" size={32} />
                    <h3 className="font-bold text-dwelzer-navy">Identity Profile</h3>
                    <Badge variant="emerald">Verified</Badge>
                </Card>
                <Card className="p-8 text-center space-y-4 border-none shadow-premium bg-emerald-50">
                    <Landmark className="mx-auto text-emerald-600" size={32} />
                    <h3 className="font-bold text-dwelzer-navy">Proof of Funds</h3>
                    <Badge variant="emerald">Verified</Badge>
                </Card>
                <Card className="p-8 text-center space-y-4 border-none shadow-premium bg-dwelzer-gold/5 border-dwelzer-gold/20">
                    <Scale className="mx-auto text-dwelzer-gold" size={32} />
                    <h3 className="font-bold text-dwelzer-navy">Global Compliance</h3>
                    <Badge variant="amber">Reviewing</Badge>
                </Card>
            </div>

            <Card className="p-10 border-border shadow-sm bg-white overflow-hidden relative">
                <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                    <div className="space-y-6 flex-grow">
                        <h2 className="text-2xl font-black text-dwelzer-navy font-display">Verification Progress</h2>
                        <div className="space-y-8">
                            {[
                                { label: 'Basic Profile & Identity', desc: 'Government-issued ID or Passport.', status: 'COMPLETED' },
                                { label: 'Biometric Recognition', desc: '3D facial scanning for anti-spoofing.', status: 'COMPLETED' },
                                { label: 'Address & Domicile', desc: 'Utility bill or bank statement (Institutional).', status: 'IN_REVIEW' },
                                { label: 'Source of Wealth', desc: 'Financial records for large-scale auctions.', status: 'PENDING' },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold",
                                            step.status === 'COMPLETED' ? "bg-emerald-500" :
                                                step.status === 'IN_REVIEW' ? "bg-amber-500" : "bg-border text-text-muted"
                                        )}>
                                            {step.status === 'COMPLETED' ? <CheckCircle2 size={16} /> : i + 1}
                                        </div>
                                        {i !== 3 && <div className="w-0.5 h-full bg-border mt-2" />}
                                    </div>
                                    <div className="pb-8">
                                        <h4 className="font-black text-dwelzer-navy mb-1 uppercase tracking-tight text-sm">{step.label}</h4>
                                        <p className="text-xs text-text-muted font-medium mb-2">{step.desc}</p>
                                        <Badge variant={
                                            step.status === 'COMPLETED' ? 'emerald' :
                                                step.status === 'IN_REVIEW' ? 'amber' : 'outline'
                                        } size="sm">
                                            {step.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-80 space-y-6">
                        <div className="p-6 rounded-3xl bg-surface border border-border">
                            <div className="flex items-center gap-2 mb-4 text-emerald-600">
                                <ShieldCheck size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">DWELZER TRUST SCORE: 850</span>
                            </div>
                            <p className="text-[10px] text-text-muted font-bold uppercase tracking-wide leading-relaxed">
                                Your high trust score qualifies you for Executive & Lord level auctions. Complete final steps to unlock.
                            </p>
                        </div>
                        <Button
                            variant="gold"
                            className="w-full py-4 font-black"
                            onClick={() => setIsVerifying(true)}
                        >
                            Initialize Veriff
                        </Button>
                        <div className="flex items-start gap-3 p-4 bg-dwelzer-navy rounded-2xl text-white">
                            <Info size={16} className="text-dwelzer-gold mt-0.5" />
                            <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed text-white/60">
                                Data is encrypted with AES-256 and stored in compliant institutional nodes.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}


import { cn } from '@/lib/utils'
