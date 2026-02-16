import { create } from 'zustand'

interface UIState {
    sidebarOpen: boolean
    mobileMenuOpen: boolean
    activePortal: string | null
    modalOpen: string | null
    searchQuery: string
    toggleSidebar: () => void
    toggleMobileMenu: () => void
    setActivePortal: (portal: string | null) => void
    openModal: (modalId: string) => void
    closeModal: () => void
    setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    mobileMenuOpen: false,
    activePortal: null,
    modalOpen: null,
    searchQuery: '',
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
    setActivePortal: (portal) => set({ activePortal: portal }),
    openModal: (modalId) => set({ modalOpen: modalId }),
    closeModal: () => set({ modalOpen: null }),
    setSearchQuery: (query) => set({ searchQuery: query }),
}))
