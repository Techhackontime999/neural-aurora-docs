import { supabaseAdmin } from "@/lib/supabase/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DynamicDocPage({ params }: Props) {
  const { slug: slugs } = await params;

  if (!slugs || slugs.length === 0) {
    notFound();
  }

  const admin = supabaseAdmin();

  // Try to match: /:categorySlug/:pageSlug
  if (slugs.length === 2) {
    const [categorySlug, pageSlug] = slugs;

    const { data: category } = await admin
      .from("doc_categories")
      .select("id, name")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (category) {
      const { data: page } = await admin
        .from("doc_pages")
        .select("*")
        .eq("category_id", category.id)
        .eq("slug", pageSlug)
        .eq("status", "published")
        .maybeSingle();

      if (page) {
        return (
          <div className="prose-doc max-w-none">
            <div className="mb-8">
              <Link
                href={`/${categorySlug}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-4"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to {category.name}
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {page.title}
              </h1>
              {page.excerpt && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {page.excerpt}
                </p>
              )}
            </div>

            <div dangerouslySetInnerHTML={{ __html: page.content || "" }} />

            <hr className="my-8" />

            <Link
              href="/"
              className="text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
            >
              &larr; Back to home
            </Link>
          </div>
        );
      }
    }
  }

  // Try to match a standalone page by full slug path
  const fullSlug = slugs.join("/");

  const { data: page } = await admin
    .from("doc_pages")
    .select("*, category:doc_categories(name, slug)")
    .eq("slug", fullSlug)
    .eq("status", "published")
    .maybeSingle();

  if (!page) {
    notFound();
  }

  const category = page.category as { name: string; slug: string } | null;

  return (
    <div className="prose-doc max-w-none">
      <div className="mb-8">
        <Link
          href={category ? `/${category.slug}` : "/"}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" />
          {category ? `Back to ${category.name}` : "Back to home"}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {page.title}
        </h1>
        {page.excerpt && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {page.excerpt}
          </p>
        )}
      </div>

      <div dangerouslySetInnerHTML={{ __html: page.content || "" }} />

      <hr className="my-8" />

      <Link
        href="/"
        className="text-sm text-aurora-600 dark:text-aurora-400 hover:underline font-medium"
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
