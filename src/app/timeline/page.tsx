"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Timeline event data

// Timeline events with correct start times (Nov 7th 4:30 PM to Nov 8th 10:30 AM)
const EVENTS = [
  { label: "Inauguration", time: "07 Nov, 04:30 PM", duration: 30 },
  { label: "Workshop", time: "07 Nov, 05:00 PM", duration: 90 },
  { label: "Registration and Checks", time: "07 Nov, 06:30 PM", duration: 60 },
  { label: "Sprint One", time: "07 Nov, 07:30 PM", duration: 60 },
  { label: "Pit Stop (Dinner)", time: "07 Nov, 08:30 PM", duration: 60 },
  { label: "Sprint Two", time: "07 Nov, 09:30 PM", duration: 120 },
  { label: "Pitstop Two (Games+Pizza)", time: "07 Nov, 11:30 PM", duration: 60 },
  { label: "Sprint Three", time: "08 Nov, 12:30 AM", duration: 120 },
  { label: "Jam Session", time: "08 Nov, 02:30 AM", duration: 30 },
  { label: "Final Sprint", time: "08 Nov, 03:00 AM", duration: 210 },
  { label: "Shortlisting Round", time: "08 Nov, 06:30 AM", duration: 60 },
  { label: "Move to Quadrangle", time: "08 Nov, 07:30 AM", duration: 30 },
  { label: "Final Pitstop (Breakfast)", time: "08 Nov, 08:00 AM", duration: 60 },
  { label: "Judging", time: "08 Nov, 09:00 AM", duration: 60 },
  { label: "Prize and Felicitation", time: "08 Nov, 10:00 AM", duration: 30 },
];

const RACE_START = new Date("2025-11-07T16:30:00");
const RACE_END = new Date("2025-11-08T10:30:00");

