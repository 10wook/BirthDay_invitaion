"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function FloatingMusicButton({
  isPlaying,
  onToggle,
}: FloatingMusicButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center",
        "rounded-full border-2 border-primary-pink bg-white/90 text-primary-pink",
        "shadow-[0_4px_20px_rgba(255,183,213,0.5)] backdrop-blur-md",
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "음악 끄기" : "음악 켜기"}
    >
      {isPlaying ? <Music size={22} /> : <VolumeX size={22} />}
    </motion.button>
  );
}
