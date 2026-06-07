"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAudio } from "@/components/audio/useAudio";
import type { SfxKey } from "@/lib/audio/sfxMap";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  sfx?: SfxKey | "none";
}

const variants = {
  primary:
    "bg-[#FFCB05] text-[#222] shadow-[0_4px_14px_rgba(255,203,5,0.45)] hover:bg-[#ffd633] active:shadow-[0_2px_8px_rgba(255,203,5,0.35)]",
  secondary:
    "bg-[#3B4CCA] text-white shadow-[0_4px_14px_rgba(59,76,202,0.35)] hover:bg-[#4a5bd4]",
  ghost: "bg-white text-text-light border border-[#E5E7EB] shadow-sm hover:bg-[#FAFAFA]",
};

const sizes = {
  sm: "px-4 py-2 text-sm min-h-[44px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-6 py-4 text-base min-h-[52px] w-full",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  target,
  rel,
  sfx = "CLICK",
}: ButtonProps) {
  const { playSfx, unlock } = useAudio();

  const handleClick = () => {
    unlock();
    if (sfx !== "none") playSfx(sfx);
    onClick?.();
  };

  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-bold transition-all",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={classes}
          target={target}
          rel={rel ?? "noopener noreferrer"}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            unlock();
            if (sfx !== "none") playSfx(sfx);
          }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link href={href} className={classes} onClick={handleClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button type="button" onClick={handleClick} className={classes} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
