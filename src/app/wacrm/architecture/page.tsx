import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Architecture — Neural Aurora CRM | Neural Aurora Docs",
  description:
    "Technical architecture of WACRM — multi-tenancy, WhatsApp integration, automation engine, and data flow.",
};

export default function WacrmArchitecture() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to overview
      </Link>

      <h1>Architecture</h1>
      <p>
        Neural Aurora CRM follows a modern Next.js App Router architecture with Supabase
        as the backend. Below are the key architectural decisions and data
        flow patterns.
      </p>

      <h2>Multi-Tenancy</h2>
      <p>
        Every row in the database is scoped by <code>user_id</code> via
        Supabase Row-Level Security (RLS). This ensures complete data
        isolation between tenants:
      </p>
      <pre>{`CREATE POLICY "Users can view their own contacts" ON contacts
  FOR SELECT
  USING (auth.uid() = user_id);`}</pre>
      <p>
        The automation engine and webhook handler use a service-role client
        (<code>supabaseAdmin()</code>) to operate across all tenants
        when needed (e.g., broadcasting to multiple users&apos; contacts).
      </p>

      <h2>WhatsApp Integration</h2>
      <p>
        The WhatsApp integration follows a webhook-based architecture:
      </p>
      <pre>{`Meta Cloud API → Webhook (/api/whatsapp/webhook)
  → HMAC-SHA256 verification (META_APP_SECRET)
  → Message processing
    → Store in database (service-role client)
    → Trigger automation engine
    → Notify UI via Supabase Realtime`}</pre>
      <ul>
        <li>
          <strong>Inbound</strong> — messages arrive via Meta Cloud API webhook,
          verified by HMAC-SHA256
        </li>
        <li>
          <strong>Outbound</strong> — messages sent through Meta Cloud API via
          the <code>lib/whatsapp/meta-api.ts</code> client
        </li>
        <li>
          <strong>Tokens</strong> — WhatsApp access tokens are encrypted at rest
          using AES-256-GCM
        </li>
        <li>
          <strong>Media</strong> — proxied through the app to avoid exposing
          Meta URLs to the browser
        </li>
      </ul>

      <h2>Route Structure</h2>
      <pre>{`src/app/
├── (auth)/              ← Auth layout group
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── (dashboard)/         ← Dashboard layout group
│   ├── dashboard/       ← Overview / stats
│   ├── inbox/           ← Shared inbox
│   ├── contacts/        ← Contact management
│   ├── pipelines/       ← Kanban deals
│   ├── broadcasts/      ← Campaigns
│   ├── automations/     ← No-code automations
│   ├── flows/           ← Visual flow builder
│   ├── ai-automation/   ← AI chat interface
│   ├── admin/users/     ← User management
│   └── settings/        ← Account & WhatsApp config
├── api/                 ← Route handlers (no layout)
└── approval-pending/    ← Post-signup approval`}</pre>

      <h2>Automation Engine</h2>
      <p>
        The automation engine is a rule-based scheduler that handles:
      </p>
      <ul>
        <li>
          <strong>Webhook triggers</strong> — fires on message events
        </li>
        <li>
          <strong>Cron-driven timers</strong> — resumes Wait steps on schedule
        </li>
        <li>
          <strong>Manual triggers</strong> — agent-initiated automation runs
        </li>
      </ul>
      <p>
        Features conditional branching, nested execution, and per-step error
        logging. The engine lives in <code>lib/automations/engine.ts</code>.
      </p>

      <h2>Flow Engine</h2>
      <p>
        The visual flow engine is a separate but similar execution system:
      </p>
      <ul>
        <li>
          Built on a drag-and-drop canvas using <code>@dnd-kit</code>
        </li>
        <li>
          Backed by its own execution engine with scheduling and fallback
          branches
        </li>
        <li>
          Supports execution run history with per-step logs
        </li>
      </ul>

      <h2>AI Automation</h2>
      <p>
        The AI Automation module uses an OpenAI-compatible function-calling
        loop to turn natural language into structured CRM operations:
      </p>
      <pre>{`User message → API route
  → LLM (with 37 tool definitions)
    → Function call (e.g., create_contact)
      → Database operation
    → Response to user`}</pre>
      <p>
        Falls back to regex-based parsing when no API key is configured,
        ensuring the chatbox works without any AI provider.
      </p>

      <h2>Real-Time Updates</h2>
      <p>
        Supabase Realtime subscriptions power:
      </p>
      <ul>
        <li>Inbox unread counts across open tabs</li>
        <li>Conversation list updates</li>
        <li>Dashboard metric refreshes</li>
      </ul>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/features"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Features
        </Link>
        <Link
          href="/wacrm/deployment"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Deployment &rarr;
        </Link>
      </div>
    </div>
  );
}
