-- Add sector column to analyses table
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

ALTER TABLE analyses ADD COLUMN IF NOT EXISTS sector TEXT DEFAULT '';
