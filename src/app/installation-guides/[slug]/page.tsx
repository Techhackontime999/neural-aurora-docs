import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InstallationGuidePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guide, error } = await supabase
    .from("installation_guides")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load guide: ${error.message}`);
  }

  if (!guide) {
    notFound();
  }

  return (
    <div className="prose-doc max-w-none">
      <div className="mb-8">
        <Link
          href={`/docs`}
          className="inline-flex items-center gap-1.5 text-xs mb-4 opacity-70 hover:opacity-100 transition-all"
          style={{ color: "var(--text-tertiary)" }}
        >
          <ArrowLeft className="w-3 h-3" />
          Back to documentation
        </Link>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          {guide.title}
        </h1>
      </div>

      <div dangerouslySetInnerHTML={{ __html: guide.content || "" }} />

      <hr className="my-8" />

      <Link
        href="/"
        className="text-sm hover:underline font-medium"
        style={{ color: "var(--accent-glow)" }}
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
