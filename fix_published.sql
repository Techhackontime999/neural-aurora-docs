-- Check current is_published values per table
SELECT 'home_projects' as tbl, id::text, title as name, is_published FROM home_projects;
SELECT 'home_features' as tbl, id::text, title as name, is_published FROM home_features;
SELECT 'home_stats' as tbl, id::text, label as name, is_published FROM home_stats;
SELECT 'home_steps' as tbl, id::text, title as name, is_published FROM home_steps;
SELECT 'home_faqs' as tbl, id::text, question as name, is_published FROM home_faqs;

-- Set all homepage content to published
UPDATE home_projects SET is_published = TRUE WHERE is_published IS DISTINCT FROM TRUE;
UPDATE home_features SET is_published = TRUE WHERE is_published IS DISTINCT FROM TRUE;
UPDATE home_stats    SET is_published = TRUE WHERE is_published IS DISTINCT FROM TRUE;
UPDATE home_steps    SET is_published = TRUE WHERE is_published IS DISTINCT FROM TRUE;
UPDATE home_faqs     SET is_published = TRUE WHERE is_published IS DISTINCT FROM TRUE;
