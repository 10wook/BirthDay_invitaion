"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import { trainerConfig } from "@/config/trainer";
import pokemonData from "@/data/pokemon.json";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";
import { GameTextBox } from "@/components/ui/GameTextBox";
import { PokemonSprite } from "@/components/ui/PokemonSprite";

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
      <div ref={contentRef} className="game-window dex-screen relative mx-auto w-full max-w-[430px] p-5">
        <p data-hero className="font-system text-center text-[8px] text-game-blue">
          ■ POKÉDEX ENTRY
        </p>
        <p data-hero className="font-system mt-2 text-center text-poke-red">
          No.{trainerConfig.trainerNo}
        </p>
        <h1 data-hero className="font-display mt-2 text-center text-2xl font-bold leading-tight">
          {trainerConfig.name.toUpperCase()}
        </h1>
        <p data-hero className="font-system mt-2 text-center text-[8px]">
          Lv.{trainerConfig.level} · {trainerConfig.region}
        </p>

        <div data-hero className="mt-4">
          <GameTextBox showCursor={false}>
            {trainerConfig.birthday}에 레벨 {trainerConfig.nextLevel}로 진화하는 생일 모험이 시작됩니다!
          </GameTextBox>
        </div>

        <div data-hero className="mt-5">
          <Button variant="primary" size="lg" sfx="START" onClick={() => scrollTo("trainer-profile", "START")}>
            ▶ PRESS START
          </Button>
        </div>

        <div data-hero className="mt-4 game-window p-3">
          <div className="flex items-center justify-between">
            <p className="font-system text-[8px]">PARTY</p>
            <button
              type="button"
              onClick={() => scrollTo("party", "PARTY_OPEN")}
              className="font-system text-[8px] text-game-blue hover:underline"
            >
              OPEN →
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-end justify-center gap-1">
            {pokemonData.party.map((p) => (
              <PokemonSprite key={p.id} dexNo={p.dexNo} name={p.name} size="xs" />
            ))}
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
