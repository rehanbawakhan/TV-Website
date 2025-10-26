import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { isRequestAuthorized } from '@/lib/adminAuth'

const ACTIONS_FILE = path.join(process.cwd(), 'data', 'admin.actions.json')

async function readActions() {
  try {
    const raw = await fs.promises.readFile(ACTIONS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

async function appendAction(entry: any) {
  await fs.promises.mkdir(path.dirname(ACTIONS_FILE), { recursive: true })
  const cur = await readActions()
  cur.push(entry)
  await fs.promises.writeFile(ACTIONS_FILE, JSON.stringify(cur, null, 2), 'utf-8')
  return entry
}

export async function POST(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { id, action, by } = body
    if (!id || !action) return NextResponse.json({ success: false, error: 'Missing id or action' }, { status: 400 })
    const entry = { id, action, by: by || 'admin', ts: new Date().toISOString() }
    await appendAction(entry)
    return NextResponse.json({ success: true, entry })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
