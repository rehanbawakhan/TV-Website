'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import { getGalleryItems, GalleryItem } from '@/lib/supabase'

const categories = ['all', 'event', 'project', 'workshop', 'general']

const categoryIcons = {
  all: '🖼️',
  event: '🎉',
  project: '🔧',
  workshop: '🛠️',
  general: '📸',
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const items = await getGalleryItems()
        setGalleryItems(items)
        setFilteredItems(items)
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        // Use placeholder data if Supabase is not configured
        const placeholderItems: GalleryItem[] = [
          {
            id: '1',
            image_url: '/assets/gallery/placeholder-1.jpg',
            caption: 'Team working on the latest automotive project',
            category: 'project',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            image_url: '/assets/gallery/placeholder-2.jpg',
            caption: 'Robotics workshop with participants',
            category: 'workshop',
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            image_url: '/assets/gallery/placeholder-3.jpg',
            caption: 'Annual tech fest event',
            category: 'event',
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            image_url: '/assets/gallery/placeholder-4.jpg',
            caption: 'Club team collaboration session',
            category: 'general',
            created_at: new Date().toISOString(),
          },
        ]
        setGalleryItems(placeholderItems)
        setFilteredItems(placeholderItems)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter))
    }
  }, [activeFilter, galleryItems])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
  }

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-black flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-black">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={headerRef} className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8"
            style={{
              textShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.4)'
            }}
          >
            Our{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-orange"
              animate={{
                textShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.8)',
                  '0 0 40px rgba(249, 115, 22, 1)',
                  '0 0 20px rgba(249, 115, 22, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Gallery
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            A visual journey through our projects, events, workshops, and memorable moments 
            that define the Vegavath experience.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                  activeFilter === category
                    ? 'bg-gradient-orange text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {categoryIcons[category as keyof typeof categoryIcons]} {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No items found for this category.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Image */}
                    <div className="relative h-64 bg-gray-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Image Placeholder</span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/80 text-white capitalize">
                          {categoryIcons[item.category as keyof typeof categoryIcons]} {item.category}
                        </span>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      {/* View icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-96 bg-gray-800">
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">Full Resolution Image</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 capitalize">
                    {categoryIcons[selectedItem.category as keyof typeof categoryIcons]} {selectedItem.category}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(selectedItem.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white text-lg leading-relaxed">{selectedItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}