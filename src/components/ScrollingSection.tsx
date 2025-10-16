
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with React Three Fiber
const Interactive3DScene = dynamic(() => import('./Interactive3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-primary-orange/30 flex items-center justify-center">
      <div className="text-primary-orange text-lg modern-body">Loading Interactive 3D Scene...</div>
    </div>
  )
})

export default function ScrollingSection() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -400])

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [domainsRef, domainsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const domains = [
    {
      name: 'Automotive',
      description: 'Designing and building high-performance racing vehicles, from go-karts to advanced automotive systems.',
      icon: '🏎️',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Building the fastest machines on wheels'
    },
    {
      name: 'Robotics',
      description: 'Creating intelligent autonomous racing systems and cutting-edge robotics solutions.',
      icon: '🤖',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Racing toward the future with AI'
    },
    {
      name: 'Design',
      description: 'Crafting aerodynamic designs and racing aesthetics with modern principles.',
      icon: '🎨',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Designing for speed and style'
    },
    {
      name: 'Media',
      description: 'Capturing the thrill of racing and producing high-octane multimedia experiences.',
      icon: '📸',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Broadcasting the excitement'
    },
    {
      name: 'Marketing',
      description: 'Building brand presence in motorsports and creating championship-level campaigns.',
      icon: '📈',
      gradient: 'from-primary-orange to-primary-orangeDark',
      racing: 'Marketing at racing speed'
    }
  ]

  return (
    <div className="relative bg-gradient-black">
      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        {/* Textured Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%)
              `,
              backgroundSize: '200px 200px, 250px 250px, 180px 180px, 60px 60px, 60px 60px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                )
              `
            }}
          />
        </div>

        <motion.div 
          ref={aboutRef}
          style={{ y: y1 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 modern-title"
          >
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Vegavath
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed mb-12 modern-body"
          >
            Vegavath is more than just a technical club—we&apos;re a community of innovators, 
            creators, and dreamers pushing the boundaries of technology. Founded with a vision 
            to bridge the gap between theoretical knowledge and practical application, we work 
            across multiple domains to create solutions that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">50+</div>
              <div className="text-gray-400 modern-body">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">25+</div>
              <div className="text-gray-400 modern-body">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-orange font-heading">5</div>
              <div className="text-gray-400 modern-body">Technical Domains</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Domains Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        {/* Textured Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%)
              `,
              backgroundSize: '200px 200px, 250px 250px, 180px 180px, 60px 60px, 60px 60px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.1) 2px,
                  rgba(255, 107, 53, 0.1) 4px
                )
              `
            }}
          />
        </div>

        <motion.div 
          ref={domainsRef}
          style={{ y: y2 }}
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* Hackathon Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={domainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-orange">
                VegaHack
              </span>{' '}
              2025
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Join us for the ultimate 48-hour coding marathon! Experience the thrill of 
              innovation, where the fastest minds race against time to build 
              groundbreaking solutions. Rev up your engines for VegaHack 2025!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-orange-500/30">
                <div className="text-3xl mb-3">🏁</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">48 Hours</h3>
                <p className="text-gray-400 text-sm">Non-stop coding sprint</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-orange-500/30">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">₹50,000</h3>
                <p className="text-gray-400 text-sm">Prize pool</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-xl border border-orange-500/30">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">5 Domains</h3>
                <p className="text-gray-400 text-sm">Multiple tracks</p>
              </div>
            </div>

            <motion.a
              href="/hackathon"
              className="group relative inline-block px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Register Now</span>
                <span className="text-xl">🚀</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              {/* Racing stripes */}
              <div className="absolute top-0 left-0 w-1 h-full bg-white/30 transform -skew-x-12"></div>
              <div className="absolute top-0 left-2 w-1 h-full bg-white/20 transform -skew-x-12"></div>
            </motion.a>
          </motion.div>

          {/* Interactive 3D Section */}
          <motion.div
            className="mt-16 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={domainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Textured Background for Interactive Section */}
            <div className="absolute inset-0 opacity-15 rounded-xl">
              <div 
                className="w-full h-full rounded-xl"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 50% 20%, rgba(255, 53, 255, 0.1) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 48%, rgba(0, 255, 255, 0.05) 49%, rgba(0, 255, 255, 0.05) 51%, transparent 52%),
                    linear-gradient(-45deg, transparent 48%, rgba(255, 107, 53, 0.05) 49%, rgba(255, 107, 53, 0.05) 51%, transparent 52%)
                  `,
                  backgroundSize: '150px 150px, 200px 200px, 120px 120px, 40px 40px, 40px 40px'
                }}
              />
            </div>
            
            {/* Carbon fiber pattern overlay */}
            <div className="absolute inset-0 opacity-8 rounded-xl">
              <div 
                className="w-full h-full rounded-xl"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 255, 255, 0.08) 2px,
                      rgba(0, 255, 255, 0.08) 4px
                    ),
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(0, 255, 255, 0.08) 2px,
                      rgba(0, 255, 255, 0.08) 4px
                    )
                  `
                }}
              />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Experience Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-orange">
                  Interactive Tech
                </span>
              </h3>
              <Interactive3DScene />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Spacer Section */}
      <section className="py-16"></section>

      {/* CTA Section */}
      <section className="flex items-center justify-center px-4 py-16 relative">
        {/* Textured Background for CTA Section */}
        <div className="absolute inset-0 opacity-18">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 60% 40%, rgba(255, 107, 53, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 53, 255, 0.12) 0%, transparent 50%),
                linear-gradient(45deg, transparent 48%, rgba(255, 107, 53, 0.06) 49%, rgba(255, 107, 53, 0.06) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(0, 255, 255, 0.06) 49%, rgba(0, 255, 255, 0.06) 51%, transparent 52%)
              `,
              backgroundSize: '180px 180px, 220px 220px, 160px 160px, 50px 50px, 50px 50px'
            }}
          />
        </div>
        
        {/* Carbon fiber pattern overlay */}
        <div className="absolute inset-0 opacity-12">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.12) 2px,
                  rgba(255, 107, 53, 0.12) 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 107, 53, 0.12) 2px,
                  rgba(255, 107, 53, 0.12) 4px
                )
              `
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-orange">
              Join Us?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Be part of a community that&apos;s shaping the future of technology. 
            Whether you&apos;re a beginner or an expert, there&apos;s a place for you at Vegavath.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="group relative px-8 py-4 bg-gradient-orange text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Join Our Racing Team</span>
                <span className="text-xl">🏁</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              {/* Racing stripes */}
              <div className="absolute top-0 left-0 w-1 h-full bg-white/30 transform -skew-x-12"></div>
              <div className="absolute top-0 left-2 w-1 h-full bg-white/20 transform -skew-x-12"></div>
            </button>
            
            <button className="group relative px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:text-white">
              <span className="relative z-10 flex items-center space-x-2">
                <span>View Racing Gallery</span>
                <span className="text-xl">📸</span>
              </span>
              <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}