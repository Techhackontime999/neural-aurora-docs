"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import AdminSearch from "@/components/AdminSearch";
import { containerVariants, itemVariants } from "@/lib/animations";

interface DocPage {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: { name: string; slug: string } | null;
  sort_order: number;
}

export default function AdminDocsPage() {
  const [pages, setPages] = useState<DocPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/docs");
      if (!res.ok) { setError("Failed to load pages"); return; }
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPages(data.pages ?? []);
      }
    } catch {
      setError("Failed to load pages. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPages(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return pages;
    const q = search.toLowerCase();
    return pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    );
  }, [pages, search]);

  const { selected, allVisibleSelected, toggleOne, toggleAll, clearSelection } = useMultiSelect(filtered);

  const handleSingleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/docs/${id}`, { method: "DELETE" });
    fetchPages();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} page${selected.size > 1 ? "s" : ""}?`)) return;
    setDeleting(true);
    await Promise.allSettled(
      [...selected].map((id) => fetch(`/api/docs/${id}`, { method: "DELETE" }))
    );
    clearSelection();
    setDeleting(false);
    fetchPages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Doc Pages
        </h1>
        <Link
          href="/admin/docs/new"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          New Page
        </Link>
      </div>

      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder="Search by title, slug, or category..." />
      </div>

      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-lg bg-aurora-50 dark:bg-aurora-950/20 border border-aurora-200 dark:border-aurora-900"
        >
          <span className="text-sm font-medium" style={{ color: "var(--accent-glow)" }}>
            {selected.size} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white text-xs font-medium transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleting ? "Deleting..." : "Delete Selected"}
          </button>
          <button
            onClick={clearSelection}
            className="px-3 py-1.5 rounded-md text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
          >
            Clear Selection
          </button>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-sm text-red-500">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>
          {search ? "No pages match your search." : "No pages yet. Create your first doc page."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border-color)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th className="w-10 px-2 py-3">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500"
                  />
                </th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Title</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Category</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Slug</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((page) => (
                <motion.tr
                  key={page.id}
                  variants={itemVariants}
                  layout
                  className={`last:border-0 transition-colors ${
                    selected.has(page.id)
                      ? "bg-aurora-50/50 dark:bg-aurora-950/10"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  }`} style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <td className="px-2 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(page.id)}
                      onChange={() => toggleOne(page.id)}
                      className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--text-primary)" }}>{page.title}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{page.category?.name ?? "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{page.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        page.status === "published"
                          ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/docs/${page.id}/edit`}
                        className="p-1.5 rounded-lg hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" style={{ color: "var(--text-tertiary)" }}
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleSingleDelete(page.id)}
                        className="p-1.5 rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" style={{ color: "var(--text-tertiary)" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
