-- LINGOWISE SUPABASE SETUP SCRIPT
-- Copy and paste this into the Supabase SQL Editor

-- 1. Wipe old finance tables (Keep profiles)
DROP TABLE IF EXISTS public.vocabulary_bank;
DROP TABLE IF EXISTS public.learning_trackers;
DROP TABLE IF EXISTS public.user_progress;
DROP TABLE IF EXISTS public.lessons;
DROP TABLE IF EXISTS public.courses;
DROP TABLE IF EXISTS public.journals;
DROP TABLE IF EXISTS public.portfolio;

-- 2. Create Courses Table
CREATE TABLE public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  level text NOT NULL, -- beginner, intermediate, advanced, business
  category text,       -- General, Academic, Career
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Lessons Table
CREATE TABLE public.lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id uuid REFERENCES public.courses ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text, -- Can be Markdown or JSON for interactive content
  order_index integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create User Progress Table
CREATE TABLE public.user_progress (
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES public.lessons ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'started', -- started, completed
  last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);

-- 5. Create Learning Trackers Table (Daily stats)
CREATE TABLE public.learning_trackers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- vocabulary, grammar, speaking, listening
  score integer DEFAULT 0,
  goal integer DEFAULT 100,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Vocabulary Bank Table (SRS support)
CREATE TABLE public.vocabulary_bank (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  word text NOT NULL,
  translation text,
  mastery_level integer DEFAULT 1, -- 1 to 5
  next_review timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_trackers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_bank ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies
-- Courses: Everyone can view
CREATE POLICY "Everyone can view courses" ON public.courses FOR SELECT USING (true);

-- Lessons: Everyone can view
CREATE POLICY "Everyone can view lessons" ON public.lessons FOR SELECT USING (true);

-- User Progress: Only own data
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Trackers: Only own data
CREATE POLICY "Users can view own trackers" ON public.learning_trackers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own trackers" ON public.learning_trackers FOR ALL USING (auth.uid() = user_id);

-- Vocabulary Bank: Only own data
CREATE POLICY "Users can view own vocabulary" ON public.vocabulary_bank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own vocabulary" ON public.vocabulary_bank FOR ALL USING (auth.uid() = user_id);

-- 9. Insert Sample Course Data
INSERT INTO public.courses (title, description, level, category, image_url)
VALUES 
('Essential English Grammar', 'Master the foundations of English grammar with practical exercises.', 'beginner', 'General', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'),
('Business Communication Pro', 'Excel in meetings, emails, and professional networking.', 'business', 'Career', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'),
('Mastering Conversational Fluency', 'Speak naturally and confidently in any social situation.', 'intermediate', 'General', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80');

-- Notify postgrest
NOTIFY pgrst, 'reload schema';
