"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navigation from '../../components/Navigation'
import toast from 'react-hot-toast'

interface Member {
  name: string
  srn: string
  email: string
  phone: string
  // semester may be one or more selections (checkbox-style); store as string[] for consistency
  semester: string[]
  section: string
  department?: string[]
  hostel?: string[]
  // Payment upload preview/holder (client only) - serialized to { name, data } (data is dataURL) when sending
  paymentName?: string
  paymentDataUrl?: string
}

interface FormData {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  members: Member[]
  campus?: string
  proposalPdf?: File | null
  
}

export default function HackathonRegister() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formSchema, setFormSchema] = useState<any | null>(null)
  const [proposalError, setProposalError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stepError, setStepError] = useState<string | null>(null)
  const [memberErrors, setMemberErrors] = useState<(string | null)[]>([null, null, null, null])
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamLeader: '',
    email: '',
    phone: '',
    members: [
      { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
      { name: '', srn: '', email: '', phone: '', semester: [], section: '' }
    ],
    campus: '',
    proposalPdf: null,
  })

  const handleNext = () => {
    setStepError(null)
    setMemberErrors([null, null, null, null])
    if (step < 3) {
      // run validation and show errors if any
      const valid = isStepValid()
      if (valid) {
        setStep(step + 1)
      } else {
        // build human-friendly messages
        if (step === 1) {
          setStepError('Please fill all required fields on this step and ensure email/phone are valid.')
        }
        if (step === 2) {
          // per-member missing fields
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          const phoneRegex = /^\d{10}$/
          const errs: (string | null)[] = [null, null, null, null]
          formData.members.forEach((member, idx) => {
            if (idx >= 3) return
            const missing: string[] = []
            if (!member.name || !member.name.trim()) missing.push('Name')
            if (!member.srn || !member.srn.trim()) missing.push('SRN')
            if (!member.email || !member.email.trim() || !emailRegex.test(member.email)) missing.push('Email')
            if (!member.phone || !member.phone.trim() || !phoneRegex.test(member.phone)) missing.push('Phone')
            const semOk = Array.isArray(member.semester) && member.semester.length > 0
            if (!semOk) missing.push('Semester')
            if (!member.section || !member.section.trim()) missing.push('Section')
            const deptOk = (member as any).department ? ((Array.isArray((member as any).department) ? (member as any).department.length > 0 : !!(member as any).department)) : false
            if (!deptOk) missing.push('Department')
            const hostelOk = (member as any).hostel ? ((Array.isArray((member as any).hostel) ? (member as any).hostel.length > 0 : !!(member as any).hostel)) : false
            if (!hostelOk) missing.push('Hostel/Day Scholar')
            if (!member.paymentDataUrl) missing.push('Payment acknowledgement')
            errs[idx] = missing.length ? `Missing: ${missing.join(', ')}` : null
          })
          setMemberErrors(errs)
          setStepError('Please complete the highlighted member fields before continuing.')
        }
      }
    }
  }
  
  const isStepValid = () => {
    switch (step) {
      case 1: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
        return (
          !!formData.teamName.trim() &&
          !!formData.teamLeader.trim() &&
          !!formData.email.trim() &&
          emailRegex.test(formData.email) &&
          !!formData.phone.trim() &&
          phoneRegex.test(formData.phone)
        )
      }
      case 2: {
        // Require at least 3 members with complete details (name, srn, email, phone, semester, section)
        // Additionally require payment acknowledgements for the first 3 members always,
        // and for member 4 only if that member exists (name provided).
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
    const completeMembers = formData.members.filter(member => (
      member.name && member.name.trim() && 
      member.srn && member.srn.trim() && 
      member.email && member.email.trim() && emailRegex.test(member.email) && 
      member.phone && member.phone.trim() && phoneRegex.test(member.phone) && 
            Array.isArray(member.semester) && member.semester.length > 0 &&
      member.section && member.section.trim()
    ))

        // Payment checks: first three must have payments (since min team size 3). Fourth required only if present.
        const paymentsOk = formData.members.slice(0, 3).every((m) => !!m.paymentDataUrl) &&
          formData.members.slice(3).every((m) => !m.name || !!m.paymentDataUrl)

        return completeMembers.length >= 3 && paymentsOk
      }
      case 3:
        // final review step - no additional required fields
        return true
      default:
        return true
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // Prevent spamming the submit button and redirect immediately when a proposal is present.
    if (submitting) return
    setSubmitting(true)

    // Launch background submission (do not await) so the user is redirected instantly.
    ;(async () => {
      try {
        const filteredMembers = formData.members.filter((m) => m.name && m.name.trim())

        const payload = {
          teamName: formData.teamName,
          teamLeader: formData.teamLeader,
          email: formData.email,
          phone: formData.phone,
          campus: formData.campus,
          members: filteredMembers,
          // proposal removed per updated flow — will be provided later via WhatsApp group
          proposalPdf: null,
        }

        const res = await fetch('/api/hackathon/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          let resultText = ''
          try { resultText = await res.text() } catch (e) { resultText = '' }
          let parsed: any = null
          try { parsed = JSON.parse(resultText) } catch (e) { parsed = null }
          console.error('Background registration error', { status: res.status, body: parsed ?? resultText })
        }
      } catch (error) {
        console.error('Background submission failed:', error)
      } finally {
        // Keep submitting true long enough to avoid accidental re-clicks during navigation.
        // It's safe to clear it after a short delay in case the user navigates back.
        setTimeout(() => setSubmitting(false), 3000)
      }
    })()

    // Immediately redirect the user to the submitted page to avoid double submissions.
    toast.success('Registration submitted — details saved. Redirecting...')
    router.push('/hackathon/submitted')
  }

  // fetch form schema if available to allow admin-driven forms
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/form-schema')
        if (!res.ok) return
        const json = await res.json()
        if (!mounted) return
        setFormSchema(json)
      } catch (e) {
        // ignore
      }
    })()
    return () => { mounted = false }
  }, [])

  // No payment flow for Ignition registrations — final step is a plain confirmation.

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 modern-title">
              <span className="text-transparent bg-clip-text bg-gradient-orange">
                Ignition 1.0
              </span>{' '}
              Registration
            </h1>
            <p className="text-gray-400 text-lg modern-body">
              Register your team for Ignition 1.0 — bring your proposed solutions and race to build the best project.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold modern-body
                    ${step >= num ? 'bg-primary-orange text-white' : 'bg-gray-700 text-gray-400'}`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-orange h-2 rounded-full"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <motion.div
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Hackathon Registration Details</h2>
                      <div className="space-y-4">
                          {stepError && step === 1 && (
                            <div className="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md">{stepError}</div>
                          )}
                  {formSchema && Array.isArray(formSchema.fields) ? (
                    (() => {
                      const fields = formSchema.fields as any[]
                      const membersIndex = fields.findIndex(f => f.type === 'members')
                      const stepFields = membersIndex === -1 ? fields : fields.slice(0, membersIndex)
                      return (
                        <div className="space-y-4">
                          {stepFields.map((field) => {
                            const key = field.name
                            // Hide the proposal PDF input from the registration form per updated flow
                            if (key === 'proposalPdf') return null
                            const value = (formData as any)[key] || ''
                            if (field.type === 'select') {
                              return (
                                <select
                                  key={key}
                                  value={value}
                                  onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                                >
                                  <option value="">Select {field.label || key}</option>
                                  {(field.options || []).map((opt: string) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              )
                            }

                            if (field.type === 'textarea') {
                              return (
                                <textarea
                                  key={key}
                                  placeholder={field.label || key}
                                  value={value}
                                  onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                                />
                              )
                            }

                            if (field.type === 'file') {
                              // Skip rendering file inputs (especially proposalPdf which is handled separately)
                              return null
                            }

                            // default to input types
                            return (
                              <input
                                key={key}
                                type={field.type === 'email' || field.type === 'tel' ? field.type : 'text'}
                                placeholder={field.label || key}
                                value={value}
                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              />
                            )
                          })}
                        </div>
                      )
                    })()
                  ) : (
                    <>
                      <div>
                        <label className="text-sm text-gray-300 block mb-1">Team Name <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          placeholder="Team Name"
                          value={formData.teamName}
                          onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">Team Leader Name <span className="text-red-400">*</span></label>
                          <input
                            type="text"
                            placeholder="Team Leader Name"
                            value={formData.teamLeader}
                            onChange={(e) => setFormData({...formData, teamLeader: e.target.value})}
                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            required
                          />
                        </div>
                        <select
                          value={formData['campus'] || ''}
                          onChange={(e) => setFormData({...formData, campus: e.target.value})}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="">Select Campus (EC / RR)</option>
                          <option value="EC">EC</option>
                          <option value="RR">RR</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">Email <span className="text-red-400">*</span></label>
                          <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${stepError && step === 1 && /email/i.test(stepError) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                            required
                          />
                          {stepError && step === 1 && /email/i.test(stepError) && (
                            <div className="text-sm text-red-400 mt-1">Invalid email address</div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm text-gray-300 block mb-1">Phone Number <span className="text-red-400">*</span></label>
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${stepError && step === 1 && /phone/i.test(stepError) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                            required
                          />
                          {stepError && step === 1 && /phone/i.test(stepError) && (
                            <div className="text-sm text-red-400 mt-1">Invalid phone number (10 digits expected)</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                {/* Payment example images - show how to pay before member details */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Payment instructions</h3>
                  <p className="text-gray-400 text-sm mb-3">Please take a screenshot of your payment/acknowledgement. Upload each member's payment below. Example screenshots:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <img src="/images/Payment1.png" alt="Payment example 1" className="w-full rounded-lg border border-gray-700" />
                    <img src="/images/Payment2.png" alt="Payment example 2" className="w-full rounded-lg border border-gray-700" />
                    <img src="/images/Payment3.png" alt="Payment example 3" className="w-full rounded-lg border border-gray-700" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">Member Details (Team size: 3-4)</h2>
                <p className="text-gray-400 text-sm mb-6">
                  🏁 Provide details for each team member. Minimum 3 members required (including team leader). Up to 4 members allowed.
                </p>
                <div className="space-y-6">
                  {formData.members.map((member, index) => (
                    <div key={index} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold mb-4">
                        Member {index + 1} {index === 0 ? '(Team Leader)' : (index < 3 ? '(Required)' : '(Optional)')} {index < 3 && <span className="text-red-400">*</span>}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={member.name}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, name: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index < 3}
                        />
                        <input
                          type="text"
                          placeholder="SRN"
                          value={member.srn}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, srn: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index < 3}
                        />
                        <input
                          type="email"
                          placeholder="Email ID"
                          value={member.email}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, email: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index].includes('Email') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        {memberErrors[index] && memberErrors[index].includes('Email') && (
                          <div className="text-sm text-red-400 mt-1">Invalid or missing email for member {index+1}</div>
                        )}
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={member.phone}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, phone: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index].includes('Phone') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        {memberErrors[index] && memberErrors[index].includes('Phone') && (
                          <div className="text-sm text-red-400 mt-1">Invalid or missing phone for member {index+1}</div>
                        )}
                        {/* Semester choices as checkbox-style (select at least one) */}
                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index].includes('Semester') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select semester (choose the semester this member is currently in)</div>
                          <div className="flex flex-wrap gap-2">
                          {['1st', '3rd', '5th', '7th'].map((opt) => {
                            const checked = Array.isArray(member.semester) && member.semester.includes(opt)
                            return (
                              <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-gray-700 border border-gray-600' : 'bg-gray-800/30 border border-gray-700'}`}>
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={checked}
                                  onChange={() => {
                                    const newMembers = [...formData.members]
                                    const curr = Array.isArray(member.semester) ? [...member.semester] : []
                                    const idxIn = curr.indexOf(opt)
                                    if (idxIn > -1) curr.splice(idxIn, 1)
                                    else curr.push(opt)
                                    newMembers[index] = { ...member, semester: curr }
                                    setFormData({ ...formData, members: newMembers })
                                  }}
                                />
                                <span className="text-sm text-gray-200">{opt}</span>
                              </label>
                            )
                          })}
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Section (e.g., A)"
                          value={member.section}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, section: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className={`w-full p-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${memberErrors[index] && memberErrors[index].includes('Section') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                          required={index < 3}
                        />
                        {memberErrors[index] && memberErrors[index].includes('Section') && (
                          <div className="text-sm text-red-400 mt-1">Section is required for member {index+1}</div>
                        )}
                        {/* Additional fields: Department & Hostelite/Day Scholar */}
                        {/* Department as checkbox options (choose at least one) */}
                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index].includes('Department') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select department(s) — used to route mentors and resources</div>
                          <div className="flex flex-wrap gap-2">
                          {['CSE', 'AIML', 'ECE', 'Mech', 'EEE'].map((opt) => {
                            const checked = Array.isArray((member as any).department) && (member as any).department.includes(opt)
                            return (
                              <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-gray-700 border border-gray-600' : 'bg-gray-800/30 border border-gray-700'}`}>
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={checked}
                                  onChange={() => {
                                    const newMembers = [...formData.members]
                                    const curr = Array.isArray((member as any).department) ? [...(member as any).department] : []
                                    const idxIn = curr.indexOf(opt)
                                    if (idxIn > -1) curr.splice(idxIn, 1)
                                    else curr.push(opt)
                                    newMembers[index] = { ...(member as any), department: curr }
                                    setFormData({ ...formData, members: newMembers })
                                  }}
                                />
                                <span className="text-sm text-gray-200">{opt}</span>
                              </label>
                            )
                          })}
                          </div>
                        </div>

                        {/* Hostelite / Day Scholar as radio-style choices */}
                        <div className={`mb-2 ${memberErrors[index] && memberErrors[index].includes('Hostel') ? 'ring-1 ring-red-500 rounded-md' : ''}`}>
                          <div className="text-sm text-gray-400 mb-2">Select whether this member is a hostelite or a day scholar</div>
                          <div className="flex flex-wrap gap-2">
                          {['Hostelite', 'Day Scholar'].map((opt) => {
                            const checked = Array.isArray((member as any).hostel) && (member as any).hostel.includes(opt)
                            return (
                              <label key={opt} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${checked ? 'bg-gray-700 border border-gray-600' : 'bg-gray-800/30 border border-gray-700'}`}>
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={checked}
                                  onChange={() => {
                                    const newMembers = [...formData.members]
                                    // store single choice as array with one element for compatibility
                                    const curr = checked ? [] : [opt]
                                    newMembers[index] = { ...(member as any), hostel: curr }
                                    setFormData({ ...formData, members: newMembers })
                                  }}
                                />
                                <span className="text-sm text-gray-200">{opt}</span>
                              </label>
                            )
                          })}
                          </div>
                        </div>
                        
                        {/* Payment acknowledgement upload */}
                        <div className="col-span-1 md:col-span-2 mt-2">
                          <label className="block text-sm text-gray-300 mb-2">Payment acknowledgement {index < 3 ? <span className="text-red-400">(required)</span> : <span className="text-gray-400">(required if member exists)</span>}</label>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              const newMembers = [...formData.members]
                              if (!file) {
                                newMembers[index] = { ...member, paymentName: undefined, paymentDataUrl: undefined }
                                setFormData({...formData, members: newMembers})
                                return
                              }

                              // Read file as data URL for upload
                              const reader = new FileReader()
                              reader.onload = () => {
                                const dataUrl = reader.result as string
                                newMembers[index] = { ...member, paymentName: file.name, paymentDataUrl: dataUrl }
                                setFormData({...formData, members: newMembers})
                              }
                              reader.readAsDataURL(file)
                            }}
                            className="w-full text-sm text-gray-300"
                          />
                          {member.paymentName && (
                            <div className="mt-2 text-xs text-gray-400">Selected: {member.paymentName}</div>
                          )}
                          {memberErrors[index] && (
                            <div className="mt-2 text-sm text-red-400">{memberErrors[index]}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Review & Confirm</h2>
                <div className="space-y-4 bg-gray-800/30 p-6 rounded-lg">
                  <div><span className="text-gray-400">Team:</span> <span className="text-white">{formData.teamName}</span></div>
                  <div><span className="text-gray-400">Leader:</span> <span className="text-white">{formData.teamLeader}</span></div>
                  <div><span className="text-gray-400">Email:</span> <span className="text-white">{formData.email}</span></div>
                  
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-4">Team Members:</h3>
                    {formData.members.filter(member => member.name).map((member, index) => (
                      <div key={index} className="bg-gray-800/50 p-4 rounded-lg mb-2">
                        <div className="text-white font-medium">{member.name} {index === 0 ? '(Leader)' : ''}</div>
                        <div className="text-gray-400 text-sm">
                          SRN: {member.srn} | Email: {member.email} | Phone: {member.phone} | 
                          Sem: {Array.isArray(member.semester) ? member.semester.join(', ') : member.semester} | Sec: {member.section}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* If schema defines fields after members, render inputs for them here */}
                  {formSchema && Array.isArray(formSchema.fields) ? (
                    (() => {
                      const fields = formSchema.fields as any[]
                      const membersIndex = fields.findIndex(f => f.type === 'members')
                      // Exclude legacy fields 'experience' and 'idea' from the review inputs
                      const tail = membersIndex === -1 ? [] : fields.slice(membersIndex + 1).filter((f: any) => f.name !== 'experience' && f.name !== 'idea')
                      if (!tail.length) return null
                      return (
                        <div className="mt-4 space-y-4">
                          {tail.map((field) => {
                            const key = field.name
                            const value = (formData as any)[key] || ''
                            if (field.type === 'textarea') {
                              return (
                                <div key={key}>
                                  <label className="text-gray-400 block mb-2">{field.label || key}</label>
                                  <textarea
                                    value={value}
                                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                  />
                                </div>
                              )
                            }

                            if (field.type === 'file') {
                              // Do not render file inputs during review — proposal will be collected later
                              return null
                            }

                            // default input
                            return (
                              <input
                                key={key}
                                type={field.type === 'email' || field.type === 'tel' ? field.type : 'text'}
                                placeholder={field.label || key}
                                value={value}
                                onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                              />
                            )
                          })}
                        </div>
                      )
                    })()
                  ) : (
                    <div className="mt-6">
                      <div className="p-6 rounded-lg bg-gray-900/40 border border-gray-700 text-center">
                        <p className="mt-3 text-xs text-gray-400">Join the WhatsApp group for updates and queries.</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">🏁</div>
                  <h2 className="text-2xl font-bold text-white mb-4">Registration submitted</h2>
                  <p className="text-gray-400 mb-8">
                    Thank you — your team has been registered for Ignition 1.0. We'll contact the team leader at the provided email with next steps.
                  </p>
                  <div className="bg-gradient-orange p-8 rounded-xl text-white inline-block">
                    <h3 className="text-xl font-semibold mb-2">Team: {formData.teamName || '—'}</h3>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          // Reset form or navigate away — here we reset to step 1 and clear the form
                          setFormData({
                            teamName: '',
                            teamLeader: '',
                            email: '',
                            phone: '',
                            members: [
                                { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
                                { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
                                { name: '', srn: '', email: '', phone: '', semester: [], section: '' },
                                { name: '', srn: '', email: '', phone: '', semester: [], section: '' }
                              ],
                            campus: '',
                            proposalPdf: null,
                          })
                          setStep(1)
                        }}
                        className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                
                <div className="flex gap-4">
                  {/* Guidelines Button removed from registration page per request */}
                  
                  <button
                    onClick={step === 3 ? handleSubmit : handleNext}
                    disabled={(step === 3 && submitting)}
                    className="px-6 py-3 bg-gradient-orange text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {step === 3 ? (submitting ? 'Submitting…' : 'Submit') : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Racing Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
    </div>
  )
}