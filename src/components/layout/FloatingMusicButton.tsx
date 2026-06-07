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
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center",
        "rounded-full border border-gold/40 bg-charcoal/60 text-gold backdrop-blur-md",
        "shadow-lg shadow-black/20 transition-colors hover:border-gold hover:bg-charcoal/80",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isPlaying ? 0 : 0 }}
      aria-label={isPlaying ? "음악 끄기" : "음악 켜기"}
    >
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: isPlaying ? 3 : 0.3,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
        }}
      >
        {isPlaying ? <Music size={22} /> : <VolumeX size={22} />}
      </motion.div>
    </motion.button>
  );
}
