import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  const { title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published } = body;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("demos")
    .update({ title, description, video_url, embed_url, thumbnail_url, project_type, sort_order, is_published })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ demo: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;

  const supabase = await createClient();
  const { error } = await supabase.from("demos").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
