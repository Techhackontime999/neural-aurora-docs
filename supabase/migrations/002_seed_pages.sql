-- NEURAL AURORA pages
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Overview', 'overview',
'<p>NEURAL AURORA is an immersive, open-source 3D portfolio website — a living neural network suspended in an aurora field. Built with React, Vite, Three.js, and Supabase, it redefines what a personal portfolio can be.</p>
<h2>What Makes It Unique</h2>
<ul>
<li><strong>AI-Powered Gateway</strong> — Visitors solve a puzzle to enter, powered by LLM reasoning</li>
<li><strong>Neural CMD Terminal</strong> — A in-browser terminal for navigating the portfolio</li>
<li><strong>Mood-Based Music</strong> — Dynamically generated ambient audio that responds to interaction</li>
<li><strong>3D Neural Network</strong> — A living particle system that reacts to mouse movement</li>
<li><strong>Full Admin Dashboard</strong> — Manage projects, skills, blog posts, and site settings</li>
</ul>
<h2>Tech Stack</h2>
<table>
<tr><th>Layer</th><th>Technology</th></tr>
<tr><td>Frontend</td><td>React 19 + Vite + Three.js</td></tr>
<tr><td>Styling</td><td>Tailwind CSS v4 + taste-skill design system</td></tr>
<tr><td>Backend</td><td>Supabase (Postgres + Auth + Storage)</td></tr>
<tr><td>AI</td><td>OpenAI API / Anthropic Claude</td></tr>
<tr><td>Music</td><td>Web Audio API + Tone.js</td></tr>
<tr><td>Deployment</td><td>Vercel + Docker</td></tr>
</table>
<p>MIT License — free to fork, modify, and deploy.</p>',
'An immersive 3D portfolio with AI-powered features', 'published', 0, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'overview' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Getting Started', 'getting-started',
'<h2>Prerequisites</h2>
<ul>
<li>Node.js 20+</li>
<li>Git</li>
<li>A Supabase account (free tier works)</li>
</ul>
<h2>Quick Start</h2>
<pre><code>git clone https://github.com/Techhackontime999/NEURAL-AURORA.git
cd NEURAL-AURORA
npm install
cp .env.example .env
npm run dev</code></pre>
<h2>Environment Setup</h2>
<p>Fill in your Supabase credentials and API keys in <code>.env</code>:</p>
<pre><code>VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key</code></pre>
<h2>Run the Development Server</h2>
<pre><code>npm run dev</code></pre>
<p>Open <a href="http://localhost:5173">http://localhost:5173</a> in your browser.</p>',
'Quick setup guide to run NEURAL AURORA locally', 'published', 1, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'getting-started' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Features', 'features',
'<h2>AI Gateway</h2>
<p>The entry point to the portfolio is a puzzle that uses LLM reasoning to validate answers. This creates an engaging, game-like experience that showcases AI integration.</p>
<h2>Neural CMD Terminal</h2>
<p>A fully functional terminal emulator in the browser. Use commands like <code>help</code>, <code>projects</code>, <code>skills</code>, and <code>contact</code> to navigate the portfolio without touching the mouse.</p>
<h2>Mood-Based Music</h2>
<p>Ambient audio generated dynamically using the Web Audio API. The music adapts to the time of day and user interactions, creating a unique atmosphere for each visit.</p>
<h2>3D Neural Network</h2>
<p>A particle system with thousands of connected nodes that responds to mouse movement. Built with Three.js, it creates a sense of depth and interactivity that changes as you explore.</p>
<h2>Admin Dashboard</h2>
<p>Full CRUD management for projects, skills, blog posts, testimonials, and site configuration. Includes analytics and visitor tracking.</p>',
'Explore the AI-powered features of NEURAL AURORA', 'published', 2, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'features' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Setup', 'setup',
'<h2>Configuration</h2>
<p>After cloning, configure the following in your <code>.env</code> file:</p>
<h3>Supabase Setup</h3>
<ol>
<li>Create a project at <a href="https://supabase.com">supabase.com</a></li>
<li>Run the migrations from <code>supabase/migrations/</code></li>
<li>Copy your project URL and anon key</li>
</ol>
<h3>AI API Keys</h3>
<p>Optionally configure OpenAI or Anthropic keys for the AI gateway feature.</p>
<h3>Music Engine</h3>
<p>The mood-based music works out of the box with the Web Audio API — no additional setup required.</p>
<h2>Build for Production</h2>
<pre><code>npm run build
npm run preview</code></pre>
<h2>Docker</h2>
<pre><code>docker build -t neural-aurora .
docker run -p 3000:3000 neural-aurora</code></pre>',
'Detailed setup instructions for NEURAL AURORA', 'published', 3, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'setup' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Architecture', 'architecture',
'<h2>Project Structure</h2>
<pre><code>NEURAL-AURORA/
├── src/
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and clients
│   ├── pages/         # Route pages
│   ├── styles/        # Global styles
│   └── three/         # Three.js scenes
├── supabase/
│   └── migrations/    # Database migrations
├── public/            # Static assets
└── server/            # API server</code></pre>
<h2>Data Flow</h2>
<p>The app uses Supabase for auth and database, with the service role key for admin operations. Client-side requests use the anon key with RLS policies for security.</p>
<h2>3D Engine</h2>
<p>Three.js scenes are encapsulated in the <code>src/three/</code> directory, with a custom render loop and particle system that handles thousands of nodes at 60fps.</p>
<h2>AI Integration</h2>
<p>The AI gateway uses server-side API calls to LLMs, keeping keys secure. Responses are streamed to the client via Server-Sent Events for a real-time feel.</p>',
'Understanding the NEURAL AURORA codebase structure', 'published', 4, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'architecture' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '5ad28e4e-c9c4-4406-a835-aaccab92fc5a', 'Deployment', 'deployment',
'<h2>Vercel Deployment</h2>
<ol>
<li>Push your fork to GitHub</li>
<li>Import the repo in Vercel</li>
<li>Set environment variables in Vercel dashboard</li>
<li>Deploy</li>
</ol>
<h2>Docker Deployment</h2>
<pre><code>docker build -t neural-aurora .
docker run -d -p 3000:3000 \
  -e VITE_SUPABASE_URL=... \
  -e VITE_SUPABASE_ANON_KEY=... \
  neural-aurora</code></pre>
