import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Supabase Setup — Neural Aurora CRM | Neural Aurora Docs",
  description:
    "Complete Supabase setup guide for WACRM — create project, apply migrations, and configure authentication.",
};

export default function WacrmSupabaseSetup() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to overview
      </Link>

      <h1>Supabase Setup</h1>
      <p>
        Neural Aurora CRM uses Supabase for authentication, database, storage, and
        real-time features. Follow this guide to create and configure your
        Supabase project.
      </p>

      <h2>1. Create a Supabase Project</h2>
      <ol>
        <li>
          Go to{" "}
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
            supabase.com
          </a>{" "}
          and sign in
        </li>
        <li>Click &quot;New project&quot;</li>
        <li>Choose a name (e.g., &quot;wacrm-production&quot;)</li>
        <li>Set a strong database password</li>
        <li>Choose a region close to your users</li>
        <li>Wait for the database to provision (~2 minutes)</li>
      </ol>

      <h2>2. Apply Migrations</h2>
      <p>
        The project ships with 14 migration files in <code>supabase/migrations/</code>.
        Apply them using the Supabase CLI:
      </p>
      <pre>{`# Install Supabase CLI if you haven't
# macOS/Linux: brew install supabase/tap/supabase
# Windows: scoop install supabase

# Link your project
supabase login
supabase link --project-ref <your-project-ref>

# Push all migrations
supabase db push`}</pre>

      <blockquote>
        Your project reference is the substring after <code>https://</code> in
        your Supabase project URL (e.g., <code>abcdefghijklmnopqrst</code>).
      </blockquote>

      <h3>Alternative: SQL Editor</h3>
      <p>
        If you don&apos;t have the Supabase CLI, you can run the migration files
        manually in the Supabase SQL Editor. Open each file from
        <code>supabase/migrations/</code>, copy the contents, and execute them
        in order (001 through 014).
      </p>

      <h2>3. Get Your API Keys</h2>
      <p>
        In your Supabase dashboard, go to <strong>Project Settings → API</strong>:
      </p>
      <ul>
        <li>
          <strong>Project URL</strong> &mdash; Used as <code>NEXT_PUBLIC_SUPABASE_URL</code>
        </li>
        <li>
          <strong>anon public</strong> &mdash; Used as <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        </li>
        <li>
          <strong>service_role secret</strong> &mdash; Used as <code>SUPABASE_SERVICE_ROLE_KEY</code>
        </li>
      </ul>

      <blockquote>
        <strong>Security note:</strong> The <code>service_role</code> key
        bypasses RLS. Never expose it in client-side code. It is only used in
        server-side API routes and cron jobs.
      </blockquote>

      <h2>4. Configure Authentication</h2>
      <p>
        In your Supabase dashboard, go to <strong>Authentication → Settings</strong>:
      </p>
      <ul>
        <li>
          <strong>Site URL</strong> &mdash; Set to your app URL (e.g.,
          <code>http://localhost:3000</code> for development)
        </li>
        <li>
          <strong>Redirect URLs</strong> &mdash; Add your app URL
        </li>
        <li>
          Enable Email + Password auth (or add other providers as needed)
        </li>
        <li>
          Disable &quot;Confirm email&quot; if you want instant sign-up
          (recommended for development)
        </li>
      </ul>

      <h2>Migration Reference</h2>
      <table>
        <thead>
          <tr>
            <th>Migration</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>001_initial_schema</code></td>
            <td>Core tables — profiles, contacts, tags, conversations, messages, pipelines, deals, broadcasts</td>
          </tr>
          <tr>
            <td><code>002_pipelines_enhancements</code></td>
            <td>Pipeline stage colors, deal assignments</td>
          </tr>
          <tr>
            <td><code>003_broadcast_recipient_wamid</code></td>
            <td>WhatsApp message IDs on recipients</td>
          </tr>
          <tr>
            <td><code>004_contact_delete_set_null</code></td>
            <td>ON DELETE SET NULL for deal/broadcast contacts</td>
          </tr>
          <tr>
            <td><code>005_broadcast_counts_incremental</code></td>
            <td>Incremental broadcast counters</td>
          </tr>
          <tr>
            <td><code>006_automations</code></td>
            <td>Automation engine tables</td>
          </tr>
          <tr>
            <td><code>007_automations_increment_counter</code></td>
            <td>Auto-increment execution counter</td>
          </tr>
          <tr>
            <td><code>008_profile_avatars_storage</code></td>
            <td>Storage bucket for avatars</td>
          </tr>
          <tr>
            <td><code>009_message_actions</code></td>
            <td>Interactive message reply support</td>
          </tr>
          <tr>
            <td><code>010_flows</code></td>
            <td>Visual flow engine tables</td>
          </tr>
          <tr>
            <td><code>011_profile_beta_features</code></td>
            <td>Beta features flag on profiles</td>
          </tr>
          <tr>
            <td><code>012_flows_increment_counter</code></td>
            <td>Flow execution counter</td>
          </tr>
          <tr>
            <td><code>013_admin_approval</code></td>
            <td>Admin approval workflow for sign-ups</td>
          </tr>
          <tr>
            <td><code>014_fix_admin_rls_recursion</code></td>
            <td>Fix infinite recursion in admin RLS policies</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/getting-started"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Getting Started
        </Link>
        <Link
          href="/wacrm/whatsapp-setup"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          WhatsApp Setup &rarr;
        </Link>
      </div>
    </div>
  );
}
