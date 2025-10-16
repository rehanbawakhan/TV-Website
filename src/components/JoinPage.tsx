'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import toast from 'react-hot-toast'
import { submitApplication, getAvailableInterviewSlots, bookInterviewSlot, InterviewSlot } from '@/lib/supabase'

interface ApplicationForm {
  name: string
  email: string
  phone: string
  skills: string[]
  motivation: string
  preferred_domain: string
  experience: string
  portfolio_url: string
}

const domains = ['Automotive', 'Robotics', 'Design', 'Media', 'Marketing']
const skillOptions = [
  'JavaScript/TypeScript', 'Python', 'C++', 'React', 'Node.js',
  'CAD Design', 'Arduino/Raspberry Pi', 'Machine Learning', 'UI/UX Design',
  'Photography', 'Video Editing', 'Social Media Marketing', 'Content Writing',
  'Project Management', 'Public Speaking', 'Team Leadership'
]

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    skills: [],
    motivation: '',
    preferred_domain: '',
    experience: '',
    portfolio_url: '',
  })
  const [interviewSlots, setInterviewSlots] = useState<InterviewSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const totalSteps = 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 3) {
        // Load interview slots when reaching step 3
        loadInterviewSlots()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const loadInterviewSlots = async () => {
    try {
      const slots = await getAvailableInterviewSlots()
      setInterviewSlots(slots)
    } catch (error) {
      console.error('Error loading interview slots:', error)
      // Set placeholder slots for demo
      setInterviewSlots([
        {
          id: '1',
          slot_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          is_taken: false,
          meeting_link: 'https://meet.google.com/placeholder-1',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          slot_time: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
          is_taken: false,
          meeting_link: 'https://meet.google.com/placeholder-2',
          created_at: new Date().toISOString(),
        },
      ])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Submit application
      await submitApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        motivation: formData.motivation,
        preferred_domain: formData.preferred_domain,
        experience: formData.experience,
        portfolio_url: formData.portfolio_url,
      })

      // Book interview slot if selected
      if (selectedSlot) {
        await bookInterviewSlot(selectedSlot, formData.email)
      }

      setApplicationSubmitted(true)
      toast.success('Application submitted successfully!')
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
      console.error('Error submitting application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.skills.length > 0 && formData.preferred_domain
      case 3:
        return formData.motivation && formData.experience
      case 4:
        return true
      default:
        return false
    }
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-black flex items-center justify-center">
        <Navigation />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <div className="text-6xl mb-6">🏁</div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Racing Team!
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your application has been submitted successfully. Our team will review it and get back to you soon.
            {selectedSlot && ' You will receive interview details via email.'}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={headerRef} className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8"
          >
            Join The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Race
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Ready to accelerate your career? Join Vegavath and be part of a team that&apos;s racing towards innovation.
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    i + 1 <= currentStep 
                      ? 'bg-gradient-orange text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      i + 1 < currentStep ? 'bg-orange-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-gray-400">
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Skills & Domain' :
                currentStep === 3 ? 'Motivation & Experience' :
                'Interview Scheduling'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Skills & Domain */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Skills & Domain</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Domain *
                    </label>
                    <select
                      name="preferred_domain"
                      value={formData.preferred_domain}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select your preferred domain</option>
                      {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Skills * (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          className={`p-3 text-sm rounded-lg border transition-all duration-300 ${
                            formData.skills.includes(skill)
                              ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                              : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Portfolio/GitHub URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Motivation & Experience */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Tell Us About Yourself</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Why do you want to join Vegavath? *
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your passion for technology and what drives you..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Previous Experience *
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe your relevant projects, internships, or technical experience..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Interview Scheduling */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Interview</h2>
                  
                  <p className="text-gray-300 mb-6">
                    Select an available interview slot. Our team will send you the meeting details via email.
                  </p>

                  <div className="space-y-3">
                    {interviewSlots.map(slot => (
                      <label
                        key={slot.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedSlot === slot.id
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="interviewSlot"
                          value={slot.id}
                          checked={selectedSlot === slot.id}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">
                              {new Date(slot.slot_time).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="text-gray-400">
                              {new Date(slot.slot_time).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedSlot === slot.id
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-gray-400'
                          }`} />
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">
                      💡 <strong>Tip:</strong> You can also skip scheduling now and we&apos;ll contact you to arrange an interview time that works for you.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-gradient-orange text-white rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-orange text-white rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application 🏁'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}