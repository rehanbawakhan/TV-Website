// Run migrations/create_hackathon.sql against DATABASE_URL
// Usage: DATABASE_URL=postgresql://... node scripts/create_hackathon_table.js
let Client
try {
  Client = require('pg').Client
} catch (e) {
  console.log('pg not installed; skipping DB migration. Install pg or run the SQL manually in Supabase.')
  process.exit(0)
}

const fs = require('fs')
const path = require('path')

async function run() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.log('DATABASE_URL not set — skipping hackathon table creation.')
    return
  }

  const client = new Client({ connectionString: url })
  await client.connect()

  try {
    const sqlPath = path.join(process.cwd(), 'migrations', 'create_hackathon.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    console.log('Running SQL from', sqlPath)
    await client.query(sql)
    console.log('hackathon table created/verified')
  } catch (err) {
    console.error('Failed to run migration:', err)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

run()
