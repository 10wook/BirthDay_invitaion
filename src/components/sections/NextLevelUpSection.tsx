"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { useCountdown } from "@/hooks/useCountdown";
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { padZero } from "@/lib/utils";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatBar } from "@/components/ui/StatBar";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

function NextLevelDisplay() {
  const gridRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const { playSfx } = useAudio();
  const { days, hours, minutes, seconds, isPast } = useCountdown(siteConfig.eventDate);
  const values = { days, hours, minutes, seconds };

  useEffect(() => {
    registerGsapPlugins();
    const grid = gridRef.current;
    if (!grid) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-lvl]", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          onEnter: () => {
            if (playedRef.current) return;
            playedRef.current = true;
            playSfx("LEVEL_UP");
            if (flashRef.current) {
              gsap.fromTo(
                flashRef.current,
                { opacity: 0.5 },
                { opacity: 0, duration: 0.8, ease: "power2.out" },
              );
            }
          },
        },
      });
    }, grid);
    return () => ctx.revert();
  }, [playSfx]);

  return (
    <div ref={gridRef} className="relative">
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-primary-yellow opacity-0"
      />
      <div data-lvl className="mb-6 flex items-center justify-center gap-4">
        <div className="dex-card px-6 py-3 text-center">
          <p className="font-system text-text-light">CURRENT</p>
          <p className="font-display text-3xl">Lv.{trainerConfig.level}</p>
        </div>
        <span className="animate-bounce text-2xl">↓</span>
        <div className="dex-card border-poke-red px-6 py-3 text-center">
          <p className="font-system text-poke-red">NEXT</p>
          <p className="font-display text-3xl text-poke-red">Lv.{trainerConfig.nextLevel}</p>
        </div>
      </div>
      {!isPast ? (
        <div className="grid grid-cols-2 gap-3">
          {units.map(({ key, label }) => (
            <div key={key} className="dex-card py-4 text-center">
              <AnimatePresence mode="popLayout">
                <motion.p key={values[key]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-3xl">
                  {padZero(values[key])}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs font-bold text-text-light">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-bold text-poke-red">LEVEL UP READY!</p>
      )}
      <div className="mt-6">
        <StatBar label="EXP to Next Level" value={trainerConfig.exp} color="exp" />
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="grid grid-cols-2 gap-3">{[1,2,3,4].map(i => <div key={i} className="dex-card h-20 animate-pulse" />)}</div>;
}

const NextLevelDisplayClient = dynamic(() => Promise.resolve({ default: NextLevelDisplay }), { ssr: false, loading: () => <Skeleton /> });

export function NextLevelUpSection() {
  return (
    <SectionWrapper id="next-level">
      <SectionTitle subtitle="Countdown" title="Next Level Up" />
      <NextLevelDisplayClient />
      <p className="mt-6 text-center text-sm text-text-light">{siteConfig.eventDateDisplay}</p>
    </SectionWrapper>
  );
}
