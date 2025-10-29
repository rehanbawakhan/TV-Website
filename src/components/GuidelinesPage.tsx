'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'

// Ignition 1.0 specific guidelines content
const pdfPath = "/assets/PDF's/IgnitionProblemStatementBrief.pdf"

const ignitionContent = {
  overview: `Ignition 1.0 is an 18-hour IoT overnight hackathon. Teams can have up to 4 members, including the team leader. Winners will receive cash prizes, certificates, and a chance to intern at Ather Energy. In this hackathon, teams will design and demonstrate a wearable telemetry system that can be mounted on a rider’s gear to capture and visualise movement and ride data in real time. Your prototype should combine hardware sensors and a mobile or web application to sense, transmit, and display information about the rider’s motion and location. The goal is to produce a working demo that clearly shows how sensor data can reveal useful insights about how a person rides or moves. You may also use a smartphone as a sensing device by mounting it on the riding gear. This sensing phone will collect motion and GPS data, while a second phone (or separate app interface) can be used to view live data, map visualization, and logs.`,

  eligibility: `Open to all engineering background students across both Electronic City and Ring Road Campus. Team members must be currently enrolled in PES University and part of the current academic year. Each Participant can be part of only one team. A valid PES student ID card is mandatory.`,

  expectations: [
    'Motion sensing: accelerometer, gyroscope, IMU module, or smartphone sensors',
    'Position tracking: GPS module or phone GPS API',
    'Wireless data transfer: BLE, Wi-Fi, or direct USB connection',
    'Mobile or web visualization: Android app, React web dashboard, etc.',
    'On-device data logging: SD card, local phone storage that can be exported as a simple CSV/JSON file',
    'Low-cost, easy-to-mount sensors are preferred (ESP32, Arduino, MPU IMUs, GPS modules).',
  ],

  deliverables: [
    'A functioning prototype mounted on the provided riding gear (helmet, riding jacket, and riding pants)',
    'A live demo showing sensor readings and location tracking',
    'A brief explanation of how your system works and what insights it can provide',
  ],

  codeOfConduct: [
    'All code must be written during the hackathon period (18 hours)',
    'Open source libraries and APIs are allowed',
    'Pre-built solutions or existing projects are strictly prohibited',
    'Teams must present their solution within their allotted time limit',
    'All team members must be present during the final presentation',
    'Maintain respectful and professional behavior throughout the event',
    'No harassment, discrimination, or inappropriate conduct will be tolerated',
    'Respect intellectual property and give proper attributions',
    'Report any violations to the organizing committee immediately',
    'Violation of code of conduct may result in immediate disqualification',
    'Alcohol and Smoking is strictly condemned in campus premises',
    'Carrying of any sharp or pointy objects is not allowed',
  ],

  judging: 'To be revealed on the day of hackathon',

  resources: [
    'High-speed internet and power outlets for all teams',
    'Mentorship from industry experts and experienced faculty',
    'Dinner, Breakfast, Midnight Pizza and unlimited caffeine',
    'Hardware kits for projects (limited availability)'
  ],

  innovation: 'Teams are encouraged to go beyond the mandatory requirements and add an innovative feature that enhances rider experience, safety, data analysis, or usability, as long as it can be demonstrated live during the final test.',

  prizes: [
    { title: '1st prize', amount: '₹16,000' },
    { title: '2nd prize', amount: '₹12,000' },
    { title: 'Innovation Challenge', amount: '₹7,000' },
  ]
}

export default function GuidelinesPage() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section ref={headerRef} className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Racing circuit background */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <motion.path
              d="M 0 200 Q 300 100 600 200 T 1200 200"
              stroke="url(#guidelinesGradient)"
              strokeWidth="6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <motion.path
              d="M 0 220 Q 300 120 600 220 T 1200 220"
              stroke="url(#guidelinesGradient2)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="guidelinesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="guidelinesGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Digital scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent"
              style={{ top: `${15 + i * 12}%` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 4
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 relative"
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 30px rgba(249, 115, 22, 0.8)'
              }}
            >
              Ignition 1.0
              {/* Holographic scan effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            </motion.span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Guidelines
            </span>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 text-3xl opacity-60"
              animate={{ 
                rotate: 360,
                y: [-10, 10, -10]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity }
              }}
            >
              📋
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 text-3xl opacity-60"
              animate={{ 
                rotate: -360,
                x: [-8, 8, -8]
              }}
              transition={{ 
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                x: { duration: 2, repeat: Infinity }
              }}
            >
              🏁
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about{' '}
            <motion.span 
              className="text-blue-400 font-semibold"
              whileHover={{ 
                textShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
                scale: 1.05
              }}
            >
              Ignition 1.0
            </motion.span>
            {' '}- An 18-hour IoT hackathon where practical hardware & live telemetry meet rapid prototyping.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: 'Duration', value: '18h', icon: '⏰' },
              { label: 'Prize Pool', value: '₹35K+', icon: '💰' },
              { label: 'Date', value: '7th Nov', icon: '📅' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <motion.div 
                  className="text-3xl mb-2"
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 3, 
                    delay: index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {stat.icon}
                </motion.div>
              {/* WhatsApp group link (below icons) */}
              <div className="mt-8">
                <a
                  href="https://chat.whatsapp.com/FTCvjQ1Z6TVKD75GrVHEJe?mode=wwt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
                >
                  🔗 Join the WhatsApp group for updates
                </a>
              </div>
                <div className="text-2xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guidelines Sections */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-500/6 backdrop-blur-sm border border-orange-600/10 rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">Ignition 1.0 — Guidelines</h2>
              <a
                href={encodeURI(pdfPath)}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-600/10"
              >
                📄 Download Problem Brief
              </a>
            </div>
              <div className="prose prose-invert max-w-none">
                <div className="space-y-8">
                  <section>
                    <h3>Overview</h3>
                    <p className="lead">{ignitionContent.overview}</p>
                  </section>

                  <section>
                    <h3>Eligibility</h3>
                    <p>{ignitionContent.eligibility}</p>
                  </section>

                  <section>
                    <h3>Expectations</h3>
                    <ul>
                      {ignitionContent.expectations.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3>Deliverables</h3>
                    <ol>
                      {ignitionContent.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ol>
                  </section>

                  <section>
                    <h3>Rules & Code of Conduct</h3>
                    <ul>
                      {ignitionContent.codeOfConduct.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3>Judging Criteria</h3>
                    <p>{ignitionContent.judging}</p>
                  </section>

                  <section>
                    <h3>Resources Provided</h3>
                    <ul>
                      {ignitionContent.resources.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3>Innovation Challenge</h3>
                    <p>{ignitionContent.innovation}</p>
                  </section>

                  <section>
                    <h3>Prize Pool</h3>
                    <ul>
                      {ignitionContent.prizes.map((p, i) => (
                        <li key={i}>{p.title}: <strong>{p.amount}</strong></li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity 
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Race to Innovation?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Join Ignition 1.0 and experience the thrill of innovation. Register now and be part of the ultimate racing-themed hackathon!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/ignition'}
            >
              <span className="relative z-10">🏁 Register for Ignition</span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button 
              className="group relative px-8 py-4 border-2 border-blue-500 text-blue-400 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:text-white"
              whileHover={{ 
                scale: 1.05,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
            >
              <span className="relative z-10">← Back to Registration</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}