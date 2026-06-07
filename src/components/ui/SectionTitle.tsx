import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export function SectionTitle({ subtitle, title, className }: SectionTitleProps) {
  return (
    <div className={cn("game-window mb-6 px-4 py-3 text-center", className)}>
      {subtitle && (
        <p className="font-system text-[8px] text-game-blue">
          ■ {subtitle.toUpperCase()}
        </p>
      )}
      <h2 className="font-display mt-1 text-xl font-bold text-text md:text-2xl">{title}</h2>
    </div>
  );
}
