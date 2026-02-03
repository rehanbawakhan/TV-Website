'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import SkeletonCard from './SkeletonCard'
import { GalleryItem } from '@/lib/supabase'

interface GroupedGallery {
  [key: string]: GalleryItem[]
}

interface EventData {
  eventName: string
  items: GalleryItemWithSkeleton[]
}

// Extend GalleryItem to support skeleton mode safely
interface GalleryItemWithSkeleton extends GalleryItem {
  isSkeleton?: boolean
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemWithSkeleton[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [groupedByEvent, setGroupedByEvent] = useState<EventData[]>([])

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const groupGalleryByEvent = (items: GalleryItemWithSkeleton[]): EventData[] => {
    const eventGrouped: { [eventName: string]: GalleryItemWithSkeleton[] } = {}

    items.forEach(item => {
      if (!eventGrouped[item.event_name]) {
        eventGrouped[item.event_name] = []
      }
      eventGrouped[item.event_name].push(item)
    })

    return Object.keys(eventGrouped)
      .sort()
      .map(eventName => ({
        eventName,
        items: eventGrouped[eventName].sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
      }))
  }

  useEffect(() => {
    async function fetchGalleryItems() {
      const localItems: GalleryItemWithSkeleton[] = [
        {
          id: 'bootstrap-2025-09-1',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 1).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-2',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 2).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-3',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 3).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-4',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 4).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-5',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 5).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-6',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 6).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-7',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 7).toISOString(),
          isSkeleton: false
        },
        {
          id: 'bootstrap-2025-09-8',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Bootstrap \'25 (September 2025)',
          event_name: 'Bootstrap',
          created_at: new Date(2025, 8, 8).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-1',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 1).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-2',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 2).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-3',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 3).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-4',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 4).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-5',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 5).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-6',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 6).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-7',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 7).toISOString(),
          isSkeleton: false
        },
        {
          id: 'ignition-2025-11-8',
          image_url: '/assets/gallery/imported/rocket_league.jpg',
          caption: 'Ignition 1.0 (November 2025)',
          event_name: 'Ignition 1.0',
          created_at: new Date(2025, 10, 8).toISOString(),
          isSkeleton: false
        }
      ]

      try {
        setLoading(true)
        // For this demo/development phase, we prioritize the local items to ensure the user's requested images are visible.
        // If you want to fetch and merge, you can uncomment below, but for now we set localItems directly.
        // const items = await getGalleryItems()

        setGalleryItems(localItems)
        setGroupedByEvent(groupGalleryByEvent(localItems))
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        setGalleryItems(localItems)
        setGroupedByEvent(groupGalleryByEvent(localItems))
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

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

      {/* Hero Section with Racing Circuit Background */}
      <section ref={headerRef} className="pt-20 pb-16 px-4 relative overflow-hidden">
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
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 relative modern-title"
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.4), 0 0 60px rgba(255, 107, 53, 0.2)'
            }}
          >
            Our{' '}
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
              Gallery
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 modern-body"
          >
            A visual journey through our projects, events, workshops, and memorable moments
            that define the Vegavath experience.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid Organized by Event */}
      <section className="py-12 px-4 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {galleryItems.length === 0 ? (
            <div className="text-center py-24">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 text-xl"
              >
                No gallery items found.
              </motion.p>
            </div>
          ) : (
            <motion.div layout className="space-y-16">
              {groupedByEvent.map((eventData, eventIndex) => (
                <motion.div
                  key={eventData.eventName}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: eventIndex * 0.1 }}
                  className="space-y-6"
                >
                  {/* Event Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white whitespace-nowrap modern-title">
                      <span className="text-transparent bg-clip-text bg-gradient-orange">
                        {eventData.eventName}
                      </span>
                      <span className="text-gray-400 text-sm italic font-normal ml-3">
                        (
                        {new Date(eventData.items[0].created_at).toLocaleDateString('default', {
                          month: 'long',
                          year: 'numeric'
                        })}
                        )
                      </span>
                    </h2>
                  </div>

                  {/* Grid Layout - tiles per event */}
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {eventData.items.map((item, index) => {
                      if (item.isSkeleton) {
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="cursor-default"
                          >
                            <SkeletonCard />
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className="group cursor-pointer flex flex-col gap-4"
                          onClick={() => openLightbox(item)}
                        >
                          {/* Image Container */}
                          <div className="relative w-full rounded-xl overflow-hidden aspect-video shadow-lg shadow-black/30">
                            {item.image_url ? (
                              <>
                                <img
                                  src={item.image_url}
                                  alt={item.caption || 'Gallery image'}
                                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                {/* View icon (optional, subtle) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
                                <svg className="w-12 h-12 text-gray-700/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Content Below Image */}
                        </motion.div>
                      )
                    })}
                  </motion.div>
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
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-4xl max-h-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-2xl shadow-orange-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors hover:scale-110 transform"
                title="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-96 bg-gray-800 flex items-center justify-center">
                {selectedItem.image_url ? (
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.caption || 'Full resolution'}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-20 h-20 text-gray-700/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400">
                    {selectedItem.event_name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(selectedItem.created_at).toLocaleDateString('default', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-white text-lg leading-relaxed font-medium">{selectedItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
