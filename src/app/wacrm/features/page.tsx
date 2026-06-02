import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Neural Aurora CRM | Neural Aurora Docs",
  description:
    "Detailed feature documentation for WACRM — shared inbox, contacts, pipelines, broadcasts, automations, and flows.",
};

export default function WacrmFeatures() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to overview
      </Link>

      <h1>Features</h1>
      <p>
        Neural Aurora CRM ships with a comprehensive set of CRM features purpose-built for
        WhatsApp Business. Below is a detailed breakdown of each module.
      </p>

      <h2>Shared Inbox</h2>
      <p>
        The shared inbox allows multiple agents to work a single WhatsApp
        number simultaneously. Key capabilities include:
      </p>
      <ul>
        <li>
          <strong>Real-time threads</strong> — conversations update instantly
          via Supabase Realtime subscriptions
        </li>
        <li>
          <strong>Per-conversation assignment</strong> — assign conversations
          to specific agents
        </li>
        <li>
          <strong>Status tracking</strong> — open, closed, or pending
        </li>
        <li>
          <strong>Reactions</strong> — emoji reactions on messages
        </li>
        <li>
          <strong>Quote-reply</strong> — reply to specific messages in a thread
        </li>
        <li>
          <strong>Message templates</strong> — pre-approved WhatsApp templates
          for quick responses
        </li>
        <li>
          <strong>Unread counts</strong> — cross-tab real-time unread indicators
        </li>
      </ul>

      <h2>Contacts</h2>
      <p>
        Full contact management with the following features:
      </p>
      <ul>
        <li>
          <strong>Manual add</strong> — create contacts individually
        </li>
        <li>
          <strong>CSV import</strong> — bulk import with deduplication
        </li>
        <li>
          <strong>Tags</strong> — colour-coded tags for segmentation
        </li>
        <li>
          <strong>Custom fields</strong> — add any data fields you need
        </li>
        <li>
          <strong>Notes</strong> — internal notes per contact
        </li>
        <li>
          <strong>Full-text search</strong> — search across all contact fields
        </li>
        <li>
          <strong>Contact detail view</strong> — comprehensive profile with
          conversation history, deals, and notes
        </li>
      </ul>

      <h2>Sales Pipelines (Kanban)</h2>
      <p>
        Visual deal management with drag-and-drop:
      </p>
      <ul>
        <li>
          <strong>Multi-pipeline support</strong> — run multiple sales processes
        </li>
        <li>
          <strong>Custom stages</strong> — configure stage names, order, and colours
        </li>
        <li>
          <strong>Drag-and-drop</strong> — move deals between stages with
          <code>@dnd-kit</code>
        </li>
        <li>
          <strong>Linked conversations</strong> — see WhatsApp context for each deal
        </li>
        <li>
          <strong>Win-rate analytics</strong> — track conversion rates per pipeline
        </li>
      </ul>

      <h2>Broadcasts</h2>
      <p>
        Send bulk WhatsApp messages using approved templates:
      </p>
      <ul>
        <li>
          <strong>4-step wizard</strong> — choose template, select audience,
          personalise, schedule
        </li>
        <li>
          <strong>Meta-approved templates</strong> — use templates that have
          passed Meta&apos;s approval process
        </li>
        <li>
          <strong>Per-recipient variables</strong> — substitute
          <code>{"{{1}}"}</code>, <code>{"{{2}}"}</code> etc. with contact data
        </li>
        <li>
          <strong>Delivery tracking</strong> — monitor sent, delivered, and read
          status per recipient
        </li>
        <li>
          <strong>Incremental counters</strong> — real-time broadcast statistics
        </li>
      </ul>

      <h2>No-Code Automations</h2>
      <p>
        Event-driven automation engine with a visual builder:
      </p>
      <h3>7 Trigger Types</h3>
      <ul>
        <li>Inbound message received</li>
        <li>Keyword match in message</li>
        <li>New contact created</li>
        <li>Conversation assigned to agent</li>
        <li>Tag added to contact</li>
        <li>Time-based (cron schedule)</li>
        <li>Manual trigger</li>
      </ul>
      <h3>11 Action Types</h3>
      <ul>
        <li>Send text message</li>
        <li>Send message template</li>
        <li>Add/remove tags</li>
        <li>Assign conversation to agent</li>
        <li>Create deal in pipeline</li>
        <li>Move deal to stage</li>
        <li>Close conversation</li>
        <li>Wait (timer)</li>
        <li>Conditional branch</li>
        <li>Webhook call</li>
        <li>Send email notification</li>
      </ul>

      <h2>Visual Flow Builder (Beta)</h2>
      <p>
        Drag-and-drop canvas for complex multi-step conversations:
      </p>
      <ul>
        <li>
          <strong>Canvas builder</strong> — node-based editor built on
          <code>@dnd-kit</code>
        </li>
        <li>
          <strong>Branching logic</strong> — button-driven conversation paths
        </li>
        <li>
          <strong>Scheduling</strong> — timed message delivery within flows
        </li>
        <li>
          <strong>Execution logs</strong> — per-run history with success/failure
          tracking
        </li>
        <li>
          <strong>3 starter templates</strong> — Welcome menu, FAQ bot, Lead capture
        </li>
        <li>
          <strong>Fallback branches</strong> — handle unexpected user input
        </li>
      </ul>

      <h2>AI Automation (Beta)</h2>
      <p>
        Natural language CRM control via a Telegram-like chat interface:
      </p>
      <ul>
        <li>
          <strong>37 tool definitions</strong> — covers every CRM module
        </li>
        <li>
          <strong>OpenAI-compatible</strong> — works with OpenAI, OpenRouter,
          Groq, Together, etc.
        </li>
        <li>
          <strong>Regex fallback</strong> — works without any API key via
          smart pattern matching
        </li>
        <li>
          <strong>Function calling</strong> — LLM-to-CRM action mapping
        </li>
      </ul>

      <h2>Real-Time Dashboard</h2>
      <ul>
        <li>Response time metrics and charts</li>
        <li>Daily conversation volume</li>
        <li>Pipeline value overview</li>
        <li>Cross-module activity feed</li>
        <li>Per-agent performance stats</li>
        <li>Conversations chart and pipeline donut chart</li>
      </ul>

      <h2>Admin Panel</h2>
      <ul>
        <li>User management with role-based access</li>
        <li>Approval workflow for new sign-ups</li>
        <li>Admin/agent role assignment</li>
      </ul>

      <h2>Settings</h2>
      <ul>
        <li>Profile management (email, password, avatar)</li>
        <li>WhatsApp connection configuration</li>
        <li>Tag library management</li>
        <li>Visual theme system (5 colour themes + dark mode)</li>
      </ul>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/environment-variables"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Environment Variables
        </Link>
        <Link
          href="/wacrm/architecture"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Architecture &rarr;
        </Link>
      </div>
    </div>
  );
}
