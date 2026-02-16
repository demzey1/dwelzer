import React from 'react'
import Link from 'next/link'
import { PORTALS } from '@/types'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-dwelzer-navy text-white pt-20 pb-10 border-t border-white/10">
            <div className="container-app mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-dwelzer-gold rounded-lg flex items-center justify-center">
                            <span className="text-dwelzer-navy font-display text-2xl font-bold">D</span>
                        </div>
                        <span className="font-display text-2xl font-bold tracking-tight">DWELZER</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                        The world's premium global property and commerce ecosystem. Connecting elite buyers, sellers, and travelers through a secure blockchain-ready platform.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Facebook, label: 'Facebook' },
                            { Icon: Twitter, label: 'Twitter' },
                            { Icon: Instagram, label: 'Instagram' },
                            { Icon: Linkedin, label: 'LinkedIn' },
                        ].map((social, i) => (
                            <a key={i} href="#" aria-label={social.label} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-dwelzer-gold hover:text-dwelzer-navy transition-all">
                                <social.Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Portals */}
                <div>
                    <h4 className="font-display text-lg font-bold mb-6 text-dwelzer-gold">Ecosystem</h4>
                    <ul className="flex flex-col gap-4">
                        {PORTALS.map((portal) => (
                            <li key={portal.id}>
                                <Link href={portal.href} className="text-white/60 hover:text-dwelzer-gold transition-colors text-sm">
                                    {portal.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-display text-lg font-bold mb-6 text-dwelzer-gold">Support</h4>
                    <ul className="flex flex-col gap-4">
                        {['Help Center', 'Safety Center', 'Community Guidelines', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                            <li key={i}>
                                <a href="#" className="text-white/60 hover:text-dwelzer-gold transition-colors text-sm">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-display text-lg font-bold mb-6 text-dwelzer-gold">Get in Touch</h4>
                    <ul className="flex flex-col gap-6">
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                <MapPin size={18} className="text-dwelzer-gold" />
                            </div>
                            <p className="text-white/60 text-sm">432 Park Avenue, Suite 100<br />New York, NY 10022</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                <Phone size={18} className="text-dwelzer-gold" />
                            </div>
                            <p className="text-white/60 text-sm">+1 (212) 555-0123</p>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                <Mail size={18} className="text-dwelzer-gold" />
                            </div>
                            <p className="text-white/60 text-sm">contact@dwelzer.com</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-app mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                <p>© 2024 DWELZER. All rights reserved. Built for the future of commerce.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Compliance</a>
                    <a href="#" className="hover:text-white transition-colors">Anti-Money Laundering</a>
                    <a href="#" className="hover:text-white transition-colors">Data Protection</a>
                </div>
            </div>
        </footer>
    )
}
