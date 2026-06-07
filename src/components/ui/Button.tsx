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
    "bg-gold text-charcoal hover:bg-gold-light border border-transparent",
  secondary:
    "bg-transparent text-ivory border border-gold/50 hover:border-gold hover:bg-gold/10",
  ghost: "bg-transparent text-warm-gray hover:text-ivory border border-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
    "inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all duration-300",
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
