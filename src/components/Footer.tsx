'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/team-vegavath-racing/', color: 'hover:text-primary-orange' },
  { name: 'Instagram', href: 'https://www.instagram.com/teamvegavath_pesu/', color: 'hover:text-primary-orange' },
  { name: 'GitHub', href: 'https://github.com/Team-Vegavath', color: 'hover:text-gray-300' },
]

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'The Crew', href: '/crew' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Join Us', href: '/join' },
]

const domains = [
  { name: 'Automotive', icon: '🏎️' },
  { name: 'Robotics', icon: '🤖' },
  { name: 'Design', icon: '🎨' },
  { name: 'Media', icon: '📸' },
  { name: 'Marketing', icon: '📈' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-orange mb-4 modern-title">
                VEGAVATH
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 modern-body">
                Racing toward innovation in automotive, robotics, design, media, and marketing excellence.
              </p>
              
              {/* Racing Achievement Badge */}
              <div className="bg-gradient-orange p-3 rounded-lg inline-block">
                <div className="flex items-center space-x-2 text-white text-sm font-medium modern-body">
                  <span className="text-lg">🏆</span>
                  <span>Innovation Champions</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Domains */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Our Domains</h3>
              <ul className="space-y-2">
                {domains.map((domain) => (
                  <li key={domain.name} className="text-gray-400 text-sm flex items-center space-x-2">
                    <span className="text-base">{domain.icon}</span>
                    <span>{domain.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Connect & Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700`}
                    title={social.name}
                  >
                    {social.name === 'LinkedIn' && (
                      <Image src="/icons/linkedin.png" alt="LinkedIn" width={20} height={20} />
                    )}
                    {social.name === 'Instagram' && (
                      <Image src="/icons/instagram.png" alt="Instagram" width={20} height={20} />
                    )}
                    {social.name === 'GitHub' && (
                      <Image src="/icons/github.png" alt="GitHub" width={20} height={20} />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {year} Team Vegavath. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/legal" className="hover:text-orange-500 transition-colors">Legal</Link>
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                >
                  ❤️
                </motion.span>
                <span>by Vegavath Team</span>
              </div>
            </div>
          </div>

          {/* Racing Stripe */}
          <motion.div
            className="mt-6 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </footer>
  )
}