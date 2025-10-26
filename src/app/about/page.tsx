import AboutPage from '@/components/AboutPage'
import SiteMaintenanceClient from '@/components/SiteMaintenanceClient'

export const metadata = {
  title: 'About Us - Vegavath Technical Club',
  description: 'Learn about Vegavath Technical Club history, mission, and our sponsors',
}

export default function About() {
  return (
    <>
      <SiteMaintenanceClient page="about" />
      <AboutPage />
    </>
  )
}