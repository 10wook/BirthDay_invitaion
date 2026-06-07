"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
}

const variants = {
  primary:
    "bg-poke-red text-white border-2 border-dex-border shadow-[3px_3px_0_#4B4B4B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#4B4B4B]",
  secondary:
    "bg-primary-yellow text-text border-2 border-dex-border shadow-[3px_3px_0_#4B4B4B]",
  ghost: "bg-white/80 text-text border-2 border-dex-border",
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
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-bold transition-all",
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
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link href={href} className={classes}>{children}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}
