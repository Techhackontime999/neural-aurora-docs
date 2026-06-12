import { supabaseAdmin } from "@/lib/supabase/admin";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string[] }>;
}

function DocContent({
  page,
  categorySlug,
  categoryName,
}: {
  page: { title: string; excerpt?: string | null; content?: string | null };
  categorySlug?: string;
  categoryName?: string;
}) {
  return (
    <div className="prose-doc max-w-none">
      <div className="mb-8">
        {categorySlug && (
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to {categoryName ?? categorySlug}
          </Link>
        )}
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

export default async function DynamicDocPage({ params }: Props) {
  const { slug: slugs } = await params;

  if (!slugs || slugs.length === 0) {
    notFound();
  }

  const admin = supabaseAdmin();

  // Single-segment URL: show the category index (first page by sort_order)
  if (slugs.length === 1) {
    const [categorySlug] = slugs;

    const { data: category, error: catErr } = await admin
      .from("doc_categories")
      .select("id, name")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catErr) {
      throw new Error(`Failed to load category: ${catErr.message}`);
    }

    if (category) {
      const { data: page, error: pageErr } = await admin
        .from("doc_pages")
        .select("title, excerpt, content")
        .eq("category_id", category.id)
        .eq("status", "published")
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (pageErr) {
        throw new Error(`Failed to load page: ${pageErr.message}`);
      }

      if (page) {
        return (
          <DocContent
            page={page}
            categorySlug={categorySlug}
            categoryName={category.name}
          />
        );
      }
    }

    notFound();
  }

  // Two-segment URL: /:categorySlug/:pageSlug
  if (slugs.length === 2) {
    const [categorySlug, pageSlug] = slugs;

    const { data: category, error: catErr } = await admin
      .from("doc_categories")
      .select("id, name")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (catErr) {
      throw new Error(`Failed to load category: ${catErr.message}`);
    }

    if (category) {
      const { data: page, error: pageErr } = await admin
        .from("doc_pages")
        .select("*")
        .eq("category_id", category.id)
        .eq("slug", pageSlug)
        .eq("status", "published")
        .maybeSingle();

      if (pageErr) {
        throw new Error(`Failed to load page: ${pageErr.message}`);
      }

      if (page) {
        return (
          <DocContent
            page={page}
            categorySlug={categorySlug}
            categoryName={category.name}
          />
        );
      }
    }
  }

  // Standalone page by full slug path
  const fullSlug = slugs.join("/");

  const { data: page, error: pageErr } = await admin
    .from("doc_pages")
    .select("*, category:doc_categories(name, slug)")
    .eq("slug", fullSlug)
    .eq("status", "published")
    .maybeSingle();

  if (pageErr) {
    throw new Error(`Failed to load page: ${pageErr.message}`);
  }

  if (!page) {
    notFound();
  }

  const category = page.category as { name: string; slug: string } | null;

  return (
    <DocContent
      page={page}
      categorySlug={category?.slug}
      categoryName={category?.name}
    />
  );
}
