"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface Demo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string;
  project_type: string;
  sort_order: number;
  is_published: boolean;
}

type ProjectType = "neural-aurora" | "wacrm" | "both";

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("both");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  const fetchDemos = async () => {
    try {
      const res = await fetch("/api/demos");
      const data = await res.json();
      setDemos(data.demos ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDemos(); }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setEmbedUrl("");
    setThumbnailUrl("");
    setProjectType("both");
    setSortOrder(0);
    setIsPublished(true);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (d: Demo) => {
    setTitle(d.title);
    setDescription(d.description || "");
    setVideoUrl(d.video_url || "");
    setEmbedUrl(d.embed_url || "");
    setThumbnailUrl(d.thumbnail_url || "");
    setProjectType(d.project_type as ProjectType);
    setSortOrder(d.sort_order || 0);
    setIsPublished(d.is_published);
    setEditId(d.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { title, description, video_url: videoUrl, embed_url: embedUrl, thumbnail_url: thumbnailUrl, project_type: projectType, sort_order: sortOrder, is_published: isPublished };

    if (editId) {
      await fetch(`/api/demos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    fetchDemos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this demo?")) return;
    await fetch(`/api/demos/${id}`, { method: "DELETE" });
    fetchDemos();
  };

  const handleTogglePublish = async (d: Demo) => {
    await fetch(`/api/demos/${d.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !d.is_published }),
    });
    fetchDemos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Demos
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add Demo"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Video URL</label>
              <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Embed URL</label>
              <input type="url" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Thumbnail URL</label>
              <input type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
              <select value={projectType} onChange={(e) => setProjectType(e.target.value as ProjectType)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500">
                <option value="both">Both</option>
                <option value="neural-aurora">NEURAL AURORA</option>
                <option value="wacrm">Neural Aurora CRM</option>
              </select>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
              </div>
              <label className="flex items-center gap-2 pb-2">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-aurora-500 focus:ring-aurora-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Published</span>
              </label>
            </div>
          </div>
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update" : "Add"} Demo
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : demos.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">No demos yet. Add one to show on the homepage.</div>
      ) : (
        <div className="space-y-3">
          {demos.map((d) => (
            <div key={d.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{d.title}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${d.project_type === "both" ? "bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400" : d.project_type === "neural-aurora" ? "bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400" : "bg-cyan-100 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400"}`}>
                    {d.project_type}
                  </span>
                </div>
                {d.description && (
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{d.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 ml-3 shrink-0">
                <button
                  onClick={() => handleTogglePublish(d)}
                  className={`p-1.5 rounded-lg transition-colors ${d.is_published ? "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800" : "text-slate-500 hover:text-green-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                  title={d.is_published ? "Unpublish" : "Publish"}
                >
                  {d.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(d)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(d.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
