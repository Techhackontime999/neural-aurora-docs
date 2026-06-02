"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ChevronDown, FolderOpen, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface PageItem {
  title: string;
  href: string;
}

interface CategorySection {
  id: string;
  name: string;
  slug: string;
  items: PageItem[];
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [catRes, docRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/docs"),
        ]);

        const [catData, docData] = await Promise.all([
          catRes.json(),
          docRes.json(),
        ]);

        if (cancelled) return;

        const categories = catData.categories ?? [];
        const pages = docData.pages ?? [];

        const pageMap: Record<string, PageItem[]> = {};
        for (const page of pages) {
          if (page.status !== "published") continue;
          const cat = page.category as { slug: string } | null;
          if (!cat) continue;

          if (!pageMap[cat.slug]) pageMap[cat.slug] = [];
          pageMap[cat.slug].push({
            title: page.title,
            href: `/${cat.slug}/${page.slug}`,
          });
        }

        const result: CategorySection[] = categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          items: pageMap[cat.slug] || [],
        }));

        setSections(result);
        setExpandedSections(result.map((s) => s.name));
        setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="w-full py-4">
      <div className="px-4 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-aurora-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </Link>
      </div>

      {loading ? (
        <div className="px-4 py-8 text-center text-xs text-slate-400">Loading...</div>
      ) : sections.length === 0 ? (
        <div className="px-4 py-8 text-center text-xs text-slate-400">
          No categories yet. Add some from the admin panel.
        </div>
      ) : (
        <div className="space-y-1">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.name);
            return (
              <div key={section.slug}>
                <div className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-2">
                    <span className="text-aurora-500">
                      <FolderOpen className="w-4 h-4" />
                    </span>
                    {section.name}
                  </span>
                  {section.items.length > 0 && (
                    <button
                      onClick={() => toggleSection(section.name)}
                      className="p-0.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <ChevronDown
                        className={clsx(
                          "w-3 h-3 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {isExpanded && section.items.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          "flex items-center gap-2 px-4 py-2 text-sm border-l-2 transition-all duration-150",
                          isActive(item.href)
                            ? "border-aurora-500 bg-aurora-50 dark:bg-aurora-950/30 text-aurora-700 dark:text-aurora-300 font-medium"
                            : "border-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
                {isExpanded && section.items.length === 0 && (
                  <p className="px-4 py-1.5 text-xs text-slate-400 italic ml-6">
                    No pages yet
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && sections.length > 0 && (
        <div className="px-4 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <a
            href="https://neural-aurora.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            NEURAL AURORA Live
          </a>
          <a
            href="https://wacrm.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mt-2"
          >
            <ExternalLink className="w-3 h-3" />
            WACRM Live
          </a>
        </div>
      )}
    </nav>
  );
}
