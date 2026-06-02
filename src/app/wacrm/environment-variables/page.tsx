import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Environment Variables — Neural Aurora CRM | Neural Aurora Docs",
  description:
    "Complete reference for every environment variable used by WACRM — Supabase, Meta, encryption, and AI configuration.",
};

export default function WacrmEnvVars() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to overview
      </Link>

      <h1>Environment Variables</h1>
      <p>
        Neural Aurora CRM uses environment variables for all configuration. Copy
        <code>.env.local.example</code> to <code>.env.local</code> and fill
        in the values.
      </p>

      <h2>Required Variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>NEXT_PUBLIC_SUPABASE_URL</code></td>
            <td>Supabase project URL (starts with https://)</td>
          </tr>
          <tr>
            <td><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></td>
            <td>Supabase anonymous (client) key</td>
          </tr>
          <tr>
            <td><code>SUPABASE_SERVICE_ROLE_KEY</code></td>
            <td>Service-role key — bypasses RLS for backend ops. Never expose client-side.</td>
          </tr>
          <tr>
            <td><code>ENCRYPTION_KEY</code></td>
            <td>64-char hex string for AES-256-GCM token encryption. Generate with: <code>openssl rand -hex 32</code></td>
          </tr>
          <tr>
            <td><code>META_APP_SECRET</code></td>
            <td>Meta app secret for webhook HMAC-SHA256 verification</td>
          </tr>
        </tbody>
      </table>

      <h2>WhatsApp Variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>WHATSAPP_PHONE_NUMBER_ID</code></td>
            <td>Phone number ID from Meta Business account</td>
          </tr>
          <tr>
            <td><code>WHATSAPP_BUSINESS_ACCOUNT_ID</code></td>
            <td>WhatsApp Business Account ID (WABA ID)</td>
          </tr>
          <tr>
            <td><code>WHATSAPP_ACCESS_TOKEN</code></td>
            <td>Access token for Meta Cloud API calls. Encrypted at rest.</td>
          </tr>
          <tr>
            <td><code>WHATSAPP_WEBHOOK_VERIFY_TOKEN</code></td>
            <td>Custom token for webhook verification handshake</td>
          </tr>
          <tr>
            <td><code>WHATSAPP_API_VERSION</code></td>
            <td>Meta API version (e.g., v22.0)</td>
          </tr>
        </tbody>
      </table>

      <h2>Optional Variables</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>NEXT_PUBLIC_SITE_URL</code></td>
            <td>Canonical deployment URL (recommended)</td>
          </tr>
          <tr>
            <td><code>AUTOMATION_CRON_SECRET</code></td>
            <td>Secret for automation cron endpoint</td>
          </tr>
          <tr>
            <td><code>AI_API_BASE</code></td>
            <td>OpenAI-compatible API base URL</td>
          </tr>
          <tr>
            <td><code>AI_API_KEY</code></td>
            <td>API key for AI provider</td>
          </tr>
          <tr>
            <td><code>AI_MODEL</code></td>
            <td>Model name (default: gpt-4o-mini)</td>
          </tr>
        </tbody>
      </table>

      <h2>Generating the Encryption Key</h2>
      <p>
        The <code>ENCRYPTION_KEY</code> must be exactly 64 hexadecimal
        characters (32 bytes). Generate it with:
      </p>
      <pre>{`openssl rand -hex 32
# Example output: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2`}</pre>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/whatsapp-setup"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; WhatsApp Setup
        </Link>
        <Link
          href="/wacrm/features"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Features &rarr;
        </Link>
      </div>
    </div>
  );
}
