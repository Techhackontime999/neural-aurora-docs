"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  sort_order: number;
}

export default function AdminExternalLinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/external-links");
      const data = await res.json();
      setLinks(data.links ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setUrl("");
    setSortOrder(0);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { title, url, sort_order: sortOrder };

    if (editId) {
      await fetch(`/api/external-links/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/external-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    fetchLinks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    await fetch(`/api/external-links/${id}`, { method: "DELETE" });
    fetchLinks();
  };

  const handleEdit = (item: LinkItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setUrl(item.url);
    setSortOrder(item.sort_order || 0);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          External Links
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. CRM Live" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL *</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://example.com" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
              {editId ? "Update Link" : "Create Link"}
            </button>
            <button type="button" onClick={resetForm} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">No external links yet.</div>
      ) : (
        <div className="space-y-3">
          {links.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-aurora-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{item.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
