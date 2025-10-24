import { NextResponse } from 'next/server'
import { createLoginCookieOptions } from '../../../../lib/adminAuth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const provided = body?.password
    const expected = process.env.ADMIN_PASSWORD || ''

    if (!expected) {
      return NextResponse.json({ success: false, error: 'Admin password not configured on server' }, { status: 500 })
    }

    if (provided !== expected) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
    }

    const cookie = createLoginCookieOptions()
    const res = NextResponse.json({ success: true })
    res.headers.set('Set-Cookie', cookie)
    return res
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 })
  }
}
