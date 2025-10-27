'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'

interface HackathonSubmission {
  id: string
  teamName: string
  teamLeader: string
  email: string
  phone: string
  members: Array<{
    name: string
    srn: string
    email: string
    phone: string
    semester: string
    section: string
  }>
  submittedAt: string
}

interface JoinRequest {
  id: string
  name: string
  email: string
  phone: string
  domain: string
  experience: string
  submittedAt: string
}

interface Announcement {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'error'
  createdAt: string
  active: boolean
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [recruitmentOpen, setRecruitmentOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - In a real app, this would come from a database
  const [hackathonSubmissions] = useState<HackathonSubmission[]>([
    {
      id: '1',
      teamName: 'Racing Legends',
      teamLeader: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      members: [
        { name: 'John Doe', srn: 'PES1UG21CS001', email: 'john@example.com', phone: '+91 9876543210', semester: '7', section: 'A' },
        { name: 'Jane Smith', srn: 'PES1UG21CS002', email: 'jane@example.com', phone: '+91 9876543211', semester: '7', section: 'A' },
      ],
      submittedAt: '2024-10-12T10:30:00Z'
    },
    {
      id: '2',
      teamName: 'Tech Innovators',
      teamLeader: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+91 9876543220',
      members: [
        { name: 'Alice Johnson', srn: 'PES1UG21CS003', email: 'alice@example.com', phone: '+91 9876543220', semester: '6', section: 'B' },
        { name: 'Bob Wilson', srn: 'PES1UG21CS004', email: 'bob@example.com', phone: '+91 9876543221', semester: '6', section: 'B' },
        { name: 'Carol Davis', srn: 'PES1UG21CS005', email: 'carol@example.com', phone: '+91 9876543222', semester: '6', section: 'B' },
      ],
      submittedAt: '2024-10-12T14:15:00Z'
    }
  ])

  const [joinRequests] = useState<JoinRequest[]>([
    {
      id: '1',
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      phone: '+91 9876543230',
      domain: 'Robotics',
      experience: 'Arduino projects, Machine Learning basics',
      submittedAt: '2024-10-11T09:00:00Z'
    },
    {
      id: '2',
      name: 'Kyle Reese',
      email: 'kyle@example.com',
      phone: '+91 9876543231',
      domain: 'Automotive',
      experience: 'CAD design, Engine tuning',
      submittedAt: '2024-10-11T16:45:00Z'
    }
  ])

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'VegaHack 2024 Registration Open',
      content: 'Registration for VegaHack 2024 is now open! Join us for 48 hours of intensive coding and innovation.',
      type: 'success',
      createdAt: '2024-10-10T12:00:00Z',
      active: true
    },
    {
      id: '2',
      title: 'Workshop on Autonomous Vehicles',
      content: 'Learn about the latest developments in autonomous vehicle technology this Saturday.',
      type: 'info',
      createdAt: '2024-10-09T15:30:00Z',
      active: true
    }
  ])

  // Form schema editor state
  const [formEditorVisible, setFormEditorVisible] = useState(false)
  const [schemaText, setSchemaText] = useState('')
  const [schemaLoading, setSchemaLoading] = useState(false)
  const [schemaError, setSchemaError] = useState('')
  const [schemaObj, setSchemaObj] = useState<any | null>(null)
  const [savingSchema, setSavingSchema] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === 'Admin' && password === 'ProjectOmega@420') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Access denied.')
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setActiveTab('dashboard')
  }

  // Load recruitment status from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recruitment_open')
      setRecruitmentOpen(stored === 'true')
    } catch (e) {
      setRecruitmentOpen(false)
    }
  }, [])

  const toggleRecruitment = () => {
    const next = !recruitmentOpen
    setRecruitmentOpen(next)
    try {
      localStorage.setItem('recruitment_open', next ? 'true' : 'false')
    } catch (e) {
      // ignore
    }
  }

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, active: !ann.active } : ann
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Load schema when entering hackathon tab
  useEffect(() => {
    let mounted = true
    if (activeTab === 'hackathon') {
      ;(async () => {
        setSchemaLoading(true)
        setSchemaError('')
        try {
          const res = await fetch('/api/form-schema')
          if (!res.ok) throw new Error('Failed to load schema')
          const json = await res.json()
          if (!mounted) return
          setSchemaText(JSON.stringify(json, null, 2))
          setSchemaObj(json)
        } catch (e: any) {
          if (!mounted) return
          setSchemaError(e?.message || 'Error loading schema')
        } finally {
          if (!mounted) return
          setSchemaLoading(false)
        }
      })()
    }
    return () => { mounted = false }
  }, [activeTab])

  const saveSchema = async () => {
    setSchemaError('')
    setSavingSchema(true)
    try {
      const toSave = schemaObj || (schemaText ? JSON.parse(schemaText) : null)
      if (!toSave) throw new Error('No schema to save')
      const res = await fetch('/api/form-schema', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave)
      })
      if (!res.ok) throw new Error('Failed to save schema')
      // give simple feedback
      setFormEditorVisible(false)
      // refetch and normalize
      const r2 = await fetch('/api/form-schema')
      if (r2.ok) {
        const json = await r2.json()
        setSchemaText(JSON.stringify(json, null, 2))
        setSchemaObj(json)
      }
    } catch (e: any) {
      setSchemaError(e?.message || 'Failed to save schema')
    } finally {
      setSavingSchema(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-red-500/20"
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  borderColor: [
                    'rgba(239, 68, 68, 0.1)',
                    'rgba(249, 115, 22, 0.1)',
                    'rgba(239, 68, 68, 0.1)'
                  ]
                }}
                transition={{ 
                  duration: 6, 
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        {/* Danger scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
              style={{ top: `${15 + i * 20}%` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          className="bg-gray-900/80 backdrop-blur-sm border-2 border-red-500/50 rounded-xl p-8 w-full max-w-md relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Warning header */}
          <motion.div
            className="text-center mb-6"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 1)',
                '0 0 10px rgba(239, 68, 68, 0.8)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-4xl mb-2">⚠️</div>
            <h1 className="text-2xl font-bold text-red-400">RESTRICTED ACCESS</h1>
            <p className="text-gray-400 text-sm">Authorized Personnel Only</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter password"
                required
              />
            </div>

            {loginError && (
              <motion.div
                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-lg p-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {loginError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'ACCESS SYSTEM'
              )}
            </motion.button>
          </form>

          {/* Security notice */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span>🔒</span>
              <span>ENCRYPTED CONNECTION</span>
            </div>
            <p>All activities are monitored and logged</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Admin Header */}
      <section className="pt-20 pb-8 px-4 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-400">Vegavath Technical Club</p>
              </div>
            </motion.div>

            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
            
            {/* Recruitment toggle */}
            <div className="ml-4 flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${recruitmentOpen ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {recruitmentOpen ? 'Recruitment Open' : 'Recruitment Closed'}
              </div>
              <button
                onClick={toggleRecruitment}
                className="px-3 py-1 bg-gray-800/40 text-sm rounded-lg hover:bg-gray-800/60 transition-colors"
              >
                Toggle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'hackathon', name: 'Ignition 1.0', icon: '🏁' },
              { id: 'join-requests', name: 'Join Requests', icon: '👥' },
              { id: 'announcements', name: 'Announcements', icon: '📢' },
              { id: 'content', name: 'Content', icon: '📝' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[
                  { title: 'Ignition 1.0 Registrations', value: hackathonSubmissions.length, icon: '🏁', color: 'orange' },
                  { title: 'Join Requests', value: joinRequests.length, icon: '👥', color: 'blue' },
                  { title: 'Active Announcements', value: announcements.filter(a => a.active).length, icon: '📢', color: 'green' },
                  { title: 'Total Members', value: '87', icon: '🏆', color: 'purple' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                      </div>
                      <div className="text-4xl">{stat.icon}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'hackathon' && (
              <motion.div
                key="hackathon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Ignition 1.0 Registrations</h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setFormEditorVisible(prev => !prev)}
                      className="px-3 py-2 bg-gray-800/40 hover:bg-gray-800/60 text-sm rounded-lg"
                    >
                      {formEditorVisible ? 'Close Form Editor' : 'Edit Registration Form'}
                    </button>
                    <a href="/ignition" target="_blank" rel="noreferrer" className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">
                      Open Public Form
                    </a>
                  </div>
                </div>

                {formEditorVisible && (
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Form Builder</h3>
                    {schemaLoading ? (
                      <div className="text-gray-400">Loading schema...</div>
                    ) : schemaError ? (
                      <div className="text-red-400">{schemaError}</div>
                    ) : (
                      <div>
                        {/* Builder list */}
                        <div className="space-y-3">
                          {(schemaObj?.fields || []).map((field: any, idx: number) => (
                            <div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="text-sm text-gray-300 font-medium">Field {idx + 1}</div>
                                  <div className="text-xs text-gray-400">({field.type})</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => {
                                      if (idx === 0) return
                                      const f = [...(schemaObj.fields || [])]
                                      const tmp = f[idx - 1]
                                      f[idx - 1] = f[idx]
                                      f[idx] = tmp
                                      setSchemaObj({ ...schemaObj, fields: f })
                                    }}
                                    className="px-2 py-1 bg-gray-700 rounded text-sm"
                                  >↑</button>
                                  <button
                                    onClick={() => {
                                      if (idx === (schemaObj.fields || []).length - 1) return
                                      const f = [...(schemaObj.fields || [])]
                                      const tmp = f[idx + 1]
                                      f[idx + 1] = f[idx]
                                      f[idx] = tmp
                                      setSchemaObj({ ...schemaObj, fields: f })
                                    }}
                                    className="px-2 py-1 bg-gray-700 rounded text-sm"
                                  >↓</button>
                                  <button
                                    onClick={() => {
                                      const f = (schemaObj.fields || []).filter((_: any, i: number) => i !== idx)
                                      setSchemaObj({ ...schemaObj, fields: f })
                                    }}
                                    className="px-2 py-1 bg-red-600 rounded text-sm text-white"
                                  >Remove</button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input
                                  value={field.label || ''}
                                  onChange={(e) => {
                                    const f = [...(schemaObj.fields || [])]
                                    f[idx] = { ...f[idx], label: e.target.value }
                                    setSchemaObj({ ...schemaObj, fields: f })
                                  }}
                                  className="p-2 bg-gray-900 border border-gray-700 rounded text-white"
                                  placeholder="Label"
                                />
                                <input
                                  value={field.name || ''}
                                  onChange={(e) => {
                                    const f = [...(schemaObj.fields || [])]
                                    f[idx] = { ...f[idx], name: e.target.value }
                                    setSchemaObj({ ...schemaObj, fields: f })
                                  }}
                                  className="p-2 bg-gray-900 border border-gray-700 rounded text-white"
                                  placeholder="Name (key)"
                                />
                                <select
                                  value={field.type || 'text'}
                                  onChange={(e) => {
                                    const f = [...(schemaObj.fields || [])]
                                    f[idx] = { ...f[idx], type: e.target.value }
                                    setSchemaObj({ ...schemaObj, fields: f })
                                  }}
                                  className="p-2 bg-gray-900 border border-gray-700 rounded text-white"
                                >
                                  <option value="text">Text</option>
                                  <option value="email">Email</option>
                                  <option value="tel">Phone</option>
                                  <option value="textarea">Textarea</option>
                                  <option value="select">Select</option>
                                  <option value="members">Members (special)</option>
                                  <option value="file">File</option>
                                </select>
                              </div>

                              <div className="flex items-center space-x-3 mt-3">
                                <label className="text-sm text-gray-300 inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={!!field.required}
                                    onChange={(e) => {
                                      const f = [...(schemaObj.fields || [])]
                                      f[idx] = { ...f[idx], required: e.target.checked }
                                      setSchemaObj({ ...schemaObj, fields: f })
                                    }}
                                    className="mr-2"
                                  />
                                  Required
                                </label>
                                {field.type === 'select' && (
                                  <input
                                    value={(field.options || []).join(',')}
                                    onChange={(e) => {
                                      const opts = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                                      const f = [...(schemaObj.fields || [])]
                                      f[idx] = { ...f[idx], options: opts }
                                      setSchemaObj({ ...schemaObj, fields: f })
                                    }}
                                    className="p-2 bg-gray-900 border border-gray-700 rounded text-white"
                                    placeholder="Options (comma separated)"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center space-x-3">
                          <button
                            onClick={() => {
                              const f = schemaObj?.fields ? [...schemaObj.fields] : []
                              const idx = f.length + 1
                              f.push({ name: `field_${idx}`, label: 'New Field', type: 'text', required: false })
                              setSchemaObj({ ...(schemaObj || { title: 'Custom Form' }), fields: f })
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                          >
                            Add Field
                          </button>

                          <button
                            onClick={async () => await saveSchema()}
                            disabled={savingSchema}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                          >
                            {savingSchema ? 'Saving…' : 'Save Schema'}
                          </button>

                          <button
                            onClick={() => { setFormEditorVisible(false); /* discard changes visually */ }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>

                        {schemaError && <div className="mt-2 text-red-400">{schemaError}</div>}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {hackathonSubmissions.map((submission) => (
                    <motion.div
                      key={submission.id}
                      className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{submission.teamName}</h3>
                          <p className="text-gray-400">Leader: {submission.teamLeader}</p>
                          <p className="text-gray-400 text-sm">Submitted: {formatDate(submission.submittedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400">Contact</p>
                          <p className="text-white">{submission.email}</p>
                          <p className="text-white">{submission.phone}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-700/50 pt-4">
                        <h4 className="text-white font-semibold mb-2">Team Members ({submission.members.length})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {submission.members.map((member, index) => (
                            <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                              <p className="text-white font-medium">{member.name}</p>
                              <p className="text-gray-400 text-sm">SRN: {member.srn}</p>
                              <p className="text-gray-400 text-sm">Sem {member.semester}, Sec {member.section}</p>
                              <p className="text-gray-400 text-sm">{member.email}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'join-requests' && (
              <motion.div
                key="join-requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Join Requests</h2>
                
                <div className="space-y-4">
                  {joinRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{request.name}</h3>
                          <p className="text-orange-400 font-medium">{request.domain}</p>
                          <p className="text-gray-400 text-sm">Submitted: {formatDate(request.submittedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{request.email}</p>
                          <p className="text-white">{request.phone}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 border-t border-gray-700/50 pt-4">
                        <h4 className="text-white font-semibold mb-2">Experience</h4>
                        <p className="text-gray-300">{request.experience}</p>
                      </div>
                      
                      <div className="mt-4 flex space-x-3">
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                          Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Announcements</h2>
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                    Add Announcement
                  </button>
                </div>
                
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <motion.div
                      key={announcement.id}
                      className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              announcement.type === 'success' ? 'bg-green-500/20 text-green-400' :
                              announcement.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                              announcement.type === 'error' ? 'bg-red-500/20 text-red-400' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {announcement.type}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">{announcement.content}</p>
                          <p className="text-gray-400 text-sm">Created: {formatDate(announcement.createdAt)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAnnouncement(announcement.id)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              announcement.active 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'bg-gray-600 hover:bg-gray-700 text-white'
                            }`}
                          >
                            {announcement.active ? 'Active' : 'Inactive'}
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            ✏️
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            🗑️
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-white">Content Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: 'About Page', icon: '📖', description: 'Edit club information and history' },
                    { name: 'Crew Page', icon: '👥', description: 'Manage team member profiles' },
                    { name: 'Gallery', icon: '📸', description: 'Upload and organize photos' }
                  ].map((item) => (
                    <motion.div
                      key={item.name}
                      className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                        Edit Content
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}