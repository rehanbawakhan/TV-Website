'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-black flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-orange-500/20"
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                borderColor: [
                  'rgba(249, 115, 22, 0.2)',
                  'rgba(239, 68, 68, 0.2)',
                  'rgba(249, 115, 22, 0.2)'
                ]
              }}
              transition={{ 
                duration: 4, 
                delay: i * 0.01,
                repeat: Infinity 
              }}
            />
          ))}
        </div>
      </div>

      {/* Racing speed lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
            style={{ top: `${5 + i * 9}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center z-10 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 404 Display */}
        <motion.div
          className="relative mb-8"
          animate={{ 
            textShadow: [
              '0 0 20px rgba(249, 115, 22, 0.8)',
              '0 0 40px rgba(249, 115, 22, 1)',
              '0 0 20px rgba(249, 115, 22, 0.8)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-bold text-orange-500/20 blur-sm">
            404
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            COURSE OFF TRACK
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            The page you're looking for has taken a different route.
          </p>
          <p className="text-gray-400">
            Our navigation system couldn't locate this destination in the Vegavath universe.
          </p>
        </motion.div>

        {/* Racing car animation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="text-6xl"
            animate={{ 
              x: [0, 20, 0],
              rotateZ: [0, 2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏎️
          </motion.div>
          <motion.div
            className="ml-4 text-4xl opacity-50"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💨
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-orange-500/25"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              🏁 Return to Home Base
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className="px-8 py-4 bg-gray-800 border-2 border-gray-600 text-white font-bold rounded-xl hover:border-orange-500 hover:bg-gray-700 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(249, 115, 22, 1)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              🤖 Learn About Us
            </motion.button>
          </Link>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-gray-500 text-sm">
            Error Code: NAVIGATION_FAILURE | Sector: UNKNOWN | Status: LOST_IN_SPACE
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600">
            <span>🛰️ GPS Signal: WEAK</span>
            <span>⚡ Power Level: 100%</span>
            <span>🔧 Systems: OPERATIONAL</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}