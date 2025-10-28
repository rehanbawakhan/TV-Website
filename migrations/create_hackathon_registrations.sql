-- Migration: create_hackathon_registrations.sql
-- Creates a table to store hackathon registrations

-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.hackathon_registrations (
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	team_name text NOT NULL,
	leader_name text NOT NULL,
	leader_email text NOT NULL,
	leader_phone text,
	campus text,
	members jsonb DEFAULT '[]'::jsonb,
	proposal_pdf_url text,
	details_url text,
	created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_team_name ON public.hackathon_registrations (team_name);
CREATE INDEX IF NOT EXISTS idx_hackathon_registrations_leader_email ON public.hackathon_registrations (leader_email);