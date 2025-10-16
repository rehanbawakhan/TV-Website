'use client'

import { motion } from 'framer-motion'

export default function HolographicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Base holographic gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-orange-500/5" />
      
      {/* Animated holographic grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 107, 53, 0.1) 25%, rgba(255, 107, 53, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 107, 53, 0.1) 75%, rgba(255, 107, 53, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Holographic scanlines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%)',
          height: '200px',
        }}
      />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Holographic waves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Radial holographic effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div className="w-full h-full rounded-full border border-cyan-400/20 animate-pulse" />
        <div className="absolute inset-4 rounded-full border border-orange-400/20 animate-pulse delay-1000" />
        <div className="absolute inset-8 rounded-full border border-purple-400/20 animate-pulse delay-2000" />
      </motion.div>

      {/* Holographic corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <motion.div
          className="w-full h-full border-l-2 border-t-2 border-cyan-400/30 rounded-tl-3xl"
          animate={{
            borderColor: ['rgba(0, 255, 255, 0.3)', 'rgba(255, 107, 53, 0.3)', 'rgba(0, 255, 255, 0.3)'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <motion.div
          className="w-full h-full border-r-2 border-t-2 border-orange-400/30 rounded-tr-3xl"
          animate={{
            borderColor: ['rgba(255, 107, 53, 0.3)', 'rgba(0, 255, 255, 0.3)', 'rgba(255, 107, 53, 0.3)'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <motion.div
          className="w-full h-full border-l-2 border-b-2 border-purple-400/30 rounded-bl-3xl"
          animate={{
            borderColor: ['rgba(255, 53, 255, 0.3)', 'rgba(0, 255, 255, 0.3)', 'rgba(255, 53, 255, 0.3)'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <motion.div
          className="w-full h-full border-r-2 border-b-2 border-cyan-400/30 rounded-br-3xl"
          animate={{
            borderColor: ['rgba(0, 255, 255, 0.3)', 'rgba(255, 107, 53, 0.3)', 'rgba(0, 255, 255, 0.3)'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 3,
          }}
        />
      </div>
    </div>
  )
}