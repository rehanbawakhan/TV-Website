import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
// keep this route lightweight and avoid bundling native DB drivers here.
// Migration should be run separately using the provided script `npm run db:create-hackathon-table`.

// Server-side route: accepts JSON payload with fields and optional base64 file data.
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      teamName,
      teamLeader,
      email,
      phone,
      campus,
      members,
      proposalPdf,
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    // Accept either SUPABASE_SERVICE_ROLE or SUPABASE_SERVICE_ROLE_KEY for compatibility
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY) as string
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Supabase not configured (server).' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    // Helper to upload base64 file
    const uploadBase64 = async (bucket: string, prefix: string, fileObj: any) => {
      if (!fileObj) return null
      // fileObj: { name, data } where data is dataURL or base64 string
      const name = fileObj.name || `${Date.now()}`
      const dataUrl = fileObj.data
      // Extract base64 part
      const commaIndex = dataUrl.indexOf(',')
      const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl
      const buffer = Buffer.from(base64, 'base64')
      const safeName = `${prefix}_${Date.now()}_${name.replace(/\s+/g, '_')}`

      // Ensure bucket exists (create if missing). If bucket already exists, createBucket will return an error which we can ignore.
      try {
        // Supabase storage createBucket may error if bucket exists; ignore non-fatal errors
        // @ts-ignore
        const { error: createErr } = await supabaseAdmin.storage.createBucket(bucket, { public: true })
        if (createErr) {
          // ignore create errors (bucket may already exist or permission issues)
          console.warn('createBucket error (ignored):', createErr)
        }
      } catch (e) {
        // ignore
      }

      // Upload buffer
      const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(safeName, buffer, { upsert: true })
      if (uploadError) throw uploadError
      const publicResult = supabaseAdmin.storage.from(bucket).getPublicUrl(safeName)
      const publicUrl = (publicResult as any)?.data?.publicUrl || null
      return publicUrl
    }

    // Upload files if provided
    let proposalUrl: string | null = null
    let detailsUrl: string | null = null
    let paymentUrl: string | null = null
    try {
      if (proposalPdf) {
        proposalUrl = await uploadBase64('hackathon', `${teamName}_proposal`, proposalPdf)
      }
      // payment screenshot handling removed (client no longer sends this)
    } catch (err) {
      console.error('Upload error:', err)
      return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
    }

    // Insert registration row - include all available fields. Ensure members is stored as JSONB.
    const payload: any = {
      team_name: teamName,
      leader_name: teamLeader,
      leader_email: email,
      leader_phone: phone,
      campus: campus || null,
      members: members || [],
      proposal_pdf_url: proposalUrl,
    }

    // Also upload a JSON file with the registration details to the same 'hackathon' bucket
    try {
      const detailsObj = {
        teamName,
        teamLeader,
        email,
        phone,
        campus: campus || null,
        members: members || [],
        proposal_pdf_url: proposalUrl,
        created_at: new Date().toISOString(),
      }

      const detailsBuffer = Buffer.from(JSON.stringify(detailsObj, null, 2), 'utf8')
      const safeDetailsName = `${teamName.replace(/\s+/g, '_')}_details_${Date.now()}.json`

      // Ensure bucket exists (create if missing) — uploadBase64 already attempted create earlier but do it again defensively
      try {
        // @ts-ignore
        const { error: createErr } = await supabaseAdmin.storage.createBucket('hackathon', { public: true })
        if (createErr) {
          // ignore
        }
      } catch (e) {
        // ignore
      }

      const { error: detailsUploadError } = await supabaseAdmin.storage.from('hackathon').upload(safeDetailsName, detailsBuffer, { upsert: true })
      if (!detailsUploadError) {
        const publicResult = supabaseAdmin.storage.from('hackathon').getPublicUrl(safeDetailsName)
        detailsUrl = (publicResult as any)?.data?.publicUrl || null
        // attach to payload so DB has reference
        payload.details_url = detailsUrl
      } else {
        console.warn('Failed to upload registration details JSON (continuing):', detailsUploadError)
      }
    } catch (e) {
      console.error('Details upload error (ignored):', e)
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('hackathon')
        .insert([payload])
        .select()

      if (error) {
        console.error('Insert error details:', error)

        // If table is missing (PGRST205), return a helpful error instructing the operator to run the migration.
        const code = (error as any)?.code
        if (code === 'PGRST205') {
          console.error('Table missing (PGRST205):', error)
          return NextResponse.json({
              error: 'DB insert failed - table missing',
              details: error,
              action: 'The database table "hackathon_registrations" is missing. Create it in your database (for Supabase: run the CREATE TABLE SQL in the SQL editor) or restore the migration file from the repository history and apply it.'
            }, { status: 500 })
        }

        return NextResponse.json({ error: 'DB insert failed', details: error }, { status: 500 })
      }

      return NextResponse.json({ success: true, data: data?.[0] })
    } catch (dbErr) {
      console.error('Unexpected DB error:', dbErr)
      return NextResponse.json({ error: 'Unexpected DB error', details: String(dbErr) }, { status: 500 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unhandled error' }, { status: 500 })
  }
}
