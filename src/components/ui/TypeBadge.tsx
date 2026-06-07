import { getTypeColor } from "@/lib/pokemonTypes";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const colors = getTypeColor(type);

  return (
    <span
      className={cn(
        "inline-block rounded px-2 py-0.5 font-system text-[8px] uppercase text-white shadow-[1px_1px_0_rgba(0,0,0,0.3)]",
        className,
      )}
      style={{ backgroundColor: colors.bg, borderColor: colors.border, borderWidth: 1 }}
    >
      {type}
    </span>
  );
}
