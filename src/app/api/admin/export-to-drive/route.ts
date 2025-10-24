import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { listHackathonRegistrations } from '../../../../lib/supabaseAdmin'

type ServiceAccount = {
  client_email: string
  private_key: string
}

export async function POST(req: Request) {
  try {
    const { isRequestAuthorized } = await import('../../../../lib/adminAuth')
    if (!isRequestAuthorized(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT
    const driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID // optional

    if (!serviceAccountRaw) {
      return NextResponse.json({ success: false, error: 'Missing GOOGLE_SERVICE_ACCOUNT env' }, { status: 500 })
    }

    const serviceAccount = JSON.parse(serviceAccountRaw) as ServiceAccount

    const auth = new google.auth.JWT(
      serviceAccount.client_email,
      undefined,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/drive.file']
    )

    const drive = google.drive({ version: 'v3', auth })

    const registrations: any[] = (await listHackathonRegistrations()) || []

    if (registrations.length === 0) {
      return NextResponse.json({ success: true, message: 'No registrations to export' })
    }

    // Build CSV
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
      'Payment URL',
      'Created At',
    ]

    const rows = registrations.map((r) => [
      r.team_name ?? r.teamName ?? '',
      r.leader_name ?? r.leaderName ?? '',
      r.leader_email ?? r.leaderEmail ?? '',
      r.leader_phone ?? r.leaderPhone ?? '',
      r.campus ?? '',
      typeof r.members === 'string' ? r.members : JSON.stringify(r.members || []),
      r.experience ?? '',
      r.idea ?? r.problem_statement ?? '',
      r.proposal_pdf_url ?? r.proposalPdfUrl ?? '',
      r.payment_screenshot_url ?? r.paymentScreenshotUrl ?? '',
      r.created_at ?? ''
    ])

    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    // Create file on Drive
    const fileMetadata: any = {
      name: `hackathon_registrations_${Date.now()}.csv`,
      mimeType: 'text/csv',
    }
    if (driveFolderId) fileMetadata.parents = [driveFolderId]

    const media = {
      mimeType: 'text/csv',
      body: Buffer.from(csv, 'utf8'),
    }

    const resp = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, webViewLink, webContentLink'
    })

    return NextResponse.json({ success: true, file: resp.data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}
