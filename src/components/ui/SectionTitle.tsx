import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export function SectionTitle({ subtitle, title, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-6", className)}>
      {subtitle && <span className="promo-label mb-3">{subtitle.toUpperCase()}</span>}
      <h2 className="font-display mt-2 text-2xl font-bold text-text md:text-[1.65rem]">{title}</h2>
      <div className="mt-3 h-1 w-full max-w-[120px] rounded-full bg-[#FFCB05]" />
    </div>
  );
}
