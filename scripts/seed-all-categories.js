const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://bfelxuhviatyptzinnde.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZWx4dWh2aWF0eXB0emlubmRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDM2MzA0MiwiZXhwIjoyMDk1OTM5MDQyfQ.eXv_fZDAxK9lJEhtFNgdTJ3JdslsNsqlMCBQE7ZOxS8'
);

const AUTHOR_ID = '564d1727-34d5-4930-a44b-1e2a544b22f8';

const catPrefix = {
  '2ab912ff-4882-4560-95a6-39ea5c851888': 'docs',
  'd5d62e26-8f3f-418c-845d-f385755fe6d3': 'community',
  'd585d2a7-0a0b-4dfd-b2d5-679ef9760c4b': 'crm',
  '614798af-e97c-456b-ae26-5fcdc030bcfe': 'docs-community',
  '19bd7143-bd78-414d-9b2b-503667f6ec55': 'cloud',
  'c98282b9-1403-4633-b975-15defce11fd2': 'business',
  '656cdabd-9c2f-47bd-bffd-c2189b1b432a': 'pro',
  '0bef3699-f1ce-41bd-b94b-4d89e67c719a': 'teams',
  '8edcba66-b39f-403f-ab14-8cbf9b6f0777': 'enterprise'
};

const categoryPages = {
  '2ab912ff-4882-4560-95a6-39ea5c851888': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Official documentation hub for the NEURAL AURORA ecosystem built with Next.js 16 and Supabase.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Key features of the Neural Aurora documentation hub.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for setting up the documentation hub.',
      sort_order: 2
    },
    {
      title: 'Admin Panel',
      slug: 'admin-panel',
      excerpt: 'Complete guide to the admin panel sections and functionality.',
      sort_order: 3
    },
    {
      title: 'Project Structure',
      slug: 'project-structure',
      excerpt: 'Overview of the project directory structure.',
      sort_order: 4
    }
  ],
  'd5d62e26-8f3f-418c-845d-f385755fe6d3': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'An open-source multi-user portfolio platform with AI-powered tools and 3D experiences.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Complete feature list of the community portfolio platform.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for setting up a community portfolio instance.',
      sort_order: 2
    },
    {
      title: 'Architecture',
      slug: 'architecture',
      excerpt: 'Architecture overview and project structure of the community platform.',
      sort_order: 3
    },
    {
      title: 'Deployment',
      slug: 'deployment',
      excerpt: 'Deployment guide for the community portfolio platform.',
      sort_order: 4
    }
  ],
  'd585d2a7-0a0b-4dfd-b2d5-679ef9760c4b': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Cloud-hosted CRM template for WhatsApp Business API with shared inbox, pipelines, and automations.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Complete feature set of the WhatsApp CRM community edition.',
      sort_order: 1
    },
    {
      title: 'Architecture',
      slug: 'architecture',
      excerpt: 'System architecture and design patterns of the CRM platform.',
      sort_order: 2
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for setting up the CRM community edition.',
      sort_order: 3
    },
    {
      title: 'Database Schema',
      slug: 'database-schema',
      excerpt: 'Database schema overview for the CRM community platform.',
      sort_order: 4
    }
  ],
  '614798af-e97c-456b-ae26-5fcdc030bcfe': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Cloud-hosted community edition of the Neural Aurora documentation platform.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Key features of the docs community platform.',
      sort_order: 1
    }
  ],
  '19bd7143-bd78-414d-9b2b-503667f6ec55': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'A unified cloud platform showcasing all Neural Aurora products with 3D visuals.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Complete feature list of the Neural Aurora cloud platform.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for the cloud platform.',
      sort_order: 2
    },
    {
      title: 'Architecture',
      slug: 'architecture',
      excerpt: 'Architecture overview of the cloud platform.',
      sort_order: 3
    },
    {
      title: 'Admin Panel',
      slug: 'admin-panel',
      excerpt: 'Admin panel guide for managing the cloud platform.',
      sort_order: 4
    }
  ],
  'c98282b9-1403-4633-b975-15defce11fd2': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Portfolio infrastructure solution for small and medium businesses.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Business-focused features for the portfolio platform.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for the business tier.',
      sort_order: 2
    },
    {
      title: 'Pricing & Plans',
      slug: 'pricing',
      excerpt: 'Pricing details for the business tier.',
      sort_order: 3
    }
  ],
  '656cdabd-9c2f-47bd-bffd-c2189b1b432a': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Professional tier of the Neural Aurora portfolio platform for individual professionals.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Pro-tier features for professionals and freelancers.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for upgrading to the Pro tier.',
      sort_order: 2
    }
  ],
  '0bef3699-f1ce-41bd-b94b-4d89e67c719a': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Portfolio infrastructure solution for teams and agencies.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Team-focused features for collaborative portfolio management.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Quick start guide for setting up a team portfolio.',
      sort_order: 2
    },
    {
      title: 'Team Management',
      slug: 'management',
      excerpt: 'Guide to managing team members and permissions.',
      sort_order: 3
    }
  ],
  '8edcba66-b39f-403f-ab14-8cbf9b6f0777': [
    {
      title: 'Overview',
      slug: 'overview',
      excerpt: 'Enterprise-grade portfolio infrastructure for large businesses and organizations.',
      sort_order: 0
    },
    {
      title: 'Features',
      slug: 'features',
      excerpt: 'Enterprise-grade features for large organizations.',
      sort_order: 1
    },
    {
      title: 'Getting Started',
      slug: 'getting-started',
      excerpt: 'Enterprise onboarding and setup guide.',
      sort_order: 2
    },
    {
      title: 'Security & Compliance',
      slug: 'security',
      excerpt: 'Enterprise security features and compliance information.',
      sort_order: 3
    }
  ]
};

