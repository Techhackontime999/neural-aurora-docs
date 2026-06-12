"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import AdminSearch from "@/components/AdminSearch";
import RichTextEditor from "@/components/RichTextEditor";
import { containerVariants, itemVariants } from "@/lib/animations";

interface ReleaseNote {
  id: string;
  title: string;
  version: string;
  project_type: string;
  content: string;
  published_at: string | null;
}

export default function AdminReleaseNotesPage() {
  const [releases, setReleases] = useState<ReleaseNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [projectType, setProjectType] = useState("neural-aurora");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const fetchReleases = async () => {
    try {
      const res = await fetch("/api/release-notes");
      if (!res.ok) { setReleases([]); return; }
      const data = await res.json();
      setReleases(data.releases ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReleases(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return releases;
    const q = search.toLowerCase();
    return releases.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.version.toLowerCase().includes(q) ||
        r.project_type.toLowerCase().includes(q)
    );
  }, [releases, search]);

  const { selected, allVisibleSelected, toggleOne, toggleAll, clearSelection } = useMultiSelect(filtered);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title,
      version,
      project_type: projectType,
      content,
      published_at: publishedAt || null,
    };

    if (editId) {
      await fetch(`/api/release-notes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/release-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setEditId(null);
    setTitle("");
    setVersion("");
    setContent("");
    setPublishedAt("");
    fetchReleases();
  };

  const handleSingleDelete = async (id: string) => {
    if (!confirm("Delete this release note?")) return;
    await fetch(`/api/release-notes/${id}`, { method: "DELETE" });
    fetchReleases();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} release note${selected.size > 1 ? "s" : ""}?`)) return;
    setDeleting(true);
    await Promise.allSettled(
      [...selected].map((id) => fetch(`/api/release-notes/${id}`, { method: "DELETE" }))
    );
    clearSelection();
    setDeleting(false);
    fetchReleases();
  };

  const handleEdit = (r: ReleaseNote) => {
    setEditId(r.id);
    setTitle(r.title);
    setVersion(r.version);
    setProjectType(r.project_type);
    setContent(r.content || "");
    setPublishedAt(r.published_at || "");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Release Notes
      </h1>

      <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Version *</label>
            <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="v2.3.0" required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500">
              <option value="neural-aurora">NEURAL AURORA</option>
              <option value="wacrm">Neural Aurora CRM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Published At</label>
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
            <RichTextEditor value={content} onChange={setContent} placeholder="Write release notes..." />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update" : "Create"} Release
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setTitle(""); setVersion(""); setContent(""); setPublishedAt(""); }} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder="Search release notes..." />
      </div>

      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-lg bg-aurora-50 dark:bg-aurora-950/20 border border-aurora-200 dark:border-aurora-900"
        >
          <span className="text-sm text-aurora-700 dark:text-aurora-300 font-medium">
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
            className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            Clear Selection
          </button>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">
          {search ? "No release notes match your search." : "No release notes yet."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((r) => (
            <motion.div
              key={r.id}
              variants={itemVariants}
              layout
              className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between ${
                selected.has(r.id) ? "ring-2 ring-aurora-500/30" : ""
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selected.has(r.id)}
                  onChange={() => toggleOne(r.id)}
                  className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500 shrink-0"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{r.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-aurora-600 dark:text-aurora-400 font-medium">{r.version}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-medium">{r.project_type}</span>
                    {r.published_at && (
                      <span className="text-xs text-slate-400">{new Date(r.published_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(r)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleSingleDelete(r.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
