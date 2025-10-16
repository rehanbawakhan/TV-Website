import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface TeamMember {
  id: string
  name: string
  role: string
  domain: 'Automotive' | 'Robotics' | 'Design' | 'Media' | 'Marketing'
  bio: string
  photo_url: string
  linkedin_url?: string
  github_url?: string
  created_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  caption: string
  category: 'event' | 'project' | 'workshop' | 'general'
  created_at: string
}

export interface Application {
  id: string
  name: string
  email: string
  phone: string
  skills: string[]
  motivation: string
  preferred_domain: string
  experience: string
  portfolio_url?: string
  created_at: string
}

export interface InterviewSlot {
  id: string
  slot_time: string
  is_taken: boolean
  meeting_link: string
  applicant_email?: string
  created_at: string
}

export interface HackathonRegistration {
  id: string
  team_name: string
  leader_name: string
  leader_email: string
  members: string[]
  problem_statement: string
  tech_stack: string[]
  created_at: string
}

// Database functions
export async function getTeamMembers() {
  try {
    // Check if we have valid Supabase configuration
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data as TeamMember[]
  } catch (error) {
    // Return placeholder data if Supabase is not configured
    return [
      {
        id: '1',
        name: 'Alex Thompson',
        role: 'Club President',
        domain: 'Automotive' as const,
        bio: 'Leading the charge in automotive innovation and racing technology development.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Sarah Chen',
        role: 'Technical Lead',
        domain: 'Robotics' as const,
        bio: 'Specializes in autonomous systems and robotics development for racing applications.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Marcus Rodriguez',
        role: 'Design Director',
        domain: 'Design' as const,
        bio: 'Crafting sleek aerodynamic designs and user experiences for high-performance vehicles.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Emma Wilson',
        role: 'Media Chief',
        domain: 'Media' as const,
        bio: 'Capturing the thrill of racing and creating compelling visual content.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Ryan Park',
        role: 'Marketing Lead',
        domain: 'Marketing' as const,
        bio: 'Accelerating brand growth and building strategic partnerships in motorsports.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
    ] as TeamMember[]
  }
}

export async function getGalleryItems() {
  try {
    // Check if we have valid Supabase configuration
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as GalleryItem[]
  } catch (error) {
    // Return placeholder data if Supabase is not configured
    return [
      {
        id: '1',
        image_url: '/assets/gallery/placeholder-1.jpg',
        caption: 'Team working on the latest automotive project',
        category: 'project' as const,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        image_url: '/assets/gallery/placeholder-2.jpg',
        caption: 'Robotics workshop with participants',
        category: 'workshop' as const,
        created_at: new Date().toISOString(),
      },
    ] as GalleryItem[]
  }
}

export async function submitApplication(application: Omit<Application, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('applications')
    .insert([application])
    .select()
  
  if (error) throw error
  return data[0] as Application
}

export async function getAvailableInterviewSlots() {
  const { data, error } = await supabase
    .from('interview_slots')
    .select('*')
    .eq('is_taken', false)
    .order('slot_time', { ascending: true })
  
  if (error) throw error
  return data as InterviewSlot[]
}

export async function bookInterviewSlot(slotId: string, applicantEmail: string) {
  const { data, error } = await supabase
    .from('interview_slots')
    .update({ 
      is_taken: true, 
      applicant_email: applicantEmail 
    })
    .eq('id', slotId)
    .select()
  
  if (error) throw error
  return data[0] as InterviewSlot
}