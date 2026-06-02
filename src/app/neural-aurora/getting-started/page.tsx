import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Getting Started — NEURAL AURORA | Neural Aurora Docs",
  description:
    "Quick start guide for NEURAL AURORA — install dependencies, configure environment variables, and run the development server.",
};

export default function NeuralAuroraGettingStarted() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/neural-aurora"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to NEURAL AURORA overview
      </Link>

      <h1>Getting Started</h1>
      <p>
        Get NEURAL AURORA running locally in about 15 minutes. This guide covers
        cloning the repository, installing dependencies, configuring environment
        variables, and starting the development server.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li><strong>Node.js</strong> &gt;= 20.0.0</li>
        <li><strong>npm</strong> &gt;= 10</li>
        <li>A <strong>Supabase</strong> account (free tier) &mdash; <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
      </ul>

      <h2>Quick Start</h2>
      <pre>{`# Clone the repository
git clone https://github.com/Techhackontime999/NEURAL-AURORA.git
cd NEURAL-AURORA

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your Supabase credentials

# Start development server
npm run dev`}</pre>

      <p>
        Open <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">http://localhost:5173</a> in your browser.
      </p>

      <h2>Available Scripts</h2>
      <table>
        <thead>
          <tr>
            <th>Script</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>npm run dev</code></td>
            <td>Start Vite dev server</td>
          </tr>
          <tr>
            <td><code>npm run build</code></td>
            <td>Production build</td>
          </tr>
          <tr>
            <td><code>npm run preview</code></td>
            <td>Preview production build</td>
          </tr>
        </tbody>
      </table>

      <h2>Project Structure</h2>
      <pre>{`NEURAL-AURORA/
├── src/
│   ├── components/
│   │   ├── admin/         ← CRUD dashboard (20+ sections)
│   │   └── ui/            ← Reusable UI components
│   ├── context/           ← Auth, AutoTraverse, MoodContext
│   ├── lib/               ← Supabase client, AI gateway, hooks, music
│   ├── data/              ← Static fallback data
│   └── main.jsx           ← Entry point
├── public/                ← Static assets
├── supabase/              ← Migrations & config
└── api/                   ← Serverless functions (Razorpay)`}</pre>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/neural-aurora"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Overview
        </Link>
        <Link
          href="/neural-aurora/features"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Features &rarr;
        </Link>
      </div>
    </div>
  );
}
