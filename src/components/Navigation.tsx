'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TransitionLink from './TransitionLink'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'The Crew', href: '/crew' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Join Us', href: '/join' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-primary-black/80 backdrop-blur-md border-b border-primary-orange/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Enhanced Hover Effects */}
            <TransitionLink href="/" className="flex items-center space-x-4">
              {/* Vegavath Logo from public/images */}
              <motion.div
                className="w-12 h-12 relative flex-shrink-0"
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 10,
                  filter: 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.8))'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Vegavath Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                />
                {/* Holographic ring effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary-orange/30 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1.3, 
                    opacity: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
              </motion.div>
              
              <motion.div
                className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-orange relative modern-title"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: '0 0 20px rgba(255, 107, 53, 0.8)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                VEGAVATH
                {/* Digital glitch effect */}
                <motion.div
                  className="absolute inset-0 text-primary-orange opacity-0"
                  whileHover={{ 
                    opacity: [0, 0.3, 0],
                    x: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  VEGAVATH
                </motion.div>
              </motion.div>
            </TransitionLink>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <TransitionLink
                  key={item.name}
                  href={item.href}
                  className="relative text-white hover:text-primary-orange transition-colors duration-300 group modern-body"
                >
                  <motion.span
                    className="relative z-10 font-medium px-3 py-2 block"
                    whileHover={{ 
                      scale: 1.1,
                      textShadow: '0 0 10px rgba(255, 107, 53, 0.8)'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* Racing background with speed lines */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg -z-10 overflow-hidden"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Speed lines effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"
                          style={{ transform: `translateY(${-2 + i * 2}px)` }}
                          animate={{ 
                            x: ['-100%', '100%']
                          }}
                          transition={{ 
                            duration: 0.8, 
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Holographic border */}
                  <motion.div
                    className="absolute inset-0 border border-cyan-400/0 rounded-lg"
                    whileHover={{ 
                      borderColor: 'rgba(34, 211, 238, 0.4)',
                      boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </TransitionLink>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-orange-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TransitionLink
                      href={item.href}
                      className="block px-4 py-2 text-white hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}