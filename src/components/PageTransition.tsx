'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname])

  // Simplified - no animations to prevent blank page issues
  return <>{children}</>
}
