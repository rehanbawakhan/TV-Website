"use client"

import React, { useEffect, useMemo, useState } from 'react'
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
  { label: 'Mini Games + Pizza', start: '11:30', end: '12:30' },
  { label: 'Sprint Three', start: '12:30', end: '14:30' },
  { label: 'Jam Session', start: '14:30', end: '15:00' },
  { label: 'Final Sprint', start: '15:00', end: '18:30' },
  { label: 'Shortlisting Round', start: '18:30', end: '19:30' },
  { label: 'Move to Quadrangle', start: '19:30', end: '20:00' },
  { label: 'Breakfast', start: '20:00', end: '21:00' },
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

  // F1 lights sequence controller
  useEffect(() => {
    // when within 7 seconds of start, begin sequence
    if (timeToStartMs > 0 && timeToStartMs <= 7000) {
      const seqInterval = setInterval(() => {
        setLightSequenceIndex((idx) => Math.min(4, idx + 1))
      }, 600)
      setLightSequenceIndex(Math.max(0, Math.floor((7000 - timeToStartMs) / 600) - 1))
      return () => clearInterval(seqInterval)
    }

    if (timeToStartMs === 0) {
      // start — show green
      setLightsOn(true)
      setLightSequenceIndex(4)
    }
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
    }
  }, [currentIndex, playedMilestones])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2">Ignition Timeline — Race Day</h1>
        <p className="text-gray-400 mb-6">Hidden page — type <span className="font-mono">/timeline</span> to open. Timeline starts on <strong>7 Nov 2025</strong>.</p>

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
                  : formatRemaining(overallEnd.getTime() - now.getTime())}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {now.getTime() < overallStart.getTime() ? 'to race start' : 'to day end'}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Progress</div>
              <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <motion.div
                  className="h-4 bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.6 }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-400">{progress.toFixed(1)}% complete</div>
            </div>
          </div>
        </div>

        {/* Timeline bar with markers */}
        <div className="bg-gray-900 p-4 rounded-lg mb-8">
          <div className="relative h-6 w-full bg-gray-800 rounded-full overflow-hidden">
            {/* filled progress */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-6 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-300" style={{ width: `${progress}%`, transition: 'width 0.6s linear' }} />
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

          {/* labels below */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {events.map((ev, idx) => {
              const total = overallEnd.getTime() - overallStart.getTime()
              const pos = ((ev.start.getTime() - overallStart.getTime()) / total) * 100
              const durationMinutes = Math.round((ev.end.getTime() - ev.start.getTime()) / 60000)
              const isCurrent = currentIndex === idx
              const reached = now.getTime() >= ev.start.getTime()
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`p-3 rounded-lg border ${isCurrent ? 'border-yellow-400 bg-yellow-900/10' : 'border-gray-700'} ${reached ? 'shadow-glow' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{ev.label}</div>
                      <div className="text-xs text-gray-400">{ev.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {ev.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="text-xs text-gray-400">{durationMinutes} min</div>
                  </div>

                  <AnimatePresence>
                    {isCurrent && (
                      <motion.div
                        key="pulse"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1.02 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, yoyo: Infinity }}
                        className="mt-2 text-xs text-green-300"
                      >
                        Live now
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Current event / Next event summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold">Now</h3>
            {currentIndex >= 0 ? (
              <div className="mt-2">
                <div className="text-xl font-semibold">{events[currentIndex].label}</div>
                <div className="text-sm text-gray-400">{events[currentIndex].start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {events[currentIndex].end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="mt-2 text-xs text-gray-300">Time left: {formatRemaining(events[currentIndex].end.getTime() - now.getTime())}</div>
              </div>
            ) : (
              <div className="mt-2 text-gray-400">Race will start at {overallStart.toLocaleString()}</div>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold">Upcoming</h3>
            <div className="mt-2 space-y-2">
              {events.slice(currentIndex + 1, currentIndex + 4).map((e, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{e.label}</div>
                    <div className="text-xs text-gray-400">{e.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="text-xs text-gray-400">Starts in {formatRemaining(e.start.getTime() - now.getTime())}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">Tip: This page is hidden on the site navigation. Share the URL directly when you want attendees to see the live timeline.</div>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 6px 24px rgba(250, 204, 21, 0.08), 0 2px 6px rgba(250, 204, 21, 0.04);
        }
      `}</style>
    </div>
  )
}
