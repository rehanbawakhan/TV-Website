
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Reset progress on mount
    setProgress(0)
    setIsComplete(false)
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          return 100
        }
        return prev + 2.5 // Increase by 2.5% to complete in ~4 seconds (40 intervals * 100ms)
      })
    }, 100) // Faster progression for 4 second total

    return () => clearInterval(interval)
  }, []) // Empty dependency array ensures this runs only once on mount

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center relative z-10">
        {/* Vegavath Logo Animation with Enhanced Effects */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="text-6xl font-heading font-bold text-white mb-4 overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-orange relative"
              initial={{ x: -100, opacity: 0, rotateY: -90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                textShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.4)'
              }}
            >
              VEGAVATH
              {/* Holographic scan line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2, 
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.span>
          </motion.div>
          <motion.div 
            className="text-lg text-gray-400 font-sans font-medium relative modern-body"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(249, 115, 22, 0.8)',
                  '0 0 20px rgba(249, 115, 22, 1)',
                  '0 0 10px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              TECHNICAL CLUB
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Enhanced Race Car Loading Bar */}
        <div className="space-y-6">
          <motion.div
            className="relative w-80 h-8 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Racing Track with Enhanced Design */}
            <div className="absolute inset-0 bg-gray-800 rounded-full border-2 border-gray-600 overflow-hidden">
              {/* Track markings with glow effect */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 transform -translate-y-1/2 flex space-x-2">
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-2 h-0.5 bg-gray-500"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      backgroundColor: ['#6b7280', '#f97316', '#6b7280']
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  />
                ))}
              </div>
              
              {/* Digital grid pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-20 grid-rows-4 h-full w-full">
                  {[...Array(80)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-cyan-400/20"
                      animate={{ 
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.05,
                        repeat: Infinity 
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced Progress Track with Particles */}
            <motion.div
              className="absolute inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Speed particles */}
              <div className="absolute inset-0 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-yellow-300 rounded-full absolute"
                    style={{ left: `${20 + i * 15}%` }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.1,
                      repeat: Infinity 
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Enhanced Race Car with Thrusters */}
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${progress}%` }}
              animate={{ 
                y: [-2, 2, -2],
                rotateZ: [-2, 2, -2]
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <motion.span 
                  className="text-xl filter drop-shadow-lg"
                  style={{ display: 'inline-block', transform: 'scaleX(-1)' }}
                  animate={{ 
                    filter: [
                      'drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))',
                      'drop-shadow(0 0 15px rgba(249, 115, 22, 1))',
                      'drop-shadow(0 0 5px rgba(249, 115, 22, 0.8))'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🏎️
                </motion.span>
                
                {/* Enhanced Speed lines with colors */}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 flex space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-4 h-0.5 rounded-full ${
                        i === 0 ? 'bg-yellow-400' : 
                        i === 1 ? 'bg-orange-400' : 
                        i === 2 ? 'bg-red-400' : 'bg-pink-400'
                      }`}
                      animate={{ 
                        opacity: [0, 1, 0],
                        x: [-15, 0],
                        scaleX: [0.5, 1.5, 0.5]
                      }}
                      transition={{ 
                        duration: 0.3, 
                        repeat: Infinity,
                        delay: i * 0.05 
                      }}
                    />
                  ))}
                </div>
                
                {/* Thruster glow */}
                <motion.div
                  className="absolute left-full top-1/2 transform -translate-y-1/2 w-6 h-2 bg-gradient-to-r from-blue-400 to-transparent rounded-full opacity-70"
                  animate={{ 
                    scaleX: [0.8, 1.2, 0.8],
                    opacity: [0.5, 0.9, 0.5]
                  }}
                  transition={{ 
                    duration: 0.2, 
                    repeat: Infinity 
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="text-primary-orange text-sm font-sans font-medium space-y-2 modern-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ 
                color: ['#FF6B35', '#FF4500', '#FF6B35'],
                textShadow: [
                  '0 0 10px rgba(255, 107, 53, 0.8)',
                  '0 0 20px rgba(255, 69, 0, 1)',
                  '0 0 10px rgba(255, 107, 53, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 Revving Engines... {Math.round(progress)}%
            </motion.div>
            
            {/* Status messages */}
            <motion.div
              className="text-xs text-gray-400 modern-body"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                textShadow: [
                  '0 0 5px rgba(255, 107, 53, 0.5)',
                  '0 0 10px rgba(255, 107, 53, 0.8)',
                  '0 0 5px rgba(255, 107, 53, 0.5)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 30 && "⚡ Initializing Racing Protocols..."}
              {progress >= 30 && progress < 60 && "🤖 Loading Robotic Systems..."}
              {progress >= 60 && progress < 90 && "🏁 Preparing Race Track..."}
              {progress >= 90 && "🚀 Systems Ready! Starting Engines..."}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Racing Environment Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Checkered flag pattern */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-16 opacity-30"
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="grid grid-cols-4 grid-rows-4 h-full border border-gray-600">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-white' : 'bg-gray-900'}`}
                animate={{ 
                  backgroundColor: (Math.floor(i / 4) + i % 4) % 2 === 0 
                    ? ['#ffffff', '#f97316', '#ffffff'] 
                    : ['#111827', '#dc2626', '#111827']
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.1,
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Racing circuit elements with enhanced design */}
        <div className="absolute bottom-20 left-0 right-0 h-32 opacity-20">
          <svg viewBox="0 0 800 100" className="w-full h-full">
            <motion.path
              d="M 0 50 Q 200 20 400 50 T 800 50"
              stroke="url(#circuitGradient)"
              strokeWidth="6"
              fill="none"
              className="opacity-80"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1 }}
            />
            <motion.path
              d="M 0 60 Q 200 30 400 60 T 800 60"
              stroke="url(#circuitGradient2)"
              strokeWidth="3"
              fill="none"
              className="opacity-60"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1.5 }}
            />
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <linearGradient id="circuitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating tech elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
            animate={{ 
              y: [-10, 10, -10],
              rotateZ: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 4 + i, 
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {['⚙️', '🔧', '⚡', '🤖', '🔩', '💻'][i]}
          </motion.div>
        ))}

        {/* Enhanced Ambient racing lights with pulsing */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 4, 
            delay: 2,
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 3, 
            delay: 1,
            repeat: Infinity 
          }}
        />
        
        {/* Digital scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}