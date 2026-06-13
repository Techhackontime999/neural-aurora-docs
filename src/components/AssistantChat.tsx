"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface QuickAction {
  label: string;
  category: string;
  prompt: string;
}

interface DirectAction {
  label: string;
  category: string;
  api: { method: string; url: string };
}

type ActionItem = QuickAction | DirectAction;

function isDirectAction(a: ActionItem): a is DirectAction {
  return "api" in a;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  action?: { type: string; status: string; detail?: string };
}

interface AssistantChatProps {
  variant?: "floating" | "full";
  onClose?: () => void;
  mode?: "user" | "admin";
}

const USER_QUICK_ACTIONS: ActionItem[] = [
  { label: "Dashboard", category: "Overview", api: { method: "GET", url: "/api/homepage" } },
  { label: "Help", category: "Overview", prompt: "Help" },
  { label: "List Pages", category: "Pages", api: { method: "GET", url: "/api/docs" } },
  { label: "Categories", category: "Categories", api: { method: "GET", url: "/api/categories" } },
  { label: "Contributors", category: "Content", api: { method: "GET", url: "/api/contributors" } },
  { label: "Demos", category: "Content", api: { method: "GET", url: "/api/demos" } },
  { label: "Installation Guides", category: "Content", api: { method: "GET", url: "/api/installation-guides" } },
  { label: "Release Notes", category: "Content", api: { method: "GET", url: "/api/release-notes" } },
  { label: "External Links", category: "Content", api: { method: "GET", url: "/api/external-links" } },
];

const ADMIN_QUICK_ACTIONS: ActionItem[] = [
  // Overview
  { label: "Dashboard", category: "Overview", api: { method: "GET", url: "/api/admin/stats" } },
  { label: "Help", category: "Overview", prompt: "Help" },

  // Pages
  { label: "List Pages", category: "Pages", api: { method: "GET", url: "/api/docs" } },
  { label: "Create Page", category: "Pages", prompt: 'Create a page in category "neural-aurora" with title "Example" and slug "example"' },
  { label: "Update Page", category: "Pages", prompt: 'Update page with id "..." — set title to "New Title"' },
  { label: "Delete Page", category: "Pages", prompt: 'Delete page with id "..."' },

  // Categories
  { label: "Categories", category: "Categories", api: { method: "GET", url: "/api/categories" } },
  { label: "Create Category", category: "Categories", prompt: 'Create category "Getting Started" with slug "getting-started"' },
  { label: "Update Category", category: "Categories", prompt: 'Update category with id "..."' },
  { label: "Delete Category", category: "Categories", prompt: 'Delete category with id "..."' },

  // Users
  { label: "List Users", category: "Users", api: { method: "GET", url: "/api/users" } },

  // Contributors
  { label: "Contributors", category: "Contributors", api: { method: "GET", url: "/api/contributors" } },
  { label: "Create Contributor", category: "Contributors", prompt: 'Create contributor named "Jane Doe" with role "Developer"' },

  // Demos
  { label: "Demos", category: "Demos", api: { method: "GET", url: "/api/demos" } },
  { label: "Create Demo", category: "Demos", prompt: 'Create demo titled "Platform Overview" with video URL "..."' },

  // Guides
  { label: "Installation Guides", category: "Guides", api: { method: "GET", url: "/api/installation-guides" } },
  { label: "Create Guide", category: "Guides", prompt: 'Create installation guide titled "Quick Start" with slug "quick-start" for project type "neural-aurora"' },

  // Releases
  { label: "Release Notes", category: "Releases", api: { method: "GET", url: "/api/release-notes" } },
  { label: "Create Release", category: "Releases", prompt: 'Create release note titled "v2.0" with version "2.0.0" for project type "neural-aurora"' },

  // Links
  { label: "External Links", category: "Links", api: { method: "GET", url: "/api/external-links" } },
  { label: "Create Link", category: "Links", prompt: 'Create external link titled "GitHub" with url "https://github.com/..."' },

  // Homepage
  { label: "All Sections", category: "Homepage", api: { method: "GET", url: "/api/homepage" } },
  { label: "Projects", category: "Homepage", api: { method: "GET", url: "/api/homepage/projects" } },
  { label: "Features", category: "Homepage", api: { method: "GET", url: "/api/homepage/features" } },
  { label: "Stats", category: "Homepage", api: { method: "GET", url: "/api/homepage/stats" } },
  { label: "Steps", category: "Homepage", api: { method: "GET", url: "/api/homepage/steps" } },
  { label: "FAQs", category: "Homepage", api: { method: "GET", url: "/api/homepage/faqs" } },
  { label: "Repos", category: "Homepage", api: { method: "GET", url: "/api/homepage/repos" } },
];

