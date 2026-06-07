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
    "bg-primary-pink text-white border-2 border-primary-pink shadow-[0_4px_16px_rgba(255,183,213,0.4)] hover:bg-secondary-pink hover:border-secondary-pink",
  secondary:
    "bg-white/80 text-text border-2 border-sky-blue hover:bg-sky-blue/30",
  ghost: "bg-transparent text-text-light border-2 border-transparent",
};

const sizes = {
  sm: "px-4 py-2.5 text-base min-h-[44px]",
  md: "px-6 py-3 text-lg min-h-[48px]",
  lg: "px-8 py-4 text-xl min-h-[52px] w-full",
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
    "inline-flex items-center justify-center rounded-full font-body font-bold transition-all duration-300",
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
        <Link href={href} className={classes} target={target} rel={rel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
