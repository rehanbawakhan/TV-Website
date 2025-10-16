'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import HeroSection from './HeroSection'
import ScrollingSection from './ScrollingSection'
import Navigation from './Navigation'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first visit in this browser session
    const hasSeenLoading = sessionStorage.getItem('vegavath-loading-seen')
    
    if (hasSeenLoading) {
      // Skip loading screen if already seen in this session
      setIsLoading(false)
      return
    }

    // Show loading screen and mark as seen
    sessionStorage.setItem('vegavath-loading-seen', 'true')
    
    // Simulate loading time for 3D assets - matches loading screen timing
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // Updated to 4 seconds to match faster loading screen

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Navigation />
            <HeroSection />
            <ScrollingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}