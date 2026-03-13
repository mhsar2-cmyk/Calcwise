-- LINGOWISE SUPABASE DATABASE SETUP
-- This script replaces the generic setup with a production-ready schema for LingoWise.
-- Copy and paste this into your Supabase SQL Editor.

-- 1. Wipe old tables to ensure a clean slate
DROP TABLE IF EXISTS public.vocabulary_bank CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.learning_stats CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;

-- 2. Create Courses Table
CREATE TABLE public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  level text NOT NULL, -- Beginner, Intermediate, Advanced, Business
  category text NOT NULL, -- General, Grammar, Speaking, Workplace, Exams
  icon text, -- Emoji or icon class
  color text, -- Accent color hex
  video_url text,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Lessons Table
CREATE TABLE public.lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid REFERENCES public.courses ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  duration text, -- e.g., '12:05'
  order_index integer NOT NULL,
  content text, -- Future use for structured lesson content
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create User Progress Table
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

-- 5. Create Learning Stats Table (For the dashboard metrics)
CREATE TABLE public.learning_stats (
  user_id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  total_minutes integer DEFAULT 0,
  courses_completed integer DEFAULT 0,
  vocab_mastered integer DEFAULT 0,
  streak_days integer DEFAULT 0,
  last_activity timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Vocabulary Bank Table (Integrated SRS)
CREATE TABLE public.vocabulary_bank (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  word text NOT NULL,
  translation text NOT NULL,
  category text, -- Academic, General, Business
  mastery_level integer DEFAULT 1, -- 1-5
  next_review timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_bank ENABLE ROW LEVEL SECURITY;

-- 8. Define RLS Policies
-- Public content
CREATE POLICY "Public courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public lessons are viewable by everyone" ON public.lessons FOR SELECT USING (true);

-- Private user data
CREATE POLICY "Users can manage their own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own stats" ON public.learning_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own vocabulary" ON public.vocabulary_bank FOR ALL USING (auth.uid() = user_id);

-- 9. Seed Production Courses (Matching main.js)
INSERT INTO public.courses (id, title, level, category, icon, color, video_url)
VALUES 
('c1724000-0000-0000-0000-000000000001', 'Complete English Foundations', 'Beginner', 'General', '🌱', '#00d2d3', 'https://www.youtube.com/embed/juKDRv6S32I'),
('c1724000-0000-0000-0000-000000000002', 'Mastering English Grammar', 'Intermediate', 'Grammar', '📝', '#6c5ce7', 'https://www.youtube.com/embed/pSj7S9Wp17A'),
('c1724000-0000-0000-0000-000000000003', 'Advanced Conversation & Fluency', 'Advanced', 'Speaking', '🎙️', '#ff9f43', 'https://www.youtube.com/embed/6_fJ_Wv8n9U'),
('c1724000-0000-0000-0000-000000000004', 'English for Business Professionals', 'Business', 'Workplace', '💼', '#2e86de', 'https://www.youtube.com/embed/nU0lS9T7mE0'),
('c1724000-0000-0000-0000-000000000005', 'IELTS Success Masterclass', 'Advanced', 'Exams', '🎓', '#ee5253', 'https://www.youtube.com/embed/juKDRv6S32I'),
('c1724000-0000-0000-0000-000000000006', 'Academic Writing Excellence', 'Advanced', 'Writing', '✍️', '#54a0ff', 'https://www.youtube.com/embed/pSj7S9Wp17A');

-- 10. Seed Sample Lessons for Foundations
INSERT INTO public.lessons (course_id, title, duration, order_index)
VALUES 
('c1724000-0000-0000-0000-000000000001', 'Introduction to Tenses', '12:05', 1),
('c1724000-0000-0000-0000-000000000001', 'Present Simple vs Continuous', '15:20', 2),
('c1724000-0000-0000-0000-000000000001', 'Daily Life Vocabulary', '10:45', 3);

-- 11. Final Notification
NOTIFY pgrst, 'reload schema';