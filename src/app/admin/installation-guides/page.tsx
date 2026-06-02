"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";

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
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [projectType, setProjectType] = useState("neural-aurora");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchGuides = async () => {
    try {
      const res = await fetch("/api/installation-guides");
      const data = await res.json();
      setGuides(data.guides ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuides(); }, []);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this guide?")) return;
    await fetch(`/api/installation-guides/${id}`, { method: "DELETE" });
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
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Installation Guides
      </h1>

      <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); if (!editId) setSlug(generateSlug(e.target.value)); }} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500">
              <option value="neural-aurora">NEURAL AURORA</option>
              <option value="wacrm">Neural Aurora CRM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content (HTML)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aurora-500 resize-y" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update Guide" : "Create Guide"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setTitle(""); setSlug(""); setContent(""); setSortOrder(0); }} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : guides.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">No guides yet.</div>
      ) : (
        <div className="space-y-3">
          {guides.map((g) => (
            <div key={g.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{g.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-mono">{g.slug}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-medium">{g.project_type}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(g)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(g.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
