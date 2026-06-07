"use client";

import { motion } from "framer-motion";
import type { PokemonEntry } from "@/types/pokemon";
import { PokemonSprite } from "./PokemonSprite";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";

interface PokemonCardProps {
  pokemon: PokemonEntry;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <motion.button
      type="button"
      data-party
      onClick={onClick}
      className="dex-card overflow-hidden p-0 text-left"
      whileTap={{ scale: 0.97 }}
    >
      <div className="relative flex aspect-square w-full items-center justify-center border-b-[3px] border-dex-border bg-[#C8F0C0]">
        <PokemonSprite dexNo={pokemon.dexNo} name={pokemon.name} size="lg" />
        <span className="font-system absolute right-2 top-2 bg-poke-red px-2 py-0.5 text-white shadow-[2px_2px_0_#383838]">
          Lv.{pokemon.level}
        </span>
        <span className="font-system absolute left-2 top-2 text-[7px] text-game-blue">
          No.{String(pokemon.dexNo).padStart(3, "0")}
        </span>
      </div>
      <div className="p-3">
        <p className="font-display text-base font-bold">{pokemon.name}</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
        <div className="mt-2">
          <StatBar label="HP" value={pokemon.hp} color="hp" size="sm" />
        </div>
      </div>
    </motion.button>
  );
}
