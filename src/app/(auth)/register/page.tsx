'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export const dynamic = 'force-dynamic'


export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Account created successfully!')
                router.push('/login')
            } else {
                const data = await res.json()
                toast.error(data.error || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Connection failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-dwelzer-navy flex items-center justify-center p-6 py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-dwelzer-gold/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-dwelzer-accent-blue/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-6xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side: Brand & Marketing */}
                <div className="hidden lg:block">
                    <Link href="/" className="inline-flex items-center gap-2 mb-12 group">
                        <div className="w-12 h-12 bg-dwelzer-gold rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12">
                            <span className="text-dwelzer-navy font-display text-3xl font-black">D</span>
                        </div>
                        <span className="font-display text-3xl font-black text-white tracking-tighter">DWELZER</span>
                    </Link>

                    <h1 className="text-6xl font-black text-white mb-8 font-display leading-[1.1]">
                        Join the World's Most <span className="text-gradient-gold">Elite Property</span> Network.
                    </h1>

                    <ul className="space-y-6">
                        {[
                            { title: 'Global Property Access', desc: 'Browse over $12B+ in verified assets worldwide.' },
                            { title: 'Secure Escrow flow', desc: 'Your funds are protected by institutional-grade security.' },
                            { title: 'Tiered Benefits', desc: 'Unlock specialized legal tools and dedicated support.' },
                        ].map((item, i) => (
                            <li key={i} className="flex gap-4">
                                <div className="w-10 h-10 bg-dwelzer-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-dwelzer-gold">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white text-lg font-bold">{item.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-8 rounded-[32px] glass-dark border border-white/10 inline-flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-dwelzer-navy bg-white/10" />)}
                            </div>
                            <span className="text-white/60 text-sm"><span className="text-white font-bold">500+</span> Elite Lords already Joined.</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div>
                    <Card variant="glass" className="p-10 lg:p-12 border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-white mb-2 font-display">Create Account</h2>
                            <p className="text-white/40 font-medium">Start your journey with a Dealing account.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Full Name"
                                placeholder="Lord Alexander Dwelzer"
                                leftIcon={<User size={20} />}
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@dwelzer.com"
                                leftIcon={<Mail size={20} />}
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            />

                            <Input
                                label="Create Password"
                                type="password"
                                placeholder="••••••••"
                                leftIcon={<Lock size={20} />}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            />

                            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <ShieldCheck className="text-dwelzer-gold flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                                    By joining, you agree to the Dwelzer Elite Membership Agreement, Terms of Service, and Anti-Money Laundering (AML) Compliance protocols.
                                </p>
                            </div>

                            <Button variant="gold" className="w-full py-4 text-lg font-black group" isLoading={isLoading}>
                                Create Free Account
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>

                        <p className="text-center mt-8 text-white/50 font-medium">
                            Already a member?{' '}
                            <Link href="/login" className="text-dwelzer-gold font-bold hover:underline underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}


