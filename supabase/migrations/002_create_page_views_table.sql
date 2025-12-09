-- ============================================
-- PAGE VIEWS TABLE FOR ANALYTICS
-- Run this in Supabase SQL Editor
-- ============================================

-- Create page_views table
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  visitor_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS page_views_page_path_idx ON public.page_views(page_path);
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON public.page_views(created_at);
CREATE INDEX IF NOT EXISTS page_views_visitor_id_idx ON public.page_views(visitor_id);

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert page views (anonymous tracking)
CREATE POLICY "Anyone can insert page views"
  ON public.page_views
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can read page view counts (for display)
CREATE POLICY "Anyone can read page views"
  ON public.page_views
  FOR SELECT
  USING (true);
