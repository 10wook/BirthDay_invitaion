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
      className="dex-card flex flex-col items-center p-2.5 text-center"
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
    >
      <span className="text-xl">{badge.emoji}</span>
      <p className="mt-1 text-[10px] font-bold leading-tight text-text">{badge.name}</p>
    </motion.button>
  );
}
