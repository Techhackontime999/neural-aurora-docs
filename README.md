# Neural Aurora Docs

Official documentation hub for [NEURAL AURORA](https://github.com/Techhackontime999/NEURAL-AURORA) (The Synaptic Portfolio) and [WACRM](https://github.com/Techhackontime999/WACRM) (WhatsApp CRM Template).

Built with Next.js 16, Supabase, and the taste-skill design system.

## Features

- **Dynamic Documentation** — All docs pages stored in Supabase, editable via admin panel
- **Project Showcase** — Landing page with hero, features, demos, quick start guides, FAQ
- **Demo Section** — Watch full demos of each project (manageable from admin)
- **Admin Panel** — Full CRUD for docs, categories, contributors, installation guides, release notes, and demos
- **Auth System** — Supabase SSR auth with cookie-based sessions, admin approval workflow
- **AI-Powered Search** — Client-side search across all documentation pages
- **taste-skill Design** — Premium dark theme with taste-skill design system (DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 4)

## Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16 (App Router)                         |
| Language       | TypeScript                                      |
| Styling        | Tailwind CSS v4 + taste-skill                   |
| Animation      | Framer Motion                                   |
| Database       | PostgreSQL via Supabase                         |
| Auth           | Supabase SSR (cookie-based)                     |
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

### Database Setup

Run the SQL in `supabase/migrations/` against your Supabase project in order:

1. `001_initial_schema.sql` — Tables, RLS, triggers, seed categories
2. `002_seed_pages.sql` — Seed documentation pages
3. `003_seed_misc.sql` — Seed contributors, installation guides, release notes
4. `004_demos.sql` — Demos table
5. `005_seed_demos.sql` — Seed demo entries

Or with the Supabase CLI:

```bash
supabase link --project-ref your-project-ref
Get-Content supabase/migrations/001_initial_schema.sql | supabase db query --linked
# ... repeat for each migration
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows note:** This project uses WASM bindings for SWC. Use `--webpack` flag (already configured in `dev` and `build` scripts).

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
│   │   ├── api/             # API routes
│   │   ├── login/           # Auth pages
│   │   ├── signup/
│   │   ├── approval-pending/
│   │   ├── [catSlug]/[pageSlug]/  # Dynamic doc pages (catch-all)
│   │   ├── docs/            # Docs index
│   │   ├── page.tsx         # Landing page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DocsShell.tsx
│   │   └── BrandLogo.tsx
│   ├── hooks/               # React hooks
│   │   ├── use-auth.tsx     # Auth provider
│   │   └── use-theme.tsx    # Theme provider
│   └── lib/
│       └── supabase/        # Supabase client utilities
├── supabase/
│   └── migrations/          # Database migrations
├── taste-skill/             # Design system files
└── .env.example
```

## Admin Panel

Access `/admin` after signing in. The first user is automatically promoted to admin. Subsequent users require admin approval.

### Available Sections

| Section            | Description                              |
| ------------------ | ---------------------------------------- |
| Dashboard          | Admin overview                           |
| Doc Pages          | CRUD for documentation pages             |
| Categories         | Manage documentation categories          |
| Users              | Approve/reject/delete users (admin only) |
| Contributors       | Manage project contributors              |
| Installation Guides| Setup guides per project                 |
| Release Notes      | Version release notes                    |
| Demos              | Homepage demo showcase entries           |

## Homepage Demo Section

The landing page includes a "See It In Action" section that pulls published demos from the database. Manage them at `/admin/demos`:

- **Title** — Demo card heading
- **Description** — Short summary
- **Video URL** — External link (YouTube, etc.) shown when no embed URL
- **Embed URL** — Iframe src for embedded video (takes priority over Video URL)
- **Project Type** — Filters to NEURAL AURORA, WACRM, or Both
- **Published toggle** — Show/hide on the homepage

## License

MIT — see the [NEURAL AURORA](https://github.com/Techhackontime999/NEURAL-AURORA) and [WACRM](https://github.com/Techhackontime999/WACRM) repositories for license details.

Built by [Techhackontime999](https://github.com/Techhackontime999).
