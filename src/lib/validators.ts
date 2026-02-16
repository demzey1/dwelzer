import { z } from 'zod'

// ─── Auth Validators ────────────────────────────────────────

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    country: z.string().optional(),
})

// ─── Real Estate Validators ────────────────────────────────

export const realEstateSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    price: z.number().positive('Price must be positive'),
    currency: z.string().default('USD'),
    type: z.enum(['SALE', 'RENT']),
    category: z.enum(['HOUSE', 'APARTMENT', 'LAND', 'COMMERCIAL']),
    bedrooms: z.number().int().min(0).default(0),
    bathrooms: z.number().int().min(0).default(0),
    area: z.number().positive('Area must be positive'),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    zipCode: z.string().optional(),
    images: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
})

// ─── Hotel Validators ──────────────────────────────────────

export const hotelSchema = z.object({
    name: z.string().min(3, 'Hotel name must be at least 3 characters'),
    description: z.string().min(20),
    pricePerNight: z.number().positive(),
    currency: z.string().default('USD'),
    starRating: z.number().int().min(1).max(5),
    category: z.enum(['LUXURY', 'BUSINESS', 'BOUTIQUE', 'BUDGET', 'RESORT']),
    rooms: z.number().int().positive(),
    amenities: z.array(z.string()).default([]),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
})

// ─── Shortlet Validators ───────────────────────────────────

export const shortletSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    pricePerNight: z.number().positive(),
    currency: z.string().default('USD'),
    type: z.enum(['APARTMENT', 'VILLA', 'STUDIO', 'PENTHOUSE']),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().int().min(0),
    maxGuests: z.number().int().positive(),
    amenities: z.array(z.string()).default([]),
    rules: z.array(z.string()).default([]),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    minNights: z.number().int().min(1).default(1),
    maxNights: z.number().int().min(1).default(30),
})

// ─── Marketplace Validators ────────────────────────────────

export const marketplaceItemSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().positive(),
    currency: z.string().default('USD'),
    category: z.enum(['ELECTRONICS', 'FURNITURE', 'VEHICLES', 'FASHION', 'OTHER']),
    condition: z.enum(['NEW', 'USED', 'REFURBISHED']).default('NEW'),
    images: z.array(z.string()).default([]),
    location: z.string().optional(),
    isAuction: z.boolean().default(false),
})

export const auctionSchema = z.object({
    startingPrice: z.number().positive(),
    reservePrice: z.number().positive().optional(),
    endTime: z.string().datetime(),
})

export const bidSchema = z.object({
    auctionId: z.string(),
    amount: z.number().positive(),
})

// ─── Booking Validators ────────────────────────────────────

export const bookingSchema = z.object({
    bookingType: z.enum(['REAL_ESTATE', 'HOTEL', 'SHORTLET']),
    listingId: z.string().optional(),
    hotelId: z.string().optional(),
    shortletId: z.string().optional(),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    guests: z.number().int().positive().default(1),
    notes: z.string().optional(),
})

// ─── Escrow Validators ─────────────────────────────────────

export const escrowSchema = z.object({
    sellerId: z.string(),
    listingId: z.string().optional(),
    amount: z.number().positive(),
    currency: z.string().default('USD'),
    description: z.string().optional(),
})

export const escrowUpdateSchema = z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'DISPUTED', 'RELEASED', 'REFUNDED']),
})

// ─── Message Validators ────────────────────────────────────

export const messageSchema = z.object({
    receiverId: z.string(),
    listingId: z.string().optional(),
    room: z.string(),
    content: z.string().min(1, 'Message cannot be empty'),
})

// ─── Legal Search Validators ───────────────────────────────

export const legalEntrySchema = z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    category: z.enum(['PROPERTY_LAW', 'CONTRACT', 'DISPUTE', 'REGULATORY', 'CORPORATE']),
    jurisdiction: z.string().min(2),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
    caseNumber: z.string().optional(),
    filingDate: z.string().datetime().optional(),
    tags: z.array(z.string()).default([]),
})

// ─── KYC Validators ─────────────────────────────────────────

export const kycSchema = z.object({
    documentType: z.enum(['PASSPORT', 'DRIVERS_LICENSE', 'NATIONAL_ID']),
    documentNumber: z.string().optional(),
})
