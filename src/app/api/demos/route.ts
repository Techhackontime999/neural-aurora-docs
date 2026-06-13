import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isPublic = searchParams.get("public") === "true";

  if (isPublic) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("demos")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ demos: data });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("demos")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ demos: data });
}

export async function POST(request: NextRequest) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const { title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("demos")
    .insert({ title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ demo: data });
}
