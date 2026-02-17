'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShieldCheck, Mail, Lock, ArrowLeft, ArrowRight, LogIn, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const params = useSearchParams()
  const error = params.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: '/dashboard',
      })
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(15,23,42,0.08),transparent_28%)] bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 lg:py-16">
        <div className="hidden flex-1 flex-col gap-6 pr-10 lg:flex">
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
            <ShieldCheck size={14} className="text-[#D4AF37]" />
            Secure Access
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-900">
            Welcome back to DWELZER.
            <span className="block text-3xl text-[#D4AF37]">One login unlocks every portal.</span>
          </h1>
          <ul className="space-y-3 text-slate-600">
            {[
              'Escrow-first transactions across real estate, hotel, marketplace, and legal portals.',
              'KYC-ready authentication with role-based access.',
              'Responsive, overlap-free layouts tuned for mobile and desktop.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Sparkles size={16} className="mt-1 text-[#D4AF37]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Sign In</p>
              <h2 className="text-2xl font-black text-slate-900">Access your account</h2>
              <p className="text-sm text-slate-600">Use your email/password or continue with Google.</p>
            </div>
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1">
              <ArrowLeft size={14} />
              Back
            </Link>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Authentication failed. Please check your credentials.
            </div>
          )}

          <form className="space-y-4" onSubmit={submit}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Email</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 focus-within:border-[#D4AF37]">
                <Mail size={16} className="text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="you@dwelzer.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Password</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 focus-within:border-[#D4AF37]">
                <Lock size={16} className="text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </label>

            <Button
              type="submit"
              disabled={loading}
              variant="gold"
              className="w-full !rounded-2xl py-3 text-base font-semibold shadow-gold"
            >
              <LogIn size={16} className="mr-2" />
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full !rounded-2xl py-3 text-base font-semibold"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need an account?{' '}
            <Link href="/register" className="font-semibold text-slate-900 hover:text-[#D4AF37]">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
