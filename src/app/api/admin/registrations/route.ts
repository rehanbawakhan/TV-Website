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

    let data: any[] = []
    try {
      data = await listHackathonRegistrations()
    } catch (dbErr: any) {
      // If the table is missing or DB query failed, fall back to listing JSON files from the 'hackathon' storage bucket.
      console.warn('listHackathonRegistrations failed, falling back to storage listing:', dbErr?.message || dbErr)
      try {
        const { data: objects, error: listErr } = await supabaseAdmin.storage.from('hackathon').list('', { limit: 1000 })
        if (listErr) throw listErr
        const items: any[] = []
        for (const obj of objects || []) {
          // look for details JSON files
          if (!obj.name || !obj.name.toLowerCase().endsWith('.json')) continue
          // create a short signed url to fetch the JSON content
          const { data: signed, error: signErr } = await supabaseAdmin.storage.from('hackathon').createSignedUrl(obj.name, 60)
          if (signErr || !(signed as any)?.data?.signedUrl) continue
          try {
            const res = await fetch((signed as any).data.signedUrl)
            if (!res.ok) continue
            const json = await res.json()
            // map to the expected registration shape
            items.push({
              id: obj.name,
              team_name: json.teamName || json.team_name,
              leader_name: json.teamLeader || json.leader_name,
              leader_email: json.email || json.leader_email,
              leader_phone: json.phone || json.leader_phone,
              campus: json.campus || null,
              members: json.members || [],
              experience: json.experience || null,
              idea: json.idea || null,
              proposal_pdf_url: json.proposal_pdf_url || null,
              details_url: (signed as any).data.signedUrl,
              created_at: json.created_at || null,
            })
          } catch (e) {
            // ignore malformed JSON
            continue
          }
        }
        data = items
      } catch (storageErr) {
        console.error('Storage fallback failed:', storageErr)
        throw storageErr
      }
    }

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