<h2>Environment Variables</h2>
<table>
<tr><th>Variable</th><th>Required</th><th>Description</th></tr>
<tr><td>VITE_SUPABASE_URL</td><td>Yes</td><td>Supabase project URL</td></tr>
<tr><td>VITE_SUPABASE_ANON_KEY</td><td>Yes</td><td>Supabase anon key</td></tr>
<tr><td>OPENAI_API_KEY</td><td>No</td><td>For AI gateway feature</td></tr>
</table>',
'Deploy NEURAL AURORA to Vercel or Docker', 'published', 5, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'deployment' AND category_id = '5ad28e4e-c9c4-4406-a835-aaccab92fc5a');

-- WACRM pages
INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Overview', 'overview',
'<p>WACRM (WhatsApp CRM Template) is a self-hostable CRM template for WhatsApp Business. It features a shared inbox, contacts management, sales pipelines, broadcast messaging, no-code automations, and a visual flow builder.</p>
<h2>Key Capabilities</h2>
<ul>
<li><strong>Shared Inbox</strong> — Team-based WhatsApp message management</li>
<li><strong>Contact Management</strong> — Store and segment your contacts</li>
<li><strong>Sales Pipelines</strong> — Track deals from lead to close</li>
<li><strong>Broadcasts</strong> — Send bulk messages with templates</li>
<li><strong>No-Code Automations</strong> — Build workflows without coding</li>
<li><strong>Flow Builder</strong> — Visual drag-and-drop conversation designer</li>
</ul>
<h2>Tech Stack</h2>
<table>
<tr><th>Layer</th><th>Technology</th></tr>
<tr><td>Frontend</td><td>Next.js 16 + React 19</td></tr>
<tr><td>Styling</td><td>Tailwind CSS v4</td></tr>
<tr><td>Backend</td><td>Next.js API Routes + Supabase</td></tr>
<tr><td>Database</td><td>PostgreSQL via Supabase</td></tr>
<tr><td>Auth</td><td>Supabase Auth + WhatsApp Cloud API</td></tr>
<tr><td>Deployment</td><td>Vercel</td></tr>
</table>
<p>MIT License — fork it, brand it, host it.</p>',
'A self-hostable WhatsApp CRM template with automations', 'published', 0, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'overview' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Getting Started', 'getting-started',
'<h2>Prerequisites</h2>
<ul>
<li>Node.js 20+</li>
<li>Git</li>
<li>A Supabase account (free tier works)</li>
<li>A Meta Business Account (for WhatsApp API)</li>
</ul>
<h2>Quick Start</h2>
<pre><code>git clone https://github.com/Techhackontime999/WACRM.git
cd WACRM
npm install
cp .env.example .env
npm run dev</code></pre>
<h2>Configure Supabase</h2>
<ol>
<li>Create a Supabase project</li>
<li>Run the migrations from <code>supabase/migrations/</code></li>
<li>Copy your project URL and anon key to <code>.env</code></li>
</ol>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a> to see the app.</p>',
'Quick setup guide for WACRM', 'published', 1, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'getting-started' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Supabase Setup', 'supabase-setup',
'<h2>Create a Supabase Project</h2>
<ol>
<li>Go to <a href="https://supabase.com">supabase.com</a> and create a new project</li>
<li>Note your project URL and anon key from the Settings → API page</li>
</ol>
<h2>Run Migrations</h2>
<p>Execute the SQL in <code>supabase/migrations/</code> in the Supabase SQL editor:</p>
<pre><code>-- Open SQL editor in Supabase dashboard
-- Paste the contents of 001_initial_schema.sql
-- Click Run</code></pre>
<h2>Configure Auth</h2>
<ol>
<li>Go to Authentication → Settings</li>
<li>Enable Email/Password sign-in</li>
<li>Set site URL to <code>http://localhost:3000</code></li>
<li>Add redirect URLs as needed</li>
</ol>
<h2>Row Level Security</h2>
<p>RLS policies are included in the migration. All tables are protected and accessible only through authenticated API requests.</p>',
'Configure Supabase for WACRM', 'published', 2, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'supabase-setup' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'WhatsApp Setup', 'whatsapp-setup',
'<h2>Meta Business Account</h2>
<ol>
<li>Go to <a href="https://business.facebook.com">business.facebook.com</a></li>
<li>Create a Business Account if you don''t have one</li>
<li>Verify your business</li>
</ol>
<h2>WhatsApp Cloud API</h2>
<ol>
<li>Go to <a href="https://developers.facebook.com">developers.facebook.com</a></li>
<li>Create a WhatsApp app</li>
<li>Get your Phone Number ID and Access Token</li>
<li>Configure Webhook URL pointing to your WACRM instance</li>
</ol>
<h2>Environment Variables</h2>
<pre><code>WHATSAPP_PHONE_NUMBER_ID=your-phone-id
WHATSAPP_ACCESS_TOKEN=your-token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your-verify-token</code></pre>
<h2>Test the Connection</h2>
<p>Send a test message using the WACRM dashboard. You should see incoming messages in the shared inbox.</p>',
'Connect WhatsApp Cloud API to WACRM', 'published', 3, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'whatsapp-setup' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Environment Variables', 'environment-variables',
'<h2>Required Variables</h2>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td>NEXT_PUBLIC_SUPABASE_URL</td><td>Supabase project URL</td></tr>
<tr><td>NEXT_PUBLIC_SUPABASE_ANON_KEY</td><td>Supabase anon key</td></tr>
<tr><td>SUPABASE_SERVICE_ROLE_KEY</td><td>Service role key for admin operations</td></tr>
<tr><td>WHATSAPP_PHONE_NUMBER_ID</td><td>WhatsApp Cloud API phone ID</td></tr>
<tr><td>WHATSAPP_ACCESS_TOKEN</td><td>WhatsApp Cloud API access token</td></tr>
<tr><td>WHATSAPP_WEBHOOK_VERIFY_TOKEN</td><td>Webhook verification token</td></tr>
</table>
<h2>Optional Variables</h2>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td>OPENAI_API_KEY</td><td>For AI-powered reply suggestions</td></tr>
<tr><td>NEXT_PUBLIC_APP_URL</td><td>Custom domain URL</td></tr>
</table>
<h2>Setup</h2>
<p>Copy <code>.env.example</code> to <code>.env</code> and fill in all values:</p>
<pre><code>cp .env.example .env</code></pre>',
'All environment variables for WACRM', 'published', 4, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'environment-variables' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Features', 'features',
'<h2>Shared Inbox</h2>
<p>All team members can view and respond to WhatsApp messages from a single, unified inbox. Assign conversations, add notes, and track response times.</p>
<h2>Contact Management</h2>
<p>Store contact information, tags, notes, and interaction history. Segment contacts by tags for targeted broadcasts.</p>
<h2>Sales Pipelines</h2>
<p>Create custom pipelines (e.g., Lead → Qualified → Negotiation → Closed). Drag deals between stages and track conversion rates.</p>
<h2>Broadcast Messaging</h2>
<p>Send templated messages to contact segments. Schedule broadcasts and track delivery, read, and reply rates.</p>
<h2>No-Code Automations</h2>
<p>Build automated workflows using triggers and actions. Example: when a contact sends "price", auto-reply with pricing PDF.</p>
<h2>Flow Builder</h2>
<p>Design conversational flows with a visual drag-and-drop editor. Branch based on user input, route to team members, or trigger webhooks.</p>',
'Full feature list for WACRM', 'published', 5, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'features' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Architecture', 'architecture',
'<h2>Project Structure</h2>
<pre><code>WACRM/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and Supabase clients
│   └── styles/         # Global CSS
├── supabase/
│   └── migrations/     # Database schema
├── public/             # Static assets
└── whatsapp/           # WhatsApp webhook handler</code></pre>
<h2>Auth Flow</h2>
<p>WACRM uses Supabase SSR auth with cookie-based sessions. The middleware (proxy.ts) handles session refresh and route protection.</p>
<h2>WhatsApp Webhook</h2>
<p>Incoming messages arrive at <code>/api/whatsapp/webhook</code>. The webhook verifies the signature, processes the message, and stores it in the database. Automations and flows are evaluated on each incoming message.</p>',
'WACRM architecture and design decisions', 'published', 6, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'architecture' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');

