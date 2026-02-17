import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const rawDatabaseUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
const sqlitePath = rawDatabaseUrl.startsWith('file:')
  ? rawDatabaseUrl.slice('file:'.length)
  : rawDatabaseUrl
const adapter = new PrismaBetterSqlite3({
  url: path.resolve(process.cwd(), sqlitePath),
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
