import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment — Neural Aurora CRM | Neural Aurora Docs",
  description:
    "Deploy WACRM to production — Hostinger Managed Node.js, Vercel, and other hosting options with environment configuration.",
};

export default function WacrmDeployment() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to overview
      </Link>

      <h1>Deployment</h1>
      <p>
        Neural Aurora CRM can be deployed to any Node.js hosting provider. Hostinger is
        recommended for the best out-of-box experience.
      </p>

      <h2>Deploy on Hostinger (Recommended)</h2>
      <ol>
        <li>
          Push your forked repository to GitHub, GitLab, or Bitbucket
        </li>
        <li>
          Log in to your{" "}
          <a href="https://hostinger.com" target="_blank" rel="noopener noreferrer">
            Hostinger
          </a>{" "}
          account
        </li>
        <li>
          Navigate to &quot;Web Apps Hosting&quot; and click
          &quot;Add Web App&quot;
        </li>
        <li>
          Choose &quot;Deploy from Git&quot; and connect your repository
        </li>
        <li>
          Select <strong>Node.js</strong> as the stack
        </li>
        <li>
          Set the following:
          <ul>
            <li>Build command: <code>npm run build</code></li>
            <li>Start command: <code>npm run start</code></li>
            <li>Publish directory: <code>.next</code></li>
          </ul>
        </li>
        <li>
          Add all environment variables from your <code>.env.local</code>
        </li>
        <li>
          Deploy — Hostinger will build and start your app
        </li>
        <li>
          Set up a custom domain (or use the provided hostinger URL)
        </li>
      </ol>

      <h2>Automations Cron</h2>
      <p>
        The automation and flow engines use cron-based scheduling for Wait
        steps and time-based triggers. You need to set up a cron job that
        pings the drain endpoint:
      </p>
      <pre>{`# Run every minute
curl -X GET https://your-domain.com/api/automations/cron/drain \
  -H "Authorization: Bearer YOUR_AUTOMATION_CRON_SECRET"`}</pre>

      <p>
        How to set up on Hostinger:
      </p>
      <ol>
        <li>
          In your Hostinger control panel, go to
          <strong>Advanced → Cron Jobs</strong>
        </li>
        <li>
          Add a new cron job with the command above
        </li>
        <li>
          Set the schedule to <code>* * * * *</code> (every minute)
        </li>
        <li>
          Set <code>AUTOMATION_CRON_SECRET</code> in your environment variables
        </li>
      </ol>

      <h2>Other Hosting Options</h2>
      <p>
        WACRM is a standard Next.js application and can be deployed to any
        Node.js host:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong> — native Next.js support, auto-detects the
          framework
        </li>
        <li>
          <strong>Railway</strong> — Node.js deployment with environment
          variable support
        </li>
        <li>
          <strong>DigitalOcean App Platform</strong> — containerised Node.js
          hosting
        </li>
        <li>
          <strong>Self-hosted</strong> — run on any VPS with Node.js installed
          using <code>npm run build && npm run start</code>
        </li>
      </ul>

      <h2>Security Headers</h2>
      <p>
        WACRM ships with a comprehensive Content Security Policy configured
        in <code>next.config.ts</code>:
      </p>
      <ul>
        <li>CSP (Report-Only mode)</li>
        <li>HSTS</li>
        <li>X-Content-Type-Options: nosniff</li>
        <li>X-Frame-Options: DENY</li>
        <li>Permissions-Policy</li>
        <li>Referrer-Policy</li>
      </ul>
      <p>
        These are enforced automatically when deployed to a production
        environment with HTTPS.
      </p>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/architecture"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Architecture
        </Link>
        <span className="text-sm text-slate-300 dark:text-slate-600">
          End of WACRM docs
        </span>
      </div>
    </div>
  );
}
