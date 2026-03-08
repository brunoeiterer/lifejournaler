-- entries table (users are managed by Supabase Auth in auth.users)
CREATE TABLE public.entries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  mood TEXT,
  weather TEXT,
  sleep_quality TEXT,
  menstruation TEXT,
  exercise TEXT,
  appetite_level TEXT,
  anxiety_thoughts INTEGER DEFAULT 0,
  depressive_thoughts INTEGER DEFAULT 0,
  autocriticism INTEGER DEFAULT 0,
  sensorial_overload INTEGER DEFAULT 0,
  racing_thoughts INTEGER DEFAULT 0,
  notes TEXT,
  UNIQUE(user_id, date)
);

-- RLS: users can only access their own entries
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entries"
  ON public.entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON public.entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON public.entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON public.entries FOR DELETE
  USING (auth.uid() = user_id);
