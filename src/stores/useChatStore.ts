import { create } from 'zustand'

interface ChatMessage {
    id: string
    senderId: string
    content: string
    createdAt: string
    read: boolean
}

interface ChatRoom {
    id: string
    messages: ChatMessage[]
    unreadCount: number
    participantName: string
    participantImage?: string
    listingTitle?: string
}

interface ChatState {
    rooms: ChatRoom[]
    activeRoom: string | null
    connected: boolean
    setRooms: (rooms: ChatRoom[]) => void
    setActiveRoom: (roomId: string | null) => void
    addMessage: (roomId: string, message: ChatMessage) => void
    setConnected: (connected: boolean) => void
    markAsRead: (roomId: string) => void
    totalUnread: () => number
}

export const useChatStore = create<ChatState>((set, get) => ({
    rooms: [],
    activeRoom: null,
    connected: false,
    setRooms: (rooms) => set({ rooms }),
    setActiveRoom: (roomId) => set({ activeRoom: roomId }),
    addMessage: (roomId, message) =>
        set((s) => ({
            rooms: s.rooms.map((room) =>
                room.id === roomId
                    ? {
                        ...room,
                        messages: [...room.messages, message],
                        unreadCount: s.activeRoom === roomId ? 0 : room.unreadCount + 1,
                    }
                    : room
            ),
        })),
    setConnected: (connected) => set({ connected }),
    markAsRead: (roomId) =>
        set((s) => ({
            rooms: s.rooms.map((room) =>
                room.id === roomId ? { ...room, unreadCount: 0 } : room
            ),
        })),
    totalUnread: () => get().rooms.reduce((sum, room) => sum + room.unreadCount, 0),
}))
