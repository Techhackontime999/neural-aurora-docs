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

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="group p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-aurora-500 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats[card.key]}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
