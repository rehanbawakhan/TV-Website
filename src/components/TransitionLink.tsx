'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function TransitionLink({ 
  href, 
  children, 
  className = '', 
  onClick 
}: TransitionLinkProps) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (onClick) onClick()
    
    setIsTransitioning(true)
    
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 150))
    
    router.push(href)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block ${className}`}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={`block relative overflow-hidden ${
          isTransitioning ? 'pointer-events-none' : ''
        }`}
      >
        <motion.div
          animate={isTransitioning ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-orange/20 to-transparent z-10"
        />
        {children}
      </Link>
    </motion.div>
  )
}