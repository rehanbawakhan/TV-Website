import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
      experience,
      idea,
      proposalPdf,
      paymentScreenshot,
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
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
      // Upload buffer
      const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(safeName, buffer, { upsert: true })
      if (uploadError) throw uploadError
      const publicResult = supabaseAdmin.storage.from(bucket).getPublicUrl(safeName)
      const publicUrl = (publicResult as any)?.data?.publicUrl || null
      return publicUrl
    }

    // Upload files if provided
    let proposalUrl: string | null = null
    let paymentUrl: string | null = null
    try {
      if (proposalPdf) {
        proposalUrl = await uploadBase64('hackathon', `${teamName}_proposal`, proposalPdf)
      }
      if (paymentScreenshot) {
        paymentUrl = await uploadBase64('hackathon', `${teamName}_payment`, paymentScreenshot)
      }
    } catch (err) {
      console.error('Upload error:', err)
      return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
    }

    // Insert registration row
    const payload = {
      team_name: teamName,
      leader_name: teamLeader,
      leader_email: email,
      leader_phone: phone,
      campus: campus || null,
      members: members || [],
      experience: experience || null,
      idea: idea || null,
      proposal_pdf_url: proposalUrl,
      payment_screenshot_url: paymentUrl,
    }

    const { data, error } = await supabaseAdmin
      .from('hackathon_registrations')
      .insert([payload])
      .select()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data?.[0] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unhandled error' }, { status: 500 })
  }
}
