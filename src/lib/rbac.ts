// ─── RBAC Permission Matrix ─────────────────────────────────
// Defines what each tier can do across the platform

export type TierId = 'dealing' | 'realtor' | 'executive' | 'director' | 'lord'

export type Permission =
    | 'browse_listings'
    | 'create_listing'
    | 'use_escrow'
    | 'auction'
    | 'legal_search'
    | 'admin_panel'
    | 'unlimited_listings'
    | 'priority_support'
    | 'manage_users'
    | 'view_transactions'
    | 'create_hotel'
    | 'create_shortlet'

const permissionMatrix: Record<TierId, Permission[]> = {
    dealing: [
        'browse_listings',
    ],
    realtor: [
        'browse_listings',
        'create_listing',
        'create_hotel',
        'create_shortlet',
    ],
    executive: [
        'browse_listings',
        'create_listing',
        'create_hotel',
        'create_shortlet',
        'use_escrow',
        'auction',
    ],
    director: [
        'browse_listings',
        'create_listing',
        'create_hotel',
        'create_shortlet',
        'use_escrow',
        'auction',
        'legal_search',
        'unlimited_listings',
        'view_transactions',
    ],
    lord: [
        'browse_listings',
        'create_listing',
        'create_hotel',
        'create_shortlet',
        'use_escrow',
        'auction',
        'legal_search',
        'unlimited_listings',
        'priority_support',
        'admin_panel',
        'manage_users',
        'view_transactions',
    ],
}

export function hasPermission(tierId: TierId, permission: Permission): boolean {
    return permissionMatrix[tierId]?.includes(permission) ?? false
}

export function getUserPermissions(tierId: TierId): Permission[] {
    return permissionMatrix[tierId] ?? []
}

export function requirePermission(tierId: string, permission: Permission): void {
    if (!hasPermission(tierId as TierId, permission)) {
        throw new Error(`Insufficient permissions: ${permission} requires a higher tier.`)
    }
}

export const TIER_LISTING_LIMITS: Record<TierId, number> = {
    dealing: 0,
    realtor: 5,
    executive: 20,
    director: 999999,
    lord: 999999,
}

export const TIER_LABELS: Record<TierId, string> = {
    dealing: 'Dealing',
    realtor: 'Realtor',
    executive: 'Executive',
    director: 'Director',
    lord: 'Lord',
}

export const TIER_COLORS: Record<TierId, string> = {
    dealing: '#6b7280',
    realtor: '#3b82f6',
    executive: '#8b5cf6',
    director: '#f59e0b',
    lord: '#d4af37',
}
