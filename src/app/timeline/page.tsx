"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Hidden timeline page — racing themed. Reachable by typing /timeline

type EventItem = {
  label: string
  start: string
  end: string
}

const RAW_EVENTS: EventItem[] = [
  { label: 'Inauguration', start: '4:30', end: '5:00' },
  { label: 'Workshop', start: '5:00', end: '6:30' },
  { label: 'Registration and Checks', start: '6:30', end: '7:30' },
  { label: 'Sprint One', start: '7:30', end: '8:30' },
  { label: 'Pit Stop (Dinner)', start: '8:30', end: '9:30' },
  { label: 'Sprint Two', start: '9:30', end: '11:30' },
  { label: 'Pitstop Two (Games+Pizza)', start: '11:30', end: '12:30' },
  { label: 'Sprint Three', start: '12:30', end: '14:30' },
  { label: 'Jam Session', start: '14:30', end: '15:00' },
  { label: 'Final Sprint', start: '15:00', end: '18:30' },
  { label: 'Shortlisting Round', start: '18:30', end: '19:30' },
  { label: 'Move to Quadrangle', start: '19:30', end: '20:00' },
  { label: 'Final Pitstop (Breakfast)', start: '20:00', end: '21:00' },
  { label: 'Judging', start: '21:00', end: '22:00' },
  { label: 'Prize and Felicitation', start: '22:00', end: '22:30' }
]

// Start date anchor: 7th Nov 2025, first event time (local)
const START_DATE_ANCHOR = (year = 2025, month = 10, day = 7) => {
  // month: 0-indexed for Date constructor; 10 => November
  return new Date(year, month, day, 0, 0, 0, 0)
}

function parseEventsToDates(raw: EventItem[]) {
  const anchor = START_DATE_ANCHOR()
  const events: { label: string; start: Date; end: Date }[] = []
  let currentDayOffset = 0
  let prevStartMinutes: number | null = null

  for (const item of raw) {
    const [sH, sM] = item.start.split(':').map(Number)
    const [eH, eM] = item.end.split(':').map(Number)

    const sMinutes = sH * 60 + sM
    const eMinutes = eH * 60 + eM

    // if start time goes backwards compared to previous event, assume next day
    if (prevStartMinutes !== null && sMinutes < prevStartMinutes) {
      currentDayOffset += 1
    }

    const start = new Date(anchor.getTime())
    start.setDate(start.getDate() + currentDayOffset)
    start.setHours(sH, sM, 0, 0)

    // end might be earlier than start if crosses midnight; account similarly
    let end = new Date(anchor.getTime())
    end.setDate(end.getDate() + currentDayOffset)
    end.setHours(eH, eM, 0, 0)
    if (eMinutes < sMinutes) {
      // end is next day
      end.setDate(end.getDate() + 1)
    }

    events.push({ label: item.label, start, end })
    prevStartMinutes = sMinutes
  }

  return events
}

const events = parseEventsToDates(RAW_EVENTS)
const overallStart = events[0].start
const overallEnd = events[events.length - 1].end

