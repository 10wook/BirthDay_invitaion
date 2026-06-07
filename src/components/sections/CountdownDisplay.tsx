"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useCountdown } from "@/hooks/useCountdown";
import { siteConfig } from "@/config/site";
import { padZero } from "@/lib/utils";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
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
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
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
      <p className="text-center font-serif text-2xl text-gold">
        오늘은 특별한 날입니다!
      </p>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
    >
      {units.map(({ key, label }) => (
        <div
          key={key}
          data-countdown-item
          className="flex flex-col items-center rounded-sm border border-gold/20 bg-charcoal/40 px-4 py-8 backdrop-blur-sm"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={values[key]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-5xl text-ivory md:text-6xl lg:text-7xl"
            >
              {padZero(values[key])}
            </motion.span>
          </AnimatePresence>
          <span className="mt-3 text-xs uppercase tracking-[0.25em] text-gold">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CountdownSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
      {units.map(({ key, label }) => (
        <div
          key={key}
          className="flex flex-col items-center rounded-sm border border-gold/20 bg-charcoal/40 px-4 py-8 backdrop-blur-sm"
        >
          <span className="font-serif text-5xl text-ivory/30 md:text-6xl lg:text-7xl">
            --
          </span>
          <span className="mt-3 text-xs uppercase tracking-[0.25em] text-gold">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
