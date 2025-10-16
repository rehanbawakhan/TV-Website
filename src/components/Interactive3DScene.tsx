'use client'

import { motion } from 'framer-motion'

// Simplified Interactive Elements without complex models
export default function Interactive3DScene() {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-xl">
      {/* Holographic Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-orange-500/10 pointer-events-none" />
      
      {/* Holographic Grid Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full bg-gradient-to-br from-transparent via-cyan-400/20 to-transparent"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 107, 53, 0.1) 25%, rgba(255, 107, 53, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 107, 53, 0.1) 75%, rgba(255, 107, 53, 0.1) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 107, 53, 0.1) 25%, rgba(255, 107, 53, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 107, 53, 0.1) 75%, rgba(255, 107, 53, 0.1) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Interactive Info */}
      <motion.div
        className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-orange-400 font-semibold mb-1">Interactive Tech Space</p>
        <p>• Holographic interface ready</p>
        <p>• Awaiting future implementations</p>
        <p>• Racing technology preview</p>
      </motion.div>

      {/* Racing Track Background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800/40 to-transparent">
        <div className="absolute bottom-4 left-0 right-0 h-2 bg-gray-600/60 rounded-sm">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400/60 transform -translate-y-1/2 flex space-x-2">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-2 h-0.5 bg-gray-300/60" />
            ))}
          </div>
        </div>
        {/* Checkered pattern */}
        <div className="absolute bottom-0 right-4 w-12 h-6 opacity-40">
          <div className="grid grid-cols-4 grid-rows-2 h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-white' : 'bg-gray-900'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Particle Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: Math.random() * 2.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}