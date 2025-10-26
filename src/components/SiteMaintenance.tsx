"use client"

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function SiteMaintenance({ page }: { page: string }) {
  const [loading, setLoading] = useState(true)
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const [topPx, setTopPx] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    async function fetchFlags() {
      try {
        const res = await fetch('/api/site/settings')
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setFlags(json.maintenance || {})
      } catch (err) {
        // ignore
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchFlags()
    return () => { mounted = false }
  }, [pathname])

  // Try to place the maintenance panel just above the About stats section when present.
  useEffect(() => {
    if (loading || !flags[page]) return

    function computePos() {
      try {
        // AboutPage stats container has these classes: mt-12 flex justify-center space-x-8
        const el = document.querySelector('.mt-12.flex.justify-center.space-x-8') as HTMLElement | null
        if (!el) {
          setTopPx(null)
          return
        }
        const rect = el.getBoundingClientRect()
        // place the panel slightly above the stats (20px gap)
        const y = Math.max(rect.top - 80, 40)
        setTopPx(y)
      } catch (e) {
        setTopPx(null)
      }
    }

    computePos()
    window.addEventListener('resize', computePos)
    window.addEventListener('scroll', computePos, { passive: true })
    return () => {
      window.removeEventListener('resize', computePos)
      window.removeEventListener('scroll', computePos)
    }
  }, [loading, flags, page])

  const isDown = !!flags[page]

  // Ensure hooks are called in the same order every render.
  // We guard the side-effect internally so the effect is always declared but only acts when needed.
  useEffect(() => {
    if (loading || !isDown) return
    // Prevent background scrolling while maintenance overlay is active
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [loading, isDown])

  if (loading || !isDown) return null

  const wrapperStyle: React.CSSProperties = topPx != null
    ? { position: 'fixed', left: '50%', top: `${topPx}px`, transform: 'translateX(-50%)', zIndex: 10000 }
    : { transform: 'translateY(-22vh)' }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto">
      <div className="text-center px-4" style={wrapperStyle}>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-pulse" style={{textShadow: '0 0 30px rgba(255,69,0,0.9), 0 0 60px rgba(255,107,53,0.7)'}}>
          Page Under Maintenance
        </h1>
        <p className="text-lg text-gray-300 animate-pulse max-w-2xl mx-auto" style={{animationTimingFunction: 'cubic-bezier(.4,0,.6,1)'}}>
          We're performing scheduled maintenance on this page. Please check back soon.
        </p>
        <div className="mt-6">
          {/* use Next.js router push for SPA navigation */}
          <BackToHomeButton />
        </div>
      </div>
    </div>
  )
}

function BackToHomeButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push('/')}
      className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
    >
      Back to Home
    </button>
  )
}
