import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding DWELZER database...')

    // ─── Tiers ────────────────────────────────────────────────
    const tiers = await Promise.all([
        prisma.tier.upsert({
            where: { id: 'dealing' },
            update: {},
            create: {
                id: 'dealing',
                name: 'Dealing',
                price: 0,
                maxListings: 3,
                canCreateListing: false,
                canUseEscrow: false,
                canAuction: false,
                canLegalSearch: false,
                canAccessAdmin: false,
                prioritySupport: false,
                description: 'Free tier — browse and explore the platform',
            },
        }),
        prisma.tier.upsert({
            where: { id: 'realtor' },
            update: {},
            create: {
                id: 'realtor',
                name: 'Realtor',
                price: 29,
                maxListings: 5,
                canCreateListing: true,
                canUseEscrow: false,
                canAuction: false,
                canLegalSearch: false,
                canAccessAdmin: false,
                prioritySupport: false,
                description: 'Create and manage up to 5 property listings',
            },
        }),
        prisma.tier.upsert({
            where: { id: 'executive' },
            update: {},
            create: {
                id: 'executive',
                name: 'Executive',
                price: 99,
                maxListings: 20,
                canCreateListing: true,
                canUseEscrow: true,
                canAuction: true,
                canLegalSearch: false,
                canAccessAdmin: false,
                prioritySupport: false,
                description: 'Full access to escrow and auction features',
            },
        }),
        prisma.tier.upsert({
            where: { id: 'director' },
            update: {},
            create: {
                id: 'director',
                name: 'Director',
                price: 249,
                maxListings: 999999,
                canCreateListing: true,
                canUseEscrow: true,
                canAuction: true,
                canLegalSearch: true,
                canAccessAdmin: false,
                prioritySupport: false,
                description: 'Unlimited listings with legal search access',
            },
        }),
        prisma.tier.upsert({
            where: { id: 'lord' },
            update: {},
            create: {
                id: 'lord',
                name: 'Lord',
                price: 499,
                maxListings: 999999,
                canCreateListing: true,
                canUseEscrow: true,
                canAuction: true,
                canLegalSearch: true,
                canAccessAdmin: true,
                prioritySupport: true,
                description: 'Full platform access including admin panel',
            },
        }),
    ])
    console.log(`✅ Created ${tiers.length} tiers`)

    // ─── Users ────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@dwelzer.com' },
        update: {},
        create: {
            name: 'Lord Administrator',
            email: 'admin@dwelzer.com',
            hashedPassword,
            role: 'ADMIN',
            tierId: 'lord',
            bio: 'Platform administrator with full access',
            country: 'United Kingdom',
            phone: '+44 20 7123 4567',
        },
    })

    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'sarah@dwelzer.com' },
            update: {},
            create: {
                name: 'Sarah Mitchell',
                email: 'sarah@dwelzer.com',
                hashedPassword: await bcrypt.hash('password123', 12),
                role: 'USER',
                tierId: 'director',
                bio: 'Real estate investor and property developer',
                country: 'United States',
            },
        }),
        prisma.user.upsert({
            where: { email: 'james@dwelzer.com' },
            update: {},
            create: {
                name: 'James Harrison',
                email: 'james@dwelzer.com',
                hashedPassword: await bcrypt.hash('password123', 12),
                role: 'USER',
                tierId: 'executive',
                bio: 'Boutique hotel owner and hospitality expert',
                country: 'France',
            },
        }),
        prisma.user.upsert({
            where: { email: 'amara@dwelzer.com' },
            update: {},
            create: {
                name: 'Amara Okonkwo',
                email: 'amara@dwelzer.com',
                hashedPassword: await bcrypt.hash('password123', 12),
                role: 'USER',
                tierId: 'realtor',
                bio: 'Licensed realtor specializing in luxury homes',
                country: 'Nigeria',
            },
        }),
        prisma.user.upsert({
            where: { email: 'david@dwelzer.com' },
            update: {},
            create: {
                name: 'David Chen',
                email: 'david@dwelzer.com',
                hashedPassword: await bcrypt.hash('password123', 12),
                role: 'USER',
                tierId: 'dealing',
                bio: 'First-time home buyer exploring the market',
                country: 'Singapore',
            },
        }),
        prisma.user.upsert({
            where: { email: 'elena@dwelzer.com' },
            update: {},
            create: {
                name: 'Elena Vasquez',
                email: 'elena@dwelzer.com',
                hashedPassword: await bcrypt.hash('password123', 12),
                role: 'USER',
                tierId: 'executive',
                bio: 'Property lawyer and legal consultant',
                country: 'Spain',
            },
        }),
    ])
    console.log(`✅ Created ${users.length + 1} users (including admin)`)

    // ─── Subscriptions ────────────────────────────────────────
    await prisma.subscription.createMany({
        data: [
            { userId: admin.id, tierId: 'lord', status: 'ACTIVE' },
            { userId: users[0].id, tierId: 'director', status: 'ACTIVE' },
            { userId: users[1].id, tierId: 'executive', status: 'ACTIVE' },
            { userId: users[2].id, tierId: 'realtor', status: 'ACTIVE' },
            { userId: users[3].id, tierId: 'dealing', status: 'ACTIVE' },
            { userId: users[4].id, tierId: 'executive', status: 'ACTIVE' },
        ],
    })
    console.log('✅ Created subscriptions')

    // ─── Real Estate Listings (8 items) ───────────────────────
    const listings = await Promise.all([
        prisma.realEstateListing.create({
            data: {
                title: 'Luxury Penthouse with Panoramic City Views',
                description: 'Stunning 3-bedroom penthouse in the heart of Manhattan with floor-to-ceiling windows offering breathtaking views of Central Park. Features a private rooftop terrace, chef\'s kitchen, and concierge services.',
                price: 4500000,
                type: 'SALE',
                category: 'APARTMENT',
                bedrooms: 3,
                bathrooms: 3,
                area: 3200,
                address: '432 Park Avenue',
                city: 'New York',
                state: 'New York',
                country: 'United States',
                zipCode: '10022',
                images: JSON.stringify(['/images/penthouse-1.jpg', '/images/penthouse-2.jpg']),
                features: JSON.stringify(['Rooftop Terrace', 'Concierge', 'Gym', 'Spa', 'Doorman']),
                featured: true,
                verified: true,
                views: 1284,
                userId: users[0].id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Modern Waterfront Villa in Dubai Marina',
                description: 'Exquisite 5-bedroom waterfront villa with private beach access, infinity pool, and smart home technology throughout. Located in the prestigious Dubai Marina district.',
                price: 8200000,
                type: 'SALE',
                category: 'HOUSE',
                bedrooms: 5,
                bathrooms: 6,
                area: 7500,
                address: 'Palm Jumeirah, Frond M',
                city: 'Dubai',
                state: 'Dubai',
                country: 'United Arab Emirates',
                images: JSON.stringify(['/images/villa-dubai-1.jpg']),
                features: JSON.stringify(['Private Beach', 'Infinity Pool', 'Smart Home', 'Cinema Room']),
                featured: true,
                verified: true,
                views: 2103,
                userId: admin.id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Charming Georgian Townhouse in Kensington',
                description: 'Beautifully restored 4-bedroom Georgian townhouse in the heart of Kensington. Features original period details, private garden, and modern amenities.',
                price: 3800000,
                type: 'SALE',
                category: 'HOUSE',
                bedrooms: 4,
                bathrooms: 3,
                area: 4200,
                address: '15 Kensington Square',
                city: 'London',
                state: 'Greater London',
                country: 'United Kingdom',
                zipCode: 'W8 5HH',
                images: JSON.stringify(['/images/townhouse-london.jpg']),
                features: JSON.stringify(['Garden', 'Period Features', 'Wine Cellar', 'Staff Quarters']),
                featured: true,
                verified: true,
                views: 897,
                userId: users[0].id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Beachfront Land in Bali – Prime Development',
                description: 'Rare opportunity to acquire 2 hectares of pristine beachfront land in southern Bali. Perfect for resort development or private estate.',
                price: 1200000,
                type: 'SALE',
                category: 'LAND',
                bedrooms: 0,
                bathrooms: 0,
                area: 215000,
                address: 'Jalan Pantai Pandawa',
                city: 'Badung',
                state: 'Bali',
                country: 'Indonesia',
                images: JSON.stringify(['/images/land-bali.jpg']),
                features: JSON.stringify(['Beachfront', 'Road Access', 'Zoned for Development']),
                verified: true,
                views: 634,
                userId: users[2].id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Executive Office Space – Financial District',
                description: 'Premium Class A office space spanning an entire floor with panoramic harbor views. Includes conference rooms, server room, and executive lounge.',
                price: 15000,
                currency: 'USD',
                type: 'RENT',
                category: 'COMMERCIAL',
                bedrooms: 0,
                bathrooms: 4,
                area: 12000,
                address: '1 International Finance Centre',
                city: 'Hong Kong',
                state: 'Hong Kong',
                country: 'China',
                images: JSON.stringify(['/images/office-hk.jpg']),
                features: JSON.stringify(['Harbor Views', 'Conference Rooms', 'Parking', '24/7 Security']),
                verified: true,
                views: 421,
                userId: users[0].id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Renovated Loft in Le Marais, Paris',
                description: 'Stylish 2-bedroom loft apartment in the trendy Le Marais district. Exposed beams, open plan living, and a private courtyard garden.',
                price: 1850000,
                type: 'SALE',
                category: 'APARTMENT',
                bedrooms: 2,
                bathrooms: 2,
                area: 1600,
                address: '22 Rue des Archives',
                city: 'Paris',
                state: 'Île-de-France',
                country: 'France',
                images: JSON.stringify(['/images/loft-paris.jpg']),
                features: JSON.stringify(['Courtyard', 'Exposed Beams', 'Renovated', 'Central Heating']),
                views: 756,
                userId: users[1].id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Lakeside Ranch in Montana',
                description: 'Sprawling 320-acre ranch with a private lake, equestrian facilities, and a custom-built 6-bedroom lodge. Untouched natural beauty.',
                price: 5900000,
                type: 'SALE',
                category: 'HOUSE',
                bedrooms: 6,
                bathrooms: 5,
                area: 8800,
                address: '1450 Big Sky Lane',
                city: 'Whitefish',
                state: 'Montana',
                country: 'United States',
                zipCode: '59937',
                images: JSON.stringify(['/images/ranch-montana.jpg']),
                features: JSON.stringify(['Private Lake', 'Equestrian', 'Helipad', '320 Acres']),
                featured: true,
                views: 1543,
                userId: admin.id,
            },
        }),
        prisma.realEstateListing.create({
            data: {
                title: 'Luxury Apartment in Victoria Island, Lagos',
                description: 'Premium 3-bedroom apartment in the heart of Victoria Island with ocean views, 24/7 power supply, and dedicated parking.',
                price: 450000,
                type: 'SALE',
                category: 'APARTMENT',
                bedrooms: 3,
                bathrooms: 3,
                area: 2400,
                address: 'Eko Atlantic City',
                city: 'Lagos',
                state: 'Lagos',
                country: 'Nigeria',
                images: JSON.stringify(['/images/apt-lagos.jpg']),
                features: JSON.stringify(['Ocean Views', '24/7 Power', 'Swimming Pool', 'Gym']),
                verified: true,
                views: 312,
                userId: users[2].id,
            },
        }),
    ])
    console.log(`✅ Created ${listings.length} real estate listings`)

    // ─── Hotels (8 items) ─────────────────────────────────────
    const hotels = await Promise.all([
        prisma.hotel.create({
            data: {
                name: 'The Royal Crown Hotel',
                description: 'A prestigious 5-star hotel offering unparalleled luxury in the heart of Mayfair. Michelin-starred restaurant, rooftop bar, and world-class spa.',
                pricePerNight: 850,
                starRating: 5,
                category: 'LUXURY',
                rooms: 120,
                amenities: JSON.stringify(['Spa', 'Pool', 'Restaurant', 'Bar', 'Room Service', 'Valet Parking', 'Concierge']),
                address: '45 Park Lane',
                city: 'London',
                state: 'Greater London',
                country: 'United Kingdom',
                images: JSON.stringify(['/images/hotel-london.jpg']),
                featured: true,
                rating: 4.9,
                reviewCount: 487,
                userId: users[1].id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Marina Bay Towers',
                description: 'Iconic waterfront hotel with infinity pool overlooking the Singapore skyline. Features 6 restaurants, executive lounge, and marina access.',
                pricePerNight: 620,
                starRating: 5,
                category: 'LUXURY',
                rooms: 350,
                amenities: JSON.stringify(['Infinity Pool', 'Marina', '6 Restaurants', 'Casino', 'Spa', 'Gym']),
                address: '10 Bayfront Avenue',
                city: 'Singapore',
                state: 'Singapore',
                country: 'Singapore',
                images: JSON.stringify(['/images/hotel-singapore.jpg']),
                featured: true,
                rating: 4.8,
                reviewCount: 1203,
                userId: admin.id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Alpine Lodge & Spa',
                description: 'Charming boutique hotel nestled in the Swiss Alps. Ski-in/ski-out access, thermal spa, and gourmet alpine cuisine.',
                pricePerNight: 380,
                starRating: 4,
                category: 'BOUTIQUE',
                rooms: 45,
                amenities: JSON.stringify(['Ski Access', 'Thermal Spa', 'Restaurant', 'Fireplace Lounge', 'Ski Storage']),
                address: 'Bahnhofstrasse 12',
                city: 'Zermatt',
                state: 'Valais',
                country: 'Switzerland',
                images: JSON.stringify(['/images/hotel-swiss.jpg']),
                rating: 4.7,
                reviewCount: 312,
                userId: users[1].id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Sahara Oasis Resort',
                description: 'Luxury desert resort with private villas, camel excursions, and stargazing experiences. An oasis of calm in the Moroccan desert.',
                pricePerNight: 450,
                starRating: 5,
                category: 'RESORT',
                rooms: 30,
                amenities: JSON.stringify(['Private Villas', 'Camel Tours', 'Stargazing', 'Desert Spa', 'Outdoor Pool']),
                address: 'Route de Merzouga',
                city: 'Merzouga',
                state: 'Draa-Tafilalet',
                country: 'Morocco',
                images: JSON.stringify(['/images/hotel-morocco.jpg']),
                featured: true,
                rating: 4.9,
                reviewCount: 156,
                userId: admin.id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Tokyo Executive Suites',
                description: 'Ultra-modern business hotel in Shinjuku with panoramic city views, executive floors, and direct metro access.',
                pricePerNight: 280,
                starRating: 4,
                category: 'BUSINESS',
                rooms: 200,
                amenities: JSON.stringify(['Business Center', 'Meeting Rooms', 'Gym', 'Restaurant', 'Laundry']),
                address: '3-7-1 Nishi-Shinjuku',
                city: 'Tokyo',
                state: 'Tokyo',
                country: 'Japan',
                images: JSON.stringify(['/images/hotel-tokyo.jpg']),
                rating: 4.5,
                reviewCount: 892,
                userId: users[1].id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Casa del Sol',
                description: 'Beachfront boutique hotel on the Amalfi Coast. Terraced gardens, private beach, and authentic Italian cuisine.',
                pricePerNight: 520,
                starRating: 5,
                category: 'BOUTIQUE',
                rooms: 25,
                amenities: JSON.stringify(['Private Beach', 'Terrace Restaurant', 'Pool', 'Wine Cellar', 'Boat Tours']),
                address: 'Via Positanesi d\'America 2',
                city: 'Positano',
                state: 'Campania',
                country: 'Italy',
                images: JSON.stringify(['/images/hotel-italy.jpg']),
                featured: true,
                rating: 4.9,
                reviewCount: 234,
                userId: users[1].id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Backpacker\'s Paradise',
                description: 'Clean, modern budget hotel near Khao San Road. Perfect launchpad for exploring Bangkok.',
                pricePerNight: 35,
                starRating: 2,
                category: 'BUDGET',
                rooms: 80,
                amenities: JSON.stringify(['WiFi', 'Shared Kitchen', 'Laundry', 'Tour Desk', 'Rooftop Bar']),
                address: '123 Khao San Road',
                city: 'Bangkok',
                state: 'Bangkok',
                country: 'Thailand',
                images: JSON.stringify(['/images/hotel-bangkok.jpg']),
                rating: 4.2,
                reviewCount: 1567,
                userId: users[1].id,
            },
        }),
        prisma.hotel.create({
            data: {
                name: 'Cape Grace Waterfront',
                description: 'Award-winning luxury hotel on Cape Town\'s V&A Waterfront with Table Mountain views, whisky bar, and yacht marina.',
                pricePerNight: 390,
                starRating: 5,
                category: 'LUXURY',
                rooms: 120,
                amenities: JSON.stringify(['Yacht Marina', 'Whisky Bar', 'Spa', 'Pool', 'Fine Dining', 'Mountain Views']),
                address: 'West Quay Road, V&A Waterfront',
                city: 'Cape Town',
                state: 'Western Cape',
                country: 'South Africa',
                images: JSON.stringify(['/images/hotel-capetown.jpg']),
                rating: 4.8,
                reviewCount: 678,
                userId: admin.id,
            },
        }),
    ])
    console.log(`✅ Created ${hotels.length} hotels`)

    // ─── Shortlets (8 items) ──────────────────────────────────
    const shortlets = await Promise.all([
        prisma.shortlet.create({
            data: {
                title: 'Luxury Penthouse Suite – Times Square',
                description: 'Stunning penthouse in the heart of Manhattan. Floor-to-ceiling windows, rooftop jacuzzi, and concierge service included.',
                pricePerNight: 450,
                type: 'PENTHOUSE',
                bedrooms: 2,
                bathrooms: 2,
                maxGuests: 4,
                amenities: JSON.stringify(['Jacuzzi', 'Concierge', 'Smart TV', 'Premium WiFi', 'Kitchen']),
                rules: JSON.stringify(['No smoking', 'No parties', 'Quiet hours 10pm-8am']),
                address: '1567 Broadway',
                city: 'New York',
                state: 'New York',
                country: 'United States',
                images: JSON.stringify(['/images/shortlet-ny.jpg']),
                featured: true,
                rating: 4.9,
                reviewCount: 89,
                userId: users[0].id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Tropical Villa with Private Pool – Bali',
                description: 'Secluded 3-bedroom villa surrounded by rice paddies with your own infinity pool and outdoor shower. Breakfast included.',
                pricePerNight: 180,
                type: 'VILLA',
                bedrooms: 3,
                bathrooms: 3,
                maxGuests: 6,
                amenities: JSON.stringify(['Private Pool', 'Rice Paddy Views', 'Breakfast', 'Outdoor Shower', 'Bicycle']),
                rules: JSON.stringify(['No shoes inside', 'Respect local culture']),
                address: 'Jalan Raya Ubud',
                city: 'Ubud',
                state: 'Bali',
                country: 'Indonesia',
                images: JSON.stringify(['/images/shortlet-bali.jpg']),
                featured: true,
                rating: 4.8,
                reviewCount: 234,
                userId: users[0].id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Artist\'s Studio – Le Marais',
                description: 'Charming studio apartment in the heart of Le Marais. Original wooden beams, skylight views of Parisian rooftops.',
                pricePerNight: 120,
                type: 'STUDIO',
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                amenities: JSON.stringify(['Skylight', 'Kitchen', 'Washer', 'WiFi', 'Books']),
                rules: JSON.stringify(['No smoking']),
                address: '8 Rue de Turenne',
                city: 'Paris',
                state: 'Île-de-France',
                country: 'France',
                images: JSON.stringify(['/images/shortlet-paris.jpg']),
                rating: 4.7,
                reviewCount: 156,
                userId: users[1].id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Oceanfront Apartment – Copacabana',
                description: 'Wake up to the sound of waves in this beautiful 2-bedroom apartment directly on Copacabana Beach.',
                pricePerNight: 95,
                type: 'APARTMENT',
                bedrooms: 2,
                bathrooms: 1,
                maxGuests: 4,
                amenities: JSON.stringify(['Beach Access', 'Pool', 'Security', 'Parking', 'AC']),
                rules: JSON.stringify(['No parties', 'Check-in after 3pm']),
                address: 'Av. Atlântica 2500',
                city: 'Rio de Janeiro',
                state: 'Rio de Janeiro',
                country: 'Brazil',
                images: JSON.stringify(['/images/shortlet-rio.jpg']),
                rating: 4.6,
                reviewCount: 312,
                userId: users[2].id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Modern Loft – Shoreditch',
                description: 'Industrial-chic loft in Shoreditch with exposed brick, designer furniture, and rooftop terrace access.',
                pricePerNight: 200,
                type: 'APARTMENT',
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                amenities: JSON.stringify(['Terrace', 'Gym Access', 'Smart Lock', 'Nespresso', 'Sonos']),
                rules: JSON.stringify(['No pets', 'No smoking']),
                address: '45 Curtain Road',
                city: 'London',
                state: 'Greater London',
                country: 'United Kingdom',
                images: JSON.stringify(['/images/shortlet-london.jpg']),
                featured: true,
                rating: 4.8,
                reviewCount: 178,
                userId: users[0].id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Sky Villa – Downtown Dubai',
                description: 'Ultra-luxury 4-bedroom sky villa on the 60th floor with Burj Khalifa views, private elevator, and butler service.',
                pricePerNight: 1200,
                type: 'PENTHOUSE',
                bedrooms: 4,
                bathrooms: 4,
                maxGuests: 8,
                amenities: JSON.stringify(['Butler Service', 'Private Elevator', 'Burj Views', 'Hot Tub', 'Cinema']),
                rules: JSON.stringify(['Formal dress in common areas', 'No smoking']),
                address: 'Downtown Dubai',
                city: 'Dubai',
                state: 'Dubai',
                country: 'United Arab Emirates',
                images: JSON.stringify(['/images/shortlet-dubai.jpg']),
                featured: true,
                rating: 5.0,
                reviewCount: 42,
                userId: admin.id,
            },
        }),
        prisma.shortlet.create({
            data: {
                title: 'Treehouse Retreat – Costa Rica',
                description: 'Unique treehouse experience in the Costa Rican rainforest. Wake up to howler monkeys and incredible biodiversity.',
                pricePerNight: 85,
                type: 'VILLA',
                bedrooms: 1,
                bathrooms: 1,
                maxGuests: 2,
                amenities: JSON.stringify(['Rainforest Views', 'Breakfast', 'Guided Tours', 'Hammock', 'WiFi']),
                rules: JSON.stringify(['Nature-friendly products only', 'No loud music']),
                address: 'Monteverde Cloud Forest',
                city: 'Monteverde',
                state: 'Puntarenas',
                country: 'Costa Rica',
                images: JSON.stringify(['/images/shortlet-costarica.jpg']),
                rating: 4.9,
                reviewCount: 98,
                userId: users[2].id,
            },
        }),
    ])
    console.log(`✅ Created ${shortlets.length} shortlets`)

    // ─── Marketplace Items (8 items, 3 with auctions) ─────────
    const marketItems = await Promise.all([
        prisma.marketplaceItem.create({
            data: {
                title: 'Vintage Rolex Submariner 1967',
                description: 'Rare vintage Rolex Submariner ref. 5513 from 1967. Patina dial, original bracelet, box and papers included.',
                price: 45000,
                category: 'FASHION',
                condition: 'USED',
                images: JSON.stringify(['/images/rolex.jpg']),
                location: 'Geneva, Switzerland',
                isAuction: true,
                featured: true,
                views: 892,
                userId: users[0].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'Tesla Model S Plaid 2024',
                description: 'Brand new Tesla Model S Plaid with full self-driving capability. Ultra White interior, 1,020 HP, 0-60 in 1.99s.',
                price: 108000,
                category: 'VEHICLES',
                condition: 'NEW',
                images: JSON.stringify(['/images/tesla.jpg']),
                location: 'Los Angeles, CA',
                views: 456,
                userId: users[0].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'Herman Miller Eames Lounge Chair',
                description: 'Authentic Herman Miller Eames Lounge Chair and Ottoman in Santos Palisander. Perfect condition.',
                price: 7200,
                category: 'FURNITURE',
                condition: 'NEW',
                images: JSON.stringify(['/images/eames.jpg']),
                location: 'New York, NY',
                views: 234,
                userId: users[1].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'MacBook Pro M3 Max – Fully Loaded',
                description: '16-inch MacBook Pro with M3 Max chip, 128GB RAM, 8TB SSD. Space Black. AppleCare+ until 2027.',
                price: 6299,
                category: 'ELECTRONICS',
                condition: 'NEW',
                images: JSON.stringify(['/images/macbook.jpg']),
                location: 'San Francisco, CA',
                views: 567,
                userId: users[4].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'Rare First Edition – The Great Gatsby',
                description: 'First edition, first printing of The Great Gatsby (1925). Near fine condition with original dust jacket.',
                price: 120000,
                category: 'OTHER',
                condition: 'USED',
                images: JSON.stringify(['/images/gatsby.jpg']),
                location: 'London, UK',
                isAuction: true,
                featured: true,
                views: 1023,
                userId: admin.id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'Bespoke Italian Leather Sofa Set',
                description: 'Handcrafted 3-piece leather sofa set from a master artisan in Florence. Full-grain Italian leather in cognac.',
                price: 18500,
                category: 'FURNITURE',
                condition: 'NEW',
                images: JSON.stringify(['/images/sofa.jpg']),
                location: 'Florence, Italy',
                views: 178,
                userId: users[1].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'DJI Inspire 3 Professional Drone',
                description: 'Professional cinema drone with 8K camera, dual operator control, and RTK positioning. Includes 3 batteries and hard case.',
                price: 16500,
                category: 'ELECTRONICS',
                condition: 'NEW',
                images: JSON.stringify(['/images/drone.jpg']),
                location: 'Tokyo, Japan',
                isAuction: true,
                views: 345,
                userId: users[4].id,
            },
        }),
        prisma.marketplaceItem.create({
            data: {
                title: 'Gucci Flora Collection – Limited Edition',
                description: 'Complete limited edition Gucci Flora collection. Includes jacket, dress, bag and shoes. Size 38/EU.',
                price: 8900,
                category: 'FASHION',
                condition: 'NEW',
                images: JSON.stringify(['/images/gucci.jpg']),
                location: 'Milan, Italy',
                featured: true,
                views: 654,
                userId: users[0].id,
            },
        }),
    ])
    console.log(`✅ Created ${marketItems.length} marketplace items`)

    // ─── Auctions for auction items ───────────────────────────
    const now = new Date()
    const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
    const fiveDaysLater = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)

    const auctionItems = marketItems.filter((i: any) => {
        // Items 0, 4, 6 are auctions
        return i.isAuction
    })

    const auctions = await Promise.all([
        prisma.auction.create({
            data: {
                itemId: auctionItems[0].id,
                startingPrice: 30000,
                currentPrice: 38500,
                reservePrice: 42000,
                endTime: fiveDaysLater,
                status: 'ACTIVE',
            },
        }),
        prisma.auction.create({
            data: {
                itemId: auctionItems[1].id,
                startingPrice: 80000,
                currentPrice: 105000,
                reservePrice: 100000,
                endTime: twoDaysLater,
                status: 'ACTIVE',
            },
        }),
        prisma.auction.create({
            data: {
                itemId: auctionItems[2].id,
                startingPrice: 12000,
                currentPrice: 14200,
                endTime: fiveDaysLater,
                status: 'ACTIVE',
            },
        }),
    ])

    // Add some bids
    await prisma.bid.createMany({
        data: [
            { auctionId: auctions[0].id, userId: users[1].id, amount: 32000 },
            { auctionId: auctions[0].id, userId: users[3].id, amount: 35000 },
            { auctionId: auctions[0].id, userId: users[4].id, amount: 38500 },
            { auctionId: auctions[1].id, userId: users[0].id, amount: 90000 },
            { auctionId: auctions[1].id, userId: users[2].id, amount: 100000 },
            { auctionId: auctions[1].id, userId: users[4].id, amount: 105000 },
            { auctionId: auctions[2].id, userId: users[1].id, amount: 13000 },
            { auctionId: auctions[2].id, userId: users[3].id, amount: 14200 },
        ],
    })
    console.log(`✅ Created ${auctions.length} auctions with bids`)

    // ─── Bookings (7 items) ───────────────────────────────────
    await prisma.booking.createMany({
        data: [
            {
                userId: users[3].id,
                bookingType: 'HOTEL',
                hotelId: hotels[0].id,
                checkIn: new Date('2025-03-15'),
                checkOut: new Date('2025-03-20'),
                guests: 2,
                totalPrice: 4250,
                status: 'CONFIRMED',
            },
            {
                userId: users[4].id,
                bookingType: 'HOTEL',
                hotelId: hotels[1].id,
                checkIn: new Date('2025-04-01'),
                checkOut: new Date('2025-04-05'),
                guests: 1,
                totalPrice: 2480,
                status: 'PENDING',
            },
            {
                userId: users[0].id,
                bookingType: 'SHORTLET',
                shortletId: shortlets[1].id,
                checkIn: new Date('2025-05-10'),
                checkOut: new Date('2025-05-17'),
                guests: 4,
                totalPrice: 1260,
                status: 'CONFIRMED',
            },
            {
                userId: users[1].id,
                bookingType: 'SHORTLET',
                shortletId: shortlets[0].id,
                checkIn: new Date('2025-03-01'),
                checkOut: new Date('2025-03-05'),
                guests: 2,
                totalPrice: 1800,
                status: 'COMPLETED',
            },
            {
                userId: users[3].id,
                bookingType: 'REAL_ESTATE',
                listingId: listings[5].id,
                checkIn: new Date('2025-06-01'),
                checkOut: new Date('2025-12-01'),
                guests: 2,
                totalPrice: 11100,
                status: 'PENDING',
            },
            {
                userId: admin.id,
                bookingType: 'HOTEL',
                hotelId: hotels[3].id,
                checkIn: new Date('2025-04-20'),
                checkOut: new Date('2025-04-25'),
                guests: 2,
                totalPrice: 2250,
                status: 'CONFIRMED',
            },
            {
                userId: users[2].id,
                bookingType: 'SHORTLET',
                shortletId: shortlets[4].id,
                checkIn: new Date('2025-07-01'),
                checkOut: new Date('2025-07-07'),
                guests: 1,
                totalPrice: 1200,
                status: 'PENDING',
            },
        ],
    })
    console.log('✅ Created 7 bookings')

    // ─── Escrow Transactions ──────────────────────────────────
    await prisma.escrowTransaction.createMany({
        data: [
            {
                buyerId: users[3].id,
                sellerId: users[0].id,
                listingId: listings[0].id,
                amount: 4500000,
                status: 'PENDING',
                description: 'Penthouse purchase escrow',
            },
            {
                buyerId: users[1].id,
                sellerId: admin.id,
                listingId: listings[1].id,
                amount: 8200000,
                status: 'INITIATED',
                description: 'Dubai villa escrow',
            },
            {
                buyerId: users[4].id,
                sellerId: users[0].id,
                listingId: listings[2].id,
                amount: 3800000,
                status: 'CONFIRMED',
                description: 'London townhouse escrow',
            },
        ],
    })
    console.log('✅ Created 3 escrow transactions')

    // ─── Messages ─────────────────────────────────────────────
    await prisma.message.createMany({
        data: [
            {
                senderId: users[3].id,
                receiverId: users[0].id,
                listingId: listings[0].id,
                room: `${users[3].id}_${users[0].id}_${listings[0].id}`,
                content: 'Hi, I\'m very interested in the Manhattan penthouse. Is the price negotiable?',
            },
            {
                senderId: users[0].id,
                receiverId: users[3].id,
                listingId: listings[0].id,
                room: `${users[3].id}_${users[0].id}_${listings[0].id}`,
                content: 'Thank you for your interest! We\'re open to serious offers. Would you like to schedule a viewing?',
            },
            {
                senderId: users[1].id,
                receiverId: admin.id,
                listingId: listings[1].id,
                room: `${users[1].id}_${admin.id}_${listings[1].id}`,
                content: 'I\'d like to know more about the Dubai Marina villa. What are the annual maintenance costs?',
            },
            {
                senderId: admin.id,
                receiverId: users[1].id,
                listingId: listings[1].id,
                room: `${users[1].id}_${admin.id}_${listings[1].id}`,
                content: 'The annual maintenance is approximately $45,000, which covers landscaping, pool, and security services.',
            },
        ],
    })
    console.log('✅ Created messages')

    // ─── Legal Entries (7 items) ──────────────────────────────
    await prisma.legalEntry.createMany({
        data: [
            {
                title: 'Property Title Dispute – Manhattan Holdings LLC',
                description: 'Contested property title involving multiple claimants for a commercial building in Lower Manhattan. Requires quiet title action.',
                category: 'DISPUTE',
                jurisdiction: 'New York, United States',
                status: 'IN_PROGRESS',
                priority: 'HIGH',
                caseNumber: 'NYC-2024-CT-4521',
                filingDate: new Date('2024-06-15'),
                tags: JSON.stringify(['title dispute', 'commercial', 'quiet title']),
                userId: users[4].id,
            },
            {
                title: 'Cross-Border Real Estate Contract Review',
                description: 'Review and advisory for a cross-border property acquisition between UK and UAE entities. Focus on compliance with both jurisdictions.',
                category: 'CONTRACT',
                jurisdiction: 'United Kingdom / UAE',
                status: 'OPEN',
                priority: 'MEDIUM',
                caseNumber: 'LDN-2024-CR-891',
                tags: JSON.stringify(['cross-border', 'contract review', 'compliance']),
                userId: users[4].id,
            },
            {
                title: 'Zoning Variance Application – Beach Resort Development',
                description: 'Application for zoning variance to allow resort development on coastal land in Bali. Environmental impact assessment required.',
                category: 'REGULATORY',
                jurisdiction: 'Bali, Indonesia',
                status: 'OPEN',
                priority: 'HIGH',
                tags: JSON.stringify(['zoning', 'resort', 'environmental']),
                userId: admin.id,
            },
            {
                title: 'Landlord-Tenant Dispute – Commercial Lease',
                description: 'Dispute over lease termination clause in a commercial property. Tenant alleges wrongful eviction.',
                category: 'DISPUTE',
                jurisdiction: 'Lagos, Nigeria',
                status: 'IN_PROGRESS',
                priority: 'URGENT',
                caseNumber: 'LGS-2024-DIS-332',
                filingDate: new Date('2024-09-01'),
                tags: JSON.stringify(['landlord-tenant', 'commercial lease', 'eviction']),
                userId: users[4].id,
            },
            {
                title: 'Corporate Real Estate Acquisition Due Diligence',
                description: 'Full due diligence for the acquisition of a portfolio of 12 commercial properties across Southeast Asia.',
                category: 'CORPORATE',
                jurisdiction: 'Singapore / Malaysia / Thailand',
                status: 'OPEN',
                priority: 'HIGH',
                caseNumber: 'SG-2024-DD-1105',
                tags: JSON.stringify(['due diligence', 'portfolio', 'acquisition']),
                userId: users[0].id,
            },
            {
                title: 'Heritage Property Protection Order',
                description: 'Legal proceedings to protect a listed heritage building from unauthorized modifications by the current owner.',
                category: 'PROPERTY_LAW',
                jurisdiction: 'London, United Kingdom',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                caseNumber: 'LDN-2024-HP-678',
                filingDate: new Date('2024-07-20'),
                tags: JSON.stringify(['heritage', 'protection', 'listed building']),
                userId: admin.id,
            },
            {
                title: 'Property Tax Assessment Appeal',
                description: 'Appeal against excessive property tax assessment for a residential estate in San Francisco.',
                category: 'REGULATORY',
                jurisdiction: 'California, United States',
                status: 'OPEN',
                priority: 'LOW',
                caseNumber: 'SF-2024-TA-2234',
                tags: JSON.stringify(['property tax', 'assessment', 'appeal']),
                userId: users[0].id,
            },
        ],
    })
    console.log('✅ Created 7 legal entries')

    // ─── KYC Verifications ────────────────────────────────────
    await prisma.kYCVerification.createMany({
        data: [
            {
                userId: admin.id,
                documentType: 'PASSPORT',
                documentNumber: 'GB1234567',
                status: 'VERIFIED',
                submittedAt: new Date('2024-01-15'),
                verifiedAt: new Date('2024-01-16'),
            },
            {
                userId: users[0].id,
                documentType: 'DRIVERS_LICENSE',
                documentNumber: 'US-DL-998877',
                status: 'VERIFIED',
                submittedAt: new Date('2024-02-10'),
                verifiedAt: new Date('2024-02-11'),
            },
            {
                userId: users[1].id,
                documentType: 'NATIONAL_ID',
                status: 'SUBMITTED',
                submittedAt: new Date('2024-11-01'),
            },
            {
                userId: users[2].id,
                documentType: 'PASSPORT',
                status: 'PENDING',
            },
            {
                userId: users[4].id,
                documentType: 'PASSPORT',
                documentNumber: 'ES-9988776',
                status: 'VERIFIED',
                submittedAt: new Date('2024-03-05'),
                verifiedAt: new Date('2024-03-06'),
            },
        ],
    })
    console.log('✅ Created KYC verifications')

    // ─── Transaction Logs ─────────────────────────────────────
    await prisma.transactionLog.createMany({
        data: [
            {
                userId: admin.id,
                action: 'CREATE',
                entityType: 'LISTING',
                entityId: listings[1].id,
                details: JSON.stringify({ title: listings[1].title }),
            },
            {
                userId: users[0].id,
                action: 'CREATE',
                entityType: 'LISTING',
                entityId: listings[0].id,
                details: JSON.stringify({ title: listings[0].title }),
            },
            {
                userId: users[3].id,
                action: 'BOOKING',
                entityType: 'HOTEL',
                entityId: hotels[0].id,
                details: JSON.stringify({ hotelName: hotels[0].name, nights: 5 }),
            },
            {
                userId: users[3].id,
                action: 'ESCROW',
                entityType: 'ESCROW',
                entityId: listings[0].id,
                details: JSON.stringify({ amount: 4500000, status: 'PENDING' }),
            },
        ],
    })
    console.log('✅ Created transaction logs')

    console.log('\n🎉 Database seeded successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Admin login: admin@dwelzer.com / admin123')
    console.log('Test user:   sarah@dwelzer.com / password123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
