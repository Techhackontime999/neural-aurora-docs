import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";

export async function GET() {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const admin = supabaseAdmin();
  const { data: users, error } = await admin
    .from("profiles")
    .select("id, user_id, full_name, email, role, is_approved, avatar_url, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users });
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
