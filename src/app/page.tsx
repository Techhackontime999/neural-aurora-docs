import { createClient } from "@/lib/supabase/server";
import HomePageClient from "./home-page-client";

export const dynamic = "force-dynamic";

interface HomeProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
  stat_label_1: string;
  stat_value_1: string;
  stat_label_2: string;
  stat_value_2: string;
}

interface HomeFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  span: string;
}

interface HomeStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

interface HomeStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  code: string;
}

interface HomeFaq {
  id: string;
  question: string;
  answer: string;
}

interface HomepageData {
  projects: HomeProject[];
  features: HomeFeature[];
  stats: HomeStat[];
  steps: HomeStep[];
  faqs: HomeFaq[];
}

interface Demo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string;
  project_type: string;
}

export default async function HomePage() {
  const supabase = await createClient();

  let initialData: HomepageData = { projects: [], features: [], stats: [], steps: [], faqs: [] };
  let initialDemos: Demo[] = [];

  try {
    const [projects, features, stats, steps, faqs, demosResult] = await Promise.all([
      supabase.from("home_projects").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_features").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_stats").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("home_steps").select("*").eq("is_published", true).order("sort_order", { ascending: true }).order("step_number", { ascending: true }),
      supabase.from("home_faqs").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
      supabase.from("demos").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    ]);

    initialData = {
      projects: projects.data ?? [],
      features: features.data ?? [],
      stats: stats.data ?? [],
      steps: steps.data ?? [],
      faqs: faqs.data ?? [],
    };
    initialDemos = demosResult.data ?? [];
  } catch {}

  return <HomePageClient initialData={initialData} initialDemos={initialDemos} />;
}
