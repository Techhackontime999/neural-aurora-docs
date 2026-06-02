import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started — WACRM | Neural Aurora Docs",
  description:
    "Quick start guide for WACRM — fork the repository, install dependencies, configure environment, and run the development server.",
};

export default function WacrmGettingStarted() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to WACRM overview
      </Link>

      <h1>Getting Started</h1>
      <p>
        Get WACRM running locally in about 15 minutes. This guide covers
        forking the repository, installing dependencies, and starting the
        development server.
      </p>

      <h2>Quick Start</h2>
      <pre>{`# Fork on GitHub first:
# https://github.com/Techhackontime999/wacrm → Fork

git clone https://github.com/<your-username>/wacrm.git
cd wacrm

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in your Supabase + Meta credentials

# Start development server
npm run dev`}</pre>

      <p>
        Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>.
        You&apos;ll be redirected to <code>/login</code> (or <code>/dashboard</code> if
        already signed in).
      </p>

      <h2>Available Scripts</h2>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>npm run dev</code></td>
            <td>Start development server</td>
          </tr>
          <tr>
            <td><code>npm run build</code></td>
            <td>Production build</td>
          </tr>
          <tr>
            <td><code>npm run start</code></td>
            <td>Start production server</td>
          </tr>
          <tr>
            <td><code>npm run lint</code></td>
            <td>ESLint check</td>
          </tr>
          <tr>
            <td><code>npm run typecheck</code></td>
            <td>TypeScript check</td>
          </tr>
          <tr>
            <td><code>npm run format</code></td>
            <td>Prettier format</td>
          </tr>
          <tr>
            <td><code>npm test</code></td>
            <td>Run Vitest tests</td>
          </tr>
        </tbody>
      </table>

      <h2>Project Structure</h2>
      <pre>{`src/
├── app/
│   ├── (auth)/              ← Login, signup, forgot-password
│   ├── (dashboard)/         ← Main app — inbox, contacts, pipelines, etc.
│   ├── api/                 ← 21 route handlers
│   └── approval-pending/    ← Post-signup approval gate
├── components/              ← UI components by module
├── hooks/                   ← Custom React hooks
├── lib/                     ← Business logic, API clients
└── types/                   ← TypeScript interfaces`}</pre>

      <h2>Prerequisites</h2>
      <ul>
        <li><strong>Node.js</strong> &gt;= 20.0.0</li>
        <li><strong>npm</strong> &gt;= 10</li>
        <li>A <strong>Supabase</strong> account (free tier) &mdash; <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
        <li>A <strong>Meta for Developers</strong> account &mdash; <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">developers.facebook.com</a></li>
      </ul>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Overview
        </Link>
        <Link
          href="/wacrm/supabase-setup"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Supabase Setup &rarr;
        </Link>
      </div>
    </div>
  );
}
