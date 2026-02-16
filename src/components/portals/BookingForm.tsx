'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '@/stores/useBookingStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Calendar, Users, MessageSquare, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { formatPrice } from '@/lib/utils'

interface BookingFormProps {
    propertyId: string
    propertyType: 'HOTEL' | 'SHORTLET'
    pricePerNight: number
    currency: string
}

export default function BookingForm({ propertyId, propertyType, pricePerNight, currency }: BookingFormProps) {
    const router = useRouter()
    const {
        step, setStep,
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        guests, setGuests,
        notes, setNotes,
        isSubmitting, setSubmitting,
        reset
    } = useBookingStore()

    const calculateDays = () => {
        if (!checkIn || !checkOut) return 0
        const start = new Date(checkIn)
        const end = new Date(checkOut)
        const diff = end.getTime() - start.getTime()
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    }

    const days = calculateDays()
    const subtotal = days * pricePerNight
    const serviceFee = subtotal * 0.1
    const total = subtotal + serviceFee

    const handleNext = () => {
        if (step === 1 && (!checkIn || !checkOut || days <= 0)) {
            toast.error('Please select valid dates')
            return
        }
        setStep(step + 1)
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingType: propertyType,
                    hotelId: propertyType === 'HOTEL' ? propertyId : undefined,
                    shortletId: propertyType === 'SHORTLET' ? propertyId : undefined,
                    checkIn,
                    checkOut,
                    guests,
                    notes
                })
            })

            if (res.ok) {
                toast.success('Reservation requested successfully!')
                setStep(4) // Success step
                router.refresh()
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to place reservation')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Card className="p-6 border-border shadow-premium sticky top-28">
            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-dwelzer-navy">{formatPrice(pricePerNight)}</span>
                    <span className="text-text-muted text-sm font-medium">/ night</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-1 mb-8">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-grow rounded-full transition-colors ${i <= step ? 'bg-dwelzer-gold' : 'bg-surface-dark'}`}
                    />
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Check In"
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Input
                            label="Check Out"
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <Input
                        label="Guests"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        min={1}
                        leftIcon={<Users size={18} />}
                    />
                    <Button variant="gold" className="w-full mt-4" onClick={handleNext}>
                        Check Availability
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                    <div className="bg-surface p-4 rounded-xl border border-border/50">
                        <h4 className="text-sm font-bold text-dwelzer-navy mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-dwelzer-gold" /> Stay Information
                        </h4>
                        <p className="text-xs text-text-muted font-medium">
                            {new Date(checkIn).toLocaleDateString()} — {new Date(checkOut).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-text-muted font-medium mt-1">{guests} Guest{guests > 1 ? 's' : ''}</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-dwelzer-navy block">Additional Notes (Optional)</label>
                        <textarea
                            className="w-full h-32 p-4 rounded-xl border border-border bg-surface text-sm focus:border-dwelzer-gold outline-none transition-colors"
                            placeholder="Special requests, arrival time, etc."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                        <Button variant="gold" className="flex-1" onClick={handleNext}>Continue</Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                    <h3 className="text-lg font-bold text-dwelzer-navy">Price Summary</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-text-muted">{formatPrice(pricePerNight)} x {days} nights</span>
                            <span className="font-bold text-dwelzer-navy">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-text-muted">Dwelzer Service Fee</span>
                            <span className="font-bold text-dwelzer-navy font-mono text-xs">+{formatPrice(serviceFee)}</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between text-lg font-black text-dwelzer-navy">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                        <MessageSquare className="text-blue-500 shrink-0" size={18} />
                        <p className="text-[10px] text-blue-900 leading-relaxed font-medium">
                            Your reservation will be confirmed once the owner reviews your request. No payment is taken at this step.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                        <Button
                            variant="gold"
                            className="flex-1"
                            onClick={handleSubmit}
                            isLoading={isSubmitting}
                        >
                            Request Booking
                        </Button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 shadow-sm">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-dwelzer-navy mb-2">Request Sent!</h3>
                    <p className="text-text-muted text-sm mb-8 px-4">
                        Lords will review your stay request shortly. Check your dashboard for updates.
                    </p>
                    <Button variant="navy" className="w-full" onClick={() => { reset(); setStep(1); }}>
                        Done
                    </Button>
                </div>
            )}

            <p className="text-[10px] text-text-muted text-center mt-6 uppercase font-bold tracking-widest">
                Elite Shield Secure Booking
            </p>
        </Card>
    )
}
