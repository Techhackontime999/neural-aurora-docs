"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { clsx } from "clsx";
import { BrandLogo } from "@/components/BrandLogo";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isDocsPage = pathname !== "/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            {isDocsPage && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 -ml-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size="small" />
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors min-w-[180px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search docs...</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                  ? "text-slate-300 dark:text-slate-600"
                  : user
                    ? "text-aurora-500 hover:text-aurora-600"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
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
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {mobileMenuOpen && isDocsPage && (
        <div
          className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {mobileMenuOpen && isDocsPage && (
        <div className="fixed left-0 top-14 bottom-0 z-50 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 overflow-y-auto lg:hidden animate-in slide-in-from-left">
          <Sidebar onClose={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}

// Import Sidebar dynamically to avoid circular dependency
import Sidebar from "./Sidebar";

interface SearchItem {
  title: string;
  href: string;
  category: string;
  excerpt: string;
  contentPlain: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function highlightText(text: string, query: string): ReactNode[] {
  if (!query) return [<span key="0">{text}</span>];
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-violet-500/20 text-violet-200 rounded-sm px-0.5">{part}</mark>
      : <span key={i}>{part}</span>
  );
}

function getSnippet(content: string, query: string, maxLen = 120): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, maxLen) + (content.length > maxLen ? "..." : "");
  const start = Math.max(0, idx - Math.floor((maxLen - query.length) / 2));
  const end = Math.min(content.length, start + maxLen);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < content.length ? "..." : "";
  return prefix + content.slice(start, end) + suffix;
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => { setQuery(""); setSelectedIdx(-1); }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/docs");
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const pages = data.pages ?? [];
        setItems(
          pages
            .filter((p: any) => p.status === "published")
            .map((p: any) => ({
              title: p.title,
              href: `/${(p.category as any)?.slug || "uncategorized"}/${p.slug}`,
              category: (p.category as any)?.name || "Uncategorized",
              excerpt: p.excerpt || "",
              contentPlain: stripHtml(p.content || ""),
            }))
        );
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  const q = query.trim().toLowerCase();

  const scored = q
    ? items
        .map((item) => {
          const titleMatch = item.title.toLowerCase().includes(q);
          const excerptMatch = item.excerpt.toLowerCase().includes(q);
          const contentMatch = item.contentPlain.toLowerCase().includes(q);
          const catMatch = item.category.toLowerCase().includes(q);

          let score = 0;
          if (titleMatch) score += 100;
          if (excerptMatch) score += 50;
          if (catMatch) score += 30;
          if (contentMatch) score += 10;

          if (item.title.toLowerCase().startsWith(q)) score += 200;

          return { item, score, match: titleMatch || excerptMatch || contentMatch || catMatch };
        })
        .filter((r) => r.match)
        .sort((a, b) => b.score - a.score)
    : items.map((item) => ({ item, score: 0, match: true }));

  const results = scored.map((r) => r.item);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIdx >= 0 && results[selectedIdx]) {
      e.preventDefault();
      onClose();
      window.location.href = results[selectedIdx].href;
    }
  };

  useEffect(() => {
    setSelectedIdx(-1);
  }, [query]);

  useEffect(() => {
    if (selectedIdx >= 0 && listRef.current) {
      const el = listRef.current.children[selectedIdx] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIdx]);

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  const hasQuery = q.length > 0;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-[12%] -translate-x-1/2 z-50 w-full max-w-xl">
        <div
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Search titles, content, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
            />
            {hasQuery && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                {results.length} results
              </span>
            )}
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-mono shrink-0">
              ESC
            </kbd>
          </div>

          {results.length > 0 ? (
            <div ref={listRef} className="max-h-96 overflow-y-auto p-2" role="listbox">
              {!hasQuery ? (
                results.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    role="option"
                    aria-selected={i === selectedIdx}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      i === selectedIdx
                        ? "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 min-w-[72px] shrink-0">
                      {item.category}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                ))
              ) : (
                Object.entries(grouped).map(([category, catItems]) => (
                  <div key={category}>
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {category}
                    </div>
                    {catItems.map((item, idx) => {
                      const globalIdx = results.indexOf(item);
                      const snippet = item.contentPlain
                        ? getSnippet(item.contentPlain, q)
                        : "";
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          role="option"
                          aria-selected={globalIdx === selectedIdx}
                          className={`block px-3 py-2.5 rounded-lg transition-colors ${
                            globalIdx === selectedIdx
                              ? "bg-violet-500/10"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                globalIdx === selectedIdx
                                  ? "text-violet-700 dark:text-violet-300"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {highlightText(item.title, q)}
                            </span>
                          </div>
                          {snippet && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                              {highlightText(snippet, q)}
                            </p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center py-12 px-4">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-400 dark:text-slate-500">
                {hasQuery ? `No results for "${query}"` : "Start typing to search..."}
              </p>
              {hasQuery && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Try searching by title, content, or category name
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
