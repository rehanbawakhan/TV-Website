import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'siteSettings.json')

export async function GET() {
  try {
    const raw = await fs.promises.readFile(DATA_FILE, 'utf-8')
    const json = JSON.parse(raw)
    return NextResponse.json(json)
  } catch (err) {
    return NextResponse.json({ maintenance: {} })
  }
}

export async function POST(req: Request) {
  // public POST not allowed
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
