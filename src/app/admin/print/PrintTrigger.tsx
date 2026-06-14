"use client";

import { Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export function PrintTrigger() {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 print:hidden"
    >
      <button
        onClick={() => router.back()}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
        style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)" }}
      >
        Back
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #a78bfa)" }}
      >
        <Printer className="w-4 h-4" /> Print / PDF
      </button>
    </div>
  );
}
