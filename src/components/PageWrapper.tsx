'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hero' | 'modal'
}

const pageVariants = {
  default: {
    initial: { 
      opacity: 1, 
      y: 0, 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.3,
        ease: "easeOut" as any
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: {
        duration: 0.2,
        ease: "easeIn" as any
      }
    }
  },
  hero: {
    initial: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as any,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      y: -30,
      transition: {
        duration: 0.4,
        ease: "easeIn" as any
      }
    }
  },
  modal: {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: {
        duration: 0.4,
        ease: "easeOut" as any
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: {
        duration: 0.3,
        ease: "easeIn" as any
      }
    }
  }
}

export default function PageWrapper({ 
  children, 
  className = '', 
  variant = 'default' 
}: PageWrapperProps) {
  // Simplified - no animations to prevent blank page issues
  return (
    <div className={`${className}`}>
      {children}
    </div>
  )
}