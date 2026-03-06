-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. Create analyses table (for the analyzer cache)
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  url_hash TEXT NOT NULL,
  entity_name TEXT,
  entity_type TEXT,
  quadrant TEXT,
  score_defensive INTEGER DEFAULT 0,
  score_decentralization INTEGER DEFAULT 0,
  score_democratic INTEGER DEFAULT 0,
  score_acceleration INTEGER DEFAULT 0,
  score_total INTEGER DEFAULT 0,
  tier TEXT,
  red_flags TEXT[] DEFAULT '{}',
  green_flags TEXT[] DEFAULT '{}',
  ways_is_dacc TEXT[] DEFAULT '{}',
  ways_not_dacc TEXT[] DEFAULT '{}',
  ways_more_dacc TEXT[] DEFAULT '{}',
  one_liner TEXT,
  analysis_markdown TEXT,
  model_used TEXT,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analyses_url_hash ON analyses(url_hash);

-- 2. Create rate_limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_hash TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL,
  request_count INTEGER DEFAULT 1
);

-- 3. Create map_pins table
CREATE TABLE IF NOT EXISTS map_pins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  one_liner TEXT,
  quadrant TEXT NOT NULL,
  sector TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  website_url TEXT,
  tags TEXT[] DEFAULT '{}',
  tier TEXT,
  scores JSONB,
  x DOUBLE PRECISION NOT NULL,
  y DOUBLE PRECISION NOT NULL,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable RLS on all tables
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE map_pins ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for analyses
CREATE POLICY "Public read analyses" ON analyses FOR SELECT USING (true);
CREATE POLICY "Service insert analyses" ON analyses FOR INSERT WITH CHECK (true);

-- 6. RLS policies for rate_limits
CREATE POLICY "Service manage rate_limits" ON rate_limits FOR ALL USING (true);

-- 7. RLS policies for map_pins
CREATE POLICY "Public read map_pins" ON map_pins FOR SELECT USING (true);
CREATE POLICY "Public insert map_pins" ON map_pins FOR INSERT WITH CHECK (true);

-- 8. Enable realtime for map_pins
ALTER PUBLICATION supabase_realtime ADD TABLE map_pins;
