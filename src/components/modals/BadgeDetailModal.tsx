"use client";

import Image from "next/image";
import type { MemoryBadge } from "@/types";
import { GameTextBox } from "@/components/ui/GameTextBox";
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
      subtitle="배지 획득!"
      title={`${badge.emoji} ${badge.name}`}
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden border-[3px] border-dex-border bg-[#C8F0C0]">
        <Image src={badge.image} alt={badge.name} fill className={badge.imageStyle === "contain" ? "object-contain p-4" : "object-cover"} sizes="360px" />
      </div>
      <GameTextBox label="설명" showCursor={false}>
        {badge.description}
      </GameTextBox>
      <GameTextBox label="스토리" className="mt-3" showCursor={false}>
        {badge.story}
      </GameTextBox>
      <GameTextBox label="추억" className="mt-3" showCursor={false}>
        {badge.memory}
      </GameTextBox>
    </DexModalShell>
  );
}
