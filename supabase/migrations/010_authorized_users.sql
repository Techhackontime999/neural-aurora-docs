-- Helper: returns true if user is admin OR approved
CREATE OR REPLACE FUNCTION public.is_authorized()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR is_approved = true)
  );
$$;

-- Profiles: admins + approved users can view and update all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Authorized can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_authorized());

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Authorized can update all profiles"
  ON profiles FOR UPDATE
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Doc Categories: authorized can manage
DROP POLICY IF EXISTS "Admins can manage categories" ON doc_categories;
CREATE POLICY "Authorized can manage categories"
  ON doc_categories FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Doc Pages: authorized can view unpublished + manage all
DROP POLICY IF EXISTS "Anyone can view published pages" ON doc_pages;
CREATE POLICY "Anyone can view published pages"
  ON doc_pages FOR SELECT
  USING (status = 'published' OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage pages" ON doc_pages;
CREATE POLICY "Authorized can manage pages"
  ON doc_pages FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Contributors
DROP POLICY IF EXISTS "Admins can manage contributors" ON contributors;
CREATE POLICY "Authorized can manage contributors"
  ON contributors FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Installation Guides
DROP POLICY IF EXISTS "Admins can manage guides" ON installation_guides;
CREATE POLICY "Authorized can manage guides"
  ON installation_guides FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Release Notes
DROP POLICY IF EXISTS "Admins can manage release notes" ON release_notes;
CREATE POLICY "Authorized can manage release notes"
  ON release_notes FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- External Links
DROP POLICY IF EXISTS "Admins can manage external links" ON external_links;
CREATE POLICY "Authorized can manage external links"
  ON external_links FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Demos
DROP POLICY IF EXISTS "Admins can manage demos" ON demos;
CREATE POLICY "Authorized can manage demos"
  ON demos FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

-- Homepage sections
DROP POLICY IF EXISTS "Admins can manage home projects" ON home_projects;
CREATE POLICY "Authorized can manage home projects"
  ON home_projects FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home projects" ON home_projects;
CREATE POLICY "Anyone can view published home projects"
  ON home_projects FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage home features" ON home_features;
CREATE POLICY "Authorized can manage home features"
  ON home_features FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home features" ON home_features;
CREATE POLICY "Anyone can view published home features"
  ON home_features FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage home stats" ON home_stats;
CREATE POLICY "Authorized can manage home stats"
  ON home_stats FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home stats" ON home_stats;
CREATE POLICY "Anyone can view published home stats"
  ON home_stats FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage home steps" ON home_steps;
CREATE POLICY "Authorized can manage home steps"
  ON home_steps FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home steps" ON home_steps;
CREATE POLICY "Anyone can view published home steps"
  ON home_steps FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage home faqs" ON home_faqs;
CREATE POLICY "Authorized can manage home faqs"
  ON home_faqs FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home faqs" ON home_faqs;
CREATE POLICY "Anyone can view published home faqs"
  ON home_faqs FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());

DROP POLICY IF EXISTS "Admins can manage home repos" ON home_repos;
CREATE POLICY "Authorized can manage home repos"
  ON home_repos FOR ALL
  USING (public.is_authorized())
  WITH CHECK (public.is_authorized());

DROP POLICY IF EXISTS "Anyone can view published home repos" ON home_repos;
CREATE POLICY "Anyone can view published home repos"
  ON home_repos FOR SELECT
  USING (is_published = TRUE OR public.is_authorized());
