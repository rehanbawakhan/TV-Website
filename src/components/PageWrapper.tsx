'use client'

import { motion } from 'framer-motion'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hero' | 'modal'
}

const pageVariants = {
  default: {
    initial: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(4px)' 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      filter: 'blur(2px)',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },
  hero: {
    initial: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50,
      filter: 'blur(8px)' 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      y: -30,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },
  modal: {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      filter: 'blur(10px)' 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      filter: 'blur(5px)',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
}

export default function PageWrapper({ 
  children, 
  className = '', 
  variant = 'default' 
}: PageWrapperProps) {
  return (
    <motion.div
      className={`${className}`}
      variants={pageVariants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}