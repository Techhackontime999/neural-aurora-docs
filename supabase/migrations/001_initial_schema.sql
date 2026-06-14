-- ============================================================
-- NEURAL AURORA DOCS — Initial Schema
-- ============================================================

-- 1. PROFILES (same pattern as WACRM)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. DOC CATEGORIES
CREATE TABLE IF NOT EXISTS doc_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'book',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOC PAGES
CREATE TABLE IF NOT EXISTS doc_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES doc_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- 4. CONTRIBUTORS
CREATE TABLE IF NOT EXISTS contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INSTALLATION GUIDES
CREATE TABLE IF NOT EXISTS installation_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  project_type TEXT NOT NULL,
  content TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RELEASE NOTES
CREATE TABLE IF NOT EXISTS release_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  project_type TEXT NOT NULL,
  content TEXT DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  admin_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM public.profiles WHERE role = 'admin';

  IF admin_count = 0 THEN
    INSERT INTO public.profiles (user_id, full_name, email, role, is_approved)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email,
      'admin',
      TRUE
    );
  ELSE
    INSERT INTO public.profiles (user_id, full_name, email, role, is_approved)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email,
      'user',
      FALSE
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at on row change
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_doc_categories_updated
  BEFORE UPDATE ON doc_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_doc_pages_updated
  BEFORE UPDATE ON doc_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_installation_guides_updated
  BEFORE UPDATE ON installation_guides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_release_notes_updated
  BEFORE UPDATE ON release_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Admin check helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Doc Categories
ALTER TABLE doc_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON doc_categories FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage categories"
  ON doc_categories FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Doc Pages
ALTER TABLE doc_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published pages"
  ON doc_pages FOR SELECT
  USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admins can manage pages"
  ON doc_pages FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Contributors
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contributors"
  ON contributors FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage contributors"
  ON contributors FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Installation Guides
ALTER TABLE installation_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view guides"
  ON installation_guides FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage guides"
  ON installation_guides FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Release Notes
ALTER TABLE release_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view release notes"
  ON release_notes FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage release notes"
  ON release_notes FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- SEED DATA: Default Categories
-- ============================================================
INSERT INTO doc_categories (name, slug, description, icon, sort_order) VALUES
  ('NEURAL AURORA', 'neural-aurora', 'Documentation for the Synaptic Portfolio', 'sparkles', 0),
  ('WACRM', 'wacrm', 'Documentation for the WhatsApp CRM Template', 'message-square', 1)
ON CONFLICT (slug) DO NOTHING;
