import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export function SectionTitle({ subtitle, title, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-8 text-center", className)}>
      {subtitle && (
        <p className="font-system mb-1 text-poke-red">
          {subtitle.toUpperCase()}
        </p>
      )}
      <h2 className="font-display text-2xl text-text md:text-3xl">{title}</h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary-yellow" />
    </div>
  );
}
