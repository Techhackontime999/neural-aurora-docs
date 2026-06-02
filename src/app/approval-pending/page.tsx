"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BrandLogo } from "@/components/BrandLogo";
import { Clock, LogOut } from "lucide-react";

export default function ApprovalPendingPage() {
  const [mounted, setMounted] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/10 dark:from-amber-900/5 via-transparent to-transparent pointer-events-none" />
      <div className="w-full max-w-sm text-center relative">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
          <div className="flex justify-center mb-6">
            <BrandLogo size="large" />
          </div>

          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center border border-amber-200/50 dark:border-amber-800/30">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Account pending approval
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            Your account is awaiting approval from an administrator. You&apos;ll
            receive access once your account has been reviewed. Please check back
            later.
          </p>

          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}
