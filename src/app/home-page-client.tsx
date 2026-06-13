"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  ChevronDown,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  Film,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { BrandLogo } from "@/components/BrandLogo";

const Background3D = dynamic(() => import("@/components/Background3D"), { ssr: false, loading: () => null });

const ICON_MAP: Record<string, ReactNode> = {
  sparkles: <Sparkles className="w-5 h-5" />,
  "book-text": <BookText className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  "code-2": <Code2 className="w-5 h-5" />,
  palette: <Palette className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
};
const SMALL_ICON_MAP: Record<string, ReactNode> = {
  sparkles: <Sparkles className="w-3 h-3" />,
  "book-text": <BookText className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  "code-2": <Code2 className="w-5 h-5" />,
  palette: <Palette className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
};
const FEATURE_ICON_MAP: Record<string, ReactNode> = {
  sparkles: <Sparkles className="w-5 h-5" />,
  "book-text": <BookText className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  "code-2": <Code2 className="w-5 h-5" />,
  palette: <Palette className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  "message-square": <MessageSquare className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
};

function GithubIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const cardStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollStagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardStagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgressBar() {
  const progress = useMotionValue(0);
  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(docHeight ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [progress]);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: "var(--brand-gradient)" }}
    />
  );
}

interface HomeProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
  stat_label_1: string;
  stat_value_1: string;
  stat_label_2: string;
  stat_value_2: string;
}

interface HomeFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  span: string;
}

interface HomeStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

interface HomeStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  code: string;
}

interface HomeFaq {
  id: string;
  question: string;
  answer: string;
}

interface HomeRepo {
  id: string;
  title: string;
  url: string;
  is_published: boolean;
  sort_order: number;
}

interface HomepageData {
  projects: HomeProject[];
  features: HomeFeature[];
  stats: HomeStat[];
  steps: HomeStep[];
  faqs: HomeFaq[];
  repos: HomeRepo[];
}

function FloatingOrbs() {
  const { scrollY } = useScroll();
  const parallax1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const parallax2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const parallax3 = useTransform(scrollY, [0, 1000], [0, -30]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: "rgba(139, 92, 246, 0.12)", y: parallax1 }}
        animate={{ x: [0, 15, -10, 0] }}
        transition={{ x: { duration: 20, repeat: Infinity, ease: "linear" } }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: "rgba(45, 212, 191, 0.08)", y: parallax2 }}
        animate={{ x: [0, -15, 10, 0] }}
        transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" } }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[80px]"
        style={{ background: "rgba(168, 85, 247, 0.06)", y: parallax3 }}
        animate={{ x: [0, 10, -5, 0] }}
        transition={{ x: { duration: 18, repeat: Infinity, ease: "linear" } }}
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

