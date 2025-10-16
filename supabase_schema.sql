-- Enable pgcrypto extension for gen_random_uuid (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Team members table
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  domain VARCHAR(50) NOT NULL CHECK (domain IN ('Automotive', 'Robotics', 'Design', 'Media', 'Marketing')),
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery items table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('event', 'project', 'workshop', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  skills TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of skills
  motivation TEXT NOT NULL,
  preferred_domain VARCHAR(50),
  experience TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview slots table
CREATE TABLE interview_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_taken BOOLEAN DEFAULT FALSE,
  meeting_link TEXT NOT NULL,
  applicant_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hackathon registrations table
CREATE TABLE hackathon_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name VARCHAR(255) NOT NULL,
  leader_name VARCHAR(255) NOT NULL,
  leader_email VARCHAR(255) NOT NULL,
  members TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of member names
  problem_statement TEXT,
  tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of technologies
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access on team" ON team FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access on interview slots" ON interview_slots FOR SELECT USING (true);

-- Policies for public insert access (applications)
CREATE POLICY "Allow public insert on applications" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on hackathon registrations" ON hackathon_registrations FOR INSERT WITH CHECK (true);

-- Policy for interview slot updates (booking)
CREATE POLICY "Allow public update on interview slots" ON interview_slots FOR UPDATE USING (true);

-- Insert some sample data
INSERT INTO team (name, role, domain, bio, photo_url) VALUES
('Karan Vegavath', 'Club President', 'Automotive', 'Passionate about automotive engineering and leading the technical team.', '/assets/team/placeholder-avatar.jpg'),
('Sample Member', 'Technical Lead', 'Robotics', 'Specializes in autonomous systems and robotics development.', '/assets/team/placeholder-avatar.jpg'),
('Design Lead', 'Creative Director', 'Design', 'Handles all visual design and user experience for club projects.', '/assets/team/placeholder-avatar.jpg'),
('Media Head', 'Content Creator', 'Media', 'Manages social media presence and creates engaging content.', '/assets/team/placeholder-avatar.jpg'),
('Marketing Lead', 'Outreach Coordinator', 'Marketing', 'Focuses on partnerships and club promotion strategies.', '/assets/team/placeholder-avatar.jpg');

INSERT INTO gallery (image_url, caption, category) VALUES
('/assets/gallery/placeholder-1.jpg', 'Team working on the latest automotive project', 'project'),
('/assets/gallery/placeholder-2.jpg', 'Robotics workshop with participants', 'workshop'),
('/assets/gallery/placeholder-3.jpg', 'Annual tech fest event', 'event'),
('/assets/gallery/placeholder-4.jpg', 'Club team collaboration session', 'general');

INSERT INTO interview_slots (slot_time, meeting_link) VALUES
  (NOW() + INTERVAL '7 days', 'https://meet.google.com/placeholder-link-1'),
  (NOW() + INTERVAL '8 days', 'https://meet.google.com/placeholder-link-2'),
  (NOW() + INTERVAL '9 days', 'https://meet.google.com/placeholder-link-3'),
  (NOW() + INTERVAL '10 days', 'https://meet.google.com/placeholder-link-4');