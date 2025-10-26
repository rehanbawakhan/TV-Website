import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { isRequestAuthorized } from '@/lib/adminAuth'

async function readJSON(filePath: string) {
  try {
    const raw = await fs.promises.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

export async function GET(req: Request) {
  if (!isRequestAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const base = path.join(process.cwd(), 'data')
  const audit = await readJSON(path.join(base, 'siteSettings.audit.json')) || []
  const signins = await readJSON(path.join(base, 'admin.signins.json')) || []
  const traffic = await readJSON(path.join(base, 'siteTraffic.json')) || []
  const actions = await readJSON(path.join(base, 'admin.actions.json')) || []
  return NextResponse.json({ success: true, data: { audit, signins, traffic, actions } })
}
