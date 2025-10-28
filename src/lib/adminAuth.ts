import crypto from 'crypto'

// Default admin password fallback for local/dev. IMPORTANT: for production set ADMIN_PASSWORD in env.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ProjectOmega@420'
const COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET || 'dev_secret_change_me'
const COOKIE_NAME = 'admin_auth'

export function computeAdminCookieValue() {
  // HMAC of the admin password using the cookie secret
  return crypto.createHmac('sha256', COOKIE_SECRET).update(ADMIN_PASSWORD).digest('hex')
}

export function isRequestAuthorized(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || ''
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
    if (!match) return false
    const cookieVal = match[1]
    const expected = computeAdminCookieValue()
    return cookieVal === expected
  } catch (err) {
    return false
  }
}

export function createLoginCookieOptions() {
  const secure = process.env.NODE_ENV === 'production'
  // 24 hours
  const maxAge = 60 * 60 * 24
  return `${COOKIE_NAME}=${computeAdminCookieValue()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`
}
