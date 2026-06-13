-- Homepage Repos (Open Source section)
CREATE TABLE IF NOT EXISTS home_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_repos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home repos"
  ON home_repos FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home repos"
  ON home_repos FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_repos_updated
  BEFORE UPDATE ON home_repos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Seed default repo links
INSERT INTO home_repos (title, url, sort_order, is_published) VALUES
  ('NEURAL AURORA Repo', 'https://github.com/Techhackontime999/NEURAL-AURORA', 0, TRUE),
  ('Neural Aurora CRM Repo', 'https://github.com/Techhackontime999/WACRM', 1, TRUE),
  ('Neural Aurora Docs', 'https://github.com/Techhackontime999/neural-aurora-docs', 2, TRUE)
ON CONFLICT DO NOTHING;
