import { createClient } from "./supabase/server";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  let user;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return { error: NextResponse.json({ error: "Authentication service unavailable" }, { status: 503 }), user: null };
  }

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), user: null };
  }

  let profile;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("role, is_approved")
      .eq("user_id", user.id)
      .maybeSingle();
    profile = data;
  } catch {
    return { error: NextResponse.json({ error: "Database service unavailable" }, { status: 503 }), user: null };
  }

  if (!profile || (profile.role !== "admin" && profile.is_approved !== true)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), user: null };
  }

  return { error: null, user };
}
