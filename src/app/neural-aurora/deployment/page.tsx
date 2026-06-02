import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Deployment — NEURAL AURORA | Neural Aurora Docs",
  description:
    "Deploy NEURAL AURORA to Vercel, Netlify, or Cloudflare Pages — SPA rewrites, environment variables, and build configuration.",
};

export default function NeuralAuroraDeployment() {
  return (
    <div className="prose-doc max-w-none">
      <Link
        href="/neural-aurora"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to NEURAL AURORA overview
      </Link>

      <h1>Deployment</h1>
      <p>
        NEURAL AURORA can be deployed to any static hosting platform. Vercel is
        recommended for the best experience, but Netlify and Cloudflare Pages
        also work well.
      </p>

      <h2>Vercel (Recommended)</h2>
      <ol>
        <li>
          Push the repository to GitHub, GitLab, or Bitbucket
        </li>
        <li>
          Import the project in the Vercel dashboard
        </li>
        <li>
          Vite is auto-detected by Vercel — no additional configuration needed
        </li>
        <li>
          Add all environment variables from your <code>.env</code> file in
          the Vercel dashboard
        </li>
        <li>
          Deploy — the <code>vercel.json</code> file in the project root
          handles SPA rewrites automatically
        </li>
      </ol>

      <h2>Netlify</h2>
      <ol>
        <li>
          Connect your repository to Netlify
        </li>
        <li>
          Build command: <code>npm run build</code>
        </li>
        <li>
          Publish directory: <code>dist</code>
        </li>
        <li>
          The <code>public/_redirects</code> file handles SPA fallback
        </li>
        <li>
          Add environment variables in the Netlify dashboard
        </li>
      </ol>

      <h2>Cloudflare Pages</h2>
      <ol>
        <li>
          Connect your repository to Cloudflare Pages
        </li>
        <li>
          Build command: <code>npm run build</code>
        </li>
        <li>
          Build output directory: <code>dist</code>
        </li>
        <li>
          Add environment variables in the Cloudflare dashboard
        </li>
      </ol>

      <h2>Build Output</h2>
      <p>
        The production build outputs to the <code>dist/</code> directory with
        the following structure:
      </p>
      <pre>{`dist/
├── index.html
├── assets/          ← Bundled JS/CSS
├── images/          ← Optimized images
├── resume.pdf
├── _redirects       ← Netlify SPA fallback
├── robots.txt
└── sitemap.xml`}</pre>

      <hr />

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/neural-aurora/architecture"
          className="text-sm text-slate-400 hover:text-aurora-600 dark:hover:text-aurora-400"
        >
          &larr; Architecture
        </Link>
        <span className="text-sm text-slate-300 dark:text-slate-600">
          End of NEURAL AURORA docs
        </span>
      </div>
    </div>
  );
}
