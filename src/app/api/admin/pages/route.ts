import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { isRequestAuthorized } from '@/lib/adminAuth'

const DATA_FILE = path.join(process.cwd(), 'data', 'siteSettings.json')

async function readSettings() {
  try {
    const raw = await fs.promises.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    return { maintenance: {} }
  }
}

async function writeSettings(json: any) {
  await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.promises.writeFile(DATA_FILE, JSON.stringify(json, null, 2), 'utf-8')
}

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const json = await readSettings()
  return NextResponse.json({ success: true, data: json })
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { page, maintenance } = body
    const settings = await readSettings()
    settings.maintenance = settings.maintenance || {}
    settings.maintenance[page] = !!maintenance
    await writeSettings(settings)
    return NextResponse.json({ success: true, data: settings })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