function DemoSection({ initialDemos }: { initialDemos: Demo[] }) {
  const [demos, setDemos] = useState<Demo[]>(initialDemos);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  if (demos.length === 0) return null;

  return (
    <section className="px-4 pb-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            See It In Action
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Watch full demos of every project in the ecosystem.
          </p>
        </ScrollReveal>
        <ScrollStagger>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {demos.map((demo) => (
            <motion.div key={demo.id} variants={fadeUp}>
              <div className="group relative overflow-hidden rounded-2xl transition-all duration-300"
                style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                    >
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{demo.title}</h3>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${demo.project_type === "both" ? "text-purple-300" : demo.project_type === "neural-aurora" ? "text-violet-300" : "text-cyan-300"}`}
                        style={{ background: demo.project_type === "both" ? "rgba(168,85,247,0.1)" : demo.project_type === "neural-aurora" ? "rgba(139,92,246,0.1)" : "rgba(45,212,191,0.1)" }}
                      >
                        {demo.project_type === "neural-aurora" ? "NEURAL AURORA" : demo.project_type === "wacrm" ? "Neural Aurora CRM" : "Ecosystem"}
                      </span>
                    </div>
                  </div>
                  {demo.description && (
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {demo.description}
                    </p>
                  )}
                  <button
                    onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.98] text-white"
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
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
                    className="overflow-hidden"
                    style={{ borderTop: "1px solid var(--border-color)" }}
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
                          className="flex items-center justify-center gap-2 w-full py-12 rounded-xl border border-dashed transition-colors"
                          style={{ borderColor: "var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)" }}
                        >
                          <PlayCircle className="w-8 h-8" />
                          <span className="text-sm font-medium">Watch on YouTube</span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-center py-12 rounded-xl border border-dashed"
                          style={{ borderColor: "var(--border-color)", background: "var(--card-bg)", color: "var(--text-tertiary)" }}
                        >
                          <span className="text-xs">No video URL configured. Add one in the admin panel.</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            ))}
          </div>
          </ScrollStagger>
        </div>
      </section>
  );
}

export default function HomePageClient({
  initialData,
  initialDemos,
}: {
  initialData: HomepageData;
  initialDemos: Demo[];
}) {
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [data, setData] = useState<HomepageData>(initialData);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => { setProductsOpen(false); }, [pathname]);

  return (
    <>
    <div className="min-h-screen text-white">
      <ScrollProgressBar />
      <FloatingOrbs />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full"
        style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-primary)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center justify-between h-14 px-4 lg:px-6 max-w-[1400px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="small" showWordmark={true} />
          </Link>
          <div className="flex items-center gap-3">
            <div ref={productsRef} className="relative">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="text-xs transition-colors flex items-center gap-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Products
                <ChevronDown className={`w-3 h-3 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
                  >
                    {data.projects.length === 0 ? (
                      <div className="px-4 py-6 text-xs text-slate-400 dark:text-slate-500 text-center">
                        No products available
                      </div>
                    ) : (
                      data.projects.map((p) => (
                        <a
                          key={p.id}
                          href={p.href}
                          onClick={() => setProductsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                              {p.title}
                            </span>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                              {p.tagline}
                            </p>
                          </div>
                        </a>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/docs"
              className="text-xs transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              Docs
            </Link>
            <button
              onClick={toggleTheme}
              className="p-1.5 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <Link
              href={user ? "/admin" : "/login"}
              className={`p-1.5 transition-colors ${
                loading
                  ? "opacity-40"
                  : user
                    ? "text-violet-400 hover:text-violet-300"
                    : ""
              }`}
              style={{ color: loading ? undefined : user ? undefined : "var(--text-secondary)" }}
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
              className="transition-colors"
              style={{ color: "var(--text-tertiary)" }}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 px-4 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp} initial="initial" animate="animate">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-medium rounded-full"
              style={{ background: "var(--eyebrow-bg)", color: "var(--eyebrow-text)", border: "1px solid var(--eyeborder-border)" }}
            >
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

            <p className="text-base sm:text-lg leading-relaxed max-w-[65ch] mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Everything you need to integrate, customize, deploy, and scale
              Neural Aurora projects. Guides, APIs, SDKs, examples, tutorials,
              and AI-powered documentation in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300 active:scale-[0.98]"
                style={{ background: "var(--brand-gradient-strong)" }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/neural-aurora/overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
              >
                <BookOpen className="w-4 h-4" />
                Browse Documentation
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid rgba(139, 92, 246, 0.15)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{ border: "1px dashed rgba(139, 92, 246, 0.1)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full"
                style={{ border: "1px solid rgba(45, 212, 191, 0.08)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[40%] rounded-full blur-xl"
                style={{ background: "rgba(139, 92, 246, 0.15)" }}
              />
              <div className="absolute inset-[44%] rounded-full"
                style={{ background: "rgba(139, 92, 246, 0.25)" }}
              />
              <div className="absolute inset-[46%] rounded-full bg-white/10" />
              <div className="absolute inset-[48%] rounded-full bg-white/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              One Documentation Hub For Everything
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Comprehensive docs for every project in the Neural Aurora ecosystem.
            </p>
          </ScrollReveal>
          <ScrollStagger>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(data?.projects ?? []).map((project) => {
              const stats = [];
              if (project.stat_label_1 && project.stat_value_1) stats.push({ label: project.stat_label_1, value: project.stat_value_1 });
              if (project.stat_label_2 && project.stat_value_2) stats.push({ label: project.stat_label_2, value: project.stat_value_2 });
              return (
              <motion.div key={project.id} variants={fadeUp}>
                <Link
                  href={project.href}
                  className="group block relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300"
                  style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}
                    >
                      {ICON_MAP[project.icon] || <Sparkles className="w-5 h-5" />}
                    </div>
                    <ArrowRight className="w-4 h-4 transition-colors duration-300"
                      style={{ color: "var(--text-tertiary)" }}
                    />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white mb-1">
                    {project.title}
                  </h2>
                  <p className="text-xs font-medium mb-3"
                    style={{ color: "var(--accent-glow)" }}
                  >
                    {project.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {stats.map((stat) => (
                      <span key={stat.label}>
                        <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
                          {stat.label}
                        </span>
                        : {stat.value}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Features — asymmetric bento grid */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Everything You Need To Ship
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              From first setup to production deployment, we have you covered.
            </p>
          </ScrollReveal>
          <ScrollStagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data?.features ?? []).map((feature) => (
              <motion.div
                key={feature.id}
                variants={scaleIn}
                className={`group p-5 rounded-xl transition-all duration-300 ${
                  feature.span === "full" ? "md:col-span-2" : ""
                }`}
                style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                  >
                    {FEATURE_ICON_MAP[feature.icon] || <BookText className="w-5 h-5" />}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Demo Showcase */}
      <DemoSection initialDemos={initialDemos} />

      {/* Quick Start */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Start Building In Minutes
            </h2>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Four steps from zero to running your project locally.
            </p>
          </ScrollReveal>
          <ScrollStagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(data?.steps ?? []).map((step) => (
              <motion.div
                key={step.id}
                variants={fadeUp}
                className="relative p-5 rounded-xl"
                style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
              >
                <span className="text-3xl font-bold mb-2 block"
                  style={{
                    background: "linear-gradient(180deg, rgba(139,92,246,0.3), transparent)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  {String(step.step_number).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
                <pre className="text-[10px] p-2 rounded-lg overflow-x-auto font-mono"
                  style={{ color: "var(--text-tertiary)", background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
                >
                  {step.code}
                </pre>
              </motion.div>
            ))}
          </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollStagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(data?.stats ?? []).map((stat) => (
                <motion.div
                  key={stat.id}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-xl text-center transition-colors duration-200"
                  style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
                >
                  {SMALL_ICON_MAP[stat.icon] ? (
                    <div className="w-5 h-5 mx-auto mb-2"
                      style={{ color: "var(--accent-glow)" }}
                    >
                      {SMALL_ICON_MAP[stat.icon]}
                    </div>
                  ) : (
                    <BookText className="w-5 h-5 mx-auto mb-2" style={{ color: "var(--accent-glow)" }} />
                  )}
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Open Source */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
          <div className="rounded-2xl p-8 lg:p-12 text-center"
            style={{
              border: "1px solid var(--border-color)",
              background: "linear-gradient(135deg, rgba(139,92,246,0.03), transparent)"
            }}
          >
            <GithubIcon className="w-10 h-10 mx-auto mb-4" style={{ color: "var(--text-tertiary)" }} />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Fork It, Customize It, Build Anything
            </h2>
            <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              Both projects are MIT-licensed open source. Clone, customize,
              contribute, and deploy without restrictions.
            </p>
            {data.repos.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {data.repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
                >
                  <GithubIcon className="w-4 h-4" />
                  {repo.title}
                  <ExternalLink className="w-3 h-3" style={{ color: "var(--text-tertiary)" }} />
                </a>
              ))}
            </div>
            )}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <ScrollStagger>
          <div className="max-w-2xl mx-auto space-y-2">
            {(data?.faqs ?? []).map((faq, i) => (
              <motion.div
                key={faq.id}
                layout
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm text-white transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${faqOpen === i ? "rotate-90" : ""}`}
                    style={{ color: "var(--text-tertiary)" }}
                  />
                </button>
                {faqOpen === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="px-5 pb-4 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          </ScrollStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
          <div className="rounded-2xl p-8 lg:p-14 text-center relative overflow-hidden"
            style={{
              border: "1px solid var(--border-color)",
              background: "linear-gradient(135deg, rgba(139,92,246,0.08), transparent, rgba(45,212,191,0.05))"
            }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Ready To Build With Neural Aurora?
              </h2>
              <p className="text-sm max-w-lg mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
                Explore the complete documentation ecosystem and start building
                powerful experiences today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/docs"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                  style={{ background: "var(--brand-gradient-strong)" }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/neural-aurora/overview"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 active:scale-[0.98]"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--border-color)" }}
                >
                  View Docs
                  <BookOpen className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Built by{" "}
            <a
              href="https://github.com/Techhackontime999"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--accent-glow)" }}
            >
              Techhackontime999
            </a>{" "}
            &middot; MIT License &middot; 2026
          </p>
        </div>
      </footer>
    </div>
    <Background3D />
  </>
  );
}
