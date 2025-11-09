-- Create courses table
CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text,
  duration integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read courses
CREATE POLICY "Courses are viewable by everyone"
  ON public.courses
  FOR SELECT
  USING (true);

-- Create user_courses table for tracking completion
CREATE TABLE public.user_courses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;

-- Users can view their own course progress
CREATE POLICY "Users can view their own progress"
  ON public.user_courses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own course progress
CREATE POLICY "Users can track their own progress"
  ON public.user_courses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own course progress
CREATE POLICY "Users can update their own progress"
  ON public.user_courses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO public.courses (title, description, thumbnail, duration) VALUES
  ('Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript. Build your first website from scratch and understand the fundamentals of web development.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', 180),
  ('Python Programming Masterclass', 'Master Python programming from beginner to advanced. Learn data structures, algorithms, and real-world applications.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 240),
  ('UI/UX Design Fundamentals', 'Discover the principles of user interface and user experience design. Create beautiful and functional digital products.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 150);