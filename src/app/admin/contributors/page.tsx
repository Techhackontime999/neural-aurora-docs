"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import AdminSearch from "@/components/AdminSearch";
import { containerVariants, itemVariants } from "@/lib/animations";

interface Contributor {
  id: string;
  name: string;
  role: string;
  github_url: string;
  avatar_url: string;
  bio: string;
  sort_order: number;
}

export default function AdminContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchContributors = async () => {
    try {
      const res = await fetch("/api/contributors");
      const data = await res.json();
      setContributors(data.contributors ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContributors(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return contributors;
    const q = search.toLowerCase();
    return contributors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role?.toLowerCase().includes(q) ||
        c.bio?.toLowerCase().includes(q)
    );
  }, [contributors, search]);

  const { selected, allVisibleSelected, toggleOne, toggleAll, clearSelection } = useMultiSelect(filtered);

  const resetForm = () => {
    setName("");
    setRole("");
    setGithubUrl("");
    setAvatarUrl("");
    setBio("");
    setSortOrder(0);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (c: Contributor) => {
    setName(c.name);
    setRole(c.role || "");
    setGithubUrl(c.github_url || "");
    setAvatarUrl(c.avatar_url || "");
    setBio(c.bio || "");
    setSortOrder(c.sort_order || 0);
    setEditId(c.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { name, role, github_url: githubUrl, avatar_url: avatarUrl, bio, sort_order: sortOrder };

    if (editId) {
      await fetch(`/api/contributors/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/contributors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    fetchContributors();
  };

  const handleSingleDelete = async (id: string) => {
    if (!confirm("Delete this contributor?")) return;
    await fetch(`/api/contributors/${id}`, { method: "DELETE" });
    fetchContributors();
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} contributor${selected.size > 1 ? "s" : ""}?`)) return;
    setDeleting(true);
    await Promise.allSettled(
      [...selected].map((id) => fetch(`/api/contributors/${id}`, { method: "DELETE" }))
    );
    clearSelection();
    setDeleting(false);
    fetchContributors();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Contributors
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add Contributor"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
              <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Avatar URL</label>
              <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update" : "Add"} Contributor
          </button>
        </form>
      )}

      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder="Search contributors..." />
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
          {search ? "No contributors match your search." : "No contributors yet."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((c) => (
            <motion.div
              key={c.id}
              variants={itemVariants}
              layout
              className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between ${
                selected.has(c.id) ? "ring-2 ring-aurora-500/30" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.has(c.id)}
                  onChange={() => toggleOne(c.id)}
                  className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500 shrink-0"
                />
                {c.avatar_url ? (
                  <img src={c.avatar_url} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-aurora-100 dark:bg-aurora-950/30 flex items-center justify-center text-aurora-600 dark:text-aurora-400 font-bold text-sm shrink-0">
                    {c.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{c.name}</p>
                  {c.role && <p className="text-xs text-slate-500">{c.role}</p>}
                  {c.bio && <p className="text-xs text-slate-400 mt-0.5">{c.bio}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleEdit(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleSingleDelete(c.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
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
