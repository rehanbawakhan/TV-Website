'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-10">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-orange-500">Loading 3D Scene...</div>
          </div>
        }>
          <div className="w-full h-full bg-gradient-radial from-orange-500/20 via-transparent to-transparent" />
        </Suspense>
      </div>

      {/* Enhanced Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white leading-tight tracking-wide modern-title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Welcome to{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 40px rgba(255, 107, 53, 0.8)'
              }}
              transition={{ duration: 0.3 }}
            >
              VEGAVATH
              {/* Enhanced holographic effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 6
                }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light modern-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Where{' '}
            <motion.span 
              className="text-primary-orange font-semibold"
              whileHover={{ 
                textShadow: '0 0 15px rgba(255, 107, 53, 0.8)',
                scale: 1.02
              }}
            >
              Innovation
            </motion.span>
            {' '}Meets{' '}
            <motion.span 
              className="text-primary-orange font-semibold"
              whileHover={{ 
                textShadow: '0 0 15px rgba(255, 107, 53, 0.8)',
                scale: 1.02
              }}
            >
              Engineering Excellence
            </motion.span>
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-base md:text-lg text-primary-orange mt-12 modern-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {[
              { name: 'Automotive', icon: '🏎️', color: 'orange' },
              { name: 'Robotics', icon: '🤖', color: 'orange' },
              { name: 'Design', icon: '🎨', color: 'orange' },
              { name: 'Media', icon: '📸', color: 'orange' },
              { name: 'Marketing', icon: '📈', color: 'orange' }
            ].map((domain, index) => (
              <motion.span
                key={domain.name}
                className={`px-6 py-3 bg-${domain.color}-500/90 rounded-full border border-${domain.color}-500 hover:bg-${domain.color}-500 transition-all duration-300 cursor-pointer group`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: `0 10px 20px rgba(249, 115, 22, 0.2)`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
              >
                <motion.span 
                  className="mr-2"
                  animate={{ 
                    rotateY: [0, 360]
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >
                  {domain.icon}
                </motion.span>
                {domain.name}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(249, 115, 22, 0.25)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Start Your Engines</span>
                <motion.span 
                  className="text-xl"
                  animate={{ 
                    rotateY: [0, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  🏎️
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Enhanced racing stripes */}
              <div className="absolute top-0 left-0 w-1 h-full bg-white/30 transform -skew-x-12"></div>
              <div className="absolute top-0 left-2 w-1 h-full bg-white/20 transform -skew-x-12"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      {/* Enhanced Interactive Elements */}
      <div className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="absolute inset-0 border border-orange-400/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 border border-orange-400/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-16 border border-purple-400/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}
      
      {/* Racing Track Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
        {/* Checkered pattern */}
        <div className="absolute bottom-4 right-8 w-16 h-8 opacity-30">
          <div className="grid grid-cols-4 grid-rows-2 h-full">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-white' : 'bg-gray-900'}`}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}