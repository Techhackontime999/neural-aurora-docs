"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  FileText,
  FolderOpen,
} from "lucide-react";

interface PageItem {
  title: string;
  slug: string;
  excerpt: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  pages: PageItem[];
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DocsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        if (docData.error) {
          setError(docData.error);
          return;
        }

        const cats = catData.categories ?? [];
        const pages = docData.pages ?? [];

        const pageMap: Record<string, PageItem[]> = {};
        for (const p of pages) {
          if (p.status !== "published") continue;
          const cat = p.category as { slug: string } | null;
          if (!cat) continue;
          if (!pageMap[cat.slug]) pageMap[cat.slug] = [];
          pageMap[cat.slug].push({
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
          });
        }

        setCategories(
          cats.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            pages: pageMap[c.slug] || [],
          }))
        );
      } catch (e) {
        if (!cancelled) setError("Failed to load documentation. Check the console for details.");
        console.error("Error loading docs:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-slate-400">Loading documentation...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="max-w-3xl"
    >
      <motion.div variants={fadeUp} className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
          Documentation
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse all available documentation pages organized by project.
        </p>
      </motion.div>

      {error ? (
        <p className="text-sm text-red-500 py-8 text-center">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-slate-400 py-8 text-center">
          No documentation pages yet.
        </p>
      ) : (
        <div className="space-y-8">
          {categories.map((category, i) => (
            <motion.div key={category.id} variants={fadeUp}>
              <div className="flex items-center gap-2 mb-3">
                <FolderOpen className="w-4 h-4 text-aurora-500" />
                <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  {category.name}
                </h2>
              </div>

              {category.pages.length === 0 ? (
                <p className="text-xs text-slate-400 ml-6 italic">
                  No pages yet
                </p>
              ) : (
                <div className="space-y-1">
                  {category.pages.map((page, j) => (
                    <Link
                      key={page.slug}
                      href={`/${category.slug}/${page.slug}`}
                      className="group flex items-start gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-aurora-200 dark:hover:border-aurora-800 hover:bg-aurora-50/50 dark:hover:bg-aurora-950/20 transition-all duration-200"
                    >
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-aurora-500 mt-0.5 shrink-0 transition-colors" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-aurora-700 dark:group-hover:text-aurora-300 transition-colors">
                            {page.title}
                          </span>
                          <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-aurora-500 transition-colors shrink-0" />
                        </div>
                        {page.excerpt && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {page.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
        >
          &larr; Back to home
        </Link>
      </motion.div>
    </motion.div>
  );
}
