-- ============================================================
-- External Links — dynamic sidebar links manageable via admin
-- ============================================================

CREATE TABLE IF NOT EXISTS external_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'external-link',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE external_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view external links"
  ON external_links FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage external links"
  ON external_links FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_external_links_updated
  BEFORE UPDATE ON external_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Seed defaults
INSERT INTO external_links (title, url, icon, sort_order) VALUES
  ('NEURAL AURORA Live', 'https://neural-aurora.vercel.app', 'external-link', 0),
  ('CRM Live', 'https://crm-neural-aurora.vercel.app', 'external-link', 1)
ON CONFLICT DO NOTHING;
