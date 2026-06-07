"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { PokemonEntry } from "@/types/pokemon";
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
      <div className="relative aspect-square w-full bg-sky-blue/30">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 45vw"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 text-2xl">{pokemon.emoji}</span>
        <span className="font-system absolute right-2 top-2 rounded-md bg-poke-red px-2 py-0.5 text-white">
          Lv.{pokemon.level}
        </span>
      </div>
      <div className="p-3">
        <p className="font-display text-base font-bold">{pokemon.name}</p>
        <p className="mt-0.5 text-xs text-text-light">{pokemon.types.join(" / ")}</p>
        <div className="mt-2">
          <StatBar label="HP" value={pokemon.hp} color="hp" size="sm" />
        </div>
      </div>
    </motion.button>
  );
}
