import { cn } from "@/lib/utils";

interface PokeballIconProps {
  size?: number;
  className?: string;
}

export function PokeballIcon({ size = 24, className }: PokeballIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/pokeball.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      draggable={false}
    />
  );
}
