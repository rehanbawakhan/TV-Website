'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'

interface Member {
  name: string
  srn: string
  email: string
  phone: string
  semester: string
  section: string
}

interface FormData {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  members: Member[]
  experience: string
  idea: string
}

export default function HackathonRegister() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamLeader: '',
    email: '',
    phone: '',
    members: [
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' },
      { name: '', srn: '', email: '', phone: '', semester: '', section: '' }
    ],
    experience: '',
    idea: ''
  })

  const handleNext = () => {
    if (step < 3 && isStepValid()) {
      setStep(step + 1)
    }
  }
  
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.teamName.trim() && formData.teamLeader.trim() && formData.email.trim() && formData.phone.trim()
      case 2:
        return formData.members.every(member => 
          member.name.trim() && member.srn.trim() && member.email.trim() && 
          member.phone.trim() && member.semester.trim() && member.section.trim()
        )
      case 3:
        return formData.experience.trim() && formData.idea.trim()
      default:
        return true
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData)
    setStep(4) // Payment step
  }

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
                VegaHack
              </span>{' '}
              Registration
            </h1>
            <p className="text-gray-400 text-lg modern-body">
              Rev up your engines for the ultimate coding marathon!
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
                <h2 className="text-2xl font-bold text-white mb-6">Team Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Team Name"
                    value={formData.teamName}
                    onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Team Leader Name"
                    value={formData.teamLeader}
                    onChange={(e) => setFormData({...formData, teamLeader: e.target.value})}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Member Details</h2>
                <p className="text-gray-400 text-sm mb-6">
                  🏁 Add details for up to 4 team members (including team leader)
                </p>
                <div className="space-y-6">
                  {formData.members.map((member, index) => (
                    <div key={index} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold mb-4">
                        Member {index + 1} {index === 0 ? '(Team Leader)' : '(Optional)'}
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
                          required={index === 0}
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
                          required={index === 0}
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
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index === 0}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={member.phone}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, phone: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index === 0}
                        />
                        <input
                          type="text"
                          placeholder="Semester (e.g., 5)"
                          value={member.semester}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, semester: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index === 0}
                        />
                        <input
                          type="text"
                          placeholder="Section (e.g., A)"
                          value={member.section}
                          onChange={(e) => {
                            const newMembers = [...formData.members]
                            newMembers[index] = { ...member, section: e.target.value }
                            setFormData({...formData, members: newMembers})
                          }}
                          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          required={index === 0}
                        />
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
                          Sem: {member.semester} | Sec: {member.section}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center pt-4">
                    <p className="text-2xl font-bold text-orange-500">Registration Fee: ₹500</p>
                    <p className="text-gray-400 text-sm">per team</p>
                  </div>
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
                  <h2 className="text-2xl font-bold text-white mb-4">Payment Portal</h2>
                  <p className="text-gray-400 mb-8">
                    Complete your registration with secure payment
                  </p>
                  <div className="bg-gradient-orange p-8 rounded-xl text-white">
                    <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                    <p className="mb-2">Amount: ₹500</p>
                    <p className="mb-6">Team: {formData.teamName}</p>
                    <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Pay with Razorpay
                    </button>
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
                  {/* Guidelines Button */}
                  <button
                    onClick={() => window.open('/guidelines', '_blank')}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                  >
                    📋 Guidelines
                  </button>
                  
                  <button
                    onClick={step === 3 ? handleSubmit : handleNext}
                    disabled={!isStepValid()}
                    className="px-6 py-3 bg-gradient-orange text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {step === 3 ? 'Proceed to Payment' : 'Next'}
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