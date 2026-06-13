import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/use-theme";
import { DocsShell } from "@/components/DocsShell";
import Loader from "@/components/Loader";
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
  icons: [
    { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NA Docs",
  },
  other: {
    "theme-color": "#020617",
    "msapplication-TileColor": "#020617",
    "msapplication-TileImage": "/icons/icon-192x192.png",
    "application-name": "Neural Aurora — Documentation",
    "apple-mobile-web-app-title": "NA Docs",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
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
      <body className="antialiased">
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
        <div id="__loader" style={{ position: "fixed", inset: 0, zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#050508", transition: "opacity 0.6s ease, visibility 0.6s ease" }}>
          <style>{`
            #__loader.hide { opacity: 0 !important; visibility: hidden !important; }
            #__loader .rings { position: relative; width: 96px; height: 96px; margin-bottom: 32px; }
            #__loader .ring { position: absolute; border-radius: 50%; border: 1px solid; }
            #__loader .ring-1 { inset: 0; border-color: rgba(139,92,246,0.15); }
            #__loader .ring-2 { inset: 12px; border-color: rgba(45,212,191,0.12); }
            #__loader .ring-3 { inset: 24px; border-color: rgba(139,92,246,0.1); }
            #__loader .dot { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 8px; height: 8px; border-radius: 50%; background: #a78bfa; box-shadow: 0 0 12px rgba(139,92,246,0.5); }
            #__loader h1 { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.025em; background: linear-gradient(90deg, #a78bfa, #c084fc, #2dd4bf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 4px; }
            #__loader .sub { font-size: 10px; color: rgba(71,85,105,0.8); letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 24px; }
            #__loader .bar { width: 160px; height: 1.5px; background: rgba(255,255,255,0.04); border-radius: 999px; overflow: hidden; position: relative; }
            #__loader .bar-inner { height: 100%; border-radius: 999px; background: linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(45,212,191,0.6), transparent); background-size: 200% 100%; animation: loader-progress 1.4s cubic-bezier(0.16,1,0.3,1) forwards; }
            @keyframes loader-progress { 0% { translate: -100%; } 100% { translate: 200%; } }
          `}</style>
          <div className="rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
            <div className="dot"></div>
          </div>
          <h1>NEURAL AURORA</h1>
          <p className="sub">Loading</p>
          <div className="bar"><div className="bar-inner"></div></div>
        </div>
        <Script id="loader-hide" strategy="afterInteractive">{`document.getElementById("__loader")?.classList.add("hide");`}</Script>
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
          <Loader />
        </ThemeProvider>
      </body>
    </html>
  );
}