const content = {
  'docs-overview': '<h1>NEURAL AURORA DOCS</h1><p>NEURAL AURORA DOCS is the official documentation hub for the entire NEURAL AURORA ecosystem. Built with Next.js 16, Supabase, and the taste-skill design system, it provides comprehensive documentation for all Neural Aurora products including the Synaptic Portfolio, CRM, Cloud Platform, and Community editions.</p><h2>Purpose</h2><p>The documentation hub serves as a centralized knowledge base where users can find setup guides, feature documentation, architecture details, and API references for all Neural Aurora products. All documentation pages are stored dynamically in Supabase and can be managed through an intuitive admin panel.</p><h2>Key Capabilities</h2><ul><li>Dynamic documentation pages stored in Supabase with full CRUD via admin panel</li><li>Project showcase landing page with hero, features, demos, and quick-start guides</li><li>Demo section with embeddable video showcase entries</li><li>AI-powered client-side search across all documentation</li><li>Supabase SSR authentication with cookie-based sessions</li><li>Admin approval workflow for user management</li><li>Categories system for organizing documentation by product</li><li>Contributor management with avatars and GitHub links</li><li>Installation guides per project type</li><li>Release notes with version tracking</li></ul>',
  'docs-features': '<h1>Features</h1><h2>Dynamic Documentation</h2><p>All documentation pages are stored in Supabase and can be created, edited, and published through the admin panel. Pages support rich HTML content via the Tiptap WYSIWYG editor.</p><h2>Project Showcase</h2><p>The landing page features a hero section, feature grid, demo showcase, quick-start steps, statistics, and an FAQ accordion — all managed from the admin panel.</p><h2>Demo Section</h2><p>Embed video demos for each project with title, description, YouTube URL, and embed URL. Manage which demos appear on the homepage.</p><h2>Admin Panel</h2><p>Full CRUD interface for managing documentation pages, categories, users, contributors, installation guides, release notes, demos, external links, and homepage content.</p><h2>Authentication</h2><p>Supabase SSR auth with cookie-based sessions. First user is auto-promoted to admin; subsequent users require admin approval.</p><h2>AI-Powered Search</h2><p>Client-side search across all documentation pages with instant results.</p><h2>taste-skill Design</h2><p>Premium dark theme using the taste-skill design system with configurable design variance, motion intensity, and visual density.</p><h2>Responsive Sidebar</h2><p>Dynamic sidebar that groups documentation pages by category with expandable sections and external links.</p>',
  'docs-getting-started': '<h1>Getting Started</h1><h2>Prerequisites</h2><ul><li>Node.js 20+</li><li>npm</li><li>A Supabase project (free tier works)</li></ul><h2>Installation</h2><pre><code>git clone https://github.com/Techhackontime999/neural-aurora-docs.git\ncd neural-aurora-docs\nnpm install</code></pre><h2>Environment Setup</h2><p>Copy <code>.env.example</code> to <code>.env</code> and fill in your Supabase credentials:</p><pre><code>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key</code></pre><h2>Database Setup</h2><p>Run the SQL migrations in <code>supabase/migrations/</code> against your Supabase project in order from 001_initial_schema.sql through 008_homepage_content.sql.</p><h2>Development</h2><pre><code>npm run dev</code></pre><p>Open http://localhost:3000. The first user to sign up is automatically promoted to admin.</p>',
  'docs-admin-panel': '<h1>Admin Panel</h1><p>Access the admin panel at <code>/admin</code> after signing in. The first user is automatically promoted to admin.</p><h2>Sections</h2><ul><li><strong>Dashboard</strong> — Overview with key metrics and statistics</li><li><strong>Doc Pages</strong> — CRUD for documentation pages with Tiptap editor</li><li><strong>Categories</strong> — Manage documentation categories</li><li><strong>Users</strong> — Approve, reject, or delete users</li><li><strong>Contributors</strong> — Manage project contributors</li><li><strong>Installation Guides</strong> — Setup guides per project type</li><li><strong>Release Notes</strong> — Version release notes</li><li><strong>Demos</strong> — Homepage demo showcase entries</li><li><strong>External Links</strong> — Dynamic sidebar external links</li><li><strong>Homepage</strong> — Manage all homepage sections</li></ul>',
  'docs-project-structure': '<h1>Project Structure</h1><pre><code>neural-aurora-docs/\n├── public/\n├── src/\n│   ├── app/\n│   │   ├── admin/           # Admin panel pages\n│   │   ├── api/             # API routes\n│   │   ├── login/           # Login page\n│   │   ├── signup/          # Signup page\n│   │   ├── [...slug]/       # Dynamic doc page routes\n│   │   ├── docs/            # Docs index page\n│   │   ├── page.tsx         # Landing page\n│   │   └── layout.tsx       # Root layout\n│   ├── components/          # React components\n│   ├── hooks/               # React hooks (auth, theme)\n│   └── lib/supabase/        # Supabase client utilities\n├── supabase/migrations/     # Database migrations\n└── taste-skill/             # Design system files</code></pre>',
  'community-overview': '<h1>NEURAL AURORA Community</h1><p>NEURAL AURORA Community is an open-source multi-user portfolio platform that enables users to build neural-inspired digital identities. Built with React 18, Vite 6, Supabase, and Three.js, it offers AI-powered tools, immersive 3D experiences, and full administrative control.</p><h2>What It Offers</h2><ul><li>Each user gets their own portfolio handle at <code>/username</code></li><li>Full Supabase RLS isolation for multi-tenant architecture</li><li>AI-powered verification gateways including voice recognition and neural pattern lock</li><li>Real-time 3D particle backgrounds with neural network aesthetics</li><li>Mood-based dynamic music system</li><li>Community blog and case studies with multi-author support</li><li>Subscription tiers via Razorpay integration</li><li>PWA support with offline caching</li></ul>',
  'community-features': '<h1>Features</h1><h2>Portfolio Platform</h2><ul><li>Multi-tenant architecture with per-user portfolio handles</li><li>Rich portfolio sections: personal info, skills, projects, education, experience, blog, case studies, social links, reviews</li><li>Full CRUD admin dashboard for portfolio management</li><li>User dashboard for simplified portfolio management</li></ul><h2>AI & Interactive Gateways</h2><ul><li>AI-powered verification puzzles using OpenRouter/OpenAI</li><li>Neural Pattern Lock memory game</li><li>Mood-based dynamic background music</li><li>Neural Aurora CMD terminal access</li></ul><h2>3D & Visuals</h2><ul><li>Three.js neural aurora background particle system</li><li>Spline 3D hero scene integration</li><li>Liquid glass design with spring physics</li><li>Dark/light theme support</li></ul><h2>Community</h2><ul><li>Browse all user portfolios in gallery view</li><li>Multi-author community blog</li><li>Case studies sharing platform</li><li>Live visitor counter via Supabase Realtime</li></ul><h2>Monetization</h2><ul><li>Subscription tiers with Razorpay payments</li><li>Service store for selling services</li><li>Donation acceptance</li><li>14-day free trial system</li></ul>',
  'community-getting-started': '<h1>Getting Started</h1><h2>Prerequisites</h2><ul><li>Node.js 18+</li><li>A Supabase project (free tier works)</li><li>Razorpay account (for payments)</li></ul><h2>Installation</h2><pre><code>git clone https://github.com/Techhackontime999/neural-aurora-community.git\ncd neural-aurora-community\nnpm install\ncp .env.example .env</code></pre><h2>Environment Variables</h2><pre><code>VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key\nRAZORPAY_KEY_ID=your-razorpay-key\nRAZORPAY_KEY_SECRET=your-razorpay-secret</code></pre><h2>Development</h2><pre><code>npm run dev</code></pre><p>Start building your portfolio at http://localhost:5173.</p>',
  'community-architecture': '<h1>Architecture</h1><pre><code>src/\n├── api/                # API client modules\n├── components/\n│   ├── admin/          # Admin dashboard pages\n│   ├── user/           # User dashboard pages\n│   ├── ui/             # Reusable UI primitives\n│   └── *.jsx           # Portfolio section components\n├── context/            # React context providers\n├── data/               # Static fallback data\n├── lib/                # Utilities, Supabase client, AI gateway\n├── App.jsx             # Root component with routing\n└── main.jsx            # Entry point</code></pre><h2>Key Patterns</h2><ul><li><strong>Multi-tenant:</strong> Each user isolated by RLS policies</li><li><strong>Static fallback:</strong> Portfolio data falls back to static JSON when Supabase is unreachable</li><li><strong>PWA:</strong> Service worker with runtime caching via Workbox</li><li><strong>AI gateway:</strong> OpenRouter/OpenAI-compatible API for puzzle generation</li></ul>',
  'community-deployment': '<h1>Deployment</h1><h2>Vercel Deployment</h2><p>The project is pre-configured for Vercel deployment:</p><ol><li>Push to GitHub</li><li>Import repo in Vercel</li><li>Add environment variables (Supabase + Razorpay)</li><li>Deploy — vercel.json handles SPA rewrites and PWA headers</li></ol><h2>PWA Headers</h2><p>The vercel.json ensures sw.js gets Cache-Control: no-cache and Service-Worker-Allowed: / headers.</p>',
  'crm-overview': '<h1>NEURAL AURORA CRM Community</h1><p>NEURAL AURORA CRM Community is a cloud-hosted, self-hostable CRM template for WhatsApp. Built with Next.js 16, Supabase, and shadcn/ui, it provides a complete WhatsApp Business CRM solution including shared inbox, contact management, sales pipelines, broadcast campaigns, and no-code automations.</p><h2>Key Capabilities</h2><ul><li>Shared inbox on the official WhatsApp Business API with multi-agent support</li><li>Contact management with tags, custom fields, notes, and CSV import</li><li>Sales pipelines (Kanban) with drag-and-drop deal management</li><li>Broadcast campaigns with Meta-approved templates</li><li>No-code automation engine with 7 trigger types and 11 action types</li><li>Visual flow builder with drag-and-drop canvas</li><li>AI automation via natural language interface</li><li>Real-time dashboard with analytics and per-agent stats</li></ul>',
  'crm-features': '<h1>Features</h1><h2>Shared Inbox</h2><p>Multiple agents working one WhatsApp number with per-conversation assignment, status tracking, reactions, and message templates.</p><h2>Contacts Management</h2><p>Contact database with tags, custom fields, notes, CSV import/export with deduplication, and full-text search.</p><h2>Sales Pipelines</h2><p>Kanban-style deal management with multi-stage pipelines, drag-and-drop, and deals linked to conversations.</p><h2>Broadcast Campaigns</h2><p>Create campaigns using Meta-approved message templates with delivery and read tracking, and per-recipient variable substitution.</p><h2>No-Code Automations</h2><p>Rule-based automation engine with 7 trigger types and 11 action types.</p><h2>Visual Flow Builder</h2><p>Drag-and-drop canvas for complex multi-step flows with branching, scheduling, and execution logs.</p><h2>AI Automation</h2><p>Telegram-like chat interface that controls the CRM via natural language using OpenAI-compatible LLMs with fallback to regex parsing.</p>',
  'crm-architecture': '<h1>Architecture</h1><h2>Multi-Tenant Design</h2><p>Every row is scoped by user_id via Supabase RLS. The automation engine and webhook handler use a service-role client to operate across all tenants.</p><h2>WhatsApp Integration</h2><p>Inbound messages arrive via Meta Cloud API webhook (HMAC-verified). Outbound messages go through the same API. Access tokens are encrypted at rest using AES-256-GCM.</p><h2>AI Automation</h2><p>An OpenAI-compatible function-calling loop transforms natural language into structured CRM operations with 37 tool definitions.</p><h2>Real-Time Updates</h2><p>Supabase Realtime subscriptions power inbox unread counts and conversation list updates across open tabs.</p><h2>Project Structure</h2><pre><code>src/\n├── app/\n│   ├── (auth)/           # Login, signup, forgot-password\n│   ├── (dashboard)/      # Inbox, contacts, pipelines, etc.\n│   ├── api/              # 21 API route handlers\n│   └── approval-pending/ # Post-signup approval gate\n├── components/           # React components by module\n├── hooks/                # Custom React hooks\n├── lib/                  # Business logic and utilities\n└── types/                # TypeScript type definitions</code></pre>',
  'crm-getting-started': '<h1>Getting Started</h1><h2>Prerequisites</h2><ul><li>Node.js 18+</li><li>A Supabase project</li><li>Meta Developer account for WhatsApp API</li></ul><h2>Quick Start</h2><pre><code>git clone https://github.com/Techhackontime999/NEURAL-AURORA-CRM-COMMUNITY.git\ncd NEURAL-AURORA-CRM-COMMUNITY\nnpm install\ncp .env.local.example .env.local</code></pre><h2>Environment Variables</h2><pre><code>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key\nMETA_APP_SECRET=your-meta-app-secret</code></pre><h2>Development</h2><pre><code>npm run dev</code></pre>',
  'crm-database-schema': '<h1>Database Schema</h1><p>The CRM uses 14 Supabase migrations covering all core tables:</p><ul><li><strong>profiles</strong> — User profiles with role and approval status</li><li><strong>contacts</strong> — Contact management with tags and custom fields</li><li><strong>conversations</strong> — WhatsApp conversation threads</li><li><strong>messages</strong> — Individual messages with reactions</li><li><strong>pipelines and deals</strong> — Sales pipeline Kanban boards</li><li><strong>broadcasts and recipients</strong> — Campaign management</li><li><strong>automations</strong> — No-code automation engine tables</li><li><strong>flows</strong> — Visual flow builder tables</li><li><strong>tags</strong> — Contact tagging system</li><li><strong>profile_avatars</strong> — Storage bucket for avatars</li></ul>',
  'docs-community-overview': '<h1>NEURAL AURORA DOCS Community</h1><p>NEURAL AURORA DOCS Community is a cloud-hosted documentation platform that serves as the community edition of the Neural Aurora documentation hub. It provides comprehensive, dynamically-managed documentation for all Neural Aurora ecosystem products with multi-user collaboration features.</p><h2>Purpose</h2><p>This community edition extends the documentation platform with cloud hosting capabilities, making it accessible as a hosted service for the Neural Aurora community. It provides the same powerful documentation management features as the self-hosted version with additional cloud benefits.</p>',
  'docs-community-features': '<h1>Features</h1><ul><li><strong>Dynamic Documentation</strong> — All docs stored in Supabase, editable via admin panel with Tiptap WYSIWYG editor</li><li><strong>Multi-User Support</strong> — Team collaboration with role-based access control</li><li><strong>Categories System</strong> — Organize documentation by product and topic</li><li><strong>AI-Powered Search</strong> — Client-side search across all documentation pages</li><li><strong>Demo Management</strong> — Embed and manage video demos for each product</li><li><strong>Contributor Management</strong> — Track and display project contributors</li><li><strong>Installation Guides</strong> — Per-project setup documentation</li><li><strong>Release Notes</strong> — Version tracking and changelog management</li><li><strong>External Links</strong> — Dynamic sidebar links to external resources</li><li><strong>taste-skill Design</strong> — Premium dark theme design system</li></ul>',
  'cloud-overview': '<h1>NEURAL AURORA CLOUD</h1><p>NEURAL AURORA CLOUD is a production-ready product showcase platform for the entire NEURAL AURORA ecosystem. Built with React 18, Vite 6, Supabase, and Three.js, it provides a unified cloud platform for showcasing all Neural Aurora products with immersive 3D visuals and dynamic content management.</p><h2>Purpose</h2><p>The cloud platform serves as a single entry point where users can browse, explore, and discover all Neural Aurora products. It features a dynamic product catalog, 3D visual experiences, pricing plan management, and a comprehensive admin panel.</p>',
  'cloud-features': '<h1>Features</h1><ul><li><strong>Product Catalog</strong> — Browse, filter, and showcase products with live/coming-soon status</li><li><strong>3D Visuals</strong> — Immersive Three.js scenes with parallax, cursor glow, and dynamic backgrounds</li><li><strong>Pricing Plans</strong> — Fully dynamic plan cards managed from the admin panel</li><li><strong>Admin Panel</strong> — Role-based dashboard for managing products, site content, users, and pricing</li><li><strong>Site Content Editor</strong> — Edit every text element on the site without touching code</li><li><strong>Authentication</strong> — Supabase-based auth with approval flow</li><li><strong>PWA Support</strong> — Installable progressive web app with offline caching</li><li><strong>Dark/Light Mode</strong> — Persistent theme toggle</li><li><strong>SEO & Open Graph</strong> — Meta tags, semantic HTML, and social previews</li></ul>',
  'cloud-getting-started': '<h1>Getting Started</h1><h2>Prerequisites</h2><ul><li>Node.js 18+</li><li>A Supabase project</li></ul><h2>Installation</h2><pre><code>npm install\nnpm run dev</code></pre><h2>Environment Setup</h2><pre><code>VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key</code></pre><h2>Database Setup</h2><p>Run migrations in order from the supabase/migrations/ directory.</p>',
  'cloud-architecture': '<h1>Architecture</h1><pre><code>src/\n├── App.jsx              # Routes, layout, homepage\n├── main.jsx             # Entry point\n├── context/\n│   ├── AuthContext.jsx   # Supabase auth\n│   └── ThemeContext.jsx  # Dark/light mode\n├── components/\n│   ├── Footer.jsx\n│   ├── ProductsGrid.jsx\n│   ├── FutureProducts.jsx\n│   ├── EcosystemGraph.jsx\n│   ├── Hero3D.jsx\n│   ├── Background3D.jsx\n│   └── ContainerScroll.jsx\n├── pages/\n│   ├── Login.jsx\n│   ├── ApprovalPending.jsx\n│   └── admin/\n│       ├── AdminDashboard.jsx\n│       ├── AdminUsers.jsx\n│       ├── AdminPlans.jsx\n│       ├── AdminContent.jsx\n│       ├── ProductForm.jsx\n│       └── ProtectedRoute.jsx\n└── lib/\n    ├── supabase.js\n    ├── products.js\n    ├── categories.js\n    └── content.js</code></pre>',
  'cloud-admin-panel': '<h1>Admin Panel</h1><p>Access <code>/admin</code> after signing in. Features are role-based:</p><ul><li><strong>Admin</strong> — Full access to products, content, plans, and users</li><li><strong>Editor</strong> — Products and content only</li></ul><h2>Managing Plans</h2><p>The pricing section is fully dynamic from the Plans page: create, edit, delete plan cards with badge, title, price, subtitle, accent color, features, CTA text, and CTA link.</p><h2>Site Content</h2><p>Edit every text element on the site organized by section (Hero, Products, Pricing, Footer). Changes reflect immediately.</p>',
  'business-overview': '<h1>NEURAL AURORA BUSINESS</h1><p>NEURAL AURORA BUSINESS is a portfolio infrastructure solution designed specifically for small and medium businesses. It provides a professional, AI-powered digital presence with the full power of the Neural Aurora ecosystem tailored for business needs.</p><h2>Purpose</h2><p>Businesses need a strong online presence to attract clients and showcase their work. NEURAL AURORA BUSINESS delivers a comprehensive portfolio platform with business-focused features including team collaboration, client management, and advanced analytics.</p>',
  'business-features': '<h1>Features</h1><ul><li><strong>Professional Portfolio</strong> — Showcase your business with a stunning, customizable portfolio</li><li><strong>AI-Powered Tools</strong> — Leverage AI for content generation and client engagement</li><li><strong>3D Visuals</strong> — Impress clients with immersive 3D product presentations</li><li><strong>Client Management</strong> — Manage client inquiries and project communication</li><li><strong>Business Analytics</strong> — Track portfolio performance and visitor engagement</li><li><strong>Custom Domain</strong> — Use your own domain for a professional image</li><li><strong>Priority Support</strong> — Dedicated support for business clients</li></ul>',
  'business-getting-started': '<h1>Getting Started</h1><p>NEURAL AURORA BUSINESS is a paid tier of the Neural Aurora ecosystem. To get started:</p><ol><li>Visit the Neural Aurora Cloud platform</li><li>Select the Business plan from the pricing section</li><li>Complete payment via Razorpay</li><li>Access your business dashboard immediately</li><li>Customize your portfolio with business-specific features</li></ol>',
  'business-pricing': '<h1>Pricing & Plans</h1><p>NEURAL AURORA BUSINESS is a paid subscription tier. The plan includes:</p><ul><li>Full portfolio platform access</li><li>AI-powered tools and features</li><li>Priority customer support</li><li>Custom domain support</li><li>Advanced analytics dashboard</li><li>Regular updates and new features</li></ul><p>Subscription is managed through Razorpay with monthly and annual billing options.</p>',
  'pro-overview': '<h1>NEURAL AURORA PRO</h1><p>NEURAL AURORA PRO is the professional tier of the Neural Aurora portfolio platform. Designed for individual professionals and freelancers who need advanced portfolio features, AI capabilities, and premium customization options.</p><h2>Purpose</h2><p>Professionals require more than a basic portfolio. NEURAL AURORA PRO delivers enhanced features including advanced AI tools, premium 3D visuals, expanded storage, and professional analytics to help you stand out.</p>',
  'pro-features': '<h1>Features</h1><ul><li><strong>Advanced Portfolio</strong> — Enhanced portfolio sections with more customization options</li><li><strong>AI Content Generation</strong> — AI-powered content creation and optimization</li><li><strong>Premium 3D Visuals</strong> — Additional 3D scenes and effects</li><li><strong>Expanded Storage</strong> — More space for images, videos, and assets</li><li><strong>Professional Analytics</strong> — Detailed visitor insights and engagement metrics</li><li><strong>Custom Branding</strong> — Remove Neural Aurora branding</li><li><strong>Priority Updates</strong> — Early access to new features</li></ul>',
  'pro-getting-started': '<h1>Getting Started</h1><p>NEURAL AURORA PRO is a paid upgrade to the base portfolio platform. To get started:</p><ol><li>Create your free portfolio account</li><li>Navigate to the pricing section</li><li>Select the Pro plan</li><li>Complete the upgrade via Razorpay</li><li>Access Pro features immediately</li></ol>',
  'teams-overview': '<h1>NEURAL AURORA TEAMS</h1><p>NEURAL AURORA TEAMS is a portfolio infrastructure solution designed for collaborative teams and agencies. It enables multiple team members to manage and contribute to a shared portfolio presence with role-based access control and collaborative workflows.</p><h2>Purpose</h2><p>Teams and agencies need a collaborative platform where multiple members can showcase their collective work. NEURAL AURORA TEAMS provides shared portfolio management with individual contributor profiles, team analytics, and streamlined collaboration tools.</p>',
  'teams-features': '<h1>Features</h1><ul><li><strong>Multi-Member Support</strong> — Add multiple team members with individual profiles</li><li><strong>Role-Based Access</strong> — Admin, editor, and viewer roles for team management</li><li><strong>Collaborative Editing</strong> — Team members can contribute to the portfolio</li><li><strong>Team Analytics</strong> — Track collective portfolio performance</li><li><strong>Shared Asset Library</strong> — Centralized storage for team assets</li><li><strong>Client Management</strong> — Manage client projects and communication as a team</li><li><strong>Team Directory</strong> — Showcase all team members with their roles</li></ul>',
  'teams-getting-started': '<h1>Getting Started</h1><p>NEURAL AURORA TEAMS is a paid tier designed for collaborative groups. To get started:</p><ol><li>Choose the Teams plan from the pricing page</li><li>Complete the subscription via Razorpay</li><li>Invite team members from the dashboard</li><li>Assign roles and permissions</li><li>Start collaborating on your portfolio</li></ol>',
  'teams-management': '<h1>Team Management</h1><h2>Roles & Permissions</h2><ul><li><strong>Admin</strong> — Full control over portfolio, team members, and settings</li><li><strong>Editor</strong> — Can create and edit portfolio content</li><li><strong>Viewer</strong> — Read-only access to portfolio analytics</li></ul><h2>Inviting Members</h2><p>Team admins can invite members via email from the team management dashboard. Invited members receive signup instructions and are added to the team upon accepting.</p><h2>Collaborative Workflows</h2><p>Team members can work on different portfolio sections simultaneously. Changes are tracked and can be reviewed before publishing.</p>',
  'enterprise-overview': '<h1>NEURAL AURORA ENTERPRISE</h1><p>NEURAL AURORA ENTERPRISE is the premium portfolio infrastructure solution designed for large businesses and organizations. It provides enterprise-grade features including advanced security, dedicated infrastructure, custom integrations, and comprehensive support.</p><h2>Purpose</h2><p>Large organizations require robust, scalable, and secure digital presence solutions. NEURAL AURORA ENTERPRISE delivers a fully customizable portfolio platform with enterprise-grade reliability, performance, and compliance features.</p>',
  'enterprise-features': '<h1>Features</h1><ul><li><strong>Dedicated Infrastructure</strong> — Isolated deployment with dedicated resources</li><li><strong>Advanced Security</strong> — Enhanced RLS policies, audit logging, and SSO integration</li><li><strong>Custom Integrations</strong> — API access for custom integrations with existing systems</li><li><strong>White-Label Solution</strong> — Complete branding customization</li><li><strong>Advanced Analytics</strong> — Enterprise-grade analytics and reporting</li><li><strong>SLA Guarantee</strong> — Guaranteed uptime and performance</li><li><strong>Dedicated Support</strong> — Priority support with dedicated account manager</li><li><strong>Custom Development</strong> — Tailored feature development available</li></ul>',
  'enterprise-getting-started': '<h1>Getting Started</h1><p>NEURAL AURORA ENTERPRISE is available through direct engagement with the Neural Aurora team. To get started:</p><ol><li>Contact the sales team through the Neural Aurora website</li><li>Discuss your organization\'s requirements</li><li>Receive a customized deployment plan</li><li>Complete onboarding with dedicated support</li><li>Access your enterprise dashboard</li></ol>',
  'enterprise-security': '<h1>Security & Compliance</h1><h2>Data Security</h2><ul><li>Row-Level Security (RLS) on all database tables</li><li>AES-256-GCM encryption for sensitive data</li><li>HMAC-verified webhooks</li><li>CSP rate limiting</li></ul><h2>Compliance</h2><ul><li>Data residency options available</li><li>Audit logging for all admin actions</li><li>Role-based access control with granular permissions</li><li>Regular security audits and updates</li></ul>'
};

async function seedAll() {
  for (const [catId, pages] of Object.entries(categoryPages)) {
    process.stdout.write(`Seeding category ${catId}... `);
    let count = 0;
    for (const page of pages) {
      const contentKey = catPrefix[catId] + '-' + page.slug;
      const fullContent = content[contentKey];
      if (!fullContent) {
        process.stdout.write(`\n  SKIP ${page.title} (no content)`);
        continue;
      }
      const { data, error } = await supabase.from('doc_pages').insert({
        category_id: catId,
        title: page.title,
        slug: page.slug,
        content: fullContent,
        excerpt: page.excerpt,
        sort_order: page.sort_order,
        status: 'published',
        author_id: AUTHOR_ID
      }).select().single();
      if (error) {
        process.stdout.write(`\n  ERROR ${page.title}: ${error.message}`);
      } else {
        count++;
      }
    }
    console.log(`created ${count} pages`);
  }
  console.log('Done!');
}

seedAll().catch(console.error);
