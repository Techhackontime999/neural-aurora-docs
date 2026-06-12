import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

const VALID_SECTIONS = ["projects", "features", "stats", "steps", "faqs"] as const;
const TABLE_MAP: Record<string, string> = {
  projects: "home_projects",
  features: "home_features",
  stats: "home_stats",
  steps: "home_steps",
  faqs: "home_faqs",
};

type Section = (typeof VALID_SECTIONS)[number];

function isValidSection(s: string): s is Section {
  return VALID_SECTIONS.includes(s as Section);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { section, id } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await request.json();
  const admin = supabaseAdmin();
  const table = TABLE_MAP[section];
  const { data, error } = await admin
    .from(table)
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { section, id } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const table = TABLE_MAP[section];
  const { error } = await admin.from(table).delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
