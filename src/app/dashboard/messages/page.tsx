'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
    MessageSquare,
    Search,
    MoreVertical,
    Send,
    Image as ImageIcon,
    FileIcon,
    PhoneCall,
    Video,
    Clock,
    ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_CHATS = [
    { id: '1', name: 'Malibu Estate Concierge', lastMsg: 'The escrow documents have been uploaded for your review.', date: '2m ago', unread: 2, online: true },
    { id: '2', name: 'Luxury Auto Dealer', lastMsg: 'The 2024 Rolls Royce is ready for viewing.', date: '15m ago', unread: 0, online: true },
    { id: '3', name: 'Lord Member Support', lastMsg: 'Your tier upgrade has been successfully processed.', date: '1h ago', unread: 0, online: false },
]

export default function MessagesChatPage() {
    const [activeChat, setActiveChat] = useState(MOCK_CHATS[0])
    const [msgInput, setMsgInput] = useState('')

    return (
        <div className="h-[calc(100vh-220px)] flex gap-6">
            {/* Sidebar: Chats List */}
            <div className="w-96 flex flex-col gap-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Search communications..."
                        className="w-full bg-white border border-border rounded-xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:border-dwelzer-gold transition-all"
                    />
                </div>

                <Card className="flex-grow p-4 overflow-y-auto space-y-2 border-border shadow-sm">
                    {MOCK_CHATS.map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => setActiveChat(chat)}
                            className={cn(
                                "w-full p-4 rounded-2xl flex items-center gap-4 transition-all group",
                                activeChat.id === chat.id ? "bg-dwelzer-navy text-white" : "hover:bg-surface"
                            )}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-dwelzer-gold flex items-center justify-center text-dwelzer-navy font-black text-lg">
                                    {chat.name[0]}
                                </div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
                            </div>
                            <div className="flex-grow text-left truncate">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", activeChat.id === chat.id ? "text-white/40" : "text-text-muted")}>
                                        {chat.date}
                                    </span>
                                </div>
                                <p className={cn("text-xs truncate", activeChat.id === chat.id ? "text-white/60" : "text-text-secondary")}>
                                    {chat.lastMsg}
                                </p>
                            </div>
                            {chat.unread > 0 && activeChat.id !== chat.id && (
                                <div className="w-5 h-5 rounded-full bg-dwelzer-gold text-dwelzer-navy flex items-center justify-center text-[10px] font-black">
                                    {chat.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </Card>
            </div>

            {/* Main: Chat View Window */}
            <Card className="flex-grow flex flex-col p-0 overflow-hidden border-border shadow-premium border-none">
                {/* Chat Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-white relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-dwelzer-navy text-dwelzer-gold flex items-center justify-center font-black text-xl">
                            {activeChat.name[0]}
                        </div>
                        <div>
                            <h3 className="font-black text-dwelzer-navy font-display uppercase tracking-widest text-sm">{activeChat.name}</h3>
                            <div className="flex items-center gap-2">
                                <Badge variant="emerald" size="sm" className="h-4 py-0 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-white" /> Online</Badge>
                                <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold uppercase tracking-widest border-l border-border pl-2">
                                    <ShieldCheck size={10} /> Secure Channel
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="p-3 rounded-xl bg-surface hover:bg-dwelzer-gold/10 text-text-secondary hover:text-dwelzer-gold transition-all"
                            aria-label="Start Voice Call"
                            title="Voice Call"
                        >
                            <PhoneCall size={18} />
                        </button>
                        <button
                            className="p-3 rounded-xl bg-surface hover:bg-dwelzer-gold/10 text-text-secondary hover:text-dwelzer-gold transition-all"
                            aria-label="Start Video Call"
                            title="Video Call"
                        >
                            <Video size={18} />
                        </button>
                        <button
                            className="p-3 rounded-xl bg-surface hover:bg-dwelzer-gold/10 text-text-secondary hover:text-dwelzer-gold transition-all"
                            aria-label="More Chat Options"
                            title="More Options"
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>

                {/* Message Area */}
                <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-surface/30">
                    <div className="flex justify-center mb-8">
                        <div className="px-4 py-1.5 rounded-full bg-white border border-border text-[10px] font-black text-text-muted uppercase tracking-widest shadow-sm">
                            Secured Connection Established • {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {/* Incoming */}
                    <div className="flex gap-4 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-dwelzer-gold flex items-center justify-center flex-shrink-0 text-dwelzer-navy font-black text-xs">M</div>
                        <div className="space-y-2">
                            <div className="p-5 rounded-[28px] rounded-tl-none bg-white border border-border shadow-sm text-sm text-dwelzer-navy font-medium leading-relaxed">
                                Welcome to the Dwelzer Institutional Inbox. I'm your dedicated concierge for the Malibu Estate. How may I assist with your acquisition today?
                            </div>
                            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest px-2">10:45 AM • Verified Provider</p>
                        </div>
                    </div>

                    {/* Outgoing */}
                    <div className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
                        <div className="w-8 h-8 rounded-full bg-dwelzer-navy flex items-center justify-center flex-shrink-0 text-white font-black text-xs">U</div>
                        <div className="space-y-2 text-right">
                            <div className="p-5 rounded-[28px] rounded-tr-none bg-dwelzer-gold text-dwelzer-navy shadow-[0_0_20px_rgba(212,175,55,0.2)] text-sm font-bold leading-relaxed">
                                Thank you. I've reviewed the structural reports. I'd like to proceed with the escrow initiation for the $4.2M offer.
                            </div>
                            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest px-2">10:48 AM • Delivered</p>
                        </div>
                    </div>
                </div>

                {/* Chat Input Area */}
                <div className="p-6 bg-white border-t border-border relative z-10">
                    <div className="flex items-center gap-4 bg-surface rounded-[28px] p-2 border border-border pr-2">
                        <div className="flex gap-1 ml-2">
                            <button
                                className="p-3 rounded-full hover:bg-white text-text-muted hover:text-dwelzer-gold transition-all"
                                aria-label="Upload Image"
                                title="Attach Image"
                            >
                                <ImageIcon size={20} />
                            </button>
                            <button
                                className="p-3 rounded-full hover:bg-white text-text-muted hover:text-dwelzer-gold transition-all"
                                aria-label="Upload File"
                                title="Attach File"
                            >
                                <FileIcon size={20} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Communicate securely with provider..."
                            className="flex-grow bg-transparent border-none outline-none text-sm font-medium text-dwelzer-navy py-3 px-4"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                        />
                        <Button
                            variant="gold"
                            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg group"
                            aria-label="Send Message"
                            title="Send Message"
                        >
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">Institutional-grade encrypted channel</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
