import { NextResponse, type NextRequest } from "next/server";
import { callAi } from "@/lib/ai/provider";
import { USER_TOOLS, ADMIN_TOOLS, TOOL_TO_HANDLER } from "@/lib/ai/tools";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";

const USER_SYSTEM_PROMPT = `You are Neural Aurora Docs Assistant, a helpful guide for the Neural Aurora Documentation platform. You help users explore and understand documentation.

AVAILABLE TOOLS — Use these when asked:

1. dashboard_stats — get platform statistics
2. list_pages — list documentation pages
3. get_page — get details of a specific page
4. search_pages — search documentation by keyword
5. list_categories — list categories
6. list_contributors — list contributors
7. list_demos — list demos
8. list_installation_guides — list guides
9. list_release_notes — list releases
10. list_external_links — list external links
11. reply — use ONLY for greetings, thanks, or casual chat

You are READ-ONLY. You can only view content, never create, update, or delete anything.

INSTRUCTIONS:
- For "list" or "show" requests, call the corresponding list_* tool.
- For greetings or thanks, use the reply tool.
- Use your knowledge to answer questions about Neural Aurora, WACRM, and related tech.
- Current date: {date}`;

const ADMIN_SYSTEM_PROMPT = `You are Neural Aurora Docs Admin Assistant, an AI admin for the Neural Aurora Documentation platform. You have full control over all content.

AVAILABLE TOOLS — You MUST use these tools when the user requests an action:

READ TOOLS (view content):
1. dashboard_stats — platform statistics
2. list_pages — list all pages
3. get_page — view a specific page
4. search_pages — search documentation
5. list_categories — list categories
6. list_contributors — list contributors
7. list_demos — list demos
8. list_installation_guides — list guides
9. list_release_notes — list releases
10. list_external_links — list external links

WRITE TOOLS (manage content):
11. create_page(category_id, title, slug, content, excerpt, status)
12. update_page(id, title?, content?, excerpt?, status?, category_id?)
13. delete_page(id)
14. create_category(name, slug, description?, icon?)
15. update_category(id, name?, description?, icon?)
16. delete_category(id)
17. list_users — view all users
18. approve_user(user_id) — approve a user
19. list_homepage_sections(section?) — view homepage content
20. create_homepage_item(section, title, description)
21. delete_homepage_item(section, id)

21. reply — use ONLY for greetings, thanks, or casual chat

INSTRUCTIONS:
- When an admin asks to CREATE, UPDATE, DELETE — call the corresponding tool immediately.
- For LIST or SHOW requests, call the corresponding list_* tool.
- For greetings like "hello" or "thanks", use the reply tool.
- You manage: pages, categories, users, homepage content, contributors, demos, guides, releases, links.
- Current date: {date}`;

const USER_HANDLERS: Record<string, (args: any) => Promise<any>> = {
  async dashboard_stats() {
    const supabase = await createClient();
    const [pages, categories, contributors, guides, releases] = await Promise.all([
      supabase.from("doc_pages").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("doc_categories").select("*", { count: "exact", head: true }),
      supabase.from("contributors").select("*", { count: "exact", head: true }).eq("is_published", true),
      supabase.from("installation_guides").select("*", { count: "exact", head: true }).eq("is_published", true),
      supabase.from("release_notes").select("*", { count: "exact", head: true }).eq("is_published", true),
    ]);
    return {
      pagesCount: pages.count ?? 0,
      categoriesCount: categories.count ?? 0,
      contributorsCount: contributors.count ?? 0,
      guidesCount: guides.count ?? 0,
      releasesCount: releases.count ?? 0,
    };
  },

  async list_pages(args: any) {
    const supabase = await createClient();
    let query = supabase.from("doc_pages").select("id, title, slug, excerpt, category_id").eq("status", "published").order("sort_order", { ascending: true });
    if (args?.category_id) query = query.eq("category_id", args.category_id);
    const { data, error } = await query;
    if (error) return { error: error.message };
    return { pages: data };
  },

  async get_page(args: any) {
    if (!args?.title) return { error: "Title is required" };
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doc_pages")
      .select("id, title, slug, excerpt, content, category_id, created_at, updated_at")
      .or(`title.ilike.%${args.title}%,slug.ilike.%${args.title}%`)
      .eq("status", "published")
      .limit(1)
      .maybeSingle();
    if (error) return { error: error.message };
    if (!data) return { error: `Page "${args.title}" not found` };
    return { page: data };
  },

  async search_pages(args: any) {
    if (!args?.query) return { error: "Search query is required" };
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("doc_pages")
      .select("id, title, slug, excerpt, category_id")
      .eq("status", "published")
      .or(`title.ilike.%${args.query}%,excerpt.ilike.%${args.query}%,content.ilike.%${args.query}%`)
      .limit(10);
    if (error) return { error: error.message };
    return { pages: data };
  },

  async list_categories() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("doc_categories").select("*").order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { categories: data };
  },

  async list_contributors() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("contributors").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { contributors: data };
  },

  async list_demos() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("demos").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { demos: data };
  },

  async list_installation_guides() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("installation_guides").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { guides: data };
  },

  async list_release_notes() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("release_notes").select("*").eq("is_published", true).order("created_at", { ascending: false });
    if (error) return { error: error.message };
    return { releases: data };
  },

  async list_external_links() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("external_links").select("*").eq("is_published", true).order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { links: data };
  },
};

