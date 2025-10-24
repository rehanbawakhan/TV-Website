"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Registration = {
  id: string
  team_name?: string
  leader_name?: string
  leader_email?: string
  leader_phone?: string
  campus?: string
  members?: any
  experience?: string
  idea?: string
  proposal_pdf_url?: string
  payment_screenshot_url?: string
  created_at?: string
}

export default function AdminRegistrationsPage() {
  const [items, setItems] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [exportingDrive, setExportingDrive] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  async function fetchRegistrations() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/registrations')
      if (res.status === 401) {
        setShowLogin(true)
        return
      }
      const json = await res.json()
      if (json.success) setItems(json.data || [])
      else toast.error('Failed to load registrations')
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoading(false)
    }
  }

  function downloadCSV() {
    if (!items || items.length === 0) {
      toast('No registrations to export')
      return
    }

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

    const rows = items.map((r) => [
      r.team_name ?? '',
      r.leader_name ?? '',
      r.leader_email ?? '',
      r.leader_phone ?? '',
      r.campus ?? '',
      typeof r.members === 'string' ? r.members : JSON.stringify(r.members || []),
      r.experience ?? '',
      r.idea ?? '',
      r.proposal_pdf_url ?? '',
      r.payment_screenshot_url ?? '',
      r.created_at ?? '',
    ])

    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hackathon_registrations_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function importToSheets() {
    setImporting(true)
    try {
      const res = await fetch('/api/admin/import-to-sheets', { method: 'POST' })
      const json = await res.json()
      if (json.success) toast.success('Imported to Google Sheets')
      else toast.error('Import failed: ' + (json.error || 'unknown'))
    } catch (err: any) {
      toast.error('Network error during import')
    } finally {
      setImporting(false)
    }
  }

  async function doLogin(e?: React.FormEvent) {
    e?.preventDefault()
    setLoggingIn(true)
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } })
      const json = await res.json()
      if (json.success) {
        toast.success('Logged in')
        setShowLogin(false)
        setPassword('')
        fetchRegistrations()
      } else {
        toast.error('Login failed: ' + (json.error || ''))
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoggingIn(false)
    }
  }

  async function exportToDrive() {
    setExportingDrive(true)
    try {
      const res = await fetch('/api/admin/export-to-drive', { method: 'POST' })
      const json = await res.json()
      if (json.success) toast.success('Uploaded CSV to Google Drive')
      else toast.error('Drive export failed: ' + (json.error || 'unknown'))
    } catch (err) {
      toast.error('Network error during Drive export')
    } finally {
      setExportingDrive(false)
    }
  }

  return (
    <div className="p-6">
      {showLogin && (
        <div className="mb-4 p-4 border rounded bg-white">
          <form onSubmit={doLogin} className="flex gap-2 items-center">
            <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 rounded" />
            <button type="submit" disabled={loggingIn} className="bg-indigo-600 text-white px-3 py-2 rounded">{loggingIn ? 'Logging in...' : 'Login'}</button>
            <button type="button" onClick={() => setShowLogin(false)} className="ml-2 text-sm">Cancel</button>
          </form>
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Ignition 1.0 — Registrations</h1>
        <div className="flex gap-2">
          <button onClick={downloadCSV} className="bg-indigo-600 text-white px-3 py-2 rounded">Export CSV</button>
          <button onClick={importToSheets} disabled={importing} className="bg-green-600 text-white px-3 py-2 rounded">{importing ? 'Importing...' : 'Import to Google Sheets'}</button>
          <button onClick={exportToDrive} disabled={exportingDrive} className="bg-blue-600 text-white px-3 py-2 rounded">{exportingDrive ? 'Exporting...' : 'Export to Google Drive'}</button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-auto border rounded">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Team</th>
                <th className="px-4 py-2 text-left">Leader</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Members</th>
                <th className="px-4 py-2 text-left">Proposal</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2">{r.team_name}</td>
                  <td className="px-4 py-2">{r.leader_name} ({r.leader_phone})</td>
                  <td className="px-4 py-2">{r.leader_email}</td>
                  <td className="px-4 py-2"><pre className="whitespace-pre-wrap text-sm">{typeof r.members === 'string' ? r.members : JSON.stringify(r.members, null, 2)}</pre></td>
                  <td className="px-4 py-2">
                    {r.proposal_pdf_url ? (
                      <a className="text-indigo-600 underline" href={r.proposal_pdf_url} target="_blank" rel="noreferrer">View Proposal</a>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-2">
                    {r.payment_screenshot_url ? (
                      <a className="text-indigo-600 underline" href={r.payment_screenshot_url} target="_blank" rel="noreferrer">View Payment</a>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-2 text-sm">{new Date(r.created_at || '').toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
