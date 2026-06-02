import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "NEURAL AURORA — Overview | Neural Aurora Docs",
  description:
    "NEURAL AURORA: The Synaptic Portfolio — an immersive 3D portfolio with AI-powered gateway, neural CMD, mood-based music, and full admin dashboard.",
};

export default function NeuralAuroraOverview() {
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-400 to-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              NEURAL AURORA
            </h1>
            <p className="text-sm text-aurora-600 dark:text-aurora-400 font-medium">
              The Synaptic Portfolio &mdash; v2.3.0
            </p>
          </div>
        </div>
      </div>

      <p>
        <strong>NEURAL AURORA</strong> is an immersive, open-source 3D portfolio
        website titled <strong>&quot;The Synaptic Portfolio&quot;</strong>.
        Created by <strong>Amit Kumar (Techhackontime999)</strong>, it is a
        living neural network suspended in an aurora field where work is
        &quot;fired across synaptic pathways&quot; rather than simply displayed.
      </p>

      <div className="flex flex-wrap gap-3 my-6">
        <a
          href="https://neural-aurora.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
        <a
          href="https://github.com/Techhackontime999/NEURAL-AURORA"
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

      <h2>What is NEURAL AURORA?</h2>
      <p>
        NEURAL AURORA is more than a portfolio &mdash; it is an experience. Every
        visitor must pass through a gateway puzzle (AI-generated, voice-based,
        or pattern-based) before entering. Once inside, the portfolio comes
        alive with 3D graphics, mood-based music, and an AI-powered terminal
        that lets you explore the portfolio through natural language.
      </p>

      <h3>Core Philosophy</h3>
      <p>
        A portfolio should not just display work &mdash; it should demonstrate
        capability. NEURAL AURORA showcases full-stack engineering, AI
        integration, 3D graphics, and UX design&mdash;all in one living,
        breathing application.
      </p>

      <h2>Key Features</h2>

      <h3>Gateway Verification</h3>
      <p>
        Six distinct entry methods that verify visitors are human and engaged:
      </p>
      <ul>
        <li>
          <strong>AI-Powered Gateway</strong> &mdash; OpenRouter/OpenAI-compatible puzzle verification
        </li>
        <li>
          <strong>Neural Pattern Lock</strong> &mdash; Memory-sequence challenge across 3x3/4x4/5x5 grids
        </li>
        <li>
          <strong>Voice Verification</strong> &mdash; Say &quot;Amit&quot; to unlock via Web Speech API
        </li>
        <li>
          <strong>YouTube Channel Stream</strong> &mdash; Browse videos to gain access
        </li>
        <li>
          <strong>Watch Dev Ads</strong> &mdash; AdSense/YouTube ad gateway
        </li>
        <li>
          <strong>Auto Traverse</strong> &mdash; One-click autonomous full-site demo tour
        </li>
      </ul>

      <h3>Portfolio Sections</h3>
      <ul>
        <li>Hero (3D Spline scene), About, Skills with animated bars</li>
        <li>Projects with expandable cards, technologies, GitHub links</li>
        <li>Resume download, Contact form with Supabase</li>
        <li>Services page with Razorpay payment integration</li>
        <li>Blog with individual posts, Case Studies</li>
        <li>Support &amp; Donations via Razorpay</li>
        <li>Reviews/Feedback with star ratings and admin approval</li>
      </ul>

      <h3>Admin Dashboard</h3>
      <p>
        Full CRUD admin at <code>/admin/*</code> covering personal info, skills,
        projects, education, experience, blog, case studies, social links,
        reviews, contact messages, services, dev ads, YouTube config, CRM URL,
        payment settings, user roles, and AI-powered automation.
      </p>

      <h3>AI Integration</h3>
      <ul>
        <li>
          <strong>Neural Aurora CMD</strong> &mdash; AI terminal with full
          portfolio context awareness
        </li>
        <li>
          <strong>Mood Swing</strong> &mdash; 6 moods with Jamendo API / Web
          Audio synth hybrid music player
        </li>
        <li>
          <strong>AI Automation</strong> &mdash; Natural language admin CRUD
          via function calling
        </li>
        <li>
          <strong>AI Puzzle Generation</strong> &mdash; Gemini/OpenAI-compatible
          gateway puzzles
        </li>
      </ul>

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
            <td>React 18.3</td>
          </tr>
          <tr>
            <td>Build Tool</td>
            <td>Vite 6</td>
          </tr>
          <tr>
            <td>Routing</td>
            <td>React Router DOM 7</td>
          </tr>
          <tr>
            <td>Styling</td>
            <td>Tailwind CSS 3</td>
          </tr>
          <tr>
            <td>3D Graphics</td>
            <td>Three.js r170 + React Three Fiber 8</td>
          </tr>
          <tr>
            <td>Backend / Database</td>
            <td>Supabase (PostgreSQL + Auth + Storage + Realtime)</td>
          </tr>
          <tr>
            <td>AI / LLM</td>
            <td>OpenAI-compatible API (OpenRouter, OpenAI, Groq)</td>
          </tr>
          <tr>
            <td>Payments</td>
            <td>Razorpay</td>
          </tr>
          <tr>
            <td>Animation</td>
            <td>Framer Motion 11</td>
          </tr>
          <tr>
            <td>Icons</td>
            <td>Lucide React</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>Vercel (primary), Netlify, Cloudflare Pages</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-sm text-slate-400">Next:</span>
        <Link
          href="/neural-aurora/getting-started"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Getting Started &rarr;
        </Link>
      </div>
    </div>
  );
}
