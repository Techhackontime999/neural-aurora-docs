import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const SECTIONS = ["home_projects", "home_features", "home_stats", "home_steps", "home_faqs"] as const;

export async function GET() {
  const supabase = await createClient();

  try {
    const [projects, features, stats, steps, faqs] = await Promise.all(
      SECTIONS.map((table) =>
        supabase
          .from(table)
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true })
          .order("step_number", { ascending: true })
      )
    );

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
  } catch (e) {
    return NextResponse.json({ error: "Failed to load homepage content" }, { status: 500 });
  }
}
