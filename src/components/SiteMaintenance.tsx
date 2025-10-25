"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function SiteMaintenance({ page }: { page: string }) {
  const [loading, setLoading] = useState(true)
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

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

  const isDown = !!flags[page]

  if (loading || !isDown) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-pulse" style={{textShadow: '0 0 30px rgba(255,69,0,0.9), 0 0 60px rgba(255,107,53,0.7)'}}>
          Page Under Maintenance
        </h1>
        <p className="text-lg text-gray-300 animate-pulse" style={{animationTimingFunction: 'cubic-bezier(.4,0,.6,1)'}}>
          We're performing scheduled maintenance on this page. Please check back soon.
        </p>
      </div>
    </div>
  )
}
