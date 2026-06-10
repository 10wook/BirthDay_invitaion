"use client";

import type { PokemonEntry } from "@/types/pokemon";
import { StatBar } from "@/components/ui/StatBar";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { PokemonSprite } from "@/components/ui/PokemonSprite";
import { GameTextBox } from "@/components/ui/GameTextBox";
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
      subtitle={`No.${String(pokemon.dexNo).padStart(3, "0")} · 포켓몬 도감`}
      title={`${pokemon.emoji} ${pokemon.nameKo}`}
    >
      <div className="mb-4 flex aspect-square items-center justify-center border-[3px] border-dex-border bg-[#C8F0C0]">
        <PokemonSprite dexNo={pokemon.dexNo} name={pokemon.name} size="lg" />
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
        <span className="font-system border-2 border-dex-border bg-poke-red px-2 py-0.5 text-white shadow-[2px_2px_0_#383838]">
          Lv.{pokemon.level}
        </span>
      </div>
      <StatBar label="HP" value={pokemon.hp} color="hp" />
      <GameTextBox label="도감 설명" className="mt-4" showCursor={false}>
        {pokemon.description}
      </GameTextBox>
      <GameTextBox label="스토리" className="mt-3" showCursor={false}>
        {pokemon.story}
      </GameTextBox>
      <div className="mt-3 flex flex-wrap gap-2">
        {pokemon.keywords.map((kw) => (
          <span key={kw} className="font-system text-[8px] text-poke-red">
            #{kw}
          </span>
        ))}
      </div>
    </DexModalShell>
  );
}
