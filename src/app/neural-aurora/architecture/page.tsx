import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Architecture — NEURAL AURORA | Neural Aurora Docs",
  description:
    "Technical architecture of NEURAL AURORA — component structure, data flow, and design patterns.",
};

export default function NeuralAuroraArchitecture() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/neural-aurora"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to NEURAL AURORA overview
      </Link>

      <h1>Architecture</h1>
      <p>
        NEURAL AURORA follows a modern single-page application architecture with
        React, Vite, and Supabase. Below is a breakdown of the key architectural
        decisions and data flow.
      </p>

      <h2>Application Shell</h2>
      <p>
        The app is structured as a standard Vite + React SPA with React Router
        for client-side routing. The entry point at <code>src/main.jsx</code>{" "}
        mounts the root <code>App.jsx</code> component which sets up routing
        and global providers.
      </p>

      <h3>Provider Hierarchy</h3>
      <pre>{`<AuthProvider>        ← Supabase authentication context
  <MoodProvider>       ← Mood/music state
    <AutoTraverseProvider>  ← Auto demo tour
      <Router>         ← React Router
        <Routes />     ← Page components
      </Router>
    </AutoTraverseProvider>
  </MoodProvider>
</AuthProvider>`}</pre>

      <h2>Data Flow</h2>
      <p>
        The application uses a hybrid data approach — Supabase as the primary
        data source with static fallback data when the database is unavailable:
      </p>
      <pre>{`Component
  → usePortfolioData() hook
    → Supabase query (src/lib/supabase.js)
      → Success: return data
      → Error/failure: return static fallback (src/data/portfolio.js)`}</pre>

      <h2>Gateway Flow</h2>
      <p>
        The gateway system uses a context-based approach. When a visitor
        successfully completes any verification method, an <code>AuthGate</code>{" "}
        context updates to allow access to the main portfolio:
      </p>
      <pre>{`Visitor → Gateway Page
  → AI Puzzle / Pattern Lock / Voice / YouTube / Ads / Mood
  → Success → AuthGate unlocks → Portfolio Page
  → Failure → Stay on Gateway`}</pre>

      <h2>Admin Architecture</h2>
      <p>
        The admin dashboard is a separate route group under{" "}
        <code>/admin/*</code> with its own layout and routing. It is protected
        by a <code>ProtectedRoute</code> component that checks for
        authentication and admin role from Supabase.
      </p>

      <h2>AI Integration</h2>
      <p>
        AI features use an OpenAI-compatible API client located in{" "}
        <code>src/lib/ai/provider.js</code>. The system supports multiple
        providers (OpenAI, OpenRouter, Groq, Together) through a unified
        interface. Function/tool calling is used for AI-powered admin
        automation, with tool definitions in{" "}
        <code>src/lib/ai/types.js</code>.
      </p>

      <h2>Payment Flow</h2>
      <p>
        Razorpay payments are handled through a serverless function at{" "}
        <code>api/create-order.js</code> which creates orders server-side.
        The client-side Razorpay SDK handles the checkout UI.
      </p>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/neural-aurora/setup"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Setup
        </Link>
        <Link
          href="/neural-aurora/deployment"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Deployment &rarr;
        </Link>
      </div>
    </div>
  );
}
