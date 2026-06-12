import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const [projects, features, stats, steps, faqs] = await Promise.all([
      supabase.from("home_projects").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_features").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_stats").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_steps").select("*").eq("is_published", true).order("sort_order", { ascending: true }).order("step_number", { ascending: true }),
      supabase.from("home_faqs").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    ]);

    for (const result of [projects, features, stats, steps, faqs]) {
      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      projects: projects.data,
      features: features.data,
      stats: stats.data,
      steps: steps.data,
      faqs: faqs.data,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load homepage content" }, { status: 500 });
  }
}
