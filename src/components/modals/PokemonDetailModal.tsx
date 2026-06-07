"use client";

import Image from "next/image";
import type { PokemonEntry } from "@/types/pokemon";
import { StatBar } from "@/components/ui/StatBar";
import { DexModalShell } from "./DexModalShell";

interface PokemonDetailModalProps {
  pokemon: PokemonEntry | null;
  onClose: () => void;
}

export function PokemonDetailModal({ pokemon, onClose }: PokemonDetailModalProps) {
  if (!pokemon) return null;

  return (
    <DexModalShell
      isOpen={Boolean(pokemon)}
      onClose={onClose}
      subtitle={`No.${pokemon.id.toUpperCase()} · POKÉDEX`}
      title={`${pokemon.emoji} ${pokemon.name}`}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl border-2 border-dex-border">
        <Image src={pokemon.image} alt={pokemon.name} fill className="object-cover" sizes="360px" />
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="rounded-full border-2 border-dex-border bg-primary-yellow px-3 py-1 text-xs font-bold"
          >
            {type}
          </span>
        ))}
        <span className="font-system rounded-full border-2 border-dex-border bg-white px-3 py-1 text-text">
          Lv.{pokemon.level}
        </span>
      </div>
      <StatBar label="HP" value={pokemon.hp} color="hp" />
      <p className="mt-4 text-sm leading-relaxed text-text">{pokemon.description}</p>
      <div className="mt-4 rounded-xl bg-sky-blue/20 px-4 py-3">
        <p className="font-system text-[10px] text-text-light">WHY CHOSEN</p>
        <p className="mt-1 text-sm text-text">{pokemon.whyChosen}</p>
      </div>
      <div className="mt-3 rounded-xl bg-grass-green/20 px-4 py-3">
        <p className="font-system text-[10px] text-text-light">STORY</p>
        <p className="mt-1 text-sm text-text">{pokemon.story}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pokemon.keywords.map((kw) => (
          <span key={kw} className="text-xs font-bold text-poke-red">
            #{kw}
          </span>
        ))}
      </div>
    </DexModalShell>
  );
}
