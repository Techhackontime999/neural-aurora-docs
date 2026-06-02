import type { Metadata } from "next";
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
    "Official documentation for NEURAL AURORA (The Synaptic Portfolio) and WACRM (WhatsApp CRM Template). Built by Techhackontime999.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
