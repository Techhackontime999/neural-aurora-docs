const API_BASE = (process.env.AI_API_BASE || "https://api.openai.com/v1").replace(/\/+$/, "");
const API_KEY = process.env.AI_API_KEY;
const MODEL = process.env.AI_MODEL || "gpt-4o-mini";

export async function callAi(
  messages: { role: string; content: string }[],
  tools?: any[],
  opts?: { model?: string; temperature?: number; max_tokens?: number },
) {
  if (!API_KEY) {
    throw new Error(
      "AI_API_KEY environment variable is not set. " +
        "To use the AI Assistant, set this variable in your .env file.",
    );
  }

  const body: any = {
    model: opts?.model || MODEL,
    messages,
    temperature: opts?.temperature ?? 0.1,
    max_tokens: opts?.max_tokens ?? 2048,
  };

  if (tools && tools.length > 0) {
    body.tools = tools;
    body.tool_choice = "auto";
  }

  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error (${res.status}): ${err}`);
  }

  return res.json();
}
