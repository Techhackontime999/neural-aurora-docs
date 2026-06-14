-- ============================================================
-- Remove hardcoded CHECK constraints on project_type columns
-- so any category slug from doc_categories can be used.
-- ============================================================

ALTER TABLE installation_guides
  DROP CONSTRAINT IF EXISTS installation_guides_project_type_check;

ALTER TABLE release_notes
  DROP CONSTRAINT IF EXISTS release_notes_project_type_check;

ALTER TABLE demos
  DROP CONSTRAINT IF EXISTS demos_project_type_check;
