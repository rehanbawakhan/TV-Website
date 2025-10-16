'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    filter: 'blur(10px)'
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 1.05,
    filter: 'blur(5px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const loadingVariants = {
  initial: { 
    width: '0%',
    opacity: 0
  },
  loading: { 
    width: '100%',
    opacity: 1,
    transition: {
      width: { duration: 0.8, ease: 'easeInOut' },
      opacity: { duration: 0.2 }
    }
  },
  complete: {
    width: '100%',
    opacity: 0,
    transition: {
      opacity: { duration: 0.3, delay: 0.2 }
    }
  }
}

const overlayVariants = {
  initial: {
    x: '-100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent)'
  },
  animate: {
    x: '100%',
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Loading Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-1"
            initial="initial"
            animate="loading"
            exit="complete"
            variants={loadingVariants}
          >
            <div className="h-full bg-gradient-to-r from-primary-orange via-primary-orangeDark to-primary-orange shadow-lg shadow-primary-orange/50" />
            
            {/* Scanning overlay effect */}
            <motion.div
              className="absolute inset-0 h-full"
              variants={overlayVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
