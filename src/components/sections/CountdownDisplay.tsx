"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useCountdown } from "@/hooks/useCountdown";
import { siteConfig } from "@/config/site";
import { padZero } from "@/lib/utils";

const units = [
  { key: "days", label: "Days", emoji: "📅" },
  { key: "hours", label: "Hours", emoji: "⏰" },
  { key: "minutes", label: "Min", emoji: "✨" },
  { key: "seconds", label: "Sec", emoji: "💕" },
] as const;

export function CountdownDisplay() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    siteConfig.eventDate,
  );

  const values = { days, hours, minutes, seconds };

  useEffect(() => {
    registerGsapPlugins();
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.querySelectorAll("[data-countdown-item]"), {
        y: 30,
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, grid);

    return () => ctx.revert();
  }, [isPast]);

  if (isPast) {
    return (
      <p className="font-accent text-center text-2xl text-primary-pink">
        오늘이 바로 그 날이에요! 🎂
      </p>
    );
  }

  return (
    <div ref={gridRef} className="grid grid-cols-2 gap-4">
      {units.map(({ key, label, emoji }) => (
        <div
          key={key}
          data-countdown-item
          className="cute-card flex flex-col items-center py-6"
        >
          <span className="mb-1 text-lg">{emoji}</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={values[key]}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="font-display text-4xl text-text"
            >
              {padZero(values[key])}
            </motion.span>
          </AnimatePresence>
          <span className="font-body mt-2 text-sm text-text-light">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function CountdownSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="cute-card flex flex-col items-center py-6"
        >
          <span className="font-display text-4xl text-text/20">--</span>
          <span className="font-body mt-2 text-sm text-text-light">{label}</span>
        </div>
      ))}
    </div>
  );
}
