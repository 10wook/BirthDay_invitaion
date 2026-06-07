import {
  getPokemonAnimatedSpriteUrl,
  getPokemonSpriteDisplayOffset,
  getPokemonSpriteDisplayScale,
  getPokemonSpriteUrl,
} from "@/lib/pokemonSprites";
import { cn } from "@/lib/utils";

interface PokemonSpriteProps {
  dexNo: number;
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  xs: 32,
  sm: 48,
  md: 80,
  lg: 112,
} as const;

export function PokemonSprite({
  dexNo,
  name,
  size = "md",
  className,
  animated = true,
}: PokemonSpriteProps) {
  const px = sizeMap[size];
  const scale = getPokemonSpriteDisplayScale(dexNo);
  const offset = getPokemonSpriteDisplayOffset(dexNo);
  const displayPx = Math.round(px * scale);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={animated ? getPokemonAnimatedSpriteUrl(dexNo) : getPokemonSpriteUrl(dexNo)}
      alt={name}
      width={displayPx}
      height={displayPx}
      className={cn(
        "inline-block max-w-none object-contain [image-rendering:pixelated]",
        className,
      )}
      style={{
        width: displayPx,
        height: displayPx,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      loading="lazy"
      draggable={false}
    />
  );
}
