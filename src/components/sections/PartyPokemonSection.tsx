"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { useAudio } from "@/components/audio/useAudio";
import pokemonData from "@/data/pokemon.json";
import type { PokemonEntry } from "@/types/pokemon";
import { PokemonDetailModal } from "@/components/modals/PokemonDetailModal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PokemonCard } from "@/components/ui/PokemonCard";

export function PartyPokemonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePokemon, setActivePokemon] = useState<PokemonEntry | null>(null);
  const { playSfx } = useAudio();

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-party]"), {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const handleCardClick = (pokemon: PokemonEntry) => {
    playSfx("POKEDEX_OPEN");
    setActivePokemon(pokemon);
  };

  return (
    <SectionWrapper id="party">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Party" title="Party Pokémon" />
        <div className="grid grid-cols-2 gap-3">
          {pokemonData.party.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleCardClick(pokemon)}
            />
          ))}
        </div>
        <p className="font-system mt-3 text-center text-text-light">
          Tap a Pokémon to open Pokédex entry
        </p>
      </section>
      <PokemonDetailModal pokemon={activePokemon} onClose={() => setActivePokemon(null)} />
    </SectionWrapper>
  );
}
