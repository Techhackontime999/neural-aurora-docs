-- Homepage Projects
CREATE TABLE IF NOT EXISTS home_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  description TEXT DEFAULT '',
  href TEXT DEFAULT '',
  icon TEXT DEFAULT 'sparkles',
  gradient TEXT DEFAULT 'from-violet-500 via-purple-500 to-fuchsia-500',
  stat_label_1 TEXT DEFAULT '',
  stat_value_1 TEXT DEFAULT '',
  stat_label_2 TEXT DEFAULT '',
  stat_value_2 TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home projects"
  ON home_projects FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home projects"
  ON home_projects FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_projects_updated
  BEFORE UPDATE ON home_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Homepage Features
CREATE TABLE IF NOT EXISTS home_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT DEFAULT 'book-text',
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  span TEXT DEFAULT 'half',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home features"
  ON home_features FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home features"
  ON home_features FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_features_updated
  BEFORE UPDATE ON home_features
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Homepage Stats
CREATE TABLE IF NOT EXISTS home_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT DEFAULT 'book-text',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home stats"
  ON home_stats FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home stats"
  ON home_stats FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_stats_updated
  BEFORE UPDATE ON home_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Homepage Steps (Quick Start)
CREATE TABLE IF NOT EXISTS home_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  code TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home steps"
  ON home_steps FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home steps"
  ON home_steps FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_steps_updated
  BEFORE UPDATE ON home_steps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Homepage FAQs
CREATE TABLE IF NOT EXISTS home_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published home faqs"
  ON home_faqs FOR SELECT
  USING (is_published = TRUE OR public.is_admin());

CREATE POLICY "Admins can manage home faqs"
  ON home_faqs FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER on_home_faqs_updated
  BEFORE UPDATE ON home_faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Seed data from existing hardcoded homepage content
INSERT INTO home_projects (title, tagline, description, href, icon, gradient, stat_label_1, stat_value_1, stat_label_2, stat_value_2, sort_order, is_published) VALUES
  ('NEURAL AURORA', 'The Synaptic Portfolio', 'An immersive, open-source 3D portfolio website with AI-powered gateway, neural CMD terminal, mood-based music, and full admin dashboard.', '/neural-aurora/overview', 'sparkles', 'from-violet-500 via-purple-500 to-fuchsia-500', 'Stack', 'React + Vite + Supabase', 'Version', 'v2.3.0', 0, TRUE),
  ('Neural Aurora CRM', 'WhatsApp CRM Template', 'Self-hostable CRM template for WhatsApp Business with shared inbox, sales pipelines, no-code automations, and visual flow builder.', '/wacrm/overview', 'message-square', 'from-blue-500 via-cyan-500 to-teal-500', 'Stack', 'Next.js + Supabase', 'Version', 'v1.0.0', 1, TRUE);

INSERT INTO home_features (icon, title, description, span, sort_order, is_published) VALUES
  ('book-text', 'Step-by-Step Guides', 'Tutorials and onboarding flows that walk you through every feature from zero to production.', 'full', 0, TRUE),
  ('terminal', 'API References', 'Comprehensive API documentation with real-world examples, request/response schemas, and error handling.', 'half', 1, TRUE),
  ('search', 'AI-Powered Search', 'Find what you need instantly with natural language search across the entire documentation ecosystem.', 'half', 2, TRUE),
  ('code-2', 'SDK & Integrations', 'Developer SDKs and integration libraries for popular frameworks and platforms.', 'full', 3, TRUE),
  ('palette', 'Component Library', 'Reusable UI components, design tokens, and taste-skill design system documentation.', 'half', 4, TRUE),
  ('rocket', 'Deployment Guides', 'Production deployment guides for Vercel, Docker, and self-hosted environments.', 'half', 5, TRUE);

INSERT INTO home_stats (value, label, icon, sort_order, is_published) VALUES
  ('50+', 'Documentation Pages', 'book-text', 0, TRUE),
  ('100+', 'API Endpoints', 'terminal', 1, TRUE),
  ('20+', 'SDK Examples', 'code-2', 2, TRUE),
  ('99.9%', 'Platform Uptime', 'shield', 3, TRUE);

INSERT INTO home_steps (step_number, title, description, code, sort_order, is_published) VALUES
  (1, 'Clone the Repository', 'Fork and clone your preferred project from GitHub.', 'git clone https://github.com/Techhackontime999/NEURAL-AURORA.git', 0, TRUE),
  (2, 'Configure Environment', 'Set up Supabase credentials and API keys.', 'cp .env.example .env', 1, TRUE),
  (3, 'Read the Docs', 'Follow the documentation to customize and configure.', 'npm run dev', 2, TRUE),
  (4, 'Deploy & Scale', 'Deploy to Vercel, Docker, or your own infrastructure.', 'vercel deploy', 3, TRUE);

INSERT INTO home_faqs (question, answer, sort_order, is_published) VALUES
  ('How do I get started?', 'Choose a project (NEURAL AURORA or Neural Aurora CRM), clone the repository, follow the setup guide in the docs, and you will be up and running in minutes.', 0, TRUE),
  ('How do I access the APIs?', 'API references are available in the documentation. Each project includes Supabase client libraries and API route examples for easy integration.', 1, TRUE),
  ('Are there SDKs available?', 'Yes. Both projects provide SDK examples and integration libraries. See the SDK documentation for language-specific guides.', 2, TRUE),
  ('Can I self-host?', 'Absolutely. Both projects are MIT-licensed and fully self-hostable. Deployment guides for Vercel, Docker, and bare-metal are included.', 3, TRUE),
  ('How does authentication work?', 'Authentication is handled by Supabase Auth with email/password sign-in. Neural Aurora CRM adds WhatsApp Cloud API token-based auth for business messaging.', 4, TRUE),
  ('Is there AI-powered search?', 'Yes! The documentation features AI-powered natural language search to help you find relevant docs, APIs, and examples instantly.', 5, TRUE);
