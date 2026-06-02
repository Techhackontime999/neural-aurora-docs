import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — NEURAL AURORA | Neural Aurora Docs",
  description:
    "Detailed feature documentation for NEURAL AURORA — gateway verification, admin dashboard, AI integration, and more.",
};

export default function NeuralAuroraFeatures() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/neural-aurora"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to NEURAL AURORA overview
      </Link>

      <h1>Features</h1>
      <p>
        NEURAL AURORA packs an extensive set of features across gateway
        verification, portfolio presentation, admin management, and AI
        integration. Below is a comprehensive breakdown.
      </p>

      <h2>Gateway Verification</h2>
      <p>
        Every visitor must pass through a gateway before accessing the portfolio.
        There are six distinct entry methods:
      </p>

      <h3>AI-Powered Gateway</h3>
      <p>
        Uses OpenRouter or OpenAI-compatible APIs to generate unique logic
        puzzles. Visitors must solve the puzzle to unlock the portfolio. This
        demonstrates real-time AI integration and ensures visitors are engaged.
      </p>

      <h3>Neural Pattern Lock</h3>
      <p>
        A memory-sequence challenge across configurable grid sizes (3x3, 4x4,
        5x5). Nodes spring-animate as users repeat the pattern. Difficulty
        scales with grid size.
      </p>

      <h3>Voice Verification</h3>
      <p>
        Using the Web SpeechRecognition API, visitors say &quot;Amit&quot; to
        unlock. This showcases browser-based voice AI capabilities.
      </p>

      <h3>Mood Swing</h3>
      <p>
        Choose from 6 moods (Energetic, Calm, Happy, Melancholic, Focused,
        Night Owl). Each mood triggers a specific music genre via the
        Jamendo API, with a Web Audio API synthesizer as fallback.
      </p>

      <h3>YouTube Channel Stream</h3>
      <p>
        Browse and watch videos from a configured YouTube channel to gain access.
        Powered by the YouTube Data API v3 and IFrame Player API.
      </p>

      <h3>Watch Dev Ads</h3>
      <p>
        Watch Google AdSense ads or YouTube videos (landscape/shorts format) to
        unlock the portfolio. Supports multiple ad formats.
      </p>

      <h3>Auto Traverse</h3>
      <p>
        One-click autonomous full-site demo tour. A glowing cursor walks through
        every section of the portfolio automatically &mdash; perfect for
        recruiters who want a quick overview.
      </p>

      <h2>Portfolio Sections</h2>
      <ul>
        <li>
          <strong>Hero</strong> &mdash; 3D Spline scene with interactive elements
        </li>
        <li>
          <strong>About</strong> &mdash; Personal bio and background
        </li>
        <li>
          <strong>Skills</strong> &mdash; Animated skill bars organized by category
        </li>
        <li>
          <strong>Projects</strong> &mdash; Expandable cards with technologies, GitHub links, live demos
        </li>
        <li>
          <strong>Resume</strong> &mdash; Downloadable PDF resume
        </li>
        <li>
          <strong>Contact</strong> &mdash; Form with Supabase storage
        </li>
        <li>
          <strong>Services</strong> &mdash; Paid service listings with Razorpay
        </li>
        <li>
          <strong>Blog</strong> &mdash; Blog listing and individual posts
        </li>
        <li>
          <strong>Case Studies</strong> &mdash; Detailed project deep-dives
        </li>
        <li>
          <strong>Reviews</strong> &mdash; Star ratings with admin approval
        </li>
        <li>
          <strong>Support</strong> &mdash; Razorpay-powered donations
        </li>
      </ul>

      <h2>Admin Dashboard</h2>
      <p>
        The admin panel at <code>/admin/*</code> provides full CRUD for every
        portfolio section:
      </p>
      <ul>
        <li>Personal Info, Skills, Projects, Education, Experience</li>
        <li>Blog posts, Case Studies, Social Links</li>
        <li>Reviews, Contact Messages, Services</li>
        <li>Dev Ads, YouTube Channel Config, CRM URL config</li>
        <li>Payment Settings, User Roles, AI Automation</li>
      </ul>

      <h2>AI Integration</h2>
      <ul>
        <li>
          <strong>Neural Aurora CMD</strong> &mdash; An AI terminal in the
          browser with full portfolio context. Ask questions like &quot;What
          projects has Amit worked on?&quot; in natural language.
        </li>
        <li>
          <strong>AI Automation</strong> &mdash; Admin-level AI that can create,
          read, update, and delete portfolio content via natural language
          commands. Powered by function calling.
        </li>
        <li>
          <strong>Puzzle Generation</strong> &mdash; AI-generated logic puzzles
          for the gateway, using Gemini or OpenAI-compatible APIs.
        </li>
      </ul>

      <h2>Design System</h2>
      <p>
        The portfolio uses the &quot;Taste-Skill&quot; design philosophy with
        Liquid Glass aesthetics: cubic-bezier(0.16, 1, 0.3, 1) easing, spring
        physics, perpetual micro-interactions, and an aurora cyan/purple/gold
        accent palette. Fully responsive with fluid typography via clamp().
      </p>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/neural-aurora/getting-started"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Getting Started
        </Link>
        <Link
          href="/neural-aurora/setup"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          Setup Guide &rarr;
        </Link>
      </div>
    </div>
  );
}
