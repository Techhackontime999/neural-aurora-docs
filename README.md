# Neural Aurora Docs

Official documentation hub for [NEURAL AURORA](https://github.com/Techhackontime999/NEURAL-AURORA) (The Synaptic Portfolio) and [WACRM](https://github.com/Techhackontime999/WACRM) (WhatsApp CRM Template).

Built with **Next.js 16**, **Supabase**, **Tailwind CSS v4**, and the **taste-skill** design system.

## Features

- **Dynamic Documentation** — All docs pages stored in Supabase, editable via admin panel
- **Project Showcase** — Landing page with hero, features, demos, stats, steps, FAQ
- **3D Background** — Interactive Three.js particle field on the landing page
- **Demo Section** — Watch full demos of each project (manageable from admin)
- **Admin Panel** — Full CRUD for docs, categories, contributors, installation guides, release notes, demos, external links, and homepage sections
- **AI Assistant** — Chat-based AI assistant with two modes:
  - **Admin Mode** — Full content control via natural language or one-click quick actions
  - **User Mode** — Read-only documentation exploration
  - **Quick Actions** — Pre-built one-click buttons that call REST APIs directly (no AI needed for basic operations)
  - **AI-Powered Actions** — Parameterized operations (create, update, delete, search) use the AI for natural language understanding
- **Rich Text Editing** — Tiptap-based WYSIWYG editor for all content fields
- **Search & Multi-Select** — Every admin list page has real-time search, checkbox multi-select, and bulk delete
- **Framer Motion Animations** — Staggered spring animations throughout admin UI
- **Auth System** — Supabase SSR auth with cookie-based sessions, admin approval workflow
- **taste-skill Design** — Premium dark theme with taste-skill design system (DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4)
- **Security Hardened** — All write API routes require admin role (role-level auth), whitelisted column updates prevent injection, RLS policies on all tables
- **Responsive Layout** — CSS Grid-based chat layout ensures proper scrolling and input visibility on all screen sizes
- **Glass Morphism UI** — Navbar with backdrop blur, glass panels, and consistent dark/light theme across all pages

## Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16 (App Router)                         |
| Language       | TypeScript                                      |
| Styling        | Tailwind CSS v4 + taste-skill                   |
| Animation      | Framer Motion                                   |
| 3D Graphics    | Three.js / React Three Fiber / Drei             |
| Database       | PostgreSQL via Supabase                         |
| Auth           | Supabase SSR (cookie-based)                     |
| AI             | OpenRouter API (configurable provider)           |
| Icons          | Lucide React                                    |
| Deployment     | Vercel / Docker                                 |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A Supabase project (free tier works)

### Clone & Install

```bash
git clone https://github.com/Techhackontime999/neural-aurora-docs.git
cd neural-aurora-docs
npm install
```

### Configure Environment

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

| Variable                        | Description                        |
| ------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key             |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service role key (admin operations) |

Optional AI configuration (required for AI Assistant features):

| Variable           | Description                        | Default                         |
| ------------------ | ---------------------------------- | ------------------------------- |
| `AI_API_BASE`      | OpenAI-compatible API base URL     | `https://openrouter.ai/api/v1`  |
| `AI_API_KEY`       | API key for the AI provider         | —                               |
| `AI_MODEL`         | Model identifier                    | `gpt-4o-mini`                   |

### Database Setup

Run the SQL in `supabase/migrations/` against your Supabase project in order:

1. `001_initial_schema.sql` — Tables, RLS, triggers, seed categories
2. `002_seed_pages.sql` — Seed documentation pages
3. `003_seed_misc.sql` — Seed contributors, installation guides, release notes
4. `004_demos.sql` — Demos table
5. `005_seed_demos.sql` — Seed demo entries
6. `006_seed_wacrm_pages.sql` — Comprehensive Neural Aurora CRM doc pages
7. `007_external_links.sql` — Dynamic sidebar external links (manageable via admin)

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
neural-aurora-docs/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin panel pages
│   │   │   ├── ai-automation/  # AI Assistant chat interface
│   │   │   ├── docs/        # Doc pages CRUD
│   │   │   ├── categories/  # Category management
│   │   │   ├── users/       # User approval management
│   │   │   ├── contributors/
│   │   │   ├── demos/
│   │   │   ├── installation-guides/
│   │   │   ├── release-notes/
│   │   │   ├── external-links/
│   │   │   └── homepage/    # Homepage section management
│   │   ├── api/             # API routes
│   │   │   ├── ai/chat/     # AI Assistant endpoint
│   │   │   ├── docs/        # Doc pages CRUD
│   │   │   ├── categories/
│   │   │   ├── users/
│   │   │   ├── contributors/
│   │   │   ├── demos/
│   │   │   ├── installation-guides/
│   │   │   ├── release-notes/
│   │   │   ├── external-links/
│   │   │   └── homepage/
│   │   ├── [catSlug]/[pageSlug]/  # Dynamic doc pages
│   │   ├── docs/            # Docs index page
│   │   ├── page.tsx         # Landing page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── AssistantChat.tsx  # AI Assistant with quick actions
│   │   ├── AdminSearch.tsx  # Reusable search bar
│   │   ├── RichTextEditor.tsx # Tiptap WYSIWYG editor
│   │   ├── Background3D.tsx # Three.js particle background
│   │   ├── BrandLogo.tsx    # Logo with size guard
│   │   ├── Navbar.tsx       # Navigation with glass morphism
│   │   └── ...              # Additional components
│   ├── lib/
│   │   ├── ai/              # AI provider & tool definitions
│   │   │   ├── provider.ts  # OpenAI-compatible API client
│   │   │   └── tools.ts     # Function-calling tool schemas
│   │   ├── supabase/        # Supabase client utilities
│   │   ├── require-admin.ts # Admin role enforcement
│   │   └── animations.ts    # Framer Motion variants
│   └── hooks/               # React hooks
├── supabase/
│   └── migrations/          # Database migrations
└── taste-skill/             # Design system files
```

## Admin Panel

Access `/admin` after signing in. The first user is automatically promoted to admin. Subsequent users require admin approval.

### Available Sections

| Section            | Description                              |
| ------------------ | ---------------------------------------- |
| Dashboard          | Admin overview with stats                |
| AI Automation      | AI Assistant with quick actions          |
| Doc Pages          | CRUD for documentation pages             |
| Categories         | Manage documentation categories          |
| Users              | Approve/reject/delete users (admin only) |
| Contributors       | Manage project contributors              |
| Installation Guides| Setup guides per project                 |
| Release Notes      | Version release notes                    |
| Demos              | Homepage demo showcase entries           |
| External Links     | Dynamic sidebar external links           |
| Homepage           | Manage projects, features, stats, steps, and FAQ sections |

## AI Assistant

The AI Assistant is available at `/admin/ai-automation` for admins and can be embedded on any page via the `AssistantChat` component.

### Quick Actions (Direct API)

One-click buttons that call REST APIs directly — no AI needed:

**Admin Quick Actions:**
- **Dashboard** — Aggregates stats across all content types
- **List Pages / Categories / Users / Contributors / Demos / Guides / Releases / Links** — Fetch and display data instantly
- **Homepage sections** — Projects, Features, Stats, Steps, FAQs, Repos

**User Quick Actions:**
- **Dashboard** — Platform statistics
- **List Pages / Categories / Contributors / Demos / Guides / Releases / Links** — Read-only data
- **Search Pages / Get Page** — Parameterized lookups

### AI-Powered Actions

Operations that benefit from natural language understanding (requires AI_API_KEY):
- Create, update, delete pages and categories
- Manage homepage items
- Approve users
- Free-form questions about documentation

### Architecture

- **Direct Actions** → Fetch REST API → Format result as markdown in chat
- **AI Actions** → POST `/api/ai/chat` → AI resolves intent → Executes tool → Returns response
- **System prompts** differentiate admin (full CRUD) from user (read-only) capabilities

## Security

### Admin Role Enforcement
All write API routes (POST, PUT, DELETE) require the authenticated user's `profiles.role` to be `"admin"`. This is enforced via the reusable `requireAdmin()` helper at `src/lib/require-admin.ts`, which fetches the user profile and returns a 401/403 response if unauthorized.

### Column Injection Protection
All PUT handlers destructure only the expected fields from the request body instead of passing `body` directly to `.update(body)`. This prevents malicious payloads from overwriting columns like `id`, `user_id`, or other internal fields.

### Row-Level Security
All database tables have RLS policies:
- Public read access for published content
- Admin-only write access
- Service role bypass for server-side operations

### Input Validation
- Supabase parameterized queries prevent SQL injection
- Whitelisted column lists in all update operations
- TypeScript strict mode catches type mismatches at build time

## License

MIT — see the [NEURAL AURORA](https://github.com/Techhackontime999/NEURAL-AURORA) and [WACRM](https://github.com/Techhackontime999/WACRM) repositories for license details.

Built by [Techhackontime999](https://github.com/Techhackontime999).
