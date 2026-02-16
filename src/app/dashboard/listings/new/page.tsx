'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Building2, Globe, ShieldCheck, Info } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function NewListingPage() {
    const [images, setImages] = useState<string[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        toast.success('Asset registration initiated. Awaiting institutional verification.')
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-dwelzer-gold rounded-2xl flex items-center justify-center text-dwelzer-navy shadow-lg">
                    <Building2 size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-dwelzer-navy tracking-tight">Register New Asset</h1>
                    <p className="text-text-secondary text-sm font-medium">Global property and high-value asset registration.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <Card className="p-8 space-y-8 border-border">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">High-Fidelity Visual Documentation</label>
                        <ImageUpload onUpload={setImages} maxImages={10} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-dwelzer-navy">Asset Title</label>
                            <input
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 outline-none focus:border-dwelzer-gold transition-all"
                                placeholder="e.g. Penthouse Sovereign Tower"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-dwelzer-navy">Valuation (USD)</label>
                            <input
                                type="number"
                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 outline-none focus:border-dwelzer-gold transition-all"
                                placeholder="1,500,000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-dwelzer-navy">Technical Description</label>
                        <textarea
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 min-h-[150px] outline-none focus:border-dwelzer-gold transition-all"
                            placeholder="Detailed institutional specification of the asset..."
                        />
                    </div>
                </Card>

                <div className="p-6 bg-dwelzer-navy rounded-3xl flex items-start gap-4">
                    <ShieldCheck className="text-dwelzer-gold shrink-0 mt-1" size={20} />
                    <div>
                        <p className="text-white font-bold text-sm">Escrow-Ready Listing</p>
                        <p className="text-white/60 text-xs mt-1 leading-relaxed">
                            Every listing on DWELZER is automatically integrated with our multi-sig escrow system. All participants must be KYC-verified.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost" type="button">Discard</Button>
                    <Button variant="gold" className="px-12 font-black uppercase tracking-widest text-xs py-5">
                        Register Asset
                    </Button>
                </div>
            </form>
        </div>
    )
}
