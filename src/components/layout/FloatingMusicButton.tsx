"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function FloatingMusicButton({ isPlaying, onToggle }: FloatingMusicButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center",
        "rounded-full border-2 border-dex-border bg-primary-yellow text-text",
        "shadow-[3px_3px_0_#4B4B4B]",
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Music off" : "Music on"}
    >
      {isPlaying ? <Music size={22} /> : <VolumeX size={22} />}
    </motion.button>
  );
}
