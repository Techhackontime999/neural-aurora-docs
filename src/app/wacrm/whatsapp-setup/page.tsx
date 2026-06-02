import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "WhatsApp Setup — WACRM | Neural Aurora Docs",
  description:
    "Configure WhatsApp Business API for WACRM — Meta app setup, access tokens, and webhook verification.",
};

export default function WacrmWhatsAppSetup() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/wacrm"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to WACRM overview
      </Link>

      <h1>WhatsApp Setup</h1>
      <p>
        WACRM integrates with the official Meta Cloud API (WhatsApp Business
        API). Follow this guide to create a Meta app, generate access tokens,
        and configure the webhook.
      </p>

      <h2>1. Create a Meta App</h2>
      <ol>
        <li>
          Go to{" "}
          <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">
            developers.facebook.com
          </a>{" "}
          and create a developer account if you haven&apos;t
        </li>
        <li>Click &quot;My Apps&quot; → &quot;Create App&quot;</li>
        <li>Choose &quot;Business&quot; as the app type</li>
        <li>Fill in the app name and contact email</li>
        <li>Complete the creation process</li>
      </ol>

      <h2>2. Configure WhatsApp Product</h2>
      <ol>
        <li>
          In your app dashboard, click &quot;Add Product&quot;
        </li>
        <li>
          Find &quot;WhatsApp&quot; and click &quot;Set Up&quot;
        </li>
        <li>
          You&apos;ll be redirected to the WhatsApp API configuration
        </li>
      </ol>

      <h2>3. Set Up a Test Sender</h2>
      <ol>
        <li>
          Under &quot;API Setup&quot;, use the default test phone number
          provided by Meta
        </li>
        <li>
          Or add your own phone number by clicking
          &quot;Add Phone Number&quot; (requires business verification)
        </li>
        <li>
          You&apos;ll receive a verification code via WhatsApp or phone call
        </li>
      </ol>

      <h2>4. Generate Access Token</h2>
      <ol>
        <li>
          Still in &quot;API Setup&quot;, find the
          &quot;Access Token&quot; section
        </li>
        <li>
          Click &quot;Generate Token&quot;
        </li>
        <li>
          Copy the temporary token (valid for 24 hours for development;
          for production, you need a permanent token)
        </li>
      </ol>

      <blockquote>
        For production, you need to generate a permanent access token via
        System User or manage token refresh. See Meta&apos;s documentation
        for long-lived access tokens.
      </blockquote>

      <h2>5. Configure Webhook</h2>
      <p>
        WACRM needs a webhook endpoint to receive incoming WhatsApp messages:
      </p>
      <ol>
        <li>
          In your Meta app settings, go to
          &quot;WhatsApp → Configuration&quot;
        </li>
        <li>
          Set <strong>Callback URL</strong> to:{" "}
          <code>https://your-domain.com/api/whatsapp/webhook</code>
        </li>
        <li>
          Set a <strong>Verify Token</strong> — this can be any string,
          but you&apos;ll need it in your env variables
        </li>
        <li>
          Subscribe to the following webhook fields:
          <ul>
            <li><code>messages</code></li>
            <li><code>message_deliveries</code></li>
            <li><code>message_reads</code></li>
            <li><code>message_template_status_update</code></li>
          </ul>
        </li>
        <li>
          Click &quot;Verify and Save&quot;
        </li>
      </ol>

      <h2>6. Configure Env Variables</h2>
      <p>
        Add the following to your <code>.env.local</code>:
      </p>
      <pre>{`# WhatsApp / Meta Configuration
META_APP_SECRET=your_meta_app_secret
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
WHATSAPP_API_VERSION=v22.0`}</pre>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/wacrm/supabase-setup"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Supabase Setup
        </Link>
        <Link
          href="/wacrm/environment-variables"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Environment Variables &rarr;
        </Link>
      </div>
    </div>
  );
}