export default function AssistantChat({ variant = "full", onClose, mode = "user" }: AssistantChatProps) {
  const QUICK_ACTIONS: ActionItem[] = mode === "admin" ? ADMIN_QUICK_ACTIONS : USER_QUICK_ACTIONS;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        mode === "admin"
          ? "I'm the **Neural Aurora Admin Assistant**. I have full control over the documentation platform.\n\n" +
            "**What I can do (admin):**\n" +
            "• Dashboard — platform statistics\n" +
            "• Pages — list, search, create, update, delete\n" +
            "• Categories — list, create, update, delete\n" +
            "• Users — list\n" +
            "• Homepage — browse all sections (Projects, Features, Stats, Steps, FAQs, Repos)\n" +
            "• Contributors, Demos, Guides, Releases, Links\n\n" +
            "Try a quick action below or type what you need."
          : "I'm the **Neural Aurora Docs Assistant**. I can help you explore documentation.\n\n" +
            "**What I can do:**\n" +
            "• Pages — list\n" +
            "• Categories — list\n" +
            "• Contributors — list\n" +
            "• Demos — list\n" +
            "• Installation Guides — list\n" +
            "• Release Notes — list\n" +
            "• External Links — list\n\n" +
            "Try a quick action below or type what you need.",
      timestamp: new Date(),
      action: { type: "ready", status: "success" },
    },
  ]);
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showAllActions, setShowAllActions] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const adjustHeight = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const handleSend = useCallback(
    async (text?: string) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || sending) return;

      setSending(true);
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";

      const thinkingId = `thinking-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: thinkingId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          action: { type: "processing", status: "pending" },
        },
      ]);

      try {
        const history = messagesRef.current
          .filter((m) => m.content && m.id !== "intro")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history, mode }),
        });

        const data = await res.json();

        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? {
                  ...m,
                  content: data.reply,
                  action: data.action ? { ...data.action, status: "success" } : undefined,
                }
              : m,
          ),
        );
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === thinkingId
              ? {
                  ...m,
                  content: err instanceof Error ? err.message : "Something went wrong",
                  action: { type: "error", status: "error", detail: "Request failed" },
                }
              : m,
          ),
        );
      } finally {
        setSending(false);
      }
    },
    [input, sending],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "intro",
        role: "assistant",
        content: "Chat cleared. How can I help you?",
        timestamp: new Date(),
        action: { type: "ready", status: "success" },
      },
    ]);
    setShowAllActions(false);
  }, []);

  const extractItems = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    if (data.pages) return data.pages;
    if (data.users) return data.users;
    if (data.items) return data.items;
    const arr = Object.values(data).find(Array.isArray);
    return arr ?? [];
  };

  const formatItem = (item: any): string => {
    const title = item.title ?? item.name ?? item.label ?? item.full_name ?? item.id ?? "(untitled)";
    const meta = item.slug ? ` (\`${item.slug}\`)` : item.email ? ` (${item.email})` : item.url ? ` (${item.url})` : item.version ? ` v${item.version}` : "";
    const desc = item.excerpt ?? item.description ?? item.bio ?? "";
    return `- **${title}**${meta}${desc ? ` — ${desc.slice(0, 80)}` : ""}`;
  };

  const formatApiResult = useCallback(async (action: DirectAction): Promise<string> => {
    const label = action.label;

    // Dashboard: aggregate stats from all endpoints
    if (label === "Dashboard") {
      const endpoints = [
        { url: "/api/docs", key: "Pages" },
        { url: "/api/categories", key: "Categories" },
        { url: "/api/users", key: "Users" },
        { url: "/api/contributors", key: "Contributors" },
        { url: "/api/installation-guides", key: "Installation Guides" },
        { url: "/api/release-notes", key: "Release Notes" },
      ];
      const results = await Promise.all(
        endpoints.map(async (ep) => {
          try {
            const r = await fetch(ep.url);
            const d = await r.json();
            const items = extractItems(d);
            return { key: ep.key, count: Array.isArray(items) ? items.length : 0 };
          } catch { return { key: ep.key, count: "—" }; }
        }),
      );
      const rows = results.map((r) => `| ${r.key} | ${r.count} |`).join("\n");
      return `**Platform Dashboard**\n\n| Metric | Count |\n|--------|-------|\n${rows}`;
    }

    // All homepage sections
    if (label === "All Sections") {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      if (!res.ok) return `**Error:** ${data.error || "Request failed"}`;
      const sections = ["projects", "features", "stats", "steps", "faqs"];
      const parts: string[] = [];
      for (const section of sections) {
        const items = data[section];
        if (Array.isArray(items) && items.length > 0) {
          parts.push(`**${section.charAt(0).toUpperCase() + section.slice(1)}** (${items.length})`);
          items.slice(0, 5).forEach((item: any) => parts.push(formatItem(item)));
          if (items.length > 5) parts.push(`  _...and ${items.length - 5} more_`);
          parts.push("");
        }
      }
      return parts.length > 0 ? parts.join("\n") : "**Homepage**\n\nNo sections found.";
    }

    const res = await fetch(action.api.url, { method: action.api.method });
    const data = await res.json();
    if (!res.ok) return `**Error:** ${data.error || "Request failed"}`;

    const items = extractItems(data);
    if (!Array.isArray(items) || items.length === 0) return `**${label}**\n\nNo results found.`;

    const rows = items.slice(0, 20).map(formatItem);
    const count = items.length > 20 ? `\n\n_Showing 20 of ${items.length} results._` : "";
    return `**${label}** (${items.length})\n\n${rows.join("\n")}${count}`;
  }, []);

  const handleQuickAction = useCallback(async (action: ActionItem) => {
    if (isDirectAction(action)) {
      if (sending) return;
      setSending(true);
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: `📊 ${action.label}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const loadingId = `loading-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
          action: { type: "loading", status: "pending" },
        },
      ]);

      try {
        const content = await formatApiResult(action);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? { ...m, content, action: { type: action.category.toLowerCase(), status: "success" } }
              : m,
          ),
        );
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === loadingId
              ? {
                  ...m,
                  content: err instanceof Error ? err.message : "Something went wrong",
                  action: { type: "error", status: "error", detail: "Request failed" },
                }
              : m,
          ),
        );
      } finally {
        setSending(false);
      }
    } else {
      handleSend(action.prompt);
    }
  }, [sending, handleSend, formatApiResult]);

  const hasSentMessage = messages.length > 1;
  const visibleActions = showAllActions ? QUICK_ACTIONS : QUICK_ACTIONS.slice(0, 6);

  const containerClass =
    variant === "floating"
      ? "flex h-full flex-col rounded-2xl border overflow-hidden"
      : "grid grid-rows-[auto_1fr_auto] h-full overflow-hidden";

  return (
    <div className={containerClass} style={{ borderColor: "var(--border-color)", background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--eyebrow-bg)" }}>
            <span className="text-sm" style={{ color: "var(--accent-glow)" }}>✦</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{mode === "admin" ? "Admin Assistant" : "Docs Assistant"}</h2>
            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{mode === "admin" ? "Full admin content control" : "Documentation explorer"}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearChat}
            aria-label="Clear conversation"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--text-tertiary)" }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          {variant === "floating" && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              style={{ color: "var(--text-tertiary)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="min-h-0 overflow-y-auto">
        <div className="space-y-1 px-3 py-3 sm:px-4 sm:py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 py-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--eyebrow-bg)" }}>
                  <span className="text-xs" style={{ color: "var(--accent-glow)" }}>✦</span>
                </div>
              )}

              <div className={`max-w-[88%] space-y-1.5 sm:max-w-[80%] ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "var(--accent-glow)", color: "#fff" }
                      : { border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-primary)" }
                  }
                >
                  {(msg.action?.type === "processing" || msg.action?.type === "loading") && !msg.content ? (
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" style={{ color: "var(--accent-glow)" }}>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span style={{ color: "var(--text-tertiary)" }}>Thinking...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                  )}

                  {msg.action && msg.action.status !== "pending" && (
                    <div
                      className={`mt-2 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                        msg.action.status === "success"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="capitalize">{msg.action.type.replace(/_/g, " ")}</span>
                      {msg.action.detail && (
                        <span style={{ color: "var(--text-tertiary)" }}>— {msg.action.detail}</span>
                      )}
                    </div>
                  )}
                </div>

                <p className={`px-1 text-[10px] ${msg.role === "user" ? "text-right" : ""}`} style={{ color: "var(--text-tertiary)" }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {msg.role === "user" && (
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--eyebrow-bg)" }}>
                  <span className="text-xs" style={{ color: "var(--accent-glow)" }}>◎</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div>
      {/* Quick Actions */}
      {!hasSentMessage && (
      <div className="border-t px-4 py-3" style={{ borderColor: "var(--border-color)" }}>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-1.5">
          {visibleActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handleQuickAction(action)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors"
              style={{ border: "1px solid var(--border-color)", background: "var(--card-bg)", color: "var(--text-secondary)" }}
            >
              {action.label}
            </button>
          ))}
          {!showAllActions && QUICK_ACTIONS.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllActions(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs transition-colors"
              style={{ borderColor: "var(--border-color)", color: "var(--text-tertiary)" }}
            >
              +{QUICK_ACTIONS.length - 6} more
            </button>
          )}
          {showAllActions && (
            <button
              type="button"
              onClick={() => setShowAllActions(false)}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs transition-colors"
              style={{ borderColor: "var(--border-color)", color: "var(--text-tertiary)" }}
            >
              Show less
            </button>
          )}
        </div>
      </div>
      )}

      {/* Input */}
      <div className="border-t px-3 py-2 sm:px-4 sm:py-3" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder={mode === "admin" ? "Ask to manage pages, users, homepage..." : "Ask about docs, pages, guides..."}
            rows={1}
            disabled={sending}
            className="flex-1 resize-none rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--input-bg)",
              color: "var(--text-primary)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || sending}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all active:scale-[0.96] disabled:opacity-40"
            style={{ background: "var(--accent-glow)" }}
          >
            {sending ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
          {mode === "admin" ? "Pages · Categories · Users · Homepage · Content · Dashboard" : "Pages · Categories · Demos · Guides · Releases · Dashboard"} · Shift+Enter for new line
        </p>
      </div>
      </div>
    </div>
  );
}

