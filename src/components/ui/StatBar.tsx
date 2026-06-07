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
  const fill = color === "hp" ? "bg-[#78C850]" : "bg-[#FFCB05]";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "mb-1 flex justify-between font-system uppercase text-text",
          size === "sm" ? "text-[7px]" : "text-[8px]",
        )}
      >
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>
      <div
        className={cn(
          "overflow-hidden rounded-sm border-2 border-dex-border bg-[#383838] p-0.5",
          size === "sm" ? "h-2.5" : "h-3.5",
        )}
      >
        <div
          className={cn("h-full rounded-sm transition-all duration-700", fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
