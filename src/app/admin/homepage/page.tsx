"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus, Edit, Trash2, Eye, EyeOff,
  Sparkles, BookText, Terminal, Code2, Palette, Rocket, Shield, MessageSquare, GitFork,
} from "lucide-react";
import AdminSearch from "@/components/AdminSearch";
import { containerVariants, itemVariants } from "@/lib/animations";

const TABS = [
  { key: "projects", label: "Projects", icon: Sparkles },
  { key: "features", label: "Features", icon: BookText },
  { key: "stats", label: "Stats", icon: Terminal },
  { key: "steps", label: "Steps", icon: Code2 },
  { key: "faqs", label: "FAQs", icon: MessageSquare },
  { key: "repos", label: "Repos", icon: GitFork },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface BaseItem {
  id: string;
  is_published: boolean;
  sort_order: number;
  [key: string]: unknown;
}

interface Project extends BaseItem {
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
  stat_label_1: string;
  stat_value_1: string;
  stat_label_2: string;
  stat_value_2: string;
}

interface Feature extends BaseItem {
  icon: string;
  title: string;
  description: string;
  span: string;
}

interface Stat extends BaseItem {
  value: string;
  label: string;
  icon: string;
}

interface Step extends BaseItem {
  step_number: number;
  title: string;
  description: string;
  code: string;
}

interface Faq extends BaseItem {
  question: string;
  answer: string;
}

interface Repo extends BaseItem {
  title: string;
  url: string;
}

type AnyItem = Project | Feature | Stat | Step | Faq | Repo;

const ICON_OPTIONS = [
  { value: "sparkles", label: "Sparkles" },
  { value: "book-text", label: "Book Text" },
  { value: "terminal", label: "Terminal" },
  { value: "search", label: "Search" },
  { value: "code-2", label: "Code" },
  { value: "palette", label: "Palette" },
  { value: "rocket", label: "Rocket" },
  { value: "shield", label: "Shield" },
  { value: "message-square", label: "Message" },
];

const GRADIENT_OPTIONS = [
  { value: "from-violet-500 via-purple-500 to-fuchsia-500", label: "Violet to Fuchsia" },
  { value: "from-blue-500 via-cyan-500 to-teal-500", label: "Blue to Teal" },
  { value: "from-emerald-500 via-teal-500 to-cyan-500", label: "Emerald to Cyan" },
  { value: "from-amber-500 via-orange-500 to-rose-500", label: "Amber to Rose" },
  { value: "from-rose-500 via-pink-500 to-purple-500", label: "Rose to Purple" },
];

const TabSearchFields: Record<TabKey, (keyof AnyItem)[]> = {
  projects: ["title", "tagline", "description"],
  features: ["title", "description"],
  stats: ["value", "label"],
  steps: ["title", "description", "code"],
  faqs: ["question", "answer"],
  repos: ["title", "url"],
};

export default function AdminHomepagePage() {
  const [tab, setTab] = useState<TabKey>("projects");
  const [items, setItems] = useState<AnyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/homepage/${tab}`);
      if (!res.ok) { setItems([]); return; }
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [tab]);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    const fields = TabSearchFields[tab];
    return items.filter((item) =>
      fields.some((field) => {
        const val = item[field];
        return typeof val === "string" && val.toLowerCase().includes(q);
      })
    );
  }, [items, search, tab]);

  const resetForm = () => {
    setFormData({});
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item: AnyItem) => {
    const data: Record<string, string | number | boolean> = {};
    for (const key of Object.keys(item)) {
      if (key !== "id" && key !== "created_at" && key !== "updated_at") {
        data[key] = item[key] as string | number | boolean;
      }
    }
    setFormData(data);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleChange = (key: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { ...formData };

    if (editId) {
      await fetch(`/api/homepage/${tab}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/homepage/${tab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/homepage/${tab}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleTogglePublish = async (item: AnyItem) => {
    await fetch(`/api/homepage/${tab}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !item.is_published }),
    });
    fetchItems();
  };

  const getSearchPlaceholder = () => {
    switch (tab) {
      case "faqs": return "Search FAQs...";
      case "steps": return "Search steps...";
      case "stats": return "Search stats...";
      default: return `Search ${tab}...`;
    }
  };

  const renderFormFields = () => {
    switch (tab) {
      case "projects":
        return (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Title *</label>
              <input type="text" value={(formData.title as string) || ""} onChange={(e) => handleChange("title", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Tagline</label>
              <input type="text" value={(formData.tagline as string) || ""} onChange={(e) => handleChange("tagline", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Description</label>
              <textarea value={(formData.description as string) || ""} onChange={(e) => handleChange("description", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Href</label>
              <input type="text" value={(formData.href as string) || ""} onChange={(e) => handleChange("href", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Icon</label>
              <select value={(formData.icon as string) || "sparkles"} onChange={(e) => handleChange("icon", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Gradient</label>
              <select value={(formData.gradient as string) || ""} onChange={(e) => handleChange("gradient", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                {GRADIENT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Stat Label 1</label>
              <input type="text" value={(formData.stat_label_1 as string) || ""} onChange={(e) => handleChange("stat_label_1", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Stat Value 1</label>
              <input type="text" value={(formData.stat_value_1 as string) || ""} onChange={(e) => handleChange("stat_value_1", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Stat Label 2</label>
              <input type="text" value={(formData.stat_label_2 as string) || ""} onChange={(e) => handleChange("stat_label_2", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Stat Value 2</label>
              <input type="text" value={(formData.stat_value_2 as string) || ""} onChange={(e) => handleChange("stat_value_2", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
          </>
        );

      case "features":
        return (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Title *</label>
              <input type="text" value={(formData.title as string) || ""} onChange={(e) => handleChange("title", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Description</label>
              <textarea value={(formData.description as string) || ""} onChange={(e) => handleChange("description", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Icon</label>
              <select value={(formData.icon as string) || "book-text"} onChange={(e) => handleChange("icon", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Span</label>
              <select value={(formData.span as string) || "half"} onChange={(e) => handleChange("span", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
            </div>
          </>
        );

      case "stats":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Value *</label>
              <input type="text" value={(formData.value as string) || ""} onChange={(e) => handleChange("value", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Label *</label>
              <input type="text" value={(formData.label as string) || ""} onChange={(e) => handleChange("label", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Icon</label>
              <select value={(formData.icon as string) || "book-text"} onChange={(e) => handleChange("icon", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </>
        );

      case "steps":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Step Number *</label>
              <input type="number" value={(formData.step_number as number) || ""} onChange={(e) => handleChange("step_number", Number(e.target.value))} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Title *</label>
              <input type="text" value={(formData.title as string) || ""} onChange={(e) => handleChange("title", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Description</label>
              <textarea value={(formData.description as string) || ""} onChange={(e) => handleChange("description", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Code</label>
              <input type="text" value={(formData.code as string) || ""} onChange={(e) => handleChange("code", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
          </>
        );

      case "faqs":
        return (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Question *</label>
              <input type="text" value={(formData.question as string) || ""} onChange={(e) => handleChange("question", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Answer *</label>
              <textarea value={(formData.answer as string) || ""} onChange={(e) => handleChange("answer", e.target.value)} rows={4} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
          </>
        );

      case "repos":
        return (
          <>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Title *</label>
              <input type="text" value={(formData.title as string) || ""} onChange={(e) => handleChange("title", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>URL *</label>
              <input type="text" value={(formData.url as string) || ""} onChange={(e) => handleChange("url", e.target.value)} required className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
            </div>
          </>
        );
    }
  };

  const renderSortAndPublish = () => (
    <>
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Sort Order</label>
        <input type="number" value={(formData.sort_order as number) ?? 0} onChange={(e) => handleChange("sort_order", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aurora-500" style={{ color: "var(--text-primary)", background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }} />
      </div>
      <div className="flex items-end pb-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={(formData.is_published as boolean) !== false} onChange={(e) => handleChange("is_published", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-aurora-500 focus:ring-aurora-500" />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Published</span>
        </label>
      </div>
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Homepage Content
        </h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto" style={{ borderBottom: "1px solid var(--border-color)" }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setShowForm(false); setSearch(""); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t.key
                ? "border-aurora-500"
                : "border-transparent"
            }`} style={{
              color: tab === t.key ? "var(--accent-glow)" : "var(--text-secondary)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 mb-6 rounded-xl space-y-4" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderFormFields()}
            {renderSortAndPublish()}
          </div>
          <button type="submit" className="px-4 py-2 rounded-lg bg-aurora-500 hover:bg-aurora-400 text-white text-sm font-medium transition-all active:scale-[0.98]">
            {editId ? "Update" : "Add"} {tab === "faqs" ? "FAQ" : tab === "steps" ? "Step" : tab.slice(0, -1)}
          </button>
        </form>
      )}

      {/* Search */}
      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder={getSearchPlaceholder()} />
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>
          {search ? `No ${tab} match your search.` : "No items yet. Add one above."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className="p-4 rounded-xl flex items-center justify-between" style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {tab === "faqs" ? (item as Faq).question : (item as Project | Feature | Step | Repo).title}
                  {tab === "stats" && ` — ${(item as Stat).value} ${(item as Stat).label}`}
                  {tab === "steps" && ` (Step ${(item as Step).step_number})`}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-tertiary)" }}>
                  {tab === "faqs" && (item as Faq).answer}
                  {tab === "projects" && (item as Project).tagline}
                  {tab === "features" && (item as Feature).description}
                  {tab === "stats" && (item as Stat).label}
                  {tab === "steps" && (item as Step).description}
                  {tab === "repos" && (item as Repo).url}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-3 shrink-0">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className={`p-1.5 rounded-lg transition-colors ${item.is_published ? "hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800" : "hover:text-green-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`} style={{ color: item.is_published ? "var(--text-tertiary)" : "var(--text-secondary)" }}
                  title={item.is_published ? "Unpublish" : "Publish"}
                >
                  {item.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" style={{ color: "var(--text-tertiary)" }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" style={{ color: "var(--text-tertiary)" }}>
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
