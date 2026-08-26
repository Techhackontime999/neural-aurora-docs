# Contributing to Neural Aurora Docs

Thanks for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Style Guidelines](#style-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/neural-aurora-docs.git
   cd neural-aurora-docs
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Techhackontime999/neural-aurora-docs.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 20+
- npm
- A [Supabase](https://supabase.com) project (free tier works)
- (Optional) AI API key for AI Assistant features

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Fill in your Supabase credentials in `.env`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (admin operations) |

Optional AI configuration:

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_API_BASE` | OpenAI-compatible API base URL | `https://openrouter.ai/api/v1` |
| `AI_API_KEY` | API key for the AI provider | - |
| `AI_MODEL` | Model identifier | `gpt-4o-mini` |

### Database Setup

Run the SQL migrations in `supabase/migrations/` against your Supabase project in order (001 through 011).

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check [existing issues](https://github.com/Techhackontime999/neural-aurora-docs/issues) to avoid duplicates.

When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior vs actual behavior
- Your environment (OS, browser, Node.js version)
- Relevant screenshots or console output

### Suggesting Features

Feature requests are welcome! Please use the feature request issue template and include:

- The problem your feature would solve
- Your proposed solution
- Alternatives you've considered
- Additional context (mockups, examples, references)

### Working on Issues

- Look for issues labeled [`good first issue`](https://github.com/Techhackontime999/neural-aurora-docs/labels/good%20first%20issue) if you're new to the project
- Issues labeled [`help wanted`](https://github.com/Techhackontime999/neural-aurora-docs/labels/help%20wanted) are open for community contribution
- Comment on an issue before starting work to let others know you're on it
- Keep your fork in sync with upstream:

  ```bash
  git fetch upstream
  git rebase upstream/main
  ```

## Style Guidelines

### Code Style

- **TypeScript** is used throughout the project
- Follow the existing code conventions in the file you're editing
- Use Tailwind CSS v4 for styling
- Run the linter before committing:
  ```bash
  npm run lint
  ```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature or fix) |
| `test` | Adding or updating tests |
| `chore` | Build process or auxiliary tool changes |
| `ci` | CI/CD configuration changes |

**Examples:**
```
feat(admin): add bulk delete for doc pages
fix(auth): prevent race condition on signup trigger
docs: update installation guide for Docker setup
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `AssistantChat.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `use-auth.tsx`)
- Utilities: `camelCase.ts` (e.g., `require-admin.ts`)
- Pages: `page.tsx` (Next.js convention)
- API routes: `route.ts` (Next.js convention)

## Pull Request Process

1. **Ensure your code follows the style guidelines** above
2. **Update documentation** if your change affects user-facing behavior
3. **Test your changes** thoroughly:
   - Run `npm run build` to ensure no build errors
   - Run `npm run lint` to check for linting issues
   - Test the feature manually in the browser
4. **Write a clear PR description** using the PR template:
   - Describe what changed and why
   - Link related issues using `Closes #123`
   - Add screenshots for UI changes
5. **Request review** from a maintainer
6. **Address review feedback** promptly
7. Once approved, your PR will be merged

### PR Title Convention

Use the same convention as commit messages:

```
feat(admin): add user role management
fix(docs): correct sidebar navigation on mobile
```

## Questions?

- Open a [Discussion](https://github.com/Techhackontime999/neural-aurora-docs/discussions) for questions
- Check the [documentation](https://neural-aurora-docs.vercel.app) for guides

## License

This project is licensed under the [MIT License](../LICENSE). By contributing, you agree that your contributions will be licensed under the same license.
