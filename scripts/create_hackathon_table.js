// Create hackathon_registrations table if it does not exist.
// Usage: DATABASE_URL=postgresql://... node scripts/create_hackathon_table.js
const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

async function run() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('Please set DATABASE_URL environment variable')
    process.exit(1)
  }

  const client = new Client({ connectionString: url })
  await client.connect()

  try {
    const sqlPath = path.join(process.cwd(), 'migrations', 'create_hackathon_registrations.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    console.log('Running SQL from', sqlPath)
    await client.query(sql)
    console.log('hackathon_registrations table created/verified')
  } catch (err) {
    console.error('Failed to run migration:', err)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

run()
