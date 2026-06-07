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
    "bg-poke-red text-white border-[3px] border-dex-border shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_4px_#383838,4px_4px_0_#383838] hover:translate-x-[1px] hover:translate-y-[1px]",
  secondary:
    "bg-primary-yellow text-text border-[3px] border-dex-border shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_4px_#383838,4px_4px_0_#383838]",
  ghost:
    "bg-cream text-text border-[3px] border-dex-border shadow-[inset_0_0_0_2px_#fff,2px_2px_0_#383838]",
};

const sizes = {
  sm: "px-4 py-2 min-h-[44px] font-system text-[10px]",
  md: "px-6 py-3 min-h-[48px] font-system text-[10px]",
  lg: "px-6 py-4 min-h-[52px] w-full font-system text-[10px]",
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
    "inline-flex items-center justify-center rounded-md font-bold transition-all",
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
