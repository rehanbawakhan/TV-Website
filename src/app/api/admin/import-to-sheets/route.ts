import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { listHackathonRegistrations } from '../../../../lib/supabaseAdmin'

type ServiceAccount = {
  client_email: string
  private_key: string
}

// POST: triggers pushing registrations to a Google Sheets spreadsheet.
// Expects environment variables:
// - GOOGLE_SERVICE_ACCOUNT (stringified JSON service account)
// - GOOGLE_SHEETS_SPREADSHEET_ID (target sheet id)

export async function POST(req: Request) {
  try {
    // require admin auth
    const { isRequestAuthorized } = await import('../../../../lib/adminAuth')
    if (!isRequestAuthorized(req)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const serviceAccountRaw = process.env.GOOGLE_SERVICE_ACCOUNT
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!serviceAccountRaw) {
      return NextResponse.json({ success: false, error: 'Missing GOOGLE_SERVICE_ACCOUNT env' }, { status: 500 })
    }
    if (!spreadsheetId) {
      return NextResponse.json({ success: false, error: 'Missing GOOGLE_SHEETS_SPREADSHEET_ID env' }, { status: 500 })
    }

    const serviceAccount = JSON.parse(serviceAccountRaw) as ServiceAccount

    const auth = new google.auth.JWT(
      serviceAccount.client_email,
      undefined,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({ version: 'v4', auth })

    // Fetch registrations
    const registrations: any[] = (await listHackathonRegistrations()) || []

    if (registrations.length === 0) {
      return NextResponse.json({ success: true, message: 'No registrations to import' })
    }

    // Prepare rows. Header will be appended if sheet is empty - we always append rows.
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

    // Append values to sheet
    const resp = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    })

    return NextResponse.json({ success: true, result: resp.data })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 })
  }
}
