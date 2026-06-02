INSERT INTO demos (title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published)
SELECT
  'NEURAL AURORA — Full Demo',
  'Explore the complete NEURAL AURORA experience: 3D neural network, AI gateway, neural CMD terminal, and mood-based music engine.',
  'https://www.youtube.com/watch?v=demo_neural_aurora',
  '',
  '',
  'neural-aurora',
  0,
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM demos WHERE title = 'NEURAL AURORA — Full Demo');

INSERT INTO demos (title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published)
SELECT
  'WACRM — Full Demo',
  'See WACRM in action: shared inbox, contact management, sales pipelines, broadcasts, no-code automations, and the visual flow builder.',
  'https://www.youtube.com/watch?v=demo_wacrm',
  '',
  '',
  'wacrm',
  1,
  TRUE
WHERE NOT EXISTS (SELECT 1 FROM demos WHERE title = 'WACRM — Full Demo');
