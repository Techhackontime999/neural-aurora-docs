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
  const { title, version, project_type, content, published_at } = body;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("release_notes")
    .update({ title, version, project_type, content, published_at })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ release: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;

  const supabase = await createClient();
  const { error } = await supabase.from("release_notes").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
