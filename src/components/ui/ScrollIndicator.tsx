"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-text-light">
      <span className="font-accent text-sm">아래로</span>
      <ChevronDown size={20} className="animate-bounce text-primary-pink" />
    </div>
  );
}
