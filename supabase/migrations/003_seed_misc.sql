-- Contributors
INSERT INTO contributors (name, role, github_url, bio, avatar_url, sort_order)
SELECT 'Amit Kumar', 'Lead Developer', 'https://github.com/Techhackontime999', 'Full-stack developer passionate about AI and 3D web experiences. Creator of NEURAL AURORA and WACRM.', NULL, 0
WHERE NOT EXISTS (SELECT 1 FROM contributors WHERE github_url = 'https://github.com/Techhackontime999');

INSERT INTO contributors (name, role, github_url, bio, avatar_url, sort_order)
SELECT 'Contributors Welcome', 'Open Source', NULL, 'NEURAL AURORA and WACRM are open-source projects. Contributions are welcome via pull requests on GitHub.', NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM contributors WHERE name = 'Contributors Welcome');

-- Installation Guides
INSERT INTO installation_guides (title, slug, content, project_type, sort_order)
SELECT 'Local Development Setup (macOS/Linux)', 'local-dev-macos-linux',
'<h2>Prerequisites</h2>
<ul>
<li>Node.js 20+</li>
<li>npm, yarn, or pnpm</li>
<li>Git</li>
<li>Supabase CLI</li>
</ul>
<h2>Steps</h2>
<ol>
<li>Clone: <code>git clone https://github.com/Techhackontime999/NEURAL-AURORA.git</code></li>
<li>Install: <code>npm install</code></li>
<li>Setup env: <code>cp .env.example .env</code></li>
<li>Start: <code>npm run dev</code></li>
</ol>',
'neural-aurora', 0
WHERE NOT EXISTS (SELECT 1 FROM installation_guides WHERE slug = 'local-dev-macos-linux');

INSERT INTO installation_guides (title, slug, content, project_type, sort_order)
SELECT 'Local Development Setup (Windows)', 'local-dev-windows',
'<h2>Prerequisites</h2>
<ul>
<li>Node.js 20+</li>
<li>Git for Windows</li>
<li>PowerShell 5.1+ or Windows Terminal</li>
<li>Supabase CLI</li>
</ul>
<h2>Steps</h2>
<ol>
<li>Clone: <code>git clone https://github.com/Techhackontime999/NEURAL-AURORA.git</code></li>
<li>Install: <code>npm install</code></li>
<li>Setup env: <code>copy .env.example .env</code></li>
<li>Start: <code>npm run dev</code></li>
</ol>
<p><strong>Note:</strong> On Windows, use <code>npm run dev -- --webpack</code> if you encounter SWC binary issues.</p>',
'neural-aurora', 1
WHERE NOT EXISTS (SELECT 1 FROM installation_guides WHERE slug = 'local-dev-windows');

INSERT INTO installation_guides (title, slug, content, project_type, sort_order)
SELECT 'Docker Deployment', 'docker-deployment',
'<h2>Prerequisites</h2>
<ul>
<li>Docker Engine 24+ / Docker Desktop</li>
<li>Docker Compose v2+</li>
</ul>
<h2>Steps</h2>
<ol>
<li>Build: <code>docker build -t neural-aurora .</code></li>
<li>Run: <code>docker run -d -p 3000:3000 --env-file .env neural-aurora</code></li>
<li>Access: <a href="http://localhost:3000">http://localhost:3000</a></li>
</ol>',
'neural-aurora', 2
WHERE NOT EXISTS (SELECT 1 FROM installation_guides WHERE slug = 'docker-deployment');

INSERT INTO installation_guides (title, slug, content, project_type, sort_order)
SELECT 'Vercel Deployment', 'vercel-deployment',
'<h2>Prerequisites</h2>
<ul>
<li>GitHub account</li>
<li>Vercel account</li>
</ul>
<h2>Steps</h2>
<ol>
<li>Fork and push to GitHub</li>
<li>Import repo in Vercel</li>
<li>Set environment variables in Vercel dashboard</li>
<li>Deploy</li>
</ol>',
'neural-aurora', 3
WHERE NOT EXISTS (SELECT 1 FROM installation_guides WHERE slug = 'vercel-deployment');

-- Release Notes
INSERT INTO release_notes (version, title, content, project_type, published_at)
SELECT '2.0.0', 'NEURAL AURORA v2 — Complete Rewrite',
'<h2>Major Changes</h2>
<ul>
<li>Complete rewrite with Next.js 16 + React 19</li>
<li>New taste-skill design system with premium aesthetics</li>
<li>Dynamic admin panel with Supabase backend</li>
<li>User approval workflow for team access</li>
<li>AI-powered gateway with LLM puzzle validation</li>
<li>Mood-based music engine (Web Audio API)</li>
<li>3D neural network particle system (Three.js)</li>
<li>Neural CMD terminal navigation</li>
</ul>
<h2>Breaking Changes</h2>
<ul>
<li>Static export removed — now runs as a dynamic Next.js server</li>
<li>Migration from Vite to Next.js App Router</li>
<li>New database schema with RLS policies</li>
</ul>',
'neural-aurora', '2026-06-01'
WHERE NOT EXISTS (SELECT 1 FROM release_notes WHERE version = '2.0.0');

INSERT INTO release_notes (version, title, content, project_type, published_at)
SELECT '1.0.0', 'WACRM Initial Release',
'<h2>Features</h2>
<ul>
<li>WhatsApp shared inbox for team collaboration</li>
<li>Contact management with tags and segments</li>
<li>Sales pipeline tracking</li>
<li>Broadcast messaging with templates</li>
<li>No-code automation engine</li>
<li>Visual flow builder for conversations</li>
<li>Supabase authentication and RLS</li>
</ul>',
'wacrm', '2026-05-15'
WHERE NOT EXISTS (SELECT 1 FROM release_notes WHERE version = '1.0.0');
