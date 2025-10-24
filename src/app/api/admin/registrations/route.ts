import { NextResponse } from 'next/server'
import { listHackathonRegistrations } from '../../../../lib/supabaseAdmin'
import { isRequestAuthorized } from '../../../../lib/adminAuth'
import { supabaseAdmin } from '../../../../lib/supabaseAdmin'

function extractBucketAndPath(url: string) {
  // Match /storage/v1/object/public/<bucket>/<path>
  const m = url.match(/\/storage\/v1\/object\/(?:public\/)?([^\/]+)\/(.+)$/)
  if (!m) return null
  return { bucket: m[1], path: decodeURIComponent(m[2]) }
}

export async function GET(req: Request) {
  try {
    if (!isRequestAuthorized(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const data: any[] = await listHackathonRegistrations()

    // Map and generate signed preview URLs where possible (for private buckets)
    const mapped = await Promise.all(data.map(async (r: any) => {
      const out = { ...r }
      try {
        if (r.proposal_pdf_url) {
          const info = extractBucketAndPath(r.proposal_pdf_url)
          if (info) {
            const signed = await supabaseAdmin.storage.from(info.bucket).createSignedUrl(info.path, 60)
            out.proposal_preview_url = (signed as any).data?.signedUrl || r.proposal_pdf_url
          } else {
            out.proposal_preview_url = r.proposal_pdf_url
          }
        }
        if (r.payment_screenshot_url) {
          const info = extractBucketAndPath(r.payment_screenshot_url)
          if (info) {
            const signed = await supabaseAdmin.storage.from(info.bucket).createSignedUrl(info.path, 60)
            out.payment_preview_url = (signed as any).data?.signedUrl || r.payment_screenshot_url
          } else {
            out.payment_preview_url = r.payment_screenshot_url
          }
        }
      } catch (err) {
        // on error, fall back to original urls
        out.proposal_preview_url = out.proposal_preview_url || r.proposal_pdf_url
        out.payment_preview_url = out.payment_preview_url || r.payment_screenshot_url
      }
      return out
    }))

    return NextResponse.json({ success: true, data: mapped })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}
