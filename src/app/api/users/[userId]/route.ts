import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function adminAuthFetch(path: string, options: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
      ...options.headers,
    },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;
  const { action } = await request.json();

  if (action === "approve") {
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: true })
      .eq("user_id", userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (action === "reject") {
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: false })
      .eq("user_id", userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (action === "delete") {
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", userId);

    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 500 });

    const deleteRes = await adminAuthFetch(`/auth/v1/admin/users/${userId}`, {
      method: "DELETE",
    });

    if (!deleteRes.ok) {
      const errData = await deleteRes.json();
      return NextResponse.json({ error: errData.msg || "Failed to delete auth user" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: 'Invalid action. Use "approve", "reject", or "delete".' },
    { status: 400 }
  );
}
