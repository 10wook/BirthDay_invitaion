"use client";

import Image from "next/image";
import type { MemoryBadge } from "@/types";
import { DexModalShell } from "./DexModalShell";

interface BadgeDetailModalProps {
  badge: MemoryBadge | null;
  onClose: () => void;
}

export function BadgeDetailModal({ badge, onClose }: BadgeDetailModalProps) {
  if (!badge) return null;

  return (
    <DexModalShell
      isOpen={Boolean(badge)}
      onClose={onClose}
      subtitle="BADGE GET!"
      title={`${badge.emoji} ${badge.name}`}
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border-2 border-dex-border">
        <Image src={badge.image} alt={badge.name} fill className="object-cover" sizes="360px" />
      </div>
      <p className="text-sm font-bold text-text">{badge.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-text-light">{badge.story}</p>
      <div className="mt-4 rounded-xl bg-grass-green/20 px-4 py-3">
        <p className="font-system text-[10px] text-text-light">MEMORY</p>
        <p className="mt-1 text-sm text-text">{badge.memory}</p>
      </div>
    </DexModalShell>
  );
}