const ADMIN_HANDLERS: Record<string, (args: any) => Promise<any>> = {
  ...USER_HANDLERS,

  async dashboard_stats() {
    const admin = supabaseAdmin();
    const [pages, categories, users, contributors, guides, releases] = await Promise.all([
      admin.from("doc_pages").select("*", { count: "exact", head: true }),
      admin.from("doc_categories").select("*", { count: "exact", head: true }),
      admin.from("profiles").select("*", { count: "exact", head: true }),
      admin.from("contributors").select("*", { count: "exact", head: true }),
      admin.from("installation_guides").select("*", { count: "exact", head: true }),
      admin.from("release_notes").select("*", { count: "exact", head: true }),
    ]);
    return {
      pagesCount: pages.count ?? 0,
      categoriesCount: categories.count ?? 0,
      usersCount: users.count ?? 0,
      contributorsCount: contributors.count ?? 0,
      guidesCount: guides.count ?? 0,
      releasesCount: releases.count ?? 0,
    };
  },

  async list_pages(_args: any) {
    const admin = supabaseAdmin();
    const { data, error } = await admin.from("doc_pages").select("id, title, slug, excerpt, category_id, status, created_at").order("sort_order", { ascending: true });
    if (error) return { error: error.message };
    return { pages: data };
  },

  async create_page(args: any) {
    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from("doc_pages")
      .insert({ category_id: args.category_id, title: args.title, slug: args.slug, content: args.content || "", excerpt: args.excerpt || "", status: args.status || "published" })
      .select().single();
    if (error) return { error: error.message };
    return { page: data };
  },

  async update_page(args: any) {
    const admin = supabaseAdmin();
    const updates: any = {};
    if (args.title) updates.title = args.title;
    if (args.content !== undefined) updates.content = args.content;
    if (args.excerpt !== undefined) updates.excerpt = args.excerpt;
    if (args.status) updates.status = args.status;
    if (args.category_id) updates.category_id = args.category_id;
    if (Object.keys(updates).length === 0) return { error: "No fields to update" };
    const { data, error } = await admin.from("doc_pages").update(updates).eq("id", args.id).select().single();
    if (error) return { error: error.message };
    return { page: data };
  },

  async delete_page(args: any) {
    const admin = supabaseAdmin();
    const { error } = await admin.from("doc_pages").delete().eq("id", args.id);
    if (error) return { error: error.message };
    return { deleted: true };
  },

  async create_category(args: any) {
    const admin = supabaseAdmin();
    const { data, error } = await admin.from("doc_categories").insert({ name: args.name, slug: args.slug, description: args.description || "", icon: args.icon || "book" }).select().single();
    if (error) return { error: error.message };
    return { category: data };
  },

  async update_category(args: any) {
    const admin = supabaseAdmin();
    const updates: any = {};
    if (args.name) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.icon) updates.icon = args.icon;
    if (Object.keys(updates).length === 0) return { error: "No fields to update" };
    const { data, error } = await admin.from("doc_categories").update(updates).eq("id", args.id).select().single();
    if (error) return { error: error.message };
    return { category: data };
  },

  async delete_category(args: any) {
    const admin = supabaseAdmin();
    const { error } = await admin.from("doc_categories").delete().eq("id", args.id);
    if (error) return { error: error.message };
    return { deleted: true };
  },

  async list_users() {
    const admin = supabaseAdmin();
    const { data, error } = await admin.from("profiles").select("*").order("created_at", { ascending: false });
    if (error) return { error: error.message };
    return { users: data };
  },

  async approve_user(args: any) {
    const admin = supabaseAdmin();
    const { data, error } = await admin.from("profiles").update({ is_approved: true }).eq("user_id", args.user_id).select().single();
    if (error) return { error: error.message };
    return { user: data };
  },

  async list_homepage_sections(args: any) {
    const admin = supabaseAdmin();
    const sections = args?.section ? [args.section] : ["projects", "features", "stats", "steps", "faqs", "repos"];
    const results: any = {};
    for (const section of sections) {
      const table: Record<string, string> = { projects: "home_projects", features: "home_features", stats: "home_stats", steps: "home_steps", faqs: "home_faqs", repos: "home_repos" };
      const tableName = table[section as string];
      if (!tableName) continue;
      let query = admin.from(tableName).select("*").order("sort_order", { ascending: true });
      if (section === "steps") query = query.order("step_number", { ascending: true });
      const { data, error } = await query;
      if (!error) results[section as string] = data;
    }
    return results;
  },

  async create_homepage_item(args: any) {
    const table: Record<string, string> = { projects: "home_projects", features: "home_features", stats: "home_stats", steps: "home_steps", faqs: "home_faqs", repos: "home_repos" };
    const tableName = table[args.section as string];
    if (!tableName) return { error: `Unknown section: ${args.section}` };
    const admin = supabaseAdmin();
    const { data, error } = await admin.from(tableName).insert({ title: args.title, description: args.description || "" }).select().single();
    if (error) return { error: error.message };
    return { item: data };
  },

  async delete_homepage_item(args: any) {
    const table: Record<string, string> = { projects: "home_projects", features: "home_features", stats: "home_stats", steps: "home_steps", faqs: "home_faqs", repos: "home_repos" };
    const tableName = table[args.section as string];
    if (!tableName) return { error: `Unknown section: ${args.section}` };
    const admin = supabaseAdmin();
    const { error } = await admin.from(tableName).delete().eq("id", args.id);
    if (error) return { error: error.message };
    return { deleted: true };
  },
};

