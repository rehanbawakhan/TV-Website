#!/usr/bin/env node
// Usage: set DATABASE_URL and run `node scripts/create_form_schema.js`
// The script will create the `form_schema` table if missing and seed a default row
// from src/data/form-schema.json if the table is empty.

const { Client } = require('pg')
const path = require('path')
const fs = require('fs')

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL environment variable is required.');
    console.error('Get the connection string from Supabase (Settings -> Database -> Connection string) and set it as DATABASE_URL.')
    process.exit(1)
  }

  const client = new Client({ connectionString: databaseUrl })
  try {
    await client.connect()
    console.log('Connected to database')

    const createSql = `
    CREATE TABLE IF NOT EXISTS public.form_schema (
      id BIGSERIAL PRIMARY KEY,
      schema JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    `

    await client.query(createSql)
    console.log('Ensure table public.form_schema exists')

    const res = await client.query('SELECT count(*) AS cnt FROM public.form_schema')
    const count = parseInt(res.rows[0].cnt, 10)
    if (count === 0) {
      // Try to read local default schema
      const schemaPath = path.join(process.cwd(), 'src', 'data', 'form-schema.json')
      let schema = {}
      try {
        const raw = fs.readFileSync(schemaPath, 'utf8')
        schema = JSON.parse(raw)
      } catch (e) {
        console.warn('Could not read src/data/form-schema.json, inserting empty schema')
      }

      await client.query('INSERT INTO public.form_schema (schema) VALUES ($1)', [schema])
      console.log('Inserted default schema into public.form_schema')
    } else {
      console.log(`Table already has ${count} row(s) — skipping seed.`)
    }
  } catch (err) {
    console.error('Error executing script:', err)
    process.exitCode = 2
  } finally {
    await client.end()
  }
}

main()
