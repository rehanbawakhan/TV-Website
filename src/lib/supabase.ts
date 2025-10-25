import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
    if (supabaseUrl == 'https://glbgndtmjqoybzidexdn.supabase.co') {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data as TeamMember[]
  } catch (error) {
    // Return real crew data, segregated
    return [
      // Core
      {
        id: 'core-1',
        name: 'Naveen S',
        role: 'Club Head',
        domain: 'Automotive',
        bio: 'When life gives you lemonade, make lemons. Life will be all like, "Whaaaat?"',
        photo_url: '',
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-2',
        name: 'Dhruv Maheshwari',
        role: 'Design Head',
        domain: 'Automotive',
        bio: 'design bro.',
        photo_url: getCrewImagePath('Dhruv Maheshwari.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'core-3',
        name: 'Shibu Rangarajan',
        role: 'Legacy Core',
        domain: 'Media',
        bio: 'Idk man put off smn',
        photo_url: getCrewImagePath('Shibu.jpg'),
        created_at: new Date().toISOString(),
      },
      // Crew
      {
        id: 'crew-1',
        name: 'Karan Maheshwari',
        role: 'Member',
        domain: 'Automotive',
        bio: '',
        photo_url: getCrewImagePath('Karan Maheshwari.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-2',
        name: 'Bhuvi Bagga',
        role: 'Member',
        domain: 'Design',
        bio: 'Powered by caffeine, creativity, and convincing emails. As a part of the sponsorship team, I make sure our passion gets the backing it deserves',
        photo_url: getCrewImagePath('Bhuvi Bagga.jpeg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-3',
        name: 'Velkur Tanisha Reddy',
        role: 'Member',
        domain: 'Design',
        bio: 'Adventure awaits, fueled by adrenaline',
        photo_url: getCrewImagePath('Tanisha Reddy.jpeg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-5',
        name: 'Siddharth Shilin',
        role: 'Member',
        domain: 'Robotics',
        bio: 'Came for the cars, stayed for the chaos.',
        photo_url: '/assets/team/placeholder-avatar.jpg',
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-6',
        name: 'Abhigyan',
        role: 'Member',
        domain: 'Robotics',
        bio: 'He who wasn\'t.',
        photo_url: getCrewImagePath('Abhigyan.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-7',
        name: 'Aarush Khullar',
        role: 'Member',
        domain: 'Automotive',
        bio: 'Just a chill guy with a caffeine addiction',
        photo_url: getCrewImagePath('Aarush khullar.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-8',
        name: 'Yadunandana Reddy M',
        role: 'Member',
        domain: 'Automotive',
        bio: 'I touch photoshop',
        photo_url: getCrewImagePath('Yadunandan Reddy.JPG'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-9',
        name: 'Bhuvigna Reddy A T',
        role: 'Member',
        domain: 'Design',
        bio: 'YOLOing at full throttle - No pit stops !!',
        photo_url: getCrewImagePath('Bhuvigna Reddy.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-10',
        name: 'Miruthulaa E M',
        role: 'Member',
        domain: 'Design',
        bio: "If you're going hard enough left, you'll find yourself turning right.",
        photo_url: getCrewImagePath('Miruthulaa.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-11',
        name: 'Hitha Shree Suresh',
        role: 'Member',
        domain: 'Design',
        bio: 'All eyes on KALESH',
        photo_url: getCrewImagePath('Hita Shree.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-12',
        name: 'Architha',
        role: 'Member',
        domain: 'Design',
        bio: 'I am Kalesh',
        photo_url: getCrewImagePath('Architha SP.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-13',
        name: 'Nitya Kushwaha',
        role: 'Member',
        domain: 'Media',
        bio: "At the end of the day, it's night.",
        photo_url: getCrewImagePath('Nitya Kushwaha.jpg'),
        created_at: new Date().toISOString(),
      },
      {
        id: 'crew-15',
        name: 'Moorty Perepa',
        role: 'Member',
        domain: 'Media',
        bio: "We're going on a trip, on our favourite rocket ship :3",
        photo_url: getCrewImagePath('Moorty.jpg'),
        created_at: new Date().toISOString(),
      },
      // New Recruits
      // Add new recruits here
      // Old Crew
      // Add old crew here
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

// Upload a file to Supabase storage and return its public URL
export async function uploadFileToStorage(bucket: string, path: string, file: File) {
  // Upload
  const { data, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (uploadError) throw uploadError

  // Make public URL
  const publicResult = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  // getPublicUrl returns { data: { publicUrl } }
  // TS: access nested data
  const publicUrl = (publicResult as any)?.data?.publicUrl || null
  if (!publicUrl) throw new Error('Failed to create public URL')
  return publicUrl
}

interface HackathonMember {
  name: string
  srn: string
  email: string
  phone: string
  semester: string
  section: string
  department?: string
  hostel?: string
}

export async function submitHackathonRegistration(registration: {
  teamName: string
  teamLeader: string
  email: string
  phone: string
  campus?: string
  members: HackathonMember[]
  experience: string
  idea: string
  proposalPdf?: File | null
  paymentScreenshot?: File | null
}) {
  try {
    let proposalUrl: string | null = null
    let paymentUrl: string | null = null

    // If files provided, upload them to 'hackathon' bucket. Ensure the bucket exists in Supabase storage.
    if (registration.proposalPdf) {
      const safeName = `${Date.now()}_${registration.teamName.replace(/\s+/g, '_')}_proposal.pdf`
      proposalUrl = await uploadFileToStorage('hackathon', safeName, registration.proposalPdf)
    }

    if (registration.paymentScreenshot) {
      const ext = registration.paymentScreenshot.name.split('.').pop() || 'png'
      const safeName = `${Date.now()}_${registration.teamName.replace(/\s+/g, '_')}_payment.${ext}`
      paymentUrl = await uploadFileToStorage('hackathon', safeName, registration.paymentScreenshot)
    }

    const payload = {
      team_name: registration.teamName,
      leader_name: registration.teamLeader,
      leader_email: registration.email,
      leader_phone: registration.phone,
      campus: registration.campus || null,
      members: registration.members,
      experience: registration.experience,
      idea: registration.idea,
      proposal_pdf_url: proposalUrl,
      payment_screenshot_url: paymentUrl,
    }

    const { data, error } = await supabase
      .from('hackathon_registrations')
      .insert([payload])
      .select()

    if (error) throw error
    return data[0]
  } catch (error) {
    throw error
  }
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

// Fix crew image paths to use /src/lib/crewimg/ for local dev and /crewimg/ for production
function getCrewImagePath(filename: string) {
  // If running in production, use /crewimg/ (public folder)
  // If running locally, use /src/lib/crewimg/
  if (typeof window !== 'undefined') {
    // Next.js serves public assets from /public, so use /crewimg/ for both
    return `/crewimg/${filename}`;
  }
  return `/crewimg/${filename}`;
}