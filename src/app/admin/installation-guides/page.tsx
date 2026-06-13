"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import AdminSearch from "@/components/AdminSearch";
import RichTextEditor from "@/components/RichTextEditor";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Guide {
  id: string;
  title: string;
  slug: string;
  project_type: string;
  content: string;
  sort_order: number;
}

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [projectType, setProjectType] = useState("neural-aurora");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchGuides = async () => {
    try {
      const res = await fetch("/api/installation-guides");
      if (!res.ok) { setGuides([]); return; }
      const data = await res.json();
      setGuides(data.guides ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuides(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return guides;
    const q = search.toLowerCase();
    return guides.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.slug.toLowerCase().includes(q) ||
        g.project_type.toLowerCase().includes(q)
    );
  }, [guides, search]);

  const { selected, allVisibleSelected, toggleOne, toggleAll, clearSelection } = useMultiSelect(filtered);

  const generateSlug = (val: string) =>
    val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { title, slug, project_type: projectType, content, sort_order: sortOrder };

    if (editId) {
      await fetch(`/api/installation-guides/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/installation-guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setEditId(null);
    setTitle("");
    setSlug("");
    setContent("");
    setSortOrder(0);
    fetchGuides();
  };

  const handleSingleDelete = async (id: string) => {
    if (!confirm("Delete this guide?")) return;
    await fetch(`/api/installation-guides/${id}`, { method: "DELETE" });
    fetchGuides();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} guide${selected.size > 1 ? "s" : ""}?`)) return;
    setDeleting(true);
    await Promise.allSettled(
      [...selected].map((id) => fetch(`/api/installation-guides/${id}`, { method: "DELETE" }))
    );
    clearSelection();
    setDeleting(false);
    fetchGuides();
  };

  const handleEdit = (g: Guide) => {
    setEditId(g.id);
    setTitle(g.title);
    setSlug(g.slug);
    setProjectType(g.project_type);
    setContent(g.content || "");
    setSortOrder(g.sort_order || 0);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
        Installation Guides
      </h1>

      <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl space-y-4" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Title *</label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (!editId) setSlug(generateSlug(e.target.value)); }} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Project Type</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
              <option value="neural-aurora">NEURAL AURORA</option>
              <option value="wacrm">Neural Aurora CRM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Sort Order</label>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Content</label>
            <RichTextEditor value={content} onChange={setContent} placeholder="Write installation guide..." />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update Guide" : "Create Guide"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setTitle(""); setSlug(""); setContent(""); setSortOrder(0); }} className="px-4 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder="Search guides..." />
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>
          {search ? "No guides match your search." : "No guides yet."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((g) => (
            <motion.div
              key={g.id}
              variants={itemVariants}
              layout
              className={`p-4 rounded-xl flex items-center justify-between ${
                selected.has(g.id) ? "ring-2 ring-aurora-500/30" : ""
              }`} style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selected.has(g.id)}
                  onChange={() => toggleOne(g.id)}
                  className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500 shrink-0"
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{g.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{g.slug}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-medium" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}>{g.project_type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(g)} className="p-1.5 rounded-lg hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" style={{ color: "var(--text-tertiary)" }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleSingleDelete(g.id)} className="p-1.5 rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" style={{ color: "var(--text-tertiary)" }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
