import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400 dark:text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636a9 9 0 0 1 0 12.728m-2.829-2.829a5 5 0 0 1 0-7.07m-4.243 4.243a1 1 0 0 1 0-1.414"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          You&apos;re offline
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Please check your internet connection and try again.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-aurora-500 text-white text-sm font-medium hover:bg-aurora-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go home
        </Link>
      </div>
    </div>
  );
}
