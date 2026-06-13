"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const nonDocsPaths = ["/", "/admin", "/login", "/signup", "/approval-pending", "/forgot-password"];

function isDocsPage(pathname: string) {
  return !nonDocsPaths.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p))
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showDocsLayout = isDocsPage(pathname);

  if (!showDocsLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex max-w-[1400px] mx-auto">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto" style={{ borderRight: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
            <Sidebar />
          </div>
        </aside>
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-10 xl:px-14">
          {children}
        </main>
      </div>
    </>
  );
}
