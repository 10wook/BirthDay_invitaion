import { getPokemonAnimatedSpriteUrl, getPokemonSpriteUrl } from "@/lib/pokemonSprites";
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

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={animated ? getPokemonAnimatedSpriteUrl(dexNo) : getPokemonSpriteUrl(dexNo)}
      alt={name}
      width={px}
      height={px}
      className={cn(
        "inline-block object-contain [image-rendering:pixelated]",
        className,
      )}
      style={{ width: px, height: px }}
      loading="lazy"
      draggable={false}
    />
  );
}
