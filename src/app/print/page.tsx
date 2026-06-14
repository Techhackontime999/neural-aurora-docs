import { createClient } from "@/lib/supabase/server";
import { PrintTrigger } from "@/app/admin/print/PrintTrigger";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface DocPage {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  sort_order: number;
  category: { name: string; slug: string } | null;
}

interface Guide {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  project_type: string;
}

interface Release {
  id: string;
  title: string;
  version: string;
  content: string | null;
  project_type: string;
  published_at: string | null;
}

interface Demo {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  embed_url: string | null;
  thumbnail_url: string | null;
  project_type: string | null;
}

export default async function PrintPage() {
  const supabase = await createClient();

  const [categoriesRes, pagesRes, guidesRes, releasesRes, demosRes] = await Promise.all([
    supabase.from("doc_categories").select("*").order("sort_order"),
    supabase.from("doc_pages").select("*, category:doc_categories(name, slug)").order("sort_order"),
    supabase.from("installation_guides").select("*").order("sort_order"),
    supabase.from("release_notes").select("*").order("created_at", { ascending: false }),
    supabase.from("demos").select("*").order("sort_order"),
  ]);

  const categories: Category[] = categoriesRes.data || [];
  const pages: DocPage[] = pagesRes.data || [];
  const guides: Guide[] = guidesRes.data || [];
  const releases: Release[] = releasesRes.data || [];
  const demos: Demo[] = demosRes.data || [];

  const pagesByCategory: Record<string, DocPage[]> = {};
  for (const page of pages) {
    const cat = page.category as { slug: string } | null;
    if (!cat) continue;
    if (!pagesByCategory[cat.slug]) pagesByCategory[cat.slug] = [];
    pagesByCategory[cat.slug].push(page);
  }

  let sectionNum = 0;

  const catSections = categories.map((cat) => {
    const num = ++sectionNum;
    const catPages = pagesByCategory[cat.slug] || [];
    return { ...cat, num, catPages };
  });

  const guideSectionNum = guides.length > 0 ? ++sectionNum : 0;
  const releaseSectionNum = releases.length > 0 ? ++sectionNum : 0;
  const demoSectonNum = demos.length > 0 ? ++sectionNum : 0;

  return (
    <>
      <PrintTrigger />
      <div className="print-content" style={{ background: "var(--bg-primary)" }}>

        <section
          className="print-cover relative flex items-center justify-center text-center overflow-hidden"
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(45,212,191,0.08) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }}
          />
          <div className="relative z-10 max-w-2xl mx-auto px-8">
            <div
              className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #a78bfa, #2dd4bf)" }}
            >
              <span className="text-white text-2xl font-bold">N</span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold tracking-tighter leading-none mb-4"
              style={{
                background: "linear-gradient(135deg, #c4b5fd, #a78bfa, #2dd4bf)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              NEURAL AURORA
            </h1>
            <p className="text-xl text-slate-300 font-light mb-2 tracking-wide">
              Full Documentation
            </p>
            <div
              className="w-20 h-0.5 mx-auto my-6 rounded-full"
              style={{ background: "var(--accent-glow)" }}
            />
            <p className="text-sm" style={{ color: "rgba(148,163,184,0.6)" }}>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        <section className="print-toc" style={{ background: "var(--bg-primary)" }}>
          <div className="max-w-4xl mx-auto px-8 py-16">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-1 h-7 rounded-full"
                style={{ background: "var(--brand-gradient)" }}
              />
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Table of Contents
              </h2>
            </div>

            <div className="space-y-2">
              {catSections.map((cat) => (
                <div key={cat.id}>
                  <div
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg transition-colors"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                    >
                      {cat.num}
                    </span>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-[11px] ml-auto font-mono"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {cat.catPages.length} {cat.catPages.length === 1 ? "page" : "pages"}
                    </span>
                  </div>
                  {cat.catPages.length > 0 && (
                    <div className="ml-12 space-y-0.5 mt-1 mb-2">
                      {cat.catPages.map((page, j) => (
                        <div
                          key={page.id}
                          className="flex items-center gap-2.5 py-1.5 px-3 rounded-md text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span
                            className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0"
                            style={{
                              background: "var(--input-bg)",
                              color: "var(--text-tertiary)",
                            }}
                          >
                            {j + 1}
                          </span>
                          <span className="truncate">{page.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {guideSectionNum > 0 && (
                <div>
                  <div
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                    >
                      {guideSectionNum}
                    </span>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Installation Guides
                    </span>
                  </div>
                  <div className="ml-12 space-y-0.5 mt-1 mb-2">
                    {guides.map((g, i) => (
                      <div
                        key={g.id}
                        className="flex items-center gap-2.5 py-1.5 px-3 rounded-md text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0"
                          style={{
                            background: "var(--input-bg)",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="truncate">{g.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {releaseSectionNum > 0 && (
                <div>
                  <div
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                    >
                      {releaseSectionNum}
                    </span>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Release Notes
                    </span>
                  </div>
                  <div className="ml-12 space-y-0.5 mt-1 mb-2">
                    {releases.map((r, i) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-2.5 py-1.5 px-3 rounded-md text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0"
                          style={{
                            background: "var(--input-bg)",
                            color: "var(--text-tertiary)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="truncate">
                          {r.title}{" "}
                          <span style={{ color: "var(--text-tertiary)" }}>
                            (v{r.version})
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {demoSectonNum > 0 && (
                <div>
                  <div
                    className="flex items-center gap-3 py-2.5 px-4 rounded-lg"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                    >
                      {demoSectonNum}
                    </span>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Demos
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {catSections.map((cat) => (
          <section
            key={cat.id}
            className="print-section"
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                >
                  Section {cat.num}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--glow-line)" }}
                />
              </div>
              <h2
                className="text-3xl font-bold tracking-tight mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {cat.num}. {cat.name}
              </h2>
              {cat.description && (
                <p
                  className="text-sm mb-8 max-w-2xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {cat.description}
                </p>
              )}

              {cat.catPages.length === 0 ? (
                <p
                  className="text-sm italic py-8 text-center"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  No pages in this category.
                </p>
              ) : (
                <div className="space-y-6">
                  {cat.catPages.map((page, j) => (
                    <article
                      key={page.id}
                      className="print-card rounded-xl overflow-hidden"
                      style={{
                        border: "1px solid var(--border-color)",
                        background: "var(--card-bg)",
                        boxShadow: "var(--shadow-diffusion)",
                      }}
                    >
                      <div
                        className="h-1"
                        style={{ background: "var(--brand-gradient)" }}
                      />
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[11px] font-mono font-medium"
                            style={{ color: "var(--accent-glow)" }}
                          >
                            {cat.num}.{j + 1}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-semibold tracking-tight mb-3"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {page.title}
                        </h3>
                        {page.excerpt && (
                          <p
                            className="text-sm mb-6"
                            style={{
                              color: "var(--text-secondary)",
                              fontStyle: "italic",
                            }}
                          >
                            {page.excerpt}
                          </p>
                        )}
                        <div
                          className="prose-doc max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: page.content || "",
                          }}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {guideSectionNum > 0 && (
          <section
            className="print-section"
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                >
                  Section {guideSectionNum}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--glow-line)" }}
                />
              </div>
              <h2
                className="text-3xl font-bold tracking-tight mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                {guideSectionNum}. Installation Guides
              </h2>
              <div className="space-y-6">
                {guides.map((guide, i) => (
                  <article
                    key={guide.id}
                    className="print-card rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid var(--border-color)",
                      background: "var(--card-bg)",
                      boxShadow: "var(--shadow-diffusion)",
                    }}
                  >
                    <div
                      className="h-1"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] font-mono font-medium"
                          style={{ color: "var(--accent-glow)" }}
                        >
                          {guideSectionNum}.{i + 1}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-semibold tracking-tight mb-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {guide.title}
                      </h3>
                      <div
                        className="prose-doc max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: guide.content || "",
                        }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {releaseSectionNum > 0 && (
          <section
            className="print-section"
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                >
                  Section {releaseSectionNum}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--glow-line)" }}
                />
              </div>
              <h2
                className="text-3xl font-bold tracking-tight mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                {releaseSectionNum}. Release Notes
              </h2>
              <div className="space-y-6">
                {releases.map((release, i) => (
                  <article
                    key={release.id}
                    className="print-card rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid var(--border-color)",
                      background: "var(--card-bg)",
                      boxShadow: "var(--shadow-diffusion)",
                    }}
                  >
                    <div
                      className="h-1"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] font-mono font-medium"
                          style={{ color: "var(--accent-glow)" }}
                        >
                          {releaseSectionNum}.{i + 1}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-semibold tracking-tight mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {release.title}
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Version {release.version}
                        {release.published_at && (
                          <>
                            {" "}—{" "}
                            {new Date(release.published_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </>
                        )}
                      </p>
                      <div
                        className="prose-doc max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: release.content || "",
                        }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {demoSectonNum > 0 && (
          <section
            className="print-section"
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: "var(--eyebrow-bg)", color: "var(--accent-glow)" }}
                >
                  Section {demoSectonNum}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "var(--glow-line)" }}
                />
              </div>
              <h2
                className="text-3xl font-bold tracking-tight mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                {demoSectonNum}. Demos
              </h2>
              <div className="space-y-6">
                {demos.map((demo, i) => (
                  <article
                    key={demo.id}
                    className="print-card rounded-xl overflow-hidden"
                    style={{
                      border: "1px solid var(--border-color)",
                      background: "var(--card-bg)",
                      boxShadow: "var(--shadow-diffusion)",
                    }}
                  >
                    <div
                      className="h-1"
                      style={{ background: "var(--brand-gradient)" }}
                    />
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] font-mono font-medium"
                          style={{ color: "var(--accent-glow)" }}
                        >
                          {demoSectonNum}.{i + 1}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-semibold tracking-tight mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {demo.title}
                      </h3>
                      {demo.description && (
                        <p
                          className="text-sm mb-4"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {demo.description}
                        </p>
                      )}
                      <div
                        className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {demo.project_type && (
                          <span>
                            Project:{" "}
                            <span style={{ color: "var(--accent-glow)" }}>
                              {demo.project_type}
                            </span>
                          </span>
                        )}
                        {demo.embed_url && (
                          <span className="truncate max-w-xs">
                            Embed: {demo.embed_url}
                          </span>
                        )}
                        {demo.video_url && (
                          <span className="truncate max-w-xs">
                            Video: {demo.video_url}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
