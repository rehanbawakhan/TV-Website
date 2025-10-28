"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function AdminEggPage() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)
  const [flashEnabled, setFlashEnabled] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // start a short siren-like sound using WebAudio when component mounts
    try {
      const AudioContextCtor = (window.AudioContext || (window as any).webkitAudioContext)
      if (!AudioContextCtor) return
      const ctx = new AudioContextCtor()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 400
      gain.gain.value = 0
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      oscRef.current = osc
      gainRef.current = gain

      // ramp the gain up quickly and modulate frequency for a siren effect
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.05)
      let start = ctx.currentTime
      let rafId: number

      function step() {
        const t = ctx.currentTime - start
        // oscillate frequency between 300 and 900 over 1.5s
        const freq = 600 + 300 * Math.sin((t / 1.5) * Math.PI * 2)
        if (oscRef.current) oscRef.current.frequency.setValueAtTime(freq, ctx.currentTime)
        rafId = requestAnimationFrame(step)
      }
      setPlaying(true)
      rafId = requestAnimationFrame(step)

      return () => {
        cancelAnimationFrame(rafId)
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
          osc.stop(ctx.currentTime + 0.06)
        } catch (e) {}
        try { ctx.close() } catch (e) {}
      }
    } catch (e) {
      console.warn('Audio not available', e)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 text-white p-6">
      {/* subtle flashing overlay (accessible, can be toggled off) */}
      {flashEnabled && (
        <div aria-hidden className="absolute inset-0 pointer-events-none flash-overlay" />
      )}

      <div className="max-w-2xl w-full text-center relative">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-400">What were you trying to do?</h1>
          <p className="text-gray-300 mt-2">We saw credentials Admin / Password — that looks suspicious.</p>
        </div>

        <div className="mb-6">
          <div className="inline-block px-4 py-2 bg-red-600 rounded text-sm font-semibold">SIREN ACTIVATED</div>
        </div>

        <div className="mb-6">
          <p className="text-gray-200">This is a lighthearted easter-egg. For safety, the alarm is dismissible — click Close to stop the sound.</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              // stop audio by closing audio context
              try {
                if (audioCtxRef.current) {
                  audioCtxRef.current.close()
                  audioCtxRef.current = null
                }
              } catch (e) {}
              setPlaying(false)
              setVisible(false)
              // redirect back to admin root
              window.location.href = '/sus'
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold"
          >
            Close
          </button>

          <button
            onClick={() => {
              // do nothing but keep the egg open; user can still close
            }}
            className="px-6 py-3 bg-gray-800 rounded border border-gray-600"
          >
            Keep Open
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-300">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={flashEnabled} onChange={(e) => setFlashEnabled(e.target.checked)} className="w-4 h-4" />
            <span>Enable subtle flash</span>
          </label>
        </div>
      </div>
      
      <style>{`
        .flash-overlay {
          animation: egg-flash 1.2s ease-in-out infinite;
          background-color: rgba(255,0,0,0.06);
          mix-blend-mode: screen;
        }

        @keyframes egg-flash {
          0% { background-color: rgba(255,0,0,0.03); }
          50% { background-color: rgba(255,0,0,0.12); }
          100% { background-color: rgba(255,0,0,0.03); }
        }
      `}</style>
    </div>
  )
}
