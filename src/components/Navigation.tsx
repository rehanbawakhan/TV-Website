'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TransitionLink from './TransitionLink'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'The Crew', href: '/crew' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Join Us', href: '/join' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-primary-black/80 backdrop-blur-md border-b border-primary-orange/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Enhanced Hover Effects */}
            <Link href="/">
              <div className="flex flex-row items-center gap-3 md:gap-4 cursor-pointer">
                {/* Vegavath Logo from public/images */}
                <div className="w-10 h-10 md:w-12 md:h-12 relative flex-shrink-0">
                  <Image
                    src="/images/Logo.png"
                    alt="Vegavath Logo"
                    fill
                    sizes="(max-width: 768px) 40px, 48px"
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </div>
                
                <div className="text-xl md:text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-orange flex-shrink-0">
                  VEGAVATH
                </div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white hover:text-primary-orange transition-colors duration-200 modern-body transform hover:scale-105"
                >
                  <span className="relative z-10 font-medium px-3 py-2 block">
                    {item.name}
                  </span>

                  {/* Decorative background handled via CSS on hover to avoid JS animation cost */}
                  <div className="absolute inset-0 rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white hover:text-orange-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-orange-500/20 transition-all duration-200">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="transition-transform duration-150">
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-white hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
  </nav>
      {/* Spacer to offset the fixed navbar height */}
      <div aria-hidden="true" className="h-16" />
    </>
  )
}