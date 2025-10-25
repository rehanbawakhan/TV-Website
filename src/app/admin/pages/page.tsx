"use client"

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminPages() {
  const [settings, setSettings] = useState<any>({ maintenance: {} })
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const res = await fetch('/api/admin/pages')
      if (res.status === 401) {
        setShowLogin(true)
        return
      }
      const json = await res.json()
      if (json.success) setSettings(json.data)
      else toast.error('Failed to load settings')
    } catch (err) {
      toast.error('Network error')
    }
  }

  async function toggle(page: string, val: boolean) {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/pages', { method: 'POST', body: JSON.stringify({ page, maintenance: val }), headers: { 'Content-Type': 'application/json' } })
      const json = await res.json()
      if (json.success) {
        setSettings(json.data)
        toast.success('Updated')
      } else {
        toast.error('Update failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoading(false)
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
        fetchSettings()
      } else {
        toast.error('Login failed')
      }
    } catch (err) {
      toast.error('Network error')
    } finally {
      setLoggingIn(false)
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
        <h1 className="text-2xl font-bold">Site Pages — Maintenance</h1>
      </div>

      <div className="space-y-4">
        {['about', 'gallery'].map((p) => (
          <div key={p} className="flex items-center justify-between bg-gray-800 p-4 rounded">
            <div>
              <div className="font-semibold text-white capitalize">{p}</div>
              <div className="text-sm text-gray-400">Toggle maintenance mode for this page</div>
            </div>
            <div>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" checked={!!settings.maintenance?.[p]} onChange={(e) => toggle(p, e.target.checked)} className="form-checkbox" />
                <span className="text-sm text-gray-300 ml-2">Under maintenance</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
