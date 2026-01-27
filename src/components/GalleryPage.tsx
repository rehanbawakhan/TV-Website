'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './Navigation'
import { getGalleryItems, GalleryItem } from '@/lib/supabase'

interface GroupedGallery {
  [key: string]: GalleryItem[]
}

interface EventData {
  eventName: string
  items: GalleryItem[]
}

interface MonthData {
  year: number
  month: number
  monthName: string
  events: EventData[]
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [groupedByMonth, setGroupedByMonth] = useState<MonthData[]>([])
  const [filter, setFilter] = useState<string>('All')

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const groupGalleryByMonthAndEvent = (items: GalleryItem[]): MonthData[] => {
    // First group by month
    const monthlyGrouped: { [key: string]: GalleryItem[] } = {}

    items.forEach(item => {
      const date = new Date(item.created_at)
      const year = date.getFullYear()
      const month = date.getMonth()
      const key = `${year}-${month}`

      if (!monthlyGrouped[key]) {
        monthlyGrouped[key] = []
      }
      monthlyGrouped[key].push(item)
    })

    // Convert to array and for each month, group by event_name
    const monthDataArray = Object.keys(monthlyGrouped)
      .map(key => {
        const [year, month] = key.split('-').map(Number)
        const date = new Date(year, month)
        const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' })

        // Group items in this month by event_name
        const eventGrouped: { [eventName: string]: GalleryItem[] } = {}
        monthlyGrouped[key].forEach(item => {
          if (!eventGrouped[item.event_name]) {
            eventGrouped[item.event_name] = []
          }
          eventGrouped[item.event_name].push(item)
        })

        // Convert event groups to array, sorted alphabetically
        const events = Object.keys(eventGrouped)
          .sort()
          .map(eventName => ({
            eventName,
            items: eventGrouped[eventName].sort((a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            ),
          }))

        return {
          year,
          month,
          monthName,
          events,
        }
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year
        return b.month - a.month
      })

    return monthDataArray
  }

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const items = await getGalleryItems()
        setGalleryItems(items)
        setGroupedByMonth(groupGalleryByMonthAndEvent(items))
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        // Use placeholder data if Supabase is not configured
        const placeholderItems: GalleryItem[] = [
          // January 2026 - 4 items
          {
            id: '1',
            image_url: '/assets/gallery/placeholder-1.jpg',
            caption: 'Team working on the latest automotive project',
            event_name: 'Ignition',
            created_at: new Date(2026, 0, 15).toISOString(),
          },
          {
            id: '2',
            image_url: '/assets/gallery/placeholder-2.svg',
            caption: 'Robotics workshop with participants',
            event_name: 'Bootstrap',
            created_at: new Date(2026, 0, 12).toISOString(),
          },
          {
            id: '3',
            image_url: '/assets/gallery/placeholder-3.svg',
            caption: 'Annual tech fest event',
            event_name: 'Ignition',
            created_at: new Date(2026, 0, 18).toISOString(),
          },
          {
            id: '4',
            image_url: '/assets/gallery/placeholder-4.svg',
            caption: 'Club team collaboration session',
            event_name: 'Ignition 2',
            created_at: new Date(2026, 0, 22).toISOString(),
          },
          // December 2025 - 4 items
          {
            id: '5',
            image_url: '/assets/gallery/placeholder-1.jpg',
            caption: 'Coding challenge finals',
            event_name: 'Bootstrap',
            created_at: new Date(2025, 11, 10).toISOString(),
          },
          {
            id: '6',
            image_url: '/assets/gallery/placeholder-2.svg',
            caption: 'Hardware demonstration session',
            event_name: 'Ignition',
            created_at: new Date(2025, 11, 15).toISOString(),
          },
          {
            id: '7',
            image_url: '/assets/gallery/placeholder-3.svg',
            caption: 'Networking event with industry experts',
            event_name: 'Bootstrap',
            created_at: new Date(2025, 11, 20).toISOString(),
          },
          {
            id: '8',
            image_url: '/assets/gallery/placeholder-4.svg',
            caption: 'Project showcase presentation',
            event_name: 'Ignition 2',
            created_at: new Date(2025, 11, 25).toISOString(),
          },
          // November 2025 - 4 items
          {
            id: '9',
            image_url: '/assets/gallery/placeholder-1.jpg',
            caption: 'Workshop attendees learning new skills',
            event_name: 'Ignition',
            created_at: new Date(2025, 10, 8).toISOString(),
          },
          {
            id: '10',
            image_url: '/assets/gallery/placeholder-2.svg',
            caption: 'Team building activity',
            event_name: 'Bootstrap',
            created_at: new Date(2025, 10, 14).toISOString(),
          },
          {
            id: '11',
            image_url: '/assets/gallery/placeholder-3.svg',
            caption: 'Prize distribution ceremony',
            event_name: 'Ignition',
            created_at: new Date(2025, 10, 19).toISOString(),
          },
          {
            id: '12',
            image_url: '/assets/gallery/placeholder-4.svg',
            caption: 'Student presentation on innovation',
            event_name: 'Ignition 2',
            created_at: new Date(2025, 10, 27).toISOString(),
          },
        ]
        setGalleryItems(placeholderItems)
        setGroupedByMonth(groupGalleryByMonthAndEvent(placeholderItems))
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const handleFilterChange = (filterName: string) => {
    setFilter(filterName)
    if (filterName === 'All') {
      setGroupedByMonth(groupGalleryByMonthAndEvent(galleryItems))
    } else {
      const filtered = galleryItems.filter(item => item.event_name === filterName)
      setGroupedByMonth(groupGalleryByMonthAndEvent(filtered))
    }
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

      {/* Gallery Grid Organized by Month */}
      <section className="py-12 px-4 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('All')}
              className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${filter === 'All'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              All Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('Ignition')}
              className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${filter === 'Ignition'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              Ignition
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('Bootstrap')}
              className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${filter === 'Bootstrap'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              Bootstrap
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange('Ignition 2')}
              className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${filter === 'Ignition 2'
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              Ignition 2
            </motion.button>
          </div>

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
              {groupedByMonth.map((monthData, monthIndex) => (
                <motion.div
                  key={`${monthData.year}-${monthData.month}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: monthIndex * 0.1 }}
                  className="space-y-6"
                >
                  {/* Month Header */}
                  <div className="relative flex items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white whitespace-nowrap modern-title">
                      <span className="text-transparent bg-clip-text bg-gradient-orange">
                        {monthData.monthName}
                      </span>
                      <span className="text-gray-400 text-lg ml-3 font-normal normal-case">
                        ({monthData.events.reduce((sum, event) => sum + event.items.length, 0)} {monthData.events.reduce((sum, event) => sum + event.items.length, 0) === 1 ? 'photo' : 'photos'})
                      </span>
                    </h2>
                  </div>

                  {/* Grid Layout - 3 items per month */}
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {monthData.events.flatMap(event => event.items).map((item, index) => (
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
                              <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content Below Image */}
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">
                            {item.event_name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {item.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
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
                    <svg className="w-20 h-20 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-gray-400 text-lg font-medium">Upload Image</p>
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