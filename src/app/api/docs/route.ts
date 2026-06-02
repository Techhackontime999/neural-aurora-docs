import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse, type NextRequest } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const query = supabaseAdmin()
    .from("doc_pages")
    .select("*, category:doc_categories(name, slug)");

  if (!user) {
    query.eq("status", "published");
  }

  query.order("sort_order", { ascending: true });

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pages: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
      author_id: user.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ page: data });
}
