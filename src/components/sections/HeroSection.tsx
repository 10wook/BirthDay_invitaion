"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { trainerConfig } from "@/config/trainer";
import pokemonData from "@/data/pokemon.json";
import { FloatingClouds } from "@/components/decorations/FloatingClouds";
import { SparkleField } from "@/components/decorations/SparkleField";
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
      className="relative z-[2] flex h-[100dvh] min-h-[640px] flex-col items-center justify-center px-4"
    >
      <FloatingClouds />
      <SparkleField />
      <div ref={contentRef} className="dex-screen relative mx-auto w-full max-w-[430px] p-6 text-center">
        <p data-hero className="font-system text-poke-red">
          POKÉDEX ENTRY
        </p>
        <p data-hero className="font-system mt-2 text-text-light">
          No.{trainerConfig.trainerNo}
        </p>
        <h1 data-hero className="font-display mt-3 text-3xl leading-tight text-text">
          {trainerConfig.name.toUpperCase()}
        </h1>
        <p data-hero className="mt-2 text-lg font-bold text-text">
          Birthday Adventure
        </p>
        <p data-hero className="mt-1 text-base text-text-light">
          {trainerConfig.birthday}
        </p>
        <div data-hero className="mt-8">
          <Button variant="primary" size="lg" sfx="START" onClick={() => scrollTo("trainer-profile", "START")}>
            ▶ PRESS START
          </Button>
        </div>
        <div data-hero className="mt-8 border-t-2 border-dex-border/30 pt-6">
          <p className="font-system text-text-light">CURRENT PARTY</p>
          <p className="mt-2 text-2xl tracking-widest">
            {pokemonData.party.map((p) => p.emoji).join(" ")}
          </p>
          <button
            type="button"
            onClick={() => scrollTo("party", "PARTY_OPEN")}
            className="mt-3 text-sm font-bold text-poke-red underline-offset-2 hover:underline"
          >
            View Party →
          </button>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
