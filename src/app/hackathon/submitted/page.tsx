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
