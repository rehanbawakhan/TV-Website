'use client'"use client"



import React from 'react'import React from 'react'

import { Providers } from './Providers'

export default function ClientRoot({ children }: { children: React.ReactNode }) {import HolographicBackground from './HolographicBackground'

  // Minimal client wrapper for components that need client-side context (e.g., framer-motion)import PageTransition from './PageTransition'

  return <>{children}</>import Footer from './Footer'

}

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <HolographicBackground />
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </PageTransition>
    </Providers>
  )
}
