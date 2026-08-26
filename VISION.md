# Vision: Universal Automated Documentation Platform

## The Problem

Every project needs documentation, but creating and maintaining it is:

- **Time-consuming** — Writing docs manually takes hours away from building
- **Inconsistent** — Different teams use different formats and tools
- **Outdated** — Docs drift from code as projects evolve
- **Siloed** — Each project reinvents its own docs system

## Our Solution

A one-click automated documentation platform that any organization or project can use. Connect your repo, and get beautiful, searchable, maintainable documentation automatically.

### Core Principles

1. **One-Click Setup** — From zero to published docs in under 5 minutes
2. **Multi-Source Ingestion** — Git repos, AI generation, templates, manual editing
3. **Multi-Provider AI** — Use OpenAI, Anthropic, Gemini, or local models
4. **Self-Hostable** — Docker one-command deploy for private/enterprise use
5. **Multi-Tenant** — One deployment serves unlimited organizations and projects
6. **Open Source** — MIT licensed, built in the open with the community

### Who It's For

- **Open source maintainers** — Auto-generate docs from your repo README and code
- **Startups** — Professional docs without a technical writer
- **Enterprise teams** — Self-hosted, private documentation with team management
- **Individual developers** — Personal project docs and knowledge bases

### What Makes It Different

- AI-powered generation from actual code (not just README)
- Beautiful design out of the box (taste-skill design system)
- Admin panel with rich text editing
- Built-in AI assistant for content management
- Multi-tenant from day one (not bolted on later)

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│                    One-Click Setup                       │
├───────────────┬───────────────────┬─────────────────────┤
│  Git Import   │   AI Generate     │    Template          │
│  Connect repo │   Paste URL or    │    Browse gallery,   │
│  Auto-sync    │   upload code     │    pick a template   │
│  on push      │   Multi-provider  │    Pre-built structs │
└───────┬───────┴─────────┬─────────┴──────────┬──────────┘
        │                 │                    │
        └─────────────────┼────────────────────┘
                          │
                    ┌─────▼─────┐
                    │  Preview  │
                    │  & Edit   │
                    │  (Tiptap) │
                    └─────┬─────┘
                          │
                    ┌─────▼─────┐
                    │  Publish  │
                    │  & Share  │
                    └───────────┘
```

## Technology

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 | App Router, Server Components, great DX |
| Database | Supabase (PostgreSQL) | RLS for multi-tenancy, real-time, auth built-in |
| Styling | Tailwind CSS v4 + taste-skill | Rapid development, beautiful defaults |
| AI | Multi-provider (OpenAI, Anthropic, Gemini, Ollama) | Flexibility, no vendor lock-in |
| Editor | Tiptap | Powerful, extensible, collaborative-ready |
| 3D | Three.js / React Three Fiber | Visual appeal, progressive enhancement |
| Deployment | Docker + Vercel | Self-hosted and cloud options |

## Roadmap

See the [README](README.md#roadmap) for the detailed phased roadmap.

## Get Involved

- Browse [open issues](https://github.com/Techhackontime999/neural-aurora-docs/issues)
- Start with [good first issues](https://github.com/Techhackontime999/neural-aurora-docs/labels/good%20first%20issue)
- Read the [contributing guide](.github/CONTRIBUTING.md)
- Join [discussions](https://github.com/Techhackontime999/neural-aurora-docs/discussions)

## License

MIT — see [LICENSE](LICENSE) for details.