async function resolveIntent(message: string, history: { role: string; content: string }[], mode: "user" | "admin") {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return { intent: "unknown", reply: null, mode };
  }

  const systemPrompt = (mode === "admin" ? ADMIN_SYSTEM_PROMPT : USER_SYSTEM_PROMPT).replace("{date}", new Date().toLocaleDateString());
  const tools = mode === "admin" ? ADMIN_TOOLS : USER_TOOLS;

  try {
    const response = await callAi(
      [
        { role: "system", content: systemPrompt },
        ...history.slice(-10),
        { role: "user", content: message },
      ],
      tools,
    );

    const choice = response.choices[0];
    const toolCall = choice.message?.tool_calls?.[0];

    if (!toolCall) {
      const text = choice.message?.content;
      if (text) return { intent: "ai_reply", reply: text, mode };
      return { intent: "unknown", reply: null, mode };
    }

    const toolName = toolCall.function.name;
    const args = JSON.parse(toolCall.function.arguments);

    if (toolName === "reply") {
      return { intent: "ai_reply", reply: args.text ?? "", mode };
    }

    return { intent: TOOL_TO_HANDLER[toolName] ?? "unknown", args, mode };
  } catch (err) {
    console.error("AI intent resolution failed:", err);
    return { intent: "unknown", reply: null, mode };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, mode } = await request.json();
    const chatMode: "user" | "admin" = mode === "admin" ? "admin" : "user";

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (chatMode === "admin") {
      const { error: authError } = await requireAdmin();
      if (authError) {
        return NextResponse.json({ reply: "You must be an approved admin to use the admin assistant.", action: { type: "error", status: "error", detail: "Unauthorized" } });
      }
    }

    const resolved = await resolveIntent(message, history || [], chatMode);

    if (resolved.reply) {
      return NextResponse.json({
        reply: resolved.reply,
        action: { type: "ai_reply", status: "success" },
      });
    }

    if (resolved.intent === "unknown") {
      const helpText = chatMode === "admin"
        ? "I didn't understand that. As admin, I can:\n\n" +
          "• **Dashboard** — platform statistics\n" +
          "• **Pages** — list, search, view, create, update, delete\n" +
          "• **Categories** — list, create, update, delete\n" +
          "• **Users** — list, approve\n" +
          "• **Homepage** — view and manage all sections\n" +
          "• **Other** — contributors, demos, guides, releases, links\n\n" +
          'Try "list pages", "create a page", "show users", or "help".'
        : "I didn't understand that. I can help you with:\n\n" +
          "• **Dashboard** — platform statistics\n" +
          "• **Pages** — list, search, or view\n" +
          "• **Categories** — list\n" +
          "• **Contributors, Demos, Guides, Releases, Links** — list\n\n" +
          'Try "list pages", "search for react", "show dashboard", or "help".';

      return NextResponse.json({
        reply: helpText,
        action: { type: "unrecognized", status: "error" },
      });
    }

    const handlers = chatMode === "admin" ? ADMIN_HANDLERS : USER_HANDLERS;
    const handler = handlers[resolved.intent];

    if (!handler) {
      return NextResponse.json({
        reply: `I don't have a handler for "${resolved.intent}" in ${chatMode} mode.`,
        action: { type: "error", status: "error", detail: "Unknown intent" },
      });
    }

    const result = await handler(resolved.args);

    if (result.error) {
      return NextResponse.json({
        reply: `Error: ${result.error}`,
        action: { type: "error", status: "error", detail: result.error },
      });
    }

    const reply = formatResponse(resolved.intent, result);
    return NextResponse.json({
      reply,
      action: { type: resolved.intent, status: "success", detail: getDetail(resolved.intent, result) },
    });
  } catch (err: any) {
    console.error("AI chat error:", err);
    return NextResponse.json(
      { reply: `Error: ${err.message}`, action: { type: "error", status: "error", detail: err.message } },
      { status: 500 },
    );
  }
}

