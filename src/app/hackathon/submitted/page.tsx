"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SubmittedPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push('/guidelines'), 3500)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-40 h-40 rounded-full bg-green-500/10 flex items-center justify-center mb-6"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-24 h-24 text-green-500"
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'anticipate' }}
          >
            <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2 9 19.2 20 8.2 18.6 6.8z" />
          </motion.svg>
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Submitted</h1>
        <p className="text-gray-300 mb-4">Thanks — your registration has been received.</p>
        <p className="text-gray-400 text-sm">You will be redirected to Guidelines shortly.</p>
      </div>
    </div>
  )
}
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SubmittedPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      router.push('/guidelines')
    }, 3500)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="w-40 h-40 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl"
          >
            ✅
          </motion.div>
        </motion.div>

        <h1 className="text-3xl text-white font-bold mb-2">Submitted</h1>
        <p className="text-gray-300 mb-4">Thanks — your team registration was submitted. Redirecting to Guidelines…</p>

      </div>
    </div>
  )
}
