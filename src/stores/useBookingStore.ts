import { create } from 'zustand'

interface BookingState {
    step: number
    checkIn: string
    checkOut: string
    guests: number
    notes: string
    isSubmitting: boolean
    setStep: (step: number) => void
    setCheckIn: (date: string) => void
    setCheckOut: (date: string) => void
    setGuests: (guests: number) => void
    setNotes: (notes: string) => void
    setSubmitting: (submitting: boolean) => void
    reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
    step: 1,
    checkIn: '',
    checkOut: '',
    guests: 1,
    notes: '',
    isSubmitting: false,
    setStep: (step) => set({ step }),
    setCheckIn: (date) => set({ checkIn: date }),
    setCheckOut: (date) => set({ checkOut: date }),
    setGuests: (guests) => set({ guests }),
    setNotes: (notes) => set({ notes }),
    setSubmitting: (submitting) => set({ isSubmitting: submitting }),
    reset: () => set({ step: 1, checkIn: '', checkOut: '', guests: 1, notes: '', isSubmitting: false }),
}))
