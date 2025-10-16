
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import PageWrapper from './PageWrapper'

const sponsors = [
  {
    name: 'TechCorp Industries',
    logo: '/assets/sponsors/placeholder-logo.png',
    tier: 'Platinum',
    description: 'Leading automotive technology solutions'
  },
  {
    name: 'InnovateLab',
    logo: '/assets/sponsors/placeholder-logo.png',
    tier: 'Gold',
    description: 'Robotics and AI research partner'
  },
  {
    name: 'DesignStudio Pro',
    logo: '/assets/sponsors/placeholder-logo.png',
    tier: 'Silver',
    description: 'Creative design and media solutions'
  },
]

const milestones = [
  { year: '2020', event: 'Vegavath Technical Club Founded', description: 'Started with a vision to bridge academia and industry' },
  { year: '2021', event: 'First Go-Kart Built', description: 'Successfully designed and built our first high-performance go-kart' },
  { year: '2022', event: 'Robotics Division Launch', description: 'Expanded into autonomous systems and robotics development' },
  { year: '2023', event: 'Multi-Domain Excellence', description: 'Achieved recognition across all five technical domains' },
  { year: '2024', event: 'Industry Partnerships', description: 'Established strategic partnerships with leading tech companies' },
]

export default function AboutPage() {
  const [historyRef, historyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sponsorsRef, sponsorsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <PageWrapper variant="hero" className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Enhanced Hero Section with Racing Elements */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        {/* Racing circuit background */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <motion.path
              d="M 0 200 Q 300 100 600 200 T 1200 200"
              stroke="url(#heroGradient)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 relative modern-title"
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 60px rgba(255, 107, 53, 0.2)'
            }}
          >
            About{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ 
                scale: 1.05,
                textShadow: '0 0 30px rgba(255, 107, 53, 0.8)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 107, 53, 0.8)',
                  '0 0 40px rgba(255, 107, 53, 1)',
                  '0 0 20px rgba(255, 107, 53, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Vegavath
              {/* Holographic scan effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />
            </motion.span>
            
            {/* Floating racing elements */}
            <motion.div
              className="absolute -top-4 -right-4 text-2xl"
              animate={{ 
                rotate: 360,
                y: [-5, 5, -5]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity }
              }}
            >
              ⚙️
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 text-2xl"
              animate={{ 
                rotate: -360,
                x: [-3, 3, -3]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                x: { duration: 1.5, repeat: Infinity }
              }}
            >
              🏎️
            </motion.div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative"
          >
            Born from a passion for racing and a drive to push automotive boundaries, 
            Vegavath Technical Club stands as a{' '}
            <motion.span 
              className="text-orange-400 font-semibold"
              whileHover={{ 
                textShadow: '0 0 10px rgba(251, 146, 60, 0.8)',
                scale: 1.05
              }}
            >
              high-performance team
            </motion.span>
            {' '}in engineering excellence and racing innovation.
          </motion.p>

          {/* Racing stats animation */}
          <motion.div
            className="mt-12 flex justify-center space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: 'Projects', value: '50+', icon: '🚀' },
              { label: 'Members', value: '100+', icon: '👥' },
              { label: 'Domains', value: '5', icon: '⚙️' }
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
                <div className="text-2xl font-bold text-orange-500 group-hover:text-orange-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mission & Vision with Racing Theme */}
      <section className="py-20 px-4 relative">
        {/* Robotic grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 grid-rows-10 h-full w-full">
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-orange-400/20"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.01,
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <motion.h2 
                className="text-3xl font-bold text-white relative"
                whileHover={{ scale: 1.02 }}
              >
                Our Mission
                {/* Digital underline */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                To empower students with hands-on technical experience across multiple engineering domains, 
                fostering innovation, creativity, and practical problem-solving skills that prepare them 
                for real-world challenges in the rapidly evolving tech industry.
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-orange rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                    rotate: 360
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-white font-bold text-xl relative z-10">M</span>
                  {/* Animated circuit pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    style={{
                      backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)'
                    }}
                  />
                </motion.div>
                <motion.span 
                  className="text-orange-500 font-semibold group-hover:text-orange-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Making Ideas Reality
                </motion.span>
              </motion.div>

              {/* Mission stats */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { icon: '🔧', label: 'Projects', value: '50+' },
                  { icon: '🏆', label: 'Awards', value: '15+' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-4 text-center group/stat"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(249, 115, 22, 0.5)'
                    }}
                  >
                    <motion.div 
                      className="text-2xl mb-2"
                      animate={{ 
                        rotateY: [0, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.3,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-orange-400 font-bold text-lg group-hover/stat:text-orange-300">
                      {item.value}
                    </div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <motion.h2 
                className="text-3xl font-bold text-white relative"
                whileHover={{ scale: 1.02 }}
              >
                Our Vision
                {/* Digital underline */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                To become the premier technical club that bridges the gap between theoretical knowledge 
                and practical application, producing industry-ready engineers who drive technological 
                advancement and innovation across automotive, robotics, design, media, and marketing domains.
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                    rotate: -360
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-white font-bold text-xl relative z-10">V</span>
                  {/* Animated holographic effect */}
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
                <motion.span 
                  className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Visionary Engineering
                </motion.span>
              </motion.div>

              {/* Vision domains */}
              <motion.div
                className="grid grid-cols-1 gap-3 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { icon: '🏎️', domain: 'Automotive Engineering' },
                  { icon: '🤖', domain: 'Robotics & AI' },
                  { icon: '🎨', domain: 'Design Innovation' },
                  { icon: '📸', domain: 'Media Technology' },
                  { icon: '📈', domain: 'Digital Marketing' }
                ].map((item, index) => (
                  <motion.div
                    key={item.domain}
                    className="flex items-center space-x-3 bg-gray-900/20 border border-gray-700/30 rounded-lg p-3 group/domain"
                    whileHover={{ 
                      x: 10,
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <motion.span 
                      className="text-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-gray-300 group-hover/domain:text-orange-300 transition-colors">
                      {item.domain}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Club History Timeline with Racing Theme */}
      <section ref={historyRef} className="py-20 px-4 relative">
        {/* Racing track background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            <motion.path
              d="M 0 400 Q 300 200 600 400 T 1200 400"
              stroke="#f97316"
              strokeWidth="6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 0.5 }}
            />
            <motion.path
              d="M 0 420 Q 300 220 600 420 T 1200 420"
              stroke="#dc2626"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 1 }}
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={historyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white text-center mb-16 relative"
            style={{
              textShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange relative inline-block"
              whileHover={{ scale: 1.05 }}
              animate={{
                textShadow: [
                  '0 0 15px rgba(249, 115, 22, 0.8)',
                  '0 0 30px rgba(249, 115, 22, 1)',
                  '0 0 15px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Journey
              {/* Speed lines */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-0.5 bg-orange-400 rounded-full mb-1"
                    animate={{ 
                      opacity: [0, 1, 0],
                      x: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>
            </motion.span>
          </motion.h2>

          <div className="relative">
            {/* Enhanced Timeline Line with Animation */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-red-500 hidden md:block"
              style={{ height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={historyInView ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={historyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col group`}
                >
                  <motion.div 
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                    } text-center`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 relative overflow-hidden group-hover:border-orange-500/50 transition-all duration-300"
                      whileHover={{ 
                        boxShadow: '0 10px 30px rgba(249, 115, 22, 0.2)'
                      }}
                    >
                      {/* Racing stripe accent */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />
                      
                      {/* Tech pattern overlay */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                          {[...Array(48)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="border border-orange-400/30"
                              animate={{ 
                                opacity: [0.1, 0.3, 0.1]
                              }}
                              transition={{ 
                                duration: 2, 
                                delay: i * 0.05,
                                repeat: Infinity 
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <motion.h3 
                        className="text-2xl font-bold text-orange-500 mb-2 relative z-10"
                        whileHover={{ scale: 1.05 }}
                      >
                        {milestone.year}
                        {/* Year glow effect */}
                        <motion.span
                          className="absolute inset-0 text-orange-300 blur-sm opacity-0 group-hover:opacity-50 transition-opacity"
                          animate={{ 
                            textShadow: [
                              '0 0 5px rgba(251, 146, 60, 0.5)',
                              '0 0 20px rgba(251, 146, 60, 0.8)',
                              '0 0 5px rgba(251, 146, 60, 0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {milestone.year}
                        </motion.span>
                      </motion.h3>
                      
                      <h4 className="text-xl font-semibold text-white mb-3 relative z-10">
                        {milestone.event}
                      </h4>
                      
                      <p className="text-gray-300 relative z-10 group-hover:text-gray-200 transition-colors">
                        {milestone.description}
                      </p>

                      {/* Achievement icon */}
                      <motion.div
                        className="absolute top-4 right-4 text-2xl opacity-30 group-hover:opacity-70 transition-opacity"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        {index === 0 && '🏁'}
                        {index === 1 && '🏎️'}
                        {index === 2 && '🤖'}
                        {index === 3 && '🏆'}
                        {index === 4 && '🚀'}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Timeline Node */}
                  <motion.div 
                    className="relative z-10 my-4 md:my-0 hidden md:block"
                    initial={{ scale: 0 }}
                    animate={historyInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.5 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-4 border-gray-900 relative"
                      whileHover={{ 
                        scale: 1.3,
                        boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
                      }}
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 border-2 border-orange-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  <div className="w-full md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section ref={sponsorsRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white text-center mb-16"
            style={{
              textShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange"
              animate={{
                textShadow: [
                  '0 0 15px rgba(249, 115, 22, 0.8)',
                  '0 0 30px rgba(249, 115, 22, 1)',
                  '0 0 15px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sponsors
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            We&apos;re grateful to our partners who believe in our vision and support our mission 
            to create the next generation of innovative engineers.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 50 }}
                animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Logo</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{sponsor.name}</h3>
                
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                  sponsor.tier === 'Platinum' ? 'bg-gray-200 text-gray-900' :
                  sponsor.tier === 'Gold' ? 'bg-yellow-500 text-yellow-900' :
                  'bg-gray-400 text-gray-900'
                }`}>
                  {sponsor.tier} Partner
                </div>
                
                <p className="text-gray-400 text-sm">{sponsor.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={sponsorsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10">Become a Sponsor</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Values
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Innovation', description: 'Pushing boundaries and thinking outside the box', icon: '💡' },
              { title: 'Excellence', description: 'Striving for the highest standards in everything we do', icon: '🏆' },
              { title: 'Collaboration', description: 'Working together to achieve greater outcomes', icon: '🤝' },
              { title: 'Impact', description: 'Creating meaningful change in technology and society', icon: '🚀' }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}