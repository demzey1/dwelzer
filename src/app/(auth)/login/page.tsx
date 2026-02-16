'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react'
import { toast } from 'react-hot-toast'
import React, { useState, Suspense } from 'react'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await signIn('credentials', {
                ...formData,
                redirect: false,
            })

            if (res?.error) {
                toast.error('Invalid credentials')
            } else {
                toast.success('Successfully logged in')
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card variant="glass" className="p-10 border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-dwelzer-gold/30 opacity-0 group-hover:opacity-100 transition-opacity" />

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-1">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-white/70 pl-1">Password</label>
                        <Link href="#" className="text-xs font-bold text-dwelzer-gold hover:text-dwelzer-gold-light transition-colors">
                            Forgot?
                        </Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        leftIcon={<Lock size={20} />}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                    />
                </div>

                <Button
                    type="submit"
                    variant="gold"
                    className="w-full py-4 text-lg font-black group"
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
                    title="Sign In to Dwelzer"
                >
                    Sign In to Dwelzer
                </Button>
            </form>

            <div className="relative my-10">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-dwelzer-navy px-4 text-white/30 font-bold tracking-widest">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    type="button"
                    variant="glass"
                    className="w-full text-white border-white/10 hover:bg-white/5"
                    onClick={() => signIn('google')}
                    aria-label="Continue with Google"
                    title="Google Login"
                >
                    <Chrome className="mr-2" size={18} /> Google
                </Button>
                <Button
                    type="button"
                    variant="glass"
                    className="w-full text-white border-white/10 hover:bg-white/5"
                    aria-label="Continue with GitHub"
                    title="GitHub Login"
                >
                    <Github className="mr-2" size={18} /> GitHub
                </Button>
            </div>
        </Card>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-dwelzer-navy flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-dwelzer-gold/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-dwelzer-accent-blue/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-[480px] z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-12 h-12 bg-dwelzer-gold rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12">
                            <span className="text-dwelzer-navy font-display text-3xl font-black">D</span>
                        </div>
                        <span className="font-display text-3xl font-black text-white tracking-tighter">DWELZER</span>
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-3 font-display">Welcome Back</h1>
                    <p className="text-white/50 text-lg">Enter the ecosystem to manage your assets.</p>
                </div>

                <Suspense fallback={
                    <Card variant="glass" className="p-10 border-white/10 shadow-2xl animate-pulse">
                        <div className="h-64 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-dwelzer-gold border-t-transparent rounded-full animate-spin" />
                        </div>
                    </Card>
                }>
                    <LoginForm />
                </Suspense>

                <p className="text-center mt-10 text-white/50 font-medium">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-dwelzer-gold font-bold hover:underline underline-offset-4">
                        Create Free Account
                    </Link>
                </p>
            </div>
        </div>
    )
}
