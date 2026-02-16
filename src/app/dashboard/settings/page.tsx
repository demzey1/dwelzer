'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
    User,
    Mail,
    MapPin,
    Bell,
    Shield,
    CreditCard,
    Smartphone,
    Globe,
    ChevronRight,
    ShieldCheck,
    Eye,
    EyeOff
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
    const [showApiKey, setShowApiKey] = useState(false)

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-black text-dwelzer-navy font-display uppercase tracking-tight">System Settings</h1>
                <p className="text-text-secondary font-medium">Manage your institutional profile and security configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 border-r border-border pr-8 space-y-2">
                    {[
                        { id: 'profile', name: 'Profile', icon: User },
                        { id: 'security', name: 'Security', icon: Shield },
                        { id: 'billing', name: 'Billing', icon: CreditCard },
                        { id: 'notif', name: 'Notifications', icon: Bell },
                        { id: 'api', name: 'Global API', icon: Globe },
                    ].map((tab, i) => (
                        <button
                            key={tab.id}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all group",
                                i === 0 ? "bg-dwelzer-navy text-white shadow-lg" : "text-text-secondary hover:bg-surface hover:text-dwelzer-navy"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <tab.icon size={18} className={cn(i === 0 ? "text-dwelzer-gold" : "text-text-muted group-hover:text-dwelzer-gold")} />
                                <span className="text-sm font-bold uppercase tracking-wider">{tab.name}</span>
                            </div>
                            <ChevronRight size={14} className={cn(i === 0 ? "text-dwelzer-gold" : "text-border")} />
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-10">
                    <Card className="p-10 border-border shadow-sm">
                        <h3 className="text-xl font-black text-dwelzer-navy font-display mb-8 uppercase tracking-widest border-b border-border pb-4">Personal Identifiers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input label="Institutional Name" defaultValue="David Welzer" leftIcon={<User size={18} />} />
                            <Input label="Verified Email" defaultValue="dwelzer@dwelzer.com" leftIcon={<Mail size={18} />} disabled />
                            <Input label="Primary Domicile" defaultValue="NYC, United States" leftIcon={<MapPin size={18} />} />
                            <Input label="Institutional Code" defaultValue="DW-8890-X" leftIcon={<ShieldCheck size={18} />} disabled />
                        </div>
                        <div className="mt-10 flex justify-end">
                            <Button variant="gold" className="px-10">Update Profile</Button>
                        </div>
                    </Card>

                    <Card className="p-10 border-border shadow-sm">
                        <h3 className="text-xl font-black text-dwelzer-navy font-display mb-8 uppercase tracking-widest border-b border-border pb-4">Ecosystem Security</h3>
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-black text-dwelzer-navy text-sm uppercase tracking-tight mb-1">Two-Factor Authentication</h4>
                                    <p className="text-xs text-text-muted font-medium">Protect your assets with an additional security layer.</p>
                                </div>
                                <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center px-1 shadow-inner relative">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-md ml-auto" />
                                </div>
                            </div>

                            <div className="p-6 rounded-[28px] bg-surface/50 border border-border">
                                <h4 className="font-black text-dwelzer-navy text-xs uppercase tracking-widest mb-4">Institutional API Explorer</h4>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border">
                                    <Globe className="text-dwelzer-gold" size={20} />
                                    <div className="flex-grow font-mono text-xs text-text-muted truncate">
                                        {showApiKey ? 'dw_live_884hfb39skfn204859sk29485sk20485' : '••••••••••••••••••••••••••••••••••••••••'}
                                    </div>
                                    <button onClick={() => setShowApiKey(!showApiKey)} className="p-2 text-text-muted hover:text-dwelzer-gold transition-all">
                                        {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="mt-4 text-[10px] text-text-muted font-bold uppercase tracking-widest leading-relaxed">
                                    Required for external portal integrations and Lord level automated auctions.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
