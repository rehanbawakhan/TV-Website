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
        // Payment screenshots are no longer collected from new registrations. We intentionally omit exposing them here.
      } catch (err) {
        // on error, fall back to original urls
        out.proposal_preview_url = out.proposal_preview_url || r.proposal_pdf_url
        out.payment_preview_url = out.payment_preview_url || r.payment_screenshot_url
      }
      return out
    }))

    // support exporting as CSV or XLSX via ?export=csv or ?export=xlsx
    const url = new URL(req.url)
    const exportFormat = url.searchParams.get('export')
    if (exportFormat === 'csv') {
      const header = [
        'Team Name',
        'Leader Name',
        'Leader Email',
        'Leader Phone',
        'Campus',
        'Members',
        'Experience',
        'Idea',
        'Proposal URL',
        'Proposal Preview URL',
        'Created At',
      ]
      const rows = mapped.map((r: any) => [
        r.team_name ?? r.teamName ?? '',
        r.leader_name ?? r.leaderName ?? '',
        r.leader_email ?? r.leaderEmail ?? '',
        r.leader_phone ?? r.leaderPhone ?? '',
        r.campus ?? '',
        typeof r.members === 'string' ? r.members : JSON.stringify(r.members || []),
        r.experience ?? '',
        r.idea ?? r.problem_statement ?? '',
        r.proposal_pdf_url ?? r.proposalPdfUrl ?? '',
        r.proposal_preview_url ?? '',
        r.created_at ?? ''
      ])

      const csv = [header, ...rows]
        .map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
        .join('\n')

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="hackathon_registrations.csv"'
        }
      })
    }

    // Note: xlsx export would require an additional dependency (e.g., 'xlsx') to generate
    // a proper .xlsx file server-side. For now we provide CSV export which opens in Excel.

    return NextResponse.json({ success: true, data: mapped })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}
