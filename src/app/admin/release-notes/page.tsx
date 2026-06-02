"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

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
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [projectType, setProjectType] = useState("neural-aurora");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const fetchReleases = async () => {
    try {
      const res = await fetch("/api/release-notes");
      const data = await res.json();
      setReleases(data.releases ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReleases(); }, []);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this release note?")) return;
    await fetch(`/api/release-notes/${id}`, { method: "DELETE" });
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
              <option value="wacrm">WACRM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Published At</label>
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content (HTML)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-aurora-500 resize-y" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update" : "Create"} Release
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setTitle(""); setVersion(""); setContent(""); setPublishedAt(""); }} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : releases.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">No release notes yet.</div>
      ) : (
        <div className="space-y-3">
          {releases.map((r) => (
            <div key={r.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
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
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(r)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