function formatRemaining(ms: number) {
  if (ms <= 0) return '00:00:00'
  const total = Math.floor(ms / 1000)
  const hrs = Math.floor(total / 3600)
  const mins = Math.floor((total % 3600) / 60)
  const secs = total % 60
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function TimelinePage() {
  const [now, setNow] = useState<Date>(new Date())
  const [lightsOn, setLightsOn] = useState(false)
  const [lightSequenceIndex, setLightSequenceIndex] = useState(-1)
  const confettiRef = useRef<HTMLCanvasElement | null>(null)
  const carRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 500)
    return () => clearInterval(t)
  }, [])

  // Progress percentages
  const progress = useMemo(() => {
    const total = overallEnd.getTime() - overallStart.getTime()
    if (now.getTime() <= overallStart.getTime()) return 0
    if (now.getTime() >= overallEnd.getTime()) return 100
    const done = now.getTime() - overallStart.getTime()
    return Math.min(100, Math.max(0, (done / total) * 100))
  }, [now])

  // Current event index
  const currentIndex = useMemo(() => {
    for (let i = 0; i < events.length; i++) {
      if (now >= events[i].start && now < events[i].end) return i
    }
    if (now < overallStart) return -1
    return events.length - 1
  }, [now])

  // Countdown to start or to next milestone
  const timeToStartMs = Math.max(0, overallStart.getTime() - now.getTime())
  // Hackathon official end: next day at 10:30 AM (explicit)
  const hackathonEnd = new Date(overallStart.getTime())
  hackathonEnd.setDate(hackathonEnd.getDate() + 1)
  hackathonEnd.setHours(10, 30, 0, 0)

  // F1 lights sequence controller: begin sequence when within 10s of start
  useEffect(() => {
    const SEQ_THRESHOLD = 10000 // 10 seconds
    const LIGHT_COUNT = 5
    let seqInterval: number | undefined

    if (timeToStartMs > 0 && timeToStartMs <= SEQ_THRESHOLD) {
      // reset
      setLightSequenceIndex(-1)
      // light up one at a time every 800ms
      seqInterval = window.setInterval(() => {
        setLightSequenceIndex((idx) => Math.min(LIGHT_COUNT - 1, idx + 1))
      }, 800)
      return () => { if (seqInterval) clearInterval(seqInterval) }
    }

    if (timeToStartMs === 0) {
      // start — show green and ensure all lights lit
      setLightsOn(true)
      setLightSequenceIndex(LIGHT_COUNT - 1)
    }
    return () => { if (seqInterval) clearInterval(seqInterval) }
  }, [timeToStartMs])

  // Reset lights after start
  useEffect(() => {
    if (now.getTime() > overallStart.getTime()) {
      setLightsOn(true)
    }
  }, [now])

  // Milestone triggers when entering an event
  const [playedMilestones, setPlayedMilestones] = useState<Record<number, boolean>>({})
  useEffect(() => {
    if (currentIndex >= 0 && !playedMilestones[currentIndex]) {
      setPlayedMilestones((p) => ({ ...p, [currentIndex]: true }))
      // trigger confetti on milestone
      triggerConfetti()
    }
  }, [currentIndex, playedMilestones])

  // --- Confetti (lightweight canvas particles) ---
  type Particle = { x: number; y: number; vx: number; vy: number; size: number; color: string; ttl: number }

  const makeParticle = (w: number, h: number): Particle => {
    const angle = Math.random() * Math.PI - Math.PI / 2
    const speed = 2 + Math.random() * 4
    return {
      x: w / 2 + (Math.random() - 0.5) * 200,
      y: h / 2 + (Math.random() - 0.5) * 50,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 4 + Math.random() * 6,
      color: ['#FF4D4F', '#FF7A59', '#FFF166', '#8AFFC1'][Math.floor(Math.random() * 4)],
      ttl: 60 + Math.floor(Math.random() * 60)
    }
  }

  const triggerConfetti = (count = 70) => {
    const canvas = confettiRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const w = canvas.width
    const h = canvas.height
    for (let i = 0; i < count; i++) particles.push(makeParticle(w, h))

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12 // gravity
        p.ttl -= 1
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()
        if (p.ttl <= 0 || p.y > h + 20) particles.splice(i, 1)
      }
      if (particles.length > 0) raf = requestAnimationFrame(draw)
    }

    cancelAnimationFrame(raf)
    draw()
    setTimeout(() => cancelAnimationFrame(raf), 4000)
  }

  useEffect(() => {
    const canvas = confettiRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.max(300, Math.floor(rect.width * ratio))
      canvas.height = Math.max(150, Math.floor(rect.height * ratio))
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(ratio, ratio)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // --- Car position helper ---
  const carLeftPercent = Math.min(100, Math.max(0, progress))

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6 flex items-center justify-center relative">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,15,0.6),rgba(3,7,17,0.9))]" />
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02) 12px,transparent 12px,transparent 24px)] animate-bg-pan" />
        {/* subtle car silhouette */}
        <svg className="absolute right-0 bottom-0 w-1/2 opacity-6 transform translate-x-24 translate-y-24" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 250 C150 120 300 120 420 180 C520 220 680 200 750 150 L740 260 L60 260 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="w-full h-full relative max-w-6xl mx-auto">
        {/* confetti canvas sits on top and is pointer-events-none */}
        <canvas ref={confettiRef} className="pointer-events-none absolute left-0 right-0 mx-auto top-6 max-w-6xl w-full" style={{ height: 160 }} />
        <h1 className="text-4xl font-extrabold mb-2">Ignition Timeline — Race Day</h1>

  {/* Top: Lights + Countdown */}
  <div className="flex flex-col md:flex-row items-center md:items-end justify-between space-y-6 md:space-y-0 md:space-x-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <div className="mb-3 text-sm text-gray-300">Race Start Lights</div>
              <div className="flex space-x-2">
                {[0, 1, 2, 3, 4].map((i) => {
                  const isLit = lightSequenceIndex >= i || lightsOn
                  const bg = lightsOn ? 'bg-green-400' : isLit ? 'bg-red-500' : 'bg-gray-700'
                  return (
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-black ${bg} transition-colors duration-300`} />
                  )
                })}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 text-center">
              <div className="text-xs text-gray-400">Countdown</div>
                  <div className="text-2xl font-mono mt-1">
                    {now.getTime() < overallStart.getTime()
                      ? formatRemaining(overallStart.getTime() - now.getTime())
                      : formatRemaining(hackathonEnd.getTime() - now.getTime())}
              </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {now.getTime() < overallStart.getTime() ? 'to race start' : 'Hackathon ends in'}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-900/40 p-4 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,#000000_0%,#0b1221_50%,#000000_100%)] -z-10" />
              <div className="text-sm text-gray-400 mb-2">Race Progress</div>
              {/* Racetrack */}
              <div className="w-full h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full relative overflow-hidden border border-gray-700">
                {/* track stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient( -45deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 10px, transparent 10px, transparent 20px )] animate-track" />
                {/* filled track */}
                <div className="absolute left-0 top-0 bottom-0 rounded-full overflow-hidden pointer-events-none">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.6 }}
                    style={{ borderRadius: '9999px' }}
                  />
                </div>

                {/* race car (emoji + svg) */}
                <motion.div
                  className="absolute top-1/2 transform -translate-y-1/2 w-14 h-10 z-20 will-change-transform car-jiggle"
                  animate={{ left: `calc(${progress}% - 28px)` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-2xl" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">🏎️</div>
                </motion.div>
                {/* wind lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-1/3 w-full h-0.5 opacity-40">
                    <div className="w-40 h-0.5 bg-white/8 rounded transform translate-x-0 animate-wind" />
                    <div className="w-32 h-0.5 bg-white/6 rounded transform translate-x-20 animate-wind delay-200" />
                  </div>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-400">{progress.toFixed(1)}% complete</div>
            </div>
          </div>
        </div>

        {/* Timeline bar with markers */}
        <div className="bg-gray-900 p-4 rounded-lg mb-8">
          <div className="relative h-6 w-full bg-gray-800 rounded-full overflow-hidden">
            {/* moving car icon */}
            <motion.div
              ref={carRef}
              className="absolute -top-6 w-10 h-10 rounded-md flex items-center justify-center"
              style={{ left: `${carLeftPercent}%`, transform: 'translateX(-50%)' }}
              animate={{ left: `${carLeftPercent}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            >
              {/* simple car SVG */}
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="8" width="36" height="8" rx="2" fill="#FF4D4F" />
                <rect x="6" y="4" width="20" height="8" rx="2" fill="#FF7A59" />
                <circle cx="10" cy="18" r="3" fill="#111827" />
                <circle cx="30" cy="18" r="3" fill="#111827" />
              </svg>
            </motion.div>
            {/* filled progress */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-6 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-300" style={{ width: `${progress}%`, transition: 'width 0.6s linear' }} />
              {/* center dashed line to look like a road */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-transparent flex items-center justify-between px-6">
                  <div className="h-0.5 w-full border-t-2 border-dashed border-white/10" />
                </div>
              </div>
            </div>

            {/* markers */}
            {events.map((ev, idx) => {
              const total = overallEnd.getTime() - overallStart.getTime()
              const pos = ((ev.start.getTime() - overallStart.getTime()) / total) * 100
              const hit = now.getTime() >= ev.start.getTime()
              return (
                <div key={idx} style={{ left: `${pos}%` } as React.CSSProperties} className="absolute -top-2 transform -translate-x-1/2">
                  <div className={`w-3 h-3 rounded-full ${hit ? 'bg-white' : 'bg-gray-600'} border-2 border-gray-900`} />
                </div>
              )
            })}
          </div>

          {/* labels below (condensed) */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {events.map((ev, idx) => {
              const durationMinutes = Math.round((ev.end.getTime() - ev.start.getTime()) / 60000)
              const reached = now.getTime() >= ev.start.getTime()
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`p-3 rounded-lg border border-gray-700 ${reached ? 'shadow-glow bg-gray-800/20' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{ev.label}</div>
                      <div className="text-xs text-gray-400">{ev.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="text-xs text-gray-400">{durationMinutes} min</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Removed Now / Upcoming and footer per request - keep a full-screen, focused timeline */}
        </div>

        <style jsx>{`
          .shadow-glow {
            box-shadow: 0 6px 24px rgba(250, 204, 21, 0.08), 0 2px 6px rgba(250, 204, 21, 0.04);
          }
          .car-jiggle {
            animation: jiggle 0.28s ease-in-out infinite;
          }
          @keyframes jiggle {
            0% { transform: translateY(-50%) translateX(0) rotate(-0.6deg); }
            50% { transform: translateY(-48%) translateX(0) rotate(0.6deg); }
            100% { transform: translateY(-50%) translateX(0) rotate(-0.6deg); }
          }
          .animate-wind {
            animation: wind 1.2s linear infinite;
          }
          @keyframes wind {
            from { transform: translateX(0); opacity: 0.25 }
            to { transform: translateX(120%); opacity: 0 }
          }
          @keyframes trackPan {
            from { background-position: 0 0; }
            to { background-position: 200px 200px; }
          }
          .animate-track {
            animation: trackPan 6s linear infinite;
          }
          @keyframes bgPan {
            from { transform: translateX(0); }
            to { transform: translateX(-60px); }
          }
          .animate-bg-pan {
            animation: bgPan 10s linear infinite;
          }
        `}</style>
      </div>
  )
}
