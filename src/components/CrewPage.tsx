'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import PageWrapper from './PageWrapper'
import { getTeamMembers, TeamMember } from '@/lib/supabase'

const domains = ['All', 'Automotive', 'Robotics', 'Design', 'Media', 'Marketing']

const domainColors = {
  Automotive: 'from-orange-500 to-red-600',
  Robotics: 'from-orange-500 to-red-600',
  Design: 'from-orange-500 to-red-600',
  Media: 'from-orange-500 to-red-600',
  Marketing: 'from-purple-500 to-indigo-600',
}

const domainIcons = {
  Automotive: '🏎️',
  Robotics: '🤖',
  Design: '🎨',
  Media: '📸',
  Marketing: '📈',
}

export default function CrewPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const members = await getTeamMembers()
        setTeamMembers(members)
        setFilteredMembers(members)
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredMembers(teamMembers)
    } else {
      setFilteredMembers(teamMembers.filter(member => member.domain === activeFilter))
    }
  }, [activeFilter, teamMembers])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-black flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading team members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Enhanced Hero Section with Racing Theme */}
      <section ref={headerRef} className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Racing grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-orange-400/30"
                animate={{ 
                  opacity: [0.1, 0.4, 0.1]
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.03,
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
        </div>

        {/* Speed lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 3
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
            style={{
              textShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.4)'
            }}
          >
            Meet The{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 30px rgba(249, 115, 22, 0.8)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.8)',
                  '0 0 40px rgba(249, 115, 22, 1)',
                  '0 0 20px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crew
              {/* Holographic scan effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            </motion.span>

            {/* Floating tech elements */}
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
              ⚙️
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
              🤖
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Our diverse team of passionate{' '}
            <motion.span 
              className="text-orange-400 font-semibold"
              whileHover={{ 
                textShadow: '0 0 10px rgba(251, 146, 60, 0.8)',
                scale: 1.05
              }}
            >
              engineers, designers, and innovators
            </motion.span>
            {' '}who make Vegavath a hub of creativity and technical excellence.
          </motion.p>

          {/* Enhanced Domain Filter with Racing Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {domains.map((domain, index) => (
              <motion.button
                key={domain}
                onClick={() => handleFilterChange(domain)}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden group ${
                  activeFilter === domain
                    ? 'bg-gradient-orange text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                {/* Speed lines on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ transform: `translateY(${-1 + i}px)` }}
                      animate={{ 
                        x: ['-100%', '100%']
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  ))}
                </div>
                
                {/* Holographic border */}
                {activeFilter !== domain && (
                  <motion.div
                    className="absolute inset-0 border border-orange-400/0 rounded-full"
                    whileHover={{ 
                      borderColor: 'rgba(249, 115, 22, 0.4)',
                      boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <span className="relative z-10">
                  {domain !== 'All' && (
                    <motion.span 
                      className="mr-2"
                      animate={{ 
                        rotateY: [0, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatDelay: 4
                      }}
                    >
                      {domainIcons[domain as keyof typeof domainIcons]}
                    </motion.span>
                  )}
                  {domain}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Team stats */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { label: 'Active Members', value: filteredMembers.length.toString(), icon: '👥' },
              { label: 'Domains', value: '5', icon: '⚙️' },
              { label: 'Projects', value: '25+', icon: '🚀' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
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
                    repeatDelay: 3
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No team members found for this domain.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 relative"
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Racing stripe accent */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />

                  {/* Enhanced Profile Image */}
                  <div className="relative h-64 bg-gray-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    
                    {/* Holographic grid overlay */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity z-5">
                      <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                        {[...Array(64)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="border border-orange-400/30"
                            animate={{ 
                              opacity: [0.1, 0.5, 0.1]
                            }}
                            transition={{ 
                              duration: 2, 
                              delay: i * 0.02,
                              repeat: Infinity 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center relative z-0">
                      <motion.span 
                        className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        📸 Photo Coming Soon
                      </motion.span>
                    </div>
                    
                    {/* Enhanced Domain Badge */}
                    <motion.div 
                      className="absolute top-4 right-4 z-20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
                          domainColors[member.domain as keyof typeof domainColors]
                        } text-white relative overflow-hidden`}
                        whileHover={{ 
                          boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)'
                        }}
                      >
                        <motion.span
                          animate={{ 
                            rotateY: [0, 360]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          {domainIcons[member.domain as keyof typeof domainIcons]}
                        </motion.span>
                        {' '}{member.domain}
                        
                        {/* Scan line effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatDelay: 4
                          }}
                        />
                      </motion.span>
                    </motion.div>

                    {/* Speed lines on hover */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-0.5 bg-orange-400 rounded-full mb-1"
                          animate={{ 
                            opacity: [0, 1, 0],
                            x: [0, 15, 0]
                          }}
                          transition={{ 
                            duration: 1, 
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Member Info */}
                  <div className="p-6 relative">
                    {/* Tech pattern background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
                        {[...Array(24)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="border border-orange-400/20"
                            animate={{ 
                              opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ 
                              duration: 3, 
                              delay: i * 0.1,
                              repeat: Infinity 
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <motion.h3 
                      className="text-xl font-bold text-white mb-2 relative z-10"
                      whileHover={{ 
                        x: 5,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-orange-500 font-medium mb-3 relative z-10"
                      whileHover={{ 
                        x: 5,
                        color: '#fb923c'
                      }}
                    >
                      {member.role}
                    </motion.p>
                    
                    <motion.p 
                      className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {member.bio}
                    </motion.p>

                    {/* Enhanced Social Links */}
                    <div className="flex space-x-3 mt-4 relative z-10">
                      {member.linkedin_url && (
                        <motion.a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-500 hover:bg-gray-700 transition-all duration-300 relative overflow-hidden group/link"
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: '0 0 15px rgba(249, 115, 22, 0.5)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          
                          {/* Holographic border */}
                          <motion.div
                            className="absolute inset-0 border border-orange-400/0 rounded-lg"
                            whileHover={{ 
                              borderColor: 'rgba(249, 115, 22, 0.5)'
                            }}
                          />
                        </motion.a>
                      )}
                      
                      {member.github_url && (
                        <motion.a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300 relative overflow-hidden group/link"
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          
                          {/* Holographic border */}
                          <motion.div
                            className="absolute inset-0 border border-gray-400/0 rounded-lg"
                            whileHover={{ 
                              borderColor: 'rgba(156, 163, 175, 0.5)'
                            }}
                          />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-8"
          >
            Want to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Join Our Crew?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            We&apos;re always looking for passionate individuals who want to make an impact. 
            Join us and be part of something extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10">Apply Now</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}