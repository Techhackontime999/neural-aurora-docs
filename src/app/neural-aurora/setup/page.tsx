import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Setup — NEURAL AURORA | Neural Aurora Docs",
  description:
    "Complete setup guide for NEURAL AURORA — environment variables, Supabase configuration, and database migrations.",
};

export default function NeuralAuroraSetup() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/neural-aurora"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to NEURAL AURORA overview
      </Link>

      <h1>Setup Guide</h1>
      <p>
        Configure NEURAL AURORA with environment variables and Supabase for full
        functionality.
      </p>

      <h2>Environment Variables</h2>
      <p>
        Copy <code>.env.example</code> to <code>.env</code> and fill in the
        values:
      </p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>VITE_SUPABASE_URL</code></td>
            <td>Yes</td>
            <td>Supabase project URL</td>
          </tr>
          <tr>
            <td><code>VITE_SUPABASE_ANON_KEY</code></td>
            <td>Yes</td>
            <td>Supabase anon key</td>
          </tr>
          <tr>
            <td><code>VITE_AI_API_BASE</code></td>
            <td>No</td>
            <td>OpenAI-compatible API base URL (e.g. OpenRouter)</td>
          </tr>
          <tr>
            <td><code>VITE_AI_API_KEY</code></td>
            <td>No</td>
            <td>API key for AI puzzle generation</td>
          </tr>
          <tr>
            <td><code>VITE_AI_MODEL</code></td>
            <td>No</td>
            <td>Model name (default: openai/gpt-4o-mini)</td>
          </tr>
          <tr>
            <td><code>VITE_JAMENDO_CLIENT_ID</code></td>
            <td>No</td>
            <td>Jamendo API key for mood music</td>
          </tr>
          <tr>
            <td><code>VITE_YOUTUBE_API_KEY</code></td>
            <td>No</td>
            <td>YouTube Data API v3 key</td>
          </tr>
          <tr>
            <td><code>VITE_RAZORPAY_KEY_ID</code></td>
            <td>For payments</td>
            <td>Razorpay client-side key</td>
          </tr>
          <tr>
            <td><code>RAZORPAY_KEY_ID</code></td>
            <td>For payments</td>
            <td>Razorpay server-side key</td>
          </tr>
          <tr>
            <td><code>RAZORPAY_KEY_SECRET</code></td>
            <td>For payments</td>
            <td>Razorpay server-side secret</td>
          </tr>
        </tbody>
      </table>

      <h2>Supabase Setup</h2>
      <ol>
        <li>
          Create a project at{" "}
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
            supabase.com
          </a>
        </li>
        <li>
          Apply migrations using the Supabase CLI:
          <pre>{`supabase login
supabase link --project-ref your-project-ref
supabase db push`}</pre>
        </li>
        <li>
          Alternatively, run the <code>supabase-schema.sql</code> file manually
          via the SQL Editor in the Supabase dashboard.
        </li>
      </ol>

      <h3>Admin Account Setup</h3>
      <p>
        After setting up Supabase, register an account through the application.
        By default, the first user to register through the UI is not an admin.
        To make yourself admin, update your profile in the Supabase dashboard:
      </p>
      <pre>{`-- Run in Supabase SQL Editor
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';`}</pre>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/neural-aurora/features"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Features
        </Link>
        <Link
          href="/neural-aurora/architecture"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Architecture &rarr;
        </Link>
      </div>
    </div>
  );
}
