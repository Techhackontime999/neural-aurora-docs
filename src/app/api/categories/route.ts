import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doc_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ categories: data });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const { name, slug, description, icon, sort_order } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error: dbError } = await supabase
    .from("doc_categories")
    .insert({ name, slug, description, icon, sort_order })
    .select()
    .single();

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ category: data });
}
