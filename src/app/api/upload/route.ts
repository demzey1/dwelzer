import { NextResponse, NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.promises.mkdir(uploadDir, { recursive: true })

  const ext = path.extname(file.name) || '.bin'
  const fileName = `${randomUUID()}${ext}`
  const filePath = path.join(uploadDir, fileName)

  await fs.promises.writeFile(filePath, buffer)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const url = `${baseUrl}/uploads/${fileName}`

  return NextResponse.json({ url })
}
