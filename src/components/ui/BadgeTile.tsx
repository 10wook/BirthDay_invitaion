"use client";

import { motion } from "framer-motion";
import type { MemoryBadge } from "@/types";

interface BadgeTileProps {
  badge: MemoryBadge;
  onClick: () => void;
}

export function BadgeTile({ badge, onClick }: BadgeTileProps) {
  return (
    <motion.button
      type="button"
      data-badge
      onClick={onClick}
      className="dex-card group relative flex flex-col items-center overflow-hidden p-2 text-center"
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-active:translate-x-full" />
      <span className="text-xl">{badge.emoji}</span>
      <p className="mt-1 text-[10px] font-bold leading-tight text-text">{badge.name}</p>
    </motion.button>
  );
}
