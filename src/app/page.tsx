"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Shield,
  BookText,
  Terminal,
  Code2,
  Palette,
  Rocket,
  Search,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  Film,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const projects = [
  {
    title: "NEURAL AURORA",
    tagline: "The Synaptic Portfolio",
    description:
      "An immersive, open-source 3D portfolio website with AI-powered gateway, neural CMD terminal, mood-based music, and full admin dashboard.",
    href: "/neural-aurora/overview",
    icon: <Sparkles className="w-5 h-5" />,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    stats: [
      { label: "Stack", value: "React + Vite + Supabase" },
      { label: "Version", value: "v2.3.0" },
    ],
  },
  {
    title: "WACRM",
    tagline: "WhatsApp CRM Template",
    description:
      "Self-hostable CRM template for WhatsApp Business with shared inbox, sales pipelines, no-code automations, and visual flow builder.",
    href: "/wacrm/overview",
    icon: <MessageSquare className="w-5 h-5" />,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    stats: [
      { label: "Stack", value: "Next.js + Supabase" },
      { label: "Version", value: "v1.0.0" },
    ],
  },
];

const features = [
  {
    icon: <BookText className="w-5 h-5" />,
    title: "Step-by-Step Guides",
    description:
      "Tutorials and onboarding flows that walk you through every feature from zero to production.",
    span: "full",
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    title: "API References",
    description:
      "Comprehensive API documentation with real-world examples, request/response schemas, and error handling.",
    span: "half",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "AI-Powered Search",
    description:
      "Find what you need instantly with natural language search across the entire documentation ecosystem.",
    span: "half",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "SDK & Integrations",
    description:
      "Developer SDKs and integration libraries for popular frameworks and platforms.",
    span: "full",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Component Library",
    description:
      "Reusable UI components, design tokens, and taste-skill design system documentation.",
    span: "half",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Deployment Guides",
    description:
      "Production deployment guides for Vercel, Docker, and self-hosted environments.",
    span: "half",
  },
];

const steps = [
  {
    num: "01",
    title: "Clone the Repository",
    desc: "Fork and clone your preferred project from GitHub.",
    code: "git clone https://github.com/Techhackontime999/NEURAL-AURORA.git",
  },
  {
    num: "02",
    title: "Configure Environment",
    desc: "Set up Supabase credentials and API keys.",
    code: "cp .env.example .env",
  },
  {
    num: "03",
    title: "Read the Docs",
    desc: "Follow the documentation to customize and configure.",
    code: "npm run dev",
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "Deploy to Vercel, Docker, or your own infrastructure.",
    code: "vercel deploy",
  },
];

