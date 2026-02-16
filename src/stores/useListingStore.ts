import { create } from 'zustand'

interface ListingFilters {
    type?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    city?: string
    country?: string
    bedrooms?: number
    sortBy?: string
}

interface ListingState {
    filters: ListingFilters
    viewMode: 'grid' | 'list'
    setFilters: (filters: Partial<ListingFilters>) => void
    resetFilters: () => void
    setViewMode: (mode: 'grid' | 'list') => void
}

export const useListingStore = create<ListingState>((set) => ({
    filters: {},
    viewMode: 'grid',
    setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),
    resetFilters: () => set({ filters: {} }),
    setViewMode: (mode) => set({ viewMode: mode }),
}))
