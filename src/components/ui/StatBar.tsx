import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: "hp" | "exp";
  className?: string;
}

export function StatBar({
  label,
  value,
  max = 100,
  color = "hp",
  className,
}: StatBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const fill =
    color === "hp"
      ? "bg-grass-green"
      : "bg-primary-yellow";

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1 flex justify-between text-xs font-bold uppercase text-text">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-dex-border bg-white">
        <div
          className={cn("h-full rounded-full transition-all duration-700", fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
