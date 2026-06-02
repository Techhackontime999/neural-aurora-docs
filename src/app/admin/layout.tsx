"use client";

import { AuthProvider, useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  UserPlus,
  Download,
  Megaphone,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  BookOpen,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  {
    section: "Content",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Doc Pages", href: "/admin/docs", icon: FileText },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
    ],
  },
  {
    section: "Management",
    items: [
      { label: "Users", href: "/admin/users", icon: Users, adminOnly: true },
      { label: "Contributors", href: "/admin/contributors", icon: UserPlus },
      { label: "Demos", href: "/admin/demos", icon: PlayCircle },
      { label: "Installation Guides", href: "/admin/installation-guides", icon: Download },
      { label: "Release Notes", href: "/admin/release-notes", icon: Megaphone },
    ],
  },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, profileLoading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading || profileLoading) return;
    if (!user) { router.push("/login"); return; }
    if (!profile) { router.push("/approval-pending"); return; }
    if (profile.is_approved !== true) { router.push("/approval-pending"); }
  }, [user, profile, loading, profileLoading, router]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-6 h-6 border-2 border-aurora-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !profile || profile.is_approved !== true) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-aurora-400 to-aurora-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">N</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Docs Admin
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((group) => (
            <div key={group.section} className="mb-4">
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {group.section}
              </p>
              {group.items
                .filter((item: any) => !item.adminOnly || profile?.role === "admin")
                .map((item: any) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={clsx(
                        "flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors",
                        isActive
                          ? "bg-aurora-50 dark:bg-aurora-950/30 text-aurora-700 dark:text-aurora-300 font-medium"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 mt-4">
          <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400 truncate">
            {profile?.email}
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-aurora-500 transition-colors">
                Docs Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-medium">Admin</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-500 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Site
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
