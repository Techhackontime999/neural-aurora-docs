-- Demos table for homepage showcase
CREATE TABLE IF NOT EXISTS demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  embed_url TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  project_type TEXT NOT NULL DEFAULT 'both',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE demos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published demos"
  ON demos FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage demos"
  ON demos FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_demos_updated
  BEFORE UPDATE ON demos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
