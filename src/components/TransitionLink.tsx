'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (onClick) onClick()

    // start transition state for visual feedback, but navigate immediately
    setIsTransitioning(true)
    router.push(href)
  }

  return (
    <div className={`inline-block ${className}`}>
      <Link
        href={href}
        onClick={handleClick}
        className={`block relative overflow-hidden ${isTransitioning ? 'pointer-events-none' : ''}`}
      >
        {/* simple CSS-based overlay for subtle feedback (non-blocking) */}
        <div
          aria-hidden
          className={`absolute inset-0 z-10 pointer-events-none transition-transform duration-300 ease-in-out ${isTransitioning ? 'translate-x-full' : '-translate-x-full'} bg-gradient-to-r from-transparent via-primary-orange/20 to-transparent`}
        />
        {children}
      </Link>
    </div>
  )
}