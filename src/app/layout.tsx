import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import Footer from '@/components/Footer'
import HolographicBackground from '../components/HolographicBackground'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Vegavath Technical Club',
    template: '%s | Vegavath'
  },
  description: 'Join Vegavath Technical Club - Where innovation meets automotive excellence, robotics mastery, cutting-edge design, and dynamic media marketing. Race towards the future of technology.',
  keywords: [
    'Vegavath',
    'Technical Club',
    'Automotive',
    'Robotics',
    'Design',
    'Media Marketing',
    'Technology',
    'Innovation',
    'Engineering',
    'Students',
    'Club',
    'Racing',
    'VegaHack',
    'Hackathon'
  ],
  authors: [{ name: 'Vegavath Technical Club' }],
  creator: 'Vegavath Technical Club',
  publisher: 'Vegavath',
  metadataBase: new URL('https://vegavath.com'),
  openGraph: {
    title: 'Vegavath Technical Club',
    description: 'Where innovation meets automotive excellence, robotics mastery, and cutting-edge design.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Vegavath Technical Club',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vegavath Technical Club'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vegavath Technical Club',
    description: 'Where innovation meets automotive excellence, robotics mastery, and cutting-edge design.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <HolographicBackground />
          <PageTransition>
            <div className="min-h-screen flex flex-col">
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </div>
          </PageTransition>
        </Providers>
      </body>
    </html>
  )
}