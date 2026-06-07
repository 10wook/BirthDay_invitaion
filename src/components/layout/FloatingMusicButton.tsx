"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (v: number) => void;
}

export function FloatingMusicButton({
  isPlaying,
  volume,
  onToggle,
  onVolumeChange,
}: FloatingMusicButtonProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="dex-card flex items-center gap-2 px-3 py-2"
          >
            <Volume2 size={14} className="text-text-light" />
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
              className="h-2 w-24 accent-poke-red"
              aria-label="BGM volume"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dex-border bg-white text-text shadow-[2px_2px_0_#4B4B4B]"
          aria-label="Volume control"
        >
          <ChevronUp size={14} className={cn("transition-transform", expanded && "rotate-180")} />
        </button>
        <motion.button
          type="button"
          onClick={onToggle}
          className={cn(
            "flex h-14 w-14 items-center justify-center",
            "rounded-full border-2 border-dex-border bg-primary-yellow text-text",
            "shadow-[3px_3px_0_#4B4B4B]",
          )}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Music off" : "Music on"}
        >
          {isPlaying ? <Music size={22} /> : <VolumeX size={22} />}
        </motion.button>
      </div>
    </div>
  );
}
