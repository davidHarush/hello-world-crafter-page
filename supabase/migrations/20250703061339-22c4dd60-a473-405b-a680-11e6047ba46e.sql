
-- Add LinkedIn connection status and subscription info to profiles table
ALTER TABLE public.profiles 
ADD COLUMN linkedin_connected BOOLEAN DEFAULT FALSE,
ADD COLUMN linkedin_access_token TEXT,
ADD COLUMN subscription_plan TEXT DEFAULT 'free',
ADD COLUMN subscription_status TEXT DEFAULT 'active',
ADD COLUMN posts_this_month INTEGER DEFAULT 0;

-- Update RLS policies to allow users to read their own extended profile data
-- (The existing policies should already cover this, but let's make sure)

-- Add some sample tips data table for the daily tips feature
CREATE TABLE public.daily_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tip_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample tips
INSERT INTO public.daily_tips (tip_text) VALUES
('💡 Use emojis to catch attention in the first 3 lines'),
('🚀 Ask questions to boost engagement - people love to share their opinions'),
('📊 Posts with numbers or stats get 2x more engagement'),
('🎯 Share personal stories - vulnerability builds connection'),
('⏰ Post between 8-10 AM or 1-3 PM for maximum reach'),
('🔥 Use line breaks to make your posts easier to read'),
('💪 Include a clear call-to-action in every post');

-- Enable RLS on daily_tips (make it readable by everyone)
ALTER TABLE public.daily_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily tips are viewable by everyone" 
  ON public.daily_tips 
  FOR SELECT 
  USING (true);
