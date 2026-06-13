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
  Link2,
  Home,
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  {
    section: "Content",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Homepage", href: "/admin/homepage", icon: Home },
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
      { label: "External Links", href: "/admin/external-links", icon: Link2 },
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "var(--accent-glow)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!user || !profile || profile.is_approved !== true) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
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
          "fixed top-0 left-0 z-50 h-full w-64 overflow-y-auto transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)" }}
      >
        <div className="p-4" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--brand-gradient)" }}>
                <span className="text-white text-xs font-bold">N</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Docs Admin
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((group) => (
            <div key={group.section} className="mb-4">
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
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
                        isActive ? "font-medium" : "hover:opacity-80"
                      )}
                      style={{
                        background: isActive ? "var(--eyebrow-bg)" : "transparent",
                        color: isActive ? "var(--accent-glow)" : "var(--text-secondary)"
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="p-3 mt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
          <div className="px-3 py-2 text-xs truncate" style={{ color: "var(--text-tertiary)" }}>
            {profile?.email}
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14"
          style={{ borderBottom: "1px solid var(--border-color)", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <Link href="/" className="transition-colors" style={{ color: "var(--text-secondary)" }}>
                Docs Home
              </Link>
              <span>/</span>
              <span className="font-medium" style={{ color: "var(--text-primary)" }}>Admin</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: "var(--text-tertiary)" }}
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
