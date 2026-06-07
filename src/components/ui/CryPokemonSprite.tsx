"use client";

import { useAudio } from "@/components/audio/useAudio";
import { PokemonSprite } from "@/components/ui/PokemonSprite";
import { cn } from "@/lib/utils";

interface CryPokemonSpriteProps {
  dexNo: number;
  name: string;
  cryName?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  buttonClassName?: string;
}

export function CryPokemonSprite({
  dexNo,
  name,
  cryName,
  size = "md",
  className,
  buttonClassName,
}: CryPokemonSpriteProps) {
  const { playCry, unlock } = useAudio();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    unlock();
    playCry(cryName ?? name, dexNo);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${name} 울음소리 듣기`}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-transform active:scale-95",
        buttonClassName,
      )}
    >
      <PokemonSprite dexNo={dexNo} name={name} size={size} className={className} />
    </button>
  );
}
