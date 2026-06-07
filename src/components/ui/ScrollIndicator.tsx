"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/70">
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <ChevronDown size={20} className="animate-bounce" />
    </div>
  );
}
