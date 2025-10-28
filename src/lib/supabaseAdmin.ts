import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Server-side/admin Supabase client using the service role key.
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})

export async function listHackathonRegistrations() {
  const { data, error } = await supabaseAdmin
    .from('hackathon')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getHackathonRegistrationById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('hackathon')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
