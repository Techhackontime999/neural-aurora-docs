import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

const VALID_SECTIONS = ["projects", "features", "stats", "steps", "faqs", "repos"] as const;
const TABLE_MAP: Record<string, string> = {
  projects: "home_projects",
  features: "home_features",
  stats: "home_stats",
  steps: "home_steps",
  faqs: "home_faqs",
  repos: "home_repos",
};

type Section = (typeof VALID_SECTIONS)[number];

function isValidSection(s: string): s is Section {
  return VALID_SECTIONS.includes(s as Section);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string; id: string }> }
) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { section, id } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const body = await request.json();
  const supabase = await createClient();
  const table = TABLE_MAP[section];
  const { data, error } = await supabase
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
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { section, id } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const supabase = await createClient();
  const table = TABLE_MAP[section];
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
