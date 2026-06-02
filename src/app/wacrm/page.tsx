import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "WACRM — Overview | Neural Aurora Docs",
  description:
    "WACRM: Self-hostable WhatsApp CRM template — shared inbox, contacts, sales pipelines, broadcasts, no-code automations, and visual flow builder.",
};

export default function WacrmOverview() {
  return (
    <div className="prose-doc max-w-none">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to home
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              WACRM
            </h1>
            <p className="text-sm text-violet-600 dark:text-violet-400 font-medium">
              WhatsApp CRM Template &mdash; v1.0.0
            </p>
          </div>
        </div>
      </div>

      <blockquote>
        Self-hostable CRM template for WhatsApp Business — shared inbox,
        contacts, sales pipelines, broadcasts, no-code automations, and a
        visual flow builder. Fork it, brand it, host it.
      </blockquote>

      <div className="flex flex-wrap gap-3 my-6">
        <a
          href="https://wacrm.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <ExternalLink className="w-4 h-4" />
          Live Site
        </a>
        <a
          href="https://github.com/Techhackontime999/wacrm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      <hr />

      <h2>What is WACRM?</h2>
      <p>
        <strong>WACRM</strong> is a self-hostable, open-source CRM template
        purpose-built for WhatsApp Business. Created by{" "}
        <strong>Amit Kumar (Techhackontime999)</strong>, it is not a SaaS
        product — it is a template that anyone can fork, deploy, brand, and
        customize. The upstream focuses on a narrow, opinionated scope; feature
        additions and customizations are expected to happen in forks.
      </p>

      <h3>Why Fork This?</h3>
      <ul>
        <li>
          <strong>Full ownership</strong> — your code, your Supabase project,
          your domain, your data. No SaaS lock-in, no seat pricing.
        </li>
        <li>
          <strong>Full customisation</strong> — add fields your team needs,
          remove modules you don&apos;t, redesign anything.
        </li>
        <li>
          <strong>Zero ops to start</strong> — Hostinger Managed Node.js deploys
          a fork in a few clicks. No Docker, no Kubernetes.
        </li>
        <li>
          <strong>Real security primitives</strong> — token encryption
          (AES-256-GCM), RLS on every table, HMAC-verified webhooks.
        </li>
      </ul>

      <h2>What You Get Out of the Box</h2>

      <h3>Shared Inbox</h3>
      <p>
        Multiple agents working one WhatsApp number. Per-conversation
        assignment, status tracking, reactions (emoji), reply-with-quote,
        and message templates.
      </p>

      <h3>Contacts + Tags + Custom Fields + Notes</h3>
      <p>
        CSV import with deduplication, full-text search, custom fields, and
        notes on each contact.
      </p>

      <h3>Sales Pipelines (Kanban)</h3>
      <p>
        Drag-and-drop deal management across multi-stage pipelines. Deals
        linked to conversations with win-rate analytics.
      </p>

      <h3>Broadcasts</h3>
      <p>
        Campaigns using Meta-approved WhatsApp templates. Delivery and read
        tracking, per-recipient variable substitution.
      </p>

      <h3>No-Code Automations</h3>
      <p>
        7 trigger types (inbound message, keyword match, new contact,
        conversation assigned, tag added, time-based) and 11 action types
        (send message/template, tags, assign, create deal, wait, condition,
        webhook, close conversation).
      </p>

      <h3>Visual Flow Builder (Beta)</h3>
      <p>
        Drag-and-drop canvas for complex multi-step flows with branching,
        scheduling, and execution logs. Includes 3 starter templates.
      </p>

      <h3>AI Automation (Beta)</h3>
      <p>
        Telegram-like chat interface that controls the entire CRM via natural
        language. Powered by OpenAI-compatible LLMs with automatic fallback
        to regex parsing.
      </p>

      <h3>Real-Time Dashboard</h3>
      <p>
        Response times, daily volume, pipeline value, cross-module activity
        feed, per-agent stats.
      </p>

      <h3>Admin Panel</h3>
      <p>
        User management, approval workflow for new sign-ups, role-based
        access (admin/agent).
      </p>

      <hr />

      <h2>Tech Stack</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Framework</td>
            <td>Next.js 16 (App Router)</td>
          </tr>
          <tr>
            <td>UI Library</td>
            <td>React 19</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>TypeScript</td>
          </tr>
          <tr>
            <td>Styling</td>
            <td>Tailwind CSS v4</td>
          </tr>
          <tr>
            <td>Database</td>
            <td>Supabase (Postgres + Auth + RLS + Realtime)</td>
          </tr>
          <tr>
            <td>UI Components</td>
            <td>shadcn/ui</td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td>Meta Cloud API</td>
          </tr>
          <tr>
            <td>Drag &amp; Drop</td>
            <td>@dnd-kit</td>
          </tr>
          <tr>
            <td>AI</td>
            <td>OpenAI-compatible API</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>Vitest</td>
          </tr>
          <tr>
            <td>Icons</td>
            <td>Lucide React</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-sm text-slate-400">Next:</span>
        <Link
          href="/wacrm/getting-started"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Getting Started &rarr;
        </Link>
      </div>
    </div>
  );
}
