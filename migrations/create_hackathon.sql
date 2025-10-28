-- Migration: create 'hackathon' table
-- Run this in your Supabase SQL editor or via the provided script
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.hackathon (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text,
  leader_name text,
  leader_email text,
  leader_phone text,
  campus text,
  members jsonb,
  proposal_pdf_url text,
  details_url text,
  created_at timestamptz DEFAULT now()
);

-- Optional: create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_hackathon_created_at ON public.hackathon (created_at DESC);
