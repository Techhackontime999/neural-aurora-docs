import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("doc_pages")
    .select("*, category:doc_categories(name, slug)")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages: data });
}

export async function POST(request: NextRequest) {
  const { error: authError, user } = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const { category_id, title, slug, content, excerpt, sort_order, status } = body;

  if (!category_id || !title || !slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("doc_pages")
    .insert({
      category_id,
      title,
      slug,
      content: content || "",
      excerpt: excerpt || "",
      sort_order: sort_order || 0,
      status: status || "published",
      author_id: user!.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ page: data });
}
