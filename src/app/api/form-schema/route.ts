import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { supabase } from '@/lib/supabase'

const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const SCHEMA_FILE = path.join(DATA_DIR, 'form-schema.json')

async function ensureSchemaFile() {
  try {
    await fs.promises.mkdir(DATA_DIR, { recursive: true })
    try {
      await fs.promises.access(SCHEMA_FILE)
    } catch (e) {
      const defaultSchema = {
        title: 'Ignition 1.0 Registration',
        fields: [
          { name: 'teamName', label: 'Team Name', type: 'text', required: true },
          { name: 'teamLeader', label: 'Team Leader', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'campus', label: 'Campus', type: 'select', options: ['EC','RR'], required: false },
          { name: 'members', label: 'Members', type: 'members', required: true },
          { name: 'experience', label: 'Experience', type: 'textarea', required: true },
          { name: 'idea', label: 'Idea', type: 'textarea', required: true },
          { name: 'proposalPdf', label: 'Proposed Solution (PDF)', type: 'file', accept: 'application/pdf', required: false }
        ]
      }
      await fs.promises.writeFile(SCHEMA_FILE, JSON.stringify(defaultSchema, null, 2), 'utf8')
    }
  } catch (err) {
    // ignore - will handle errors in callers
  }
}

async function readFileSchema() {
  await ensureSchemaFile()
  const raw = await fs.promises.readFile(SCHEMA_FILE, 'utf8')
  return JSON.parse(raw)
}

// Try Supabase first; fall back to file system.
export async function GET() {
  try {
    try {
      const { data, error } = await supabase
        .from('form_schema')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)

      if (!error && data && data.length > 0) {
        const row = (data as any)[0]
        if (row && row.schema) return NextResponse.json(row.schema)
      }
    } catch (e) {
      // supabase not available or query failed; fallback below
    }

    const json = await readFileSchema()
    return NextResponse.json(json)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read schema' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Server-side protection: if FORM_SCHEMA_SECRET or SUPABASE_SERVICE_ROLE is set
    // require a matching header to allow saving. This prevents unauthenticated
    // edits when deployed. For local dev, if neither env var is set, the PUT is
    // allowed to preserve existing behavior.
    const configuredSecret = process.env.FORM_SCHEMA_SECRET
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE

    if (configuredSecret || serviceRole) {
      const headerSecret = req.headers.get('x-form-schema-secret')
      const authHeader = req.headers.get('authorization') || ''
      const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
      const ok = (configuredSecret && headerSecret === configuredSecret) || (serviceRole && bearer === serviceRole)
      if (!ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await req.json()
    if (!body) return NextResponse.json({ error: 'Missing body' }, { status: 400 })

    // Try writing to Supabase (best-effort)
    try {
      // Insert a new row; table assumed to have columns: id, schema (jsonb), created_at
      const { error } = await supabase.from('form_schema').insert([{ schema: body }])
      if (error) {
        // If insert fails, try to update latest row
        const latest = await supabase.from('form_schema').select('*').order('created_at', { ascending: false }).limit(1)
        if (latest.data && latest.data.length > 0) {
          const id = (latest.data as any)[0].id
          await supabase.from('form_schema').update({ schema: body }).eq('id', id)
        }
      }
    } catch (e) {
      // ignore Supabase errors
    }

    // Write to file as fallback for local development
    try {
      await ensureSchemaFile()
      await fs.promises.writeFile(SCHEMA_FILE, JSON.stringify(body, null, 2), 'utf8')
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save schema' }, { status: 500 })
  }
}
