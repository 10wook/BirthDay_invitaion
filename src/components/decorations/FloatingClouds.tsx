"use client";

export function FloatingClouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="animate-float absolute -left-8 top-[12%] h-12 w-24 rounded-full bg-white/60 blur-sm" />
      <div className="animate-float absolute right-4 top-[20%] h-8 w-20 rounded-full bg-white/50 blur-sm [animation-delay:1s]" />
      <div className="animate-float absolute left-[20%] top-[8%] h-6 w-16 rounded-full bg-white/40 blur-sm [animation-delay:2s]" />
    </div>
  );
}
