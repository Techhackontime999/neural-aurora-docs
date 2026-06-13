"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const QUICK_ACTIONS = [
  { label: "Dashboard", prompt: "Show dashboard stats", category: "Overview" },
  { label: "Help", prompt: "Help", category: "Overview" },
  { label: "List Pages", prompt: "List pages", category: "Docs" },
  { label: "Search Pages", prompt: "Search for React", category: "Docs" },
  { label: "Categories", prompt: "List categories", category: "Docs" },
  { label: "Contributors", prompt: "List contributors", category: "Content" },
  { label: "Demos", prompt: "List demos", category: "Content" },
  { label: "Installation Guides", prompt: "List installation guides", category: "Content" },
  { label: "Release Notes", prompt: "List release notes", category: "Content" },
  { label: "External Links", prompt: "List external links", category: "Content" },
];

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

const USER_QUICK_ACTIONS = [
  { label: "Dashboard", prompt: "Show dashboard stats", category: "Overview" },
  { label: "Help", prompt: "Help", category: "Overview" },
  { label: "List Pages", prompt: "List pages", category: "Docs" },
  { label: "Search Pages", prompt: "Search for React", category: "Docs" },
  { label: "Categories", prompt: "List categories", category: "Docs" },
  { label: "Contributors", prompt: "List contributors", category: "Content" },
  { label: "Demos", prompt: "List demos", category: "Content" },
  { label: "Installation Guides", prompt: "List installation guides", category: "Content" },
  { label: "Release Notes", prompt: "List release notes", category: "Content" },
  { label: "External Links", prompt: "List external links", category: "Content" },
];

const ADMIN_QUICK_ACTIONS = [
  { label: "Dashboard", prompt: "Show dashboard stats", category: "Overview" },
  { label: "Help", prompt: "Help", category: "Overview" },
  { label: "List Pages", prompt: "List pages", category: "Pages" },
  { label: "Create Page", prompt: 'Create a page in category "neural-aurora" with title "Test" and slug "test"', category: "Pages" },
  { label: "Categories", prompt: "List categories", category: "Categories" },
  { label: "Create Category", prompt: 'Create category "Getting Started" with slug "getting-started"', category: "Categories" },
  { label: "Users", prompt: "List users", category: "Users" },
  { label: "Homepage", prompt: "List homepage sections", category: "Homepage" },
  { label: "Demos", prompt: "List demos", category: "Content" },
  { label: "Release Notes", prompt: "List release notes", category: "Content" },
];

export default function AssistantChat({ variant = "full", onClose, mode = "user" }: AssistantChatProps) {
  const QUICK_ACTIONS = mode === "admin" ? ADMIN_QUICK_ACTIONS : USER_QUICK_ACTIONS;

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
            "• Users — list, approve\n" +
            "• Homepage — browse and manage all sections\n" +
            "• Contributors, Demos, Guides, Releases, Links\n\n" +
            "Try a quick action below or type what you need."
          : "I'm the **Neural Aurora Docs Assistant**. I can help you explore documentation.\n\n" +
            "**What I can do:**\n" +
            "• Dashboard — platform statistics\n" +
            "• Pages — list, search, view\n" +
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
                  {msg.action?.type === "processing" && !msg.content ? (
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
              key={action.prompt}
              type="button"
              onClick={() => handleSend(action.prompt)}
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