const faqs = [
  {
    q: "How do I get started?",
    a: "Choose a project (NEURAL AURORA or WACRM), clone the repository, follow the setup guide in the docs, and you'll be up and running in minutes.",
  },
  {
    q: "How do I access the APIs?",
    a: "API references are available in the documentation. Each project includes Supabase client libraries and API route examples for easy integration.",
  },
  {
    q: "Are there SDKs available?",
    a: "Yes. Both projects provide SDK examples and integration libraries. See the SDK documentation for language-specific guides.",
  },
  {
    q: "Can I self-host?",
    a: "Absolutely. Both projects are MIT-licensed and fully self-hostable. Deployment guides for Vercel, Docker, and bare-metal are included.",
  },
  {
    q: "How does authentication work?",
    a: "Authentication is handled by Supabase Auth with email/password sign-in. WACRM adds WhatsApp Cloud API token-based auth for business messaging.",
  },
  {
    q: "Is there AI-powered search?",
    a: "Yes! The documentation features AI-powered natural language search to help you find relevant docs, APIs, and examples instantly.",
  },
];

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px]"
        animate={{
          x: [0, 15, -10, 0],
          y: [0, -10, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"
        animate={{
          x: [0, -15, 10, 0],
          y: [0, 10, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-600/8 rounded-full blur-[80px]"
        animate={{
          x: [0, 10, -5, 0],
          y: [0, -5, 10, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

interface Demo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string;
  project_type: string;
}

function DemoSection() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/demos?public=true")
      .then((r) => r.json())
      .then((data) => setDemos(data.demos ?? []))
      .catch(() => {});
  }, []);

  if (demos.length === 0) return null;

  return (
    <section className="px-4 pb-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            See It In Action
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Watch full demos of every project in the ecosystem.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {demos.map((demo) => (
            <motion.div key={demo.id} variants={fadeUp}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/20">
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{demo.title}</h3>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${demo.project_type === "both" ? "bg-purple-500/10 text-purple-300" : demo.project_type === "neural-aurora" ? "bg-violet-500/10 text-violet-300" : "bg-cyan-500/10 text-cyan-300"}`}>
                        {demo.project_type === "neural-aurora" ? "NEURAL AURORA" : demo.project_type === "wacrm" ? "WACRM" : "Ecosystem"}
                      </span>
                    </div>
                  </div>
                  {demo.description && (
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {demo.description}
                    </p>
                  )}
                  <button
                    onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-all duration-200 active:scale-[0.98]"
                  >
                    <PlayCircle className="w-4 h-4" />
                    {activeDemo === demo.id ? "Hide Demo" : "Show Full Demo"}
                  </button>
                </div>
                {activeDemo === demo.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="border-t border-white/5 overflow-hidden"
                  >
                    <div className="p-6 lg:p-8">
                      {demo.embed_url ? (
                        <div className="aspect-video rounded-xl overflow-hidden bg-black/20">
                          <iframe
                            src={demo.embed_url}
                            title={demo.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : demo.video_url ? (
                        <a
                          href={demo.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-12 rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-colors"
                        >
                          <PlayCircle className="w-8 h-8" />
                          <span className="text-sm font-medium">Watch on YouTube</span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-center py-12 rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-slate-500 text-xs">
                          No video URL configured. Add one in the admin panel.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { user, loading } = useAuth();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="min-h-screen bg-[#020617] text-white"
    >
      <FloatingOrbs />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="28" stroke="#8b5cf6" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="5 5" />
              <circle cx="50" cy="50" r="18" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="#8b5cf6" fillOpacity="0.35" />
              <circle cx="50" cy="50" r="5.5" fill="#a78bfa" fillOpacity="0.9" />
              <circle cx="48.5" cy="48.5" r="2" fill="white" fillOpacity="0.5" />
            </svg>
            <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              NEURAL
            </span>
            <span className="text-[10px] font-light tracking-[0.15em] text-teal-400 -ml-0.5">
              AURORA
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link
              href={user ? "/admin" : "/login"}
              className={`p-1.5 transition-colors ${
                loading
                  ? "text-slate-600"
                  : user
                    ? "text-violet-400 hover:text-violet-300"
                    : "text-slate-400 hover:text-white"
              }`}
              aria-label={user ? "Admin" : "Sign in"}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>
            <a
              href="https://github.com/Techhackontime999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 px-4 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-medium rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
              <Sparkles className="w-3 h-3" />
              Ecosystem Documentation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
              <span>Build Faster With</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-teal-400 bg-clip-text text-transparent">
                Neural Aurora
              </span>
              <br />
              <span>Documentation</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-[65ch] mb-8">
              Everything you need to integrate, customize, deploy, and scale
              Neural Aurora projects. Guides, APIs, SDKs, examples, tutorials,
              and AI-powered documentation in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition-all duration-300 active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/neural-aurora/overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4" />
                Browse Documentation
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80">
              <motion.div
                className="absolute inset-0 rounded-full border border-violet-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-dashed border-violet-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-violet-500/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[40%] rounded-full bg-violet-500/20 blur-xl" />
              <div className="absolute inset-[44%] rounded-full bg-violet-400/30" />
              <div className="absolute inset-[46%] rounded-full bg-white/10" />
              <div className="absolute inset-[48%] rounded-full bg-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              One Documentation Hub For Everything
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Comprehensive docs for every project in the Neural Aurora ecosystem.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project) => (
              <motion.div key={project.title} variants={fadeUp}>
                <Link
                  href={project.href}
                  className="group block relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 lg:p-8 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}
                    >
                      {project.icon}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors duration-300" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">
                    {project.title}
                  </h2>
                  <p className="text-xs text-violet-400 font-medium mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {project.stats.map((stat) => (
                      <span key={stat.label}>
                        <span className="text-slate-400 font-medium">
                          {stat.label}
                        </span>
                        : {stat.value}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — asymmetric bento grid (taste-skill: no 3-column generic cards) */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Everything You Need To Ship
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              From first setup to production deployment, we have you covered.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className={`group p-5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-violet-500/20 transition-all duration-300 ${
                  feature.span === "full" ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-0">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Showcase */}
      <DemoSection />

      {/* Quick Start */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Start Building In Minutes
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Four steps from zero to running your project locally.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative p-5 rounded-xl border border-white/5 bg-white/[0.03]"
              >
                <span className="text-3xl font-bold bg-gradient-to-b from-violet-500/30 to-transparent bg-clip-text text-transparent mb-2 block">
                  {step.num}
                </span>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3">{step.desc}</p>
                <pre className="text-[10px] text-slate-500 bg-white/[0.03] p-2 rounded-lg border border-white/5 overflow-x-auto font-mono">
                  {step.code}
                </pre>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: "50+", label: "Documentation Pages", icon: BookText },
                { value: "100+", label: "API Endpoints", icon: Terminal },
                { value: "20+", label: "SDK Examples", icon: Code2 },
                { value: "99.9%", label: "Platform Uptime", icon: Shield },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-xl border border-white/5 bg-white/[0.03] text-center transition-colors duration-200 hover:border-violet-500/20"
                >
                  <stat.icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 lg:p-12 text-center"
          >
            <GithubIcon className="w-10 h-10 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Fork It, Customize It, Build Anything
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8">
              Both projects are MIT-licensed open source. Clone, customize,
              contribute, and deploy without restrictions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://github.com/Techhackontime999/NEURAL-AURORA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98]"
              >
                <GithubIcon className="w-4 h-4" />
                NEURAL AURORA Repo
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a
                href="https://github.com/Techhackontime999/WACRM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98]"
              >
                <GithubIcon className="w-4 h-4" />
                WACRM Repo
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                layout
                className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm text-white hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${faqOpen === i ? "rotate-90" : ""}`}
                  />
                </button>
                {faqOpen === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="px-5 pb-4 text-xs text-slate-400 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/10 via-transparent to-teal-500/10 p-8 lg:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Ready To Build With Neural Aurora?
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8">
                Explore the complete documentation ecosystem and start building
                powerful experiences today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/docs"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/neural-aurora/overview"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 transition-all duration-200 active:scale-[0.98]"
                >
                  View Docs
                  <BookOpen className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs text-slate-600">
            Built by{" "}
            <a
              href="https://github.com/Techhackontime999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Techhackontime999
            </a>{" "}
            &middot; MIT License &middot; 2026
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
