-- Combined Supabase schema and hackathon migration
-- Run this in the Supabase SQL editor. This file creates core tables and the
-- richer hackathon_registrations schema (members as jsonb, proposal/payment urls).

-- Enable pgcrypto extension for gen_random_uuid (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Team members table
CREATE TABLE IF NOT EXISTS team (
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
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('event', 'project', 'workshop', 'general')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
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
CREATE TABLE IF NOT EXISTS interview_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_taken BOOLEAN DEFAULT FALSE,
  meeting_link TEXT NOT NULL,
  applicant_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Richer Hackathon registrations table (merged schema)
CREATE TABLE IF NOT EXISTS hackathon_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  leader_name TEXT NOT NULL,
  leader_email TEXT NOT NULL,
  leader_phone TEXT,
  campus TEXT,
  -- Use jsonb for flexible member objects (name, srn, email, phone, dept...)
  members JSONB,
  experience TEXT,
  idea TEXT,
  problem_statement TEXT,
  tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
  proposal_pdf_url TEXT,
  payment_screenshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for tables (optional; adjust for your security needs)
ALTER TABLE IF EXISTS team ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS interview_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hackathon_registrations ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_read_team') THEN
    EXECUTE 'CREATE POLICY allow_public_read_team ON team FOR SELECT USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_read_gallery') THEN
    EXECUTE 'CREATE POLICY allow_public_read_gallery ON gallery FOR SELECT USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_read_interview_slots') THEN
    EXECUTE 'CREATE POLICY allow_public_read_interview_slots ON interview_slots FOR SELECT USING (true)';
  END IF;
END $$;

-- Policies for public insert access (applications and hackathon registrations)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_insert_applications') THEN
    EXECUTE 'CREATE POLICY allow_public_insert_applications ON applications FOR INSERT WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_insert_hackathon_registrations') THEN
    EXECUTE 'CREATE POLICY allow_public_insert_hackathon_registrations ON hackathon_registrations FOR INSERT WITH CHECK (true)';
  END IF;
END $$;

-- Policy for interview slot updates (booking)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_policy WHERE polname = 'allow_public_update_interview_slots') THEN
    EXECUTE 'CREATE POLICY allow_public_update_interview_slots ON interview_slots FOR UPDATE USING (true)';
  END IF;
END $$;

-- Insert some sample data (safe to run multiple times)
INSERT INTO team (name, role, domain, bio, photo_url)
SELECT v.* FROM (VALUES
  ('Karan Vegavath', 'Club President', 'Automotive', 'Passionate about automotive engineering and leading the technical team.', '/assets/team/placeholder-avatar.jpg'),
  ('Sample Member', 'Technical Lead', 'Robotics', 'Specializes in autonomous systems and robotics development.', '/assets/team/placeholder-avatar.jpg'),
  ('Design Lead', 'Creative Director', 'Design', 'Handles all visual design and user experience for club projects.', '/assets/team/placeholder-avatar.jpg'),
  ('Media Head', 'Content Creator', 'Media', 'Manages social media presence and creates engaging content.', '/assets/team/placeholder-avatar.jpg'),
  ('Marketing Lead', 'Outreach Coordinator', 'Marketing', 'Focuses on partnerships and club promotion strategies.', '/assets/team/placeholder-avatar.jpg')
) AS v(name, role, domain, bio, photo_url)
WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = v.name AND role = v.role LIMIT 1);

INSERT INTO gallery (image_url, caption, category)
SELECT v.* FROM (VALUES
  ('/assets/gallery/placeholder-1.jpg', 'Team working on the latest automotive project', 'project'),
  ('/assets/gallery/placeholder-2.jpg', 'Robotics workshop with participants', 'workshop'),
  ('/assets/gallery/placeholder-3.jpg', 'Annual tech fest event', 'event'),
  ('/assets/gallery/placeholder-4.jpg', 'Club team collaboration session', 'general')
) AS v(image_url, caption, category)
WHERE NOT EXISTS (SELECT 1 FROM gallery WHERE image_url = v.image_url LIMIT 1);

INSERT INTO interview_slots (slot_time, meeting_link)
SELECT v.* FROM (VALUES
  (NOW() + INTERVAL '7 days', 'https://meet.google.com/placeholder-link-1'),
  (NOW() + INTERVAL '8 days', 'https://meet.google.com/placeholder-link-2'),
  (NOW() + INTERVAL '9 days', 'https://meet.google.com/placeholder-link-3'),
  (NOW() + INTERVAL '10 days', 'https://meet.google.com/placeholder-link-4')
) AS v(slot_time, meeting_link)
WHERE NOT EXISTS (SELECT 1 FROM interview_slots WHERE meeting_link = v.meeting_link LIMIT 1);