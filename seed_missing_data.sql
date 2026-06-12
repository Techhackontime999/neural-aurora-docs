-- First clean up duplicate projects (keep only one copy of each)
DELETE FROM home_projects a USING (
  SELECT MIN(id) as id, title FROM home_projects GROUP BY title HAVING COUNT(*) > 1
) b WHERE a.title = b.title AND a.id <> b.id;

-- Insert Features if missing
INSERT INTO home_features (icon, title, description, span, sort_order, is_published)
SELECT * FROM (VALUES
  ('book-text', 'Step-by-Step Guides', 'Tutorials and onboarding flows that walk you through every feature from zero to production.', 'full', 0, TRUE),
  ('terminal', 'API References', 'Comprehensive API documentation with real-world examples, request/response schemas, and error handling.', 'half', 1, TRUE),
  ('search', 'AI-Powered Search', 'Find what you need instantly with natural language search across the entire documentation ecosystem.', 'half', 2, TRUE),
  ('code-2', 'SDK & Integrations', 'Developer SDKs and integration libraries for popular frameworks and platforms.', 'full', 3, TRUE),
  ('palette', 'Component Library', 'Reusable UI components, design tokens, and taste-skill design system documentation.', 'half', 4, TRUE),
  ('rocket', 'Deployment Guides', 'Production deployment guides for Vercel, Docker, and self-hosted environments.', 'half', 5, TRUE)
) AS v(icon, title, description, span, sort_order, is_published)
WHERE NOT EXISTS (SELECT 1 FROM home_features LIMIT 1);

-- Insert Stats if missing
INSERT INTO home_stats (value, label, icon, sort_order, is_published)
SELECT * FROM (VALUES
  ('50+', 'Documentation Pages', 'book-text', 0, TRUE),
  ('100+', 'API Endpoints', 'terminal', 1, TRUE),
  ('20+', 'SDK Examples', 'code-2', 2, TRUE),
  ('99.9%', 'Platform Uptime', 'shield', 3, TRUE)
) AS v(value, label, icon, sort_order, is_published)
WHERE NOT EXISTS (SELECT 1 FROM home_stats LIMIT 1);

-- Insert FAQs if missing
INSERT INTO home_faqs (question, answer, sort_order, is_published)
SELECT * FROM (VALUES
  ('How do I get started?', 'Choose a project (NEURAL AURORA or Neural Aurora CRM), clone the repository, follow the setup guide in the docs, and you will be up and running in minutes.', 0, TRUE),
  ('How do I access the APIs?', 'API references are available in the documentation. Each project includes Supabase client libraries and API route examples for easy integration.', 1, TRUE),
  ('Are there SDKs available?', 'Yes. Both projects provide SDK examples and integration libraries. See the SDK documentation for language-specific guides.', 2, TRUE),
  ('Can I self-host?', 'Absolutely. Both projects are MIT-licensed and fully self-hostable. Deployment guides for Vercel, Docker, and bare-metal are included.', 3, TRUE),
  ('How does authentication work?', 'Authentication is handled by Supabase Auth with email/password sign-in. Neural Aurora CRM adds WhatsApp Cloud API token-based auth for business messaging.', 4, TRUE),
  ('Is there AI-powered search?', 'Yes! The documentation features AI-powered natural language search to help you find relevant docs, APIs, and examples instantly.', 5, TRUE)
) AS v(question, answer, sort_order, is_published)
WHERE NOT EXISTS (SELECT 1 FROM home_faqs LIMIT 1);