INSERT INTO doc_pages (category_id, title, slug, content, excerpt, status, sort_order, author_id)
SELECT '14a1ed09-6521-4b74-a199-250de5ba2fb3', 'Deployment', 'deployment',
'<h2>Vercel Deployment</h2>
<ol>
<li>Push your fork to GitHub</li>
<li>Import in Vercel</li>
<li>Set all environment variables in Vercel dashboard</li>
<li>Deploy</li>
</ol>
<h2>Database Migration</h2>
<p>After deploying, run the database migrations:</p>
<pre><code>supabase db push</code></pre>
<h2>WhatsApp Webhook</h2>
<p>Update your WhatsApp Cloud API webhook URL to point to <code>https://your-domain.com/api/whatsapp/webhook</code>.</p>
<h2>Production Checklist</h2>
<ul>
<li>Enable RLS on all tables</li>
<li>Set up database backups</li>
<li>Configure custom domain</li>
<li>Set up monitoring</li>
<li>Review auth settings</li>
</ul>',
'Deploy WACRM to production', 'published', 7, '564d1727-34d5-4930-a44b-1e2a544b22f8'
WHERE NOT EXISTS (SELECT 1 FROM doc_pages WHERE slug = 'deployment' AND category_id = '14a1ed09-6521-4b74-a199-250de5ba2fb3');
