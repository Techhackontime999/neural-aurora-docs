import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/use-theme";
import { DocsShell } from "@/components/DocsShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neural Aurora — Documentation",
  description:
    "Official documentation for NEURAL AURORA (The Synaptic Portfolio) and WACRM (WhatsApp CRM) — the Neural Aurora CRM. Built by Techhackontime999.",
  keywords: [
    "NEURAL AURORA",
    "wacrm",
    "WhatsApp CRM",
    "portfolio",
    "documentation",
    "Techhackontime999",
    "Amit Kumar",
  ],
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head />
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var t = localStorage.getItem("theme");
                var d = t === "dark" || (!t && matchMedia("(prefers-color-scheme:dark)").matches);
                if (d) document.documentElement.classList.add("dark");
              } catch(e) {}
            })();
          `}
        </Script>
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
