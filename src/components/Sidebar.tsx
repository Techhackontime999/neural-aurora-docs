"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { ChevronDown, ExternalLink } from "lucide-react";
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

interface ExternalLinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  sort_order: number;
}

function NeuralDot() {
  return (
    <svg width="12" height="12" viewBox="0 0 100 100" fill="none" className="shrink-0">
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="18" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
      <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
      <circle cx="50" cy="50" r="4" fill="currentColor" fillOpacity="0.8" />
      <circle cx="48.5" cy="48.5" r="1.5" fill="white" fillOpacity="0.5" />
    </svg>
  );
}

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<CategorySection[]>([]);
  const [externalLinks, setExternalLinks] = useState<ExternalLinkItem[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [catRes, docRes, linkRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/docs"),
          fetch("/api/external-links"),
        ]);

        const [catData, docData, linkData] = await Promise.all([
          catRes.json(),
          docRes.json(),
          linkRes.json(),
        ]);

        if (cancelled) return;

        if (docData.error) {
          setError(docData.error);
          return;
        }

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
        setExternalLinks(linkData.links ?? []);
        setExpandedSections(result.map((s) => s.name));
        setLoading(false);
      } catch (e) {
        if (!cancelled) setError("Failed to load navigation.");
        console.error("Error loading sidebar data:", e);
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
      <div className="px-4 pb-4 mb-4 border-b border-[var(--border-color)]">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            style={{ color: "var(--accent-glow)" }}
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
        <div className="px-4 py-8 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>Loading...</div>
      ) : error ? (
        <div className="px-4 py-8 text-center text-xs text-red-500">{error}</div>
      ) : sections.length === 0 ? (
        <div className="px-4 py-8 text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
          No categories yet. Add some from the admin panel.
        </div>
      ) : (
        <div className="space-y-0.5">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.name);
            const hasActiveChild = section.items.some((item) => isActive(item.href));
            return (
              <div key={section.slug}>
                <button
                  onClick={() => toggleSection(section.name)}
                  className="flex items-center justify-between w-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors"
                  style={{ color: hasActiveChild ? "var(--accent-glow)" : "var(--text-tertiary)" }}
                >
                  <span className="flex items-center gap-2">
                    <span style={{ color: "var(--accent-glow)", opacity: hasActiveChild ? 1 : 0.6 }}>
                      <NeuralDot />
                    </span>
                    {section.name}
                  </span>
                  {section.items.length > 0 && (
                    <ChevronDown
                      className={clsx(
                        "w-3 h-3 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  )}
                </button>
                {isExpanded && section.items.length > 0 && (
                  <div className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={clsx(
                          "flex items-center gap-2 px-4 py-1.5 text-sm border-l-2 transition-all duration-150",
                          isActive(item.href)
                            ? "font-medium"
                            : "hover:opacity-80"
                        )}
                        style={{
                          borderColor: isActive(item.href) ? "var(--accent-glow)" : "transparent",
                          background: isActive(item.href) ? "var(--eyebrow-bg)" : "transparent",
                          color: isActive(item.href) ? "var(--accent-glow)" : "var(--text-secondary)",
                        }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
                {isExpanded && section.items.length === 0 && (
                  <p className="px-4 py-1 text-xs italic" style={{ color: "var(--text-tertiary)" }}>
                    No pages yet
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && externalLinks.length > 0 && (
        <div className="px-4 mt-6 pt-4 border-t border-[var(--border-color)]">
          {externalLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs mt-2 first:mt-0 transition-colors"
              style={{ color: "var(--text-tertiary)" }}
            >
              <ExternalLink className="w-3 h-3" />
              {link.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