export default function TimelinePage() {
  // Race lights
  const [lightIndex, setLightIndex] = useState(-1);
  // Countdown
  const [now, setNow] = useState(new Date());
  // Progress
  const [progress, setProgress] = useState(0);

  // Animate race lights (one every 800ms before start)
  useEffect(() => {
    if (now < RACE_START) {
      const diff = RACE_START.getTime() - now.getTime();
      if (diff < 10000) {
        setLightIndex(-1);
        let idx = -1;
        const interval = setInterval(() => {
          idx++;
          setLightIndex(idx);
          if (idx >= 4) clearInterval(interval);
        }, 800);
        return () => clearInterval(interval);
      }
    } else {
      setLightIndex(4);
    }
  }, [now]);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 500);
    return () => clearInterval(t);
  }, []);

  // Progress: percent of time elapsed from RACE_START to RACE_END
  useEffect(() => {
    const updateProgress = () => {
      const nowTime = new Date().getTime();
      const total = RACE_END.getTime() - RACE_START.getTime();
      const done = Math.max(0, Math.min(nowTime - RACE_START.getTime(), total));
      setProgress((done / total) * 100);
    };
    updateProgress();
    const t = setInterval(updateProgress, 1000);
    return () => clearInterval(t);
  }, []);

  // Countdown formatting
  function formatCountdown(ms: number) {
    if (ms <= 0) return "00:00:00";
    const total = Math.floor(ms / 1000);
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  const timeToStart = Math.max(0, RACE_START.getTime() - now.getTime());
  const timeToEnd = Math.max(0, RACE_END.getTime() - now.getTime());

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Orange glow top & bottom */}
      <div className="pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-orange-500/40 via-transparent to-transparent" style={{filter:'blur(32px)'}} />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent" style={{filter:'blur(32px)'}} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-2 mx-auto">
        {/* Top: Centered Race lights and countdown */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8 w-full">
          {/* Race Start Lights */}
          <div className="bg-gray-900/80 p-4 rounded-lg shadow-lg flex flex-col items-center min-w-[220px] max-w-[260px] w-full">
            <div className="mb-3 text-sm text-gray-300">Race Start Lights</div>
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => {
                const isLit = lightIndex >= i;
                return (
                  <div key={i} className={`w-7 h-7 rounded-full border-2 border-black ${isLit ? 'bg-orange-400' : 'bg-gray-700'} transition-colors duration-300`} />
                );
              })}
            </div>
          </div>
          {/* Countdown */}
          <div className="bg-gray-900/80 p-4 rounded-lg shadow-lg flex flex-col items-center min-w-[220px] max-w-[260px] w-full">
            <div className="text-xs text-gray-400">Countdown</div>
            <div className="text-2xl font-mono mt-1">
              {now < RACE_START
                ? formatCountdown(timeToStart)
                : formatCountdown(timeToEnd)}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {now < RACE_START ? "to race start" : "to race end"}
            </div>
          </div>

        </div>

        {/* Timeline event grid */}
        <div className="bg-gray-900/80 p-4 rounded-lg w-full max-w-4xl mx-auto mt-2">
          <div className="relative h-16 w-full bg-gray-800 rounded-full overflow-visible mb-6 flex items-center mx-auto" style={{maxWidth:'900px'}}>
            {/* Progress fill on timeline bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 rounded-full"
              style={{ width: `${progress}%`, borderRadius: 9999, zIndex: 1, height: '100%' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.6 }}
            />
            {/* Timeline markers (dots) */}
            {EVENTS.map((ev, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === EVENTS.length - 1;
              return (
                <div
                  key={idx}
                  style={{ left: `${(idx / (EVENTS.length - 1)) * 100}%`, top: '50%', zIndex: 2 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  {isFirst ? (
                    <span className="text-2xl" title="Start">🚦</span>
                  ) : isLast ? (
                    <span className="text-2xl" title="Finish">🏁</span>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-orange-400/80 border-2 border-gray-900" />
                  )}
                </div>
              );
            })}
            {/* Center dashed line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 flex items-center -translate-y-1/2 px-6 z-0">
              <div className="w-full h-0.5 border-t-2 border-dashed border-orange-400/10" />
            </div>
            {/* Emoji car with animated speed/air lines on timeline bar */}
            <motion.div
              className="absolute z-30"
              style={{
                left: `calc(${progress}% - 36px)`,
                top: '-15%',
                width: 72,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                transform: 'translateY(-50%)',
              }}
              animate={{
                scale: [1, 1.08, 1],
                y: [-2, 2, -2],
                rotateZ: [-2, 2, -2],
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Speed lines left (air) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-1 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-0.5 rounded-full bg-orange-200/60"
                    animate={{
                      opacity: [0, 1, 0],
                      x: [-18, 0, -18],
                    }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: i * 0.13,
                    }}
                  />
                ))}
              </div>
              {/* Speed lines right (air) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-1 pointer-events-none">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-0.5 rounded-full bg-orange-300/40"
                    animate={{
                      opacity: [0, 0.7, 0],
                      x: [12, 0, 12],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.18,
                    }}
                  />
                ))}
              </div>
              <span
                aria-hidden
                className="leading-none"
                style={{
                  fontSize: 56,
                  lineHeight: 1,
                  display: 'inline-block',
                  transform: 'scaleX(-1)',
                  filter: 'drop-shadow(0 6px 18px rgba(255,140,0,0.5))',
                  userSelect: 'none',
                }}
              >
                🏎️
              </span>
            </motion.div>
          </div>
          {/* Event cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 max-w-4xl mx-auto" style={{minWidth:'0'}}>
  {/* Milestone/pitstop animations (confetti, pizza, etc.) would be implemented here using a portal or canvas overlay, triggered as progress passes event indices. */}
            {EVENTS.map((ev, idx) => {
              // Calculate event start and end
              const [day, month, timeStr, ampm] = ev.time.split(/[, ]+/).filter(Boolean);
              const [hr, min] = timeStr.split(":");
              const eventDate = new Date(RACE_START);
              eventDate.setDate(parseInt(day));
              eventDate.setHours(parseInt(hr) + (ampm === "PM" && parseInt(hr) < 12 ? 12 : 0));
              eventDate.setMinutes(parseInt(min));
              eventDate.setSeconds(0);
              const eventStart = eventDate;
              const eventEnd = new Date(eventStart.getTime() + ev.duration * 60000);
              const isCompleted = now > eventEnd;
              return (
                <div
                  key={idx}
                  className={
                    `rounded-lg p-4 flex flex-col border shadow-md min-h-[90px] justify-between ` +
                    (isCompleted
                      ? 'bg-green-700/80 border-green-600 text-green-100 animate-pulse'
                      : 'bg-gray-800/80 border-gray-700 text-white')
                  }
                >
                  <div className="font-semibold mb-1 flex items-center gap-2">
                    {ev.label}
                    {isCompleted && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500 text-xs text-white font-bold animate-bounce">Completed</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isCompleted ? "text-green-200" : "text-gray-400"}>{ev.time}</span>
                    <span className={isCompleted ? "text-green-300 font-bold" : "text-orange-400 font-bold"}>{ev.duration} min</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
