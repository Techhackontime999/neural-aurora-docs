"use client";

import AssistantChat from "@/components/AssistantChat";

export default function AdminAiAutomationPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          AI Automation
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-tertiary)" }}>
          Use natural language to explore documentation, manage content, and automate admin work.
        </p>
      </div>
      <div
        className="min-h-0 flex-1 rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-primary)" }}
      >
        <AssistantChat variant="full" mode="admin" />
      </div>
    </div>
  );
}
