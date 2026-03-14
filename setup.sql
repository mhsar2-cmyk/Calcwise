-- LINGOWISE SUPABASE DATABASE SETUP (PRODUCTION VERSION)
-- This script contains the final schema used by the LingoWise Admin Dashboard.
-- Copy and paste this into your Supabase SQL Editor.

-- 1. Wipe old tables to ensure a clean slate
DROP TABLE IF EXISTS public.vocabulary_bank CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.learning_stats CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.app_config CASCADE;

-- 2. Create Courses Table (JSONB version for multilingual support)
CREATE TABLE public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name jsonb NOT NULL,      -- {en: "Name", ar: "الاسم"}
  level jsonb NOT NULL,     -- {en: "Beginner", ar: "مبتدئ"}
  category jsonb NOT NULL,  -- {en: "General", ar: "عام"}
  icon text,                -- Emoji or icon class
  color text,               -- Accent color hex
  video_url text,           -- Default video URL for the whole course
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Create Lessons Table (JSONB version for nested items)
CREATE TABLE public.lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid REFERENCES public.courses ON DELETE CASCADE NOT NULL,
  title jsonb NOT NULL,     -- {en: "Title", ar: "العنوان"}
  duration text,            -- e.g., '12:05'
  order_index integer NOT NULL,
  video_url text,           -- Specific video for this lesson
  exercises jsonb DEFAULT '[]', -- Complex exercises array
  vocab jsonb DEFAULT '[]',     -- 10 vocabulary words array
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Global App Config
CREATE TABLE IF NOT EXISTS public.app_config (
  key text PRIMARY KEY,
  value jsonb,
  updated_at timestamp with time zone DEFAULT now()
);

-- 5. Create User Progress Table
CREATE TABLE public.user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES public.lessons ON DELETE CASCADE,
  progress_percent integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id, lesson_id)
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 7. Define RLS Policies
-- Public content
CREATE POLICY "Public courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);

-- Admin restrictions (Optional: You can add admin check here if you use Supabase auth roles)
-- For now, the Node.js API handles the restricted access.

-- 8. Seed Sample Courses (Production format)
INSERT INTO public.courses (id, name, level, category, icon, color, video_url)
VALUES 
('c1724000-0000-0000-0000-000000000001', '{"en": "Complete English Foundations", "ar": "أساسيات اللغة الإنجليزية الكاملة"}', '{"en": "Beginner", "ar": "مبتدئ"}', '{"en": "General", "ar": "عام"}', '🌱', '#00d2d3', 'https://www.youtube.com/embed/juKDRv6S32I');

INSERT INTO public.lessons (course_id, title, duration, order_index, exercises)
VALUES 
('c1724000-0000-0000-0000-000000000001', '{"en": "Alphabet & Phonics", "ar": "الأبجدية والصوتيات"}', '10:00', 1, '[{"question": {"en": "What is the first letter?", "ar": "ما هو الحرف الأول؟"}, "options": {"en": ["A", "B"], "ar": ["أ", "ب"]}, "answer": 0}]');

-- 9. Final Notification
NOTIFY pgrst, 'reload schema';