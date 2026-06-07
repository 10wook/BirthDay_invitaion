"use client";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-text-light">
      <span className="text-xs font-bold uppercase">Scroll</span>
      <span className="animate-bounce text-poke-red">▼</span>
    </div>
  );
}
