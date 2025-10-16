'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'

const sections = [
  {
    title: 'Competition Overview',
    icon: '🏁',
    content: [
      'VegaHack is a 48-hour racing-themed hackathon where innovation meets velocity',
      'Teams can have up to 4 members including the team leader',
      'Registration fee: ₹500 per team (covers meals, swag, and workspace)',
      'Winners will receive cash prizes, certificates, and exclusive internship opportunities'
    ]
  },
  {
    title: 'Eligibility Criteria',
    icon: '🏎️',
    content: [
      'Open to all undergraduate and graduate students',
      'Team members must be currently enrolled in any recognized educational institution',
      'Each participant can only be part of one team',
      'Valid student ID required during registration verification'
    ]
  },
  {
    title: 'Domains & Tracks',
    icon: '⚙️',
    content: [
      'Automotive Tech: Vehicle automation, IoT integration, safety systems',
      'Robotics & AI: Autonomous systems, machine learning, computer vision',
      'Design Innovation: UI/UX, product design, creative solutions',
      'Media Technology: AR/VR, content creation, digital experiences',
      'Digital Marketing: Growth hacking, analytics, social media innovation'
    ]
  },
  {
    title: 'Rules & Regulations',
    icon: '📋',
    content: [
      'All code must be written during the hackathon period (48 hours)',
      'Open source libraries and APIs are allowed',
      'Pre-built solutions or existing projects are strictly prohibited',
      'Teams must present their solution within the 5-minute time limit',
      'All team members must be present during the final presentation'
    ]
  },
  {
    title: 'Judging Criteria',
    icon: '🏆',
    content: [
      'Innovation & Creativity (25%): Originality and uniqueness of the solution',
      'Technical Implementation (25%): Code quality, architecture, and functionality',
      'Business Viability (20%): Market potential and practical application',
      'Presentation (15%): Communication skills and demo effectiveness',
      'Design & User Experience (15%): Interface design and user interaction'
    ]
  },
  {
    title: 'Resources Provided',
    icon: '🚀',
    content: [
      'High-speed internet and power outlets for all teams',
      'Mentorship from industry experts and Vegavath alumni',
      'Access to cloud platforms and development tools',
      'Meals and refreshments throughout the event',
      'Hardware kits for robotics and IoT projects (limited availability)'
    ]
  },
  {
    title: 'Schedule Overview',
    icon: '⏰',
    content: [
      'Day 1: Registration, team formation, problem statement reveal',
      'Day 1-2: Development phase with mentor support',
      'Day 2: Final presentations and judging',
      'Day 2: Awards ceremony and networking session'
    ]
  },
  {
    title: 'Code of Conduct',
    icon: '🤝',
    content: [
      'Maintain respectful and professional behavior throughout the event',
      'No harassment, discrimination, or inappropriate conduct will be tolerated',
      'Respect intellectual property and give proper attributions',
      'Report any violations to the organizing committee immediately',
      'Violation of code of conduct may result in immediate disqualification'
    ]
  }
]

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
              VegaHack
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
              VegaHack 2024
            </motion.span>
            {' '}- The ultimate racing-themed hackathon where innovation meets velocity.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: 'Duration', value: '48h', icon: '⏰' },
              { label: 'Prize Pool', value: '₹50K+', icon: '💰' },
              { label: 'Domains', value: '5', icon: '🎯' }
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)'
                }}
              >
                {/* Racing stripe accent */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />

                {/* Tech pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {[...Array(48)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="border border-cyan-400/30"
                        animate={{ 
                          opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ 
                          duration: 3, 
                          delay: i * 0.02,
                          repeat: Infinity 
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-2xl relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                      }}
                      animate={{ 
                        rotateY: [0, 360]
                      }}
                      transition={{ 
                        duration: 4, 
                        delay: index * 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {section.icon}
                      
                      {/* Holographic effect */}
                      <motion.div
                        className="absolute inset-0 opacity-40"
                        animate={{ 
                          background: [
                            'linear-gradient(45deg, transparent 40%, rgba(34,211,238,0.3) 50%, transparent 60%)',
                            'linear-gradient(135deg, transparent 40%, rgba(34,211,238,0.3) 50%, transparent 60%)',
                            'linear-gradient(225deg, transparent 40%, rgba(34,211,238,0.3) 50%, transparent 60%)',
                            'linear-gradient(315deg, transparent 40%, rgba(34,211,238,0.3) 50%, transparent 60%)'
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity
                        }}
                      />
                    </motion.div>

                    <motion.h3 
                      className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {section.title}
                    </motion.h3>
                  </div>

                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start space-x-3 text-gray-300 group-hover:text-gray-200 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + itemIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="text-blue-400 mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▶
                        </motion.span>
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
            Join VegaHack 2024 and experience the thrill of innovation. Register now and be part of the ultimate racing-themed hackathon!
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
              onClick={() => window.location.href = '/hackathon'}
            >
              <span className="relative z-10">🏁 Register for VegaHack</span>
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