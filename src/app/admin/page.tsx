"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderTree,
  Users,
  UserPlus,
  Download,
  Megaphone,
  ArrowRight,
  Upload,
  FileDown,
  Printer,
} from "lucide-react";

interface Stats {
  pages: number;
  categories: number;
  users: number;
  contributors: number;
  guides: number;
  releases: number;
}

const cards = [
  { label: "Doc Pages", href: "/admin/docs", icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30", key: "pages" as const },
  { label: "Categories", href: "/admin/categories", icon: FolderTree, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", key: "categories" as const },
  { label: "Users", href: "/admin/users", icon: Users, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/30", key: "users" as const },
  { label: "Contributors", href: "/admin/contributors", icon: UserPlus, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", key: "contributors" as const },
  { label: "Installation Guides", href: "/admin/installation-guides", icon: Download, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30", key: "guides" as const },
  { label: "Release Notes", href: "/admin/release-notes", icon: Megaphone, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/30", key: "releases" as const },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0, categories: 0, users: 0, contributors: 0, guides: 0, releases: 0,
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const results = await Promise.allSettled([
          fetch("/api/docs").then((r) => r.ok ? r.json() : { pages: [] }),
          fetch("/api/categories").then((r) => r.ok ? r.json() : { categories: [] }),
          fetch("/api/users").then((r) => r.ok ? r.json() : { users: [] }),
          fetch("/api/contributors").then((r) => r.ok ? r.json() : { contributors: [] }),
          fetch("/api/installation-guides").then((r) => r.ok ? r.json() : { guides: [] }),
          fetch("/api/release-notes").then((r) => r.ok ? r.json() : { releases: [] }),
        ]);

        if (cancelled) return;
        const [pages, categories, users, contributors, guides, releases] = results.map(
          (r) => (r.status === "fulfilled" ? r.value : {})
        );

        setStats({
          pages: pages.pages?.length ?? 0,
          categories: categories.categories?.length ?? 0,
          users: users.users?.length ?? 0,
          contributors: contributors.contributors?.length ?? 0,
          guides: guides.guides?.length ?? 0,
          releases: releases.releases?.length ?? 0,
        });
      } catch {
        // Stats are non-critical — silently degrade to zeros
      }
    }
    fetchStats();
    return () => { cancelled = true; };
  }, []);

  const handleExport = async () => {
    try {
      const [pages, categories, guides, releases, demos] = await Promise.all([
        fetch("/api/docs").then((r) => r.ok ? r.json() : { pages: [] }),
        fetch("/api/categories").then((r) => r.ok ? r.json() : { categories: [] }),
        fetch("/api/installation-guides").then((r) => r.ok ? r.json() : { guides: [] }),
        fetch("/api/release-notes").then((r) => r.ok ? r.json() : { releases: [] }),
        fetch("/api/demos").then((r) => r.ok ? r.json() : { demos: [] }),
      ]);

      const data = { pages: pages.pages, categories: categories.categories, guides: guides.guides, releases: releases.releases, demos: demos.demos };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `neural-aurora-docs-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click(); URL.revokeObjectURL(url);
    } catch { alert("Export failed"); }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        let imported = 0;
        for (const table of ["pages", "categories", "guides", "releases", "demos"] as const) {
          const items = data[table];
          if (!items?.length) continue;
          const endpoint = table === "pages" ? "docs" : table === "guides" ? "installation-guides" : table === "releases" ? "release-notes" : table;
          for (const item of items) {
            const { id, created_at, updated_at, ...rest } = item;
            const res = await fetch(`/api/${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rest) });
            if (res.ok) imported++;
          }
        }
        alert(`Imported ${imported} items`);
      } catch { alert("Import failed — check file format"); }
    };
    input.click();
  };

  const handlePDF = () => {
    window.print();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={handleImport} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "var(--card-bg)" }}>
            <Upload className="w-4 h-4" /> Import
          </button>
          <button onClick={handleExport} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "var(--card-bg)" }}>
            <FileDown className="w-4 h-4" /> Export
          </button>
          <button onClick={handlePDF} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-aurora-500 hover:bg-aurora-400 text-white transition-all active:scale-[0.98]">
            <Printer className="w-4 h-4" /> PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="group p-5 rounded-xl hover:shadow-md transition-all"
              style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <ArrowRight className="w-4 h-4 transition-colors"
                  style={{ color: "var(--text-tertiary)" }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {stats[card.key]}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
