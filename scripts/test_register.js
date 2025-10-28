// Simple test script to POST a sample registration to the local Next API
async function run() {
  try {
    const payload = {
      teamName: 'Test Team',
      teamLeader: 'Tester',
      email: 'tester@example.com',
      phone: '9999999999',
      campus: 'EC',
      members: [
        { name: 'Tester', srn: 'SRN123', email: 'tester@example.com', phone: '9999999999', semester: '5', section: 'A' },
        { name: 'Tester', srn: 'SRN123', email: 'tester@example.com', phone: '9999999999', semester: '5', section: 'A' }
      ],
      proposalPdf: null
    }

    const url = process.env.API_URL || 'http://localhost:3000/api/hackathon/register'
    console.log('Posting to', url)

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const text = await res.text()
    console.log('Status:', res.status)
    console.log('Response body:\n', text)
  } catch (err) {
    console.error('Request failed:', err)
  }
}

run()