function formatResponse(intent: string, data: any): string {
  switch (intent) {
    case "dashboard_stats":
      const lines = [`**📊 Platform Statistics**`];
      if (data.pagesCount !== undefined) lines.push(`• Pages: **${data.pagesCount}**`);
      if (data.categoriesCount !== undefined) lines.push(`• Categories: **${data.categoriesCount}**`);
      if (data.usersCount !== undefined) lines.push(`• Users: **${data.usersCount}**`);
      if (data.contributorsCount !== undefined) lines.push(`• Contributors: **${data.contributorsCount}**`);
      if (data.guidesCount !== undefined) lines.push(`• Installation Guides: **${data.guidesCount}**`);
      if (data.releasesCount !== undefined) lines.push(`• Release Notes: **${data.releasesCount}**`);
      return lines.join("\n");

    case "list_pages": {
      const pages = data.pages;
      if (!pages || pages.length === 0) return "No pages found.";
      return `**${pages.length}** page(s):\n${pages.map((p: any, i: number) => `${i + 1}. **${p.title}** ${p.status === "draft" ? "(draft)" : ""} — ${p.excerpt?.slice(0, 60) || "No excerpt"}`).join("\n")}`;
    }

    case "get_page": {
      const page = data.page;
      if (!page) return "Page not found.";
      return `**${page.title}**\n_Slug:_ \`${page.slug}\`\n_Excerpt:_ ${page.excerpt || "—"}`;
    }

    case "search_pages": {
      const pages = data.pages;
      if (!pages || pages.length === 0) return "No results found.";
      return `**${pages.length}** result(s):\n${pages.map((p: any, i: number) => `${i + 1}. **${p.title}** — ${p.excerpt?.slice(0, 60) || "No excerpt"}`).join("\n")}`;
    }

    case "list_categories":
      if (!data.categories?.length) return "No categories found.";
      return `**${data.categories.length}** categor(ies):\n${data.categories.map((c: any, i: number) => `${i + 1}. **${c.name}** — ${c.description?.slice(0, 60) || "—"} (\`${c.slug}\`)`).join("\n")}`;

    case "list_contributors":
      if (!data.contributors?.length) return "No contributors found.";
      return `**${data.contributors.length}** contributor(s):\n${data.contributors.map((c: any, i: number) => `${i + 1}. **${c.name}** — ${c.role || "Contributor"}`).join("\n")}`;

    case "list_demos":
      if (!data.demos?.length) return "No demos found.";
      return `**${data.demos.length}** demo(s):\n${data.demos.map((d: any, i: number) => `${i + 1}. **${d.title}** — ${d.description?.slice(0, 60) || "—"}`).join("\n")}`;

    case "list_installation_guides":
      if (!data.guides?.length) return "No installation guides found.";
      return `**${data.guides.length}** guide(s):\n${data.guides.map((g: any, i: number) => `${i + 1}. **${g.title}** — ${g.description?.slice(0, 60) || "—"}`).join("\n")}`;

    case "list_release_notes":
      if (!data.releases?.length) return "No release notes found.";
      return `**${data.releases.length}** release note(s):\n${data.releases.map((r: any, i: number) => `${i + 1}. **${r.title}** — ${r.version ? `v${r.version}` : ""} (${r.created_at?.slice(0, 10) || "—"})`).join("\n")}`;

    case "list_external_links":
      if (!data.links?.length) return "No external links found.";
      return `**${data.links.length}** link(s):\n${data.links.map((l: any, i: number) => `${i + 1}. **${l.title}** — ${l.url}`).join("\n")}`;

    case "create_page":
    case "update_page":
      return `**${intent === "create_page" ? "Created" : "Updated"}** page **${data.page?.title || ""}**.`;
    case "delete_page":
      return "Page deleted.";
    case "create_category":
      return `Created category **${data.category?.name || ""}**.`;
    case "update_category":
      return `Updated category **${data.category?.name || ""}**.`;
    case "delete_category":
      return "Category deleted.";

    case "list_users":
      if (!data.users?.length) return "No users found.";
      return `**${data.users.length}** user(s):\n${data.users.map((u: any, i: number) => `${i + 1}. **${u.full_name || u.email}** — ${u.role} ${u.is_approved ? "✓" : "○"}`).join("\n")}`;

    case "approve_user":
      return `User **${data.user?.full_name || data.user?.email}** approved.`;

    case "list_homepage_sections": {
      const sectionNames = Object.keys(data);
      if (sectionNames.length === 0) return "No homepage sections found.";
      return sectionNames.map((s) => {
        const items = data[s];
        if (!items?.length) return `**${s}:** (empty)`;
        return `**${s}:** ${items.length} item(s)\n${items.map((it: any, i: number) => `  ${i + 1}. ${it.title || it.label || it.question || "—"}`).join("\n")}`;
      }).join("\n\n");
    }

    case "create_homepage_item":
      return `Added item to **${data.item?.title || "homepage"}**.`;
    case "delete_homepage_item":
      return "Homepage item deleted.";

    default:
      return "Done.";
  }
}

function getDetail(intent: string, data: any): string | undefined {
  switch (intent) {
    case "dashboard_stats":
      return `${data.pagesCount ?? "?"} pages`;
    case "list_pages":
      return `${data.pages?.length || 0} pages`;
    case "list_categories":
      return `${data.categories?.length || 0} categories`;
    case "list_contributors":
      return `${data.contributors?.length || 0} contributors`;
    case "list_demos":
      return `${data.demos?.length || 0} demos`;
    case "list_installation_guides":
      return `${data.guides?.length || 0} guides`;
    case "list_release_notes":
      return `${data.releases?.length || 0} releases`;
    case "list_external_links":
      return `${data.links?.length || 0} links`;
    case "list_users":
      return `${data.users?.length || 0} users`;
    case "create_page":
    case "update_page":
      return data.page?.title;
    case "create_category":
    case "update_category":
      return data.category?.name;
    default:
      return undefined;
  }
}
