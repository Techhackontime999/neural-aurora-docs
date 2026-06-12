import { NextResponse } from "next/server";

export async function GET() {
  const script = `
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", () => {
      self.clients.matchAll({ type: "window" }).then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      });
    });
  `;

  return new NextResponse(script.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
