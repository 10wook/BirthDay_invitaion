import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: "hp" | "exp";
  size?: "sm" | "md";
  className?: string;
}

export function StatBar({
  label,
  value,
  max = 100,
  color = "hp",
  size = "md",
  className,
}: StatBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const fill = color === "hp" ? "bg-grass-green" : "bg-primary-yellow";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "mb-1 flex justify-between font-bold uppercase text-text",
          size === "sm" ? "font-system text-[8px]" : "text-xs",
        )}
      >
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div
        className={cn(
          "overflow-hidden rounded-full border-2 border-dex-border bg-white",
          size === "sm" ? "h-2" : "h-3",
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-700", fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
