import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <WifiOff className="size-16 text-slate-600" aria-hidden />
      <h1 className="text-2xl font-bold text-slate-100">You're Offline</h1>
      <p className="max-w-md text-slate-400">
        This page isn't available offline yet. Once you connect to the internet,
        you'll be able to access the full documentation.
      </p>
    </div>
  );
}
