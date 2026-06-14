"use client";

import { useEffect, useState, useRef } from "react";
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
  ChevronDown,
  FileSpreadsheet,
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

const CSV_COLS = [
  "table", "title", "slug", "content", "excerpt", "sort_order", "status",
  "category_id", "name", "description", "icon", "project_type",
  "version", "published_at", "video_url", "embed_url", "thumbnail_url", "is_published",
] as const;

function toCell(val: unknown): string {
  if (val == null) return "";
  const s = String(val);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function dataToCSV(data: {
  pages: Record<string, unknown>[];
  categories: Record<string, unknown>[];
  guides: Record<string, unknown>[];
  releases: Record<string, unknown>[];
  demos: Record<string, unknown>[];
}): string {
  const rows: string[] = [CSV_COLS.join(",")];
  const push = (table: string, item: Record<string, unknown>) => {
    rows.push(CSV_COLS.map((col) => toCell(col === "table" ? table : item[col])).join(","));
  };
  (data.pages || []).forEach((p) => push("pages", p));
  (data.categories || []).forEach((c) => push("categories", c));
  (data.guides || []).forEach((g) => push("guides", g));
  (data.releases || []).forEach((r) => push("releases", r));
  (data.demos || []).forEach((d) => push("demos", d));
  return rows.join("\n");
}

interface CSVRow {
  table: string;
  [key: string]: string;
}

function parseCSV(text: string): CSVRow[] {
  text = text.replace(/^\ufeff/, "");
  let lines: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "\n" && !inQuotes) {
      lines.push(current);
      current = "";
    } else if (ch === "\r" && !inQuotes) {
      continue;
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);
  lines = lines.filter((l) => l.trim());

  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]);
  const tableIdx = headers.findIndex((h) => h.trim().toLowerCase() === "table");
  if (tableIdx === -1) return [];

  const result: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i]);
    if (vals.length === 0) continue;
    const row: CSVRow = { table: vals[tableIdx]?.trim() || "" };
    headers.forEach((h, j) => {
      if (j !== tableIdx && j < vals.length) {
        row[h.trim()] = vals[j];
      }
    });
    result.push(row);
  }
  return result;
}

function parseCSVLine(line: string): string[] {
  const vals: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      vals.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  vals.push(current.trim());
  return vals;
}

const TABLE_ENDPOINT: Record<string, string> = {
  pages: "docs",
  categories: "categories",
  guides: "installation-guides",
  releases: "release-notes",
  demos: "demos",
};

function stripMeta(item: Record<string, unknown>): Record<string, unknown> {
  const { id, created_at, updated_at, category, ...rest } = item;
  if (rest.category_id == null && category && typeof category === "object") {
    rest.category_id = (category as Record<string, unknown>).id || (category as Record<string, unknown>).slug;
  }
  return rest;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0, categories: 0, users: 0, contributors: 0, guides: 0, releases: 0,
  });
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

  async function fetchAll() {
    const [pages, categories, guides, releases, demos] = await Promise.all([
      fetch("/api/docs").then((r) => r.ok ? r.json() : { pages: [] }),
      fetch("/api/categories").then((r) => r.ok ? r.json() : { categories: [] }),
      fetch("/api/installation-guides").then((r) => r.ok ? r.json() : { guides: [] }),
      fetch("/api/release-notes").then((r) => r.ok ? r.json() : { releases: [] }),
      fetch("/api/demos").then((r) => r.ok ? r.json() : { demos: [] }),
    ]);
    return {
      pages: pages.pages || [],
      categories: categories.categories || [],
      guides: guides.guides || [],
      releases: releases.releases || [],
      demos: demos.demos || [],
    };
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    a.click(); URL.revokeObjectURL(url);
  }

  const handleExportJSON = async () => {
    setExportOpen(false);
    try {
      const data = await fetchAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      downloadBlob(blob, `neural-aurora-docs-export-${new Date().toISOString().slice(0, 10)}.json`);
    } catch { alert("Export failed"); }
  };

  const handleExportCSV = async () => {
    setExportOpen(false);
    try {
      const data = await fetchAll();
      const csv = dataToCSV(data);
      const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
      downloadBlob(blob, `neural-aurora-docs-export-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch { alert("Export failed"); }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = ".json,.csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        let imported = 0;

          if (file.name.endsWith(".csv")) {
            const rows = parseCSV(text);
            const grouped: Record<string, CSVRow[]> = {};
            for (const row of rows) {
              if (!row.table) continue;
              if (!grouped[row.table]) grouped[row.table] = [];
              grouped[row.table].push(row);
            }
            for (const [table, items] of Object.entries(grouped)) {
              const endpoint = TABLE_ENDPOINT[table];
              if (!endpoint) continue;
              for (const item of items) {
                const { table: _, ...rest } = item;
                const metaStripped = stripMeta(rest as unknown as Record<string, unknown>);
                const body: Record<string, unknown> = {};
                for (const [k, v] of Object.entries(metaStripped)) {
                  if (v === "" || v == null) continue;
                  if (v === "true") { body[k] = true; continue; }
                  if (v === "false") { body[k] = false; continue; }
                  const num = Number(v);
                  body[k] = String(num) === v ? num : v;
                }
                const res = await fetch(`/api/${endpoint}`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
              });
              if (res.ok) imported++;
            }
          }
        } else {
          const data = JSON.parse(text);
          for (const table of ["pages", "categories", "guides", "releases", "demos"] as const) {
            const items = data[table];
            if (!items?.length) continue;
            const endpoint = TABLE_ENDPOINT[table];
            for (const item of items) {
              const res = await fetch(`/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stripMeta(item)),
              });
              if (res.ok) imported++;
            }
          }
        }
        alert(`Imported ${imported} items`);
      } catch { alert("Import failed — check file format"); }
    };
    input.click();
  };

  const handlePDF = () => {
    window.location.href = "/admin/print";
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

          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
              style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)", background: "var(--card-bg)" }}
            >
              <FileDown className="w-4 h-4" /> Export <ChevronDown className={`w-3 h-3 transition-transform ${exportOpen ? "rotate-180" : ""}`} />
            </button>
            {exportOpen && (
              <div
                className="absolute right-0 mt-1 w-44 rounded-lg overflow-hidden z-50"
                style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)", boxShadow: "var(--shadow-diffusion)" }}
              >
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <FileDown className="w-4 h-4" /> Export as JSON
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border-color)" }}
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export as CSV
                </button>
              </div>
            )}
          </div>

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
