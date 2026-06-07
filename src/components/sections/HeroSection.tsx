"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { trainerConfig } from "@/config/trainer";
import pokemonData from "@/data/pokemon.json";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { playSfx } = useAudio();

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-hero]"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string, sfx: "START" | "PARTY_OPEN") => {
    playSfx(sfx);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-[2] flex min-h-[100dvh] flex-col justify-end px-4 pb-10 pt-8"
    >
      <div ref={contentRef} className="promo-banner relative mx-auto w-full max-w-[430px] px-6 pb-6 pt-10">
        <div data-hero className="text-center">
          <span className="promo-label">BIRTHDAY ADVENTURE</span>
          <p data-hero className="font-system mt-4 text-[#3B4CCA]">
            TRAINER No.{trainerConfig.trainerNo}
          </p>
          <h1 data-hero className="font-display mt-2 text-[1.75rem] font-bold leading-tight text-[#222]">
            {trainerConfig.name.toUpperCase()}
          </h1>
          <p data-hero className="mt-2 text-base font-semibold text-[#444]">
            {trainerConfig.birthday} · Level {trainerConfig.level} → {trainerConfig.nextLevel}
          </p>
        </div>

        <div data-hero className="mt-8">
          <Button variant="secondary" size="lg" sfx="START" onClick={() => scrollTo("trainer-profile", "START")}>
            모험 시작하기 →
          </Button>
        </div>

        <div
          data-hero
          className="mt-6 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#666]">CURRENT PARTY</p>
              <p className="mt-1 text-xl tracking-wide">
                {pokemonData.party.map((p) => p.emoji).join(" ")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollTo("party", "PARTY_OPEN")}
              className="text-sm font-bold text-[#3B4CCA] hover:underline"
            >
              MORE →
            </button>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
