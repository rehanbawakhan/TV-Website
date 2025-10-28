import { NextResponse } from 'next/server'
import { createLoginCookieOptions } from '../../../../lib/adminAuth'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
  const body = await req.json()
  const provided = body?.password
  const username = body?.username || 'unknown'
  // fallback to default password when env is not set (useful for local/dev). In production, set ADMIN_PASSWORD.
  const expected = process.env.ADMIN_PASSWORD || 'ProjectOmega@420'
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('x-client-ip') || 'unknown'

    if (!expected) {
      return NextResponse.json({ success: false, error: 'Admin password not configured on server' }, { status: 500 })
    }

    if (provided !== expected) {
      // log failed attempt
      try {
        const LOG = path.join(process.cwd(), 'data', 'admin.signins.json')
        await fs.promises.mkdir(path.dirname(LOG), { recursive: true })
        const currentRaw = await fs.promises.readFile(LOG, 'utf-8').catch(() => '[]')
        const current = JSON.parse(currentRaw || '[]')
        current.push({ ts: new Date().toISOString(), ip, username, success: false })
        await fs.promises.writeFile(LOG, JSON.stringify(current, null, 2), 'utf-8')
      } catch (e) {
        // ignore logging errors
      }
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
    }

    // successful login - append signin
    try {
      const LOG = path.join(process.cwd(), 'data', 'admin.signins.json')
      await fs.promises.mkdir(path.dirname(LOG), { recursive: true })
      const currentRaw = await fs.promises.readFile(LOG, 'utf-8').catch(() => '[]')
      const current = JSON.parse(currentRaw || '[]')
      current.push({ ts: new Date().toISOString(), ip, username, success: true })
      await fs.promises.writeFile(LOG, JSON.stringify(current, null, 2), 'utf-8')
    } catch (e) {
      // ignore logging errors
    }

    const cookie = createLoginCookieOptions()
    const res = NextResponse.json({ success: true })
    res.headers.set('Set-Cookie', cookie)
    return res
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 })
  }
}
