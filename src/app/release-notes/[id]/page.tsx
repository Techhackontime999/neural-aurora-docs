import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReleaseNotePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: release, error } = await supabase
    .from("release_notes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load release note: ${error.message}`);
  }

  if (!release) {
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
          {release.title}
        </h1>
        <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
          Version {release.version}
          {release.published_at && (
            <> &middot; {new Date(release.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</>
          )}
        </p>
      </div>

      <div dangerouslySetInnerHTML={{ __html: release.content || "" }} />

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
