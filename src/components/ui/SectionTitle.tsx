import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {subtitle && (
        <p className="font-accent mb-2 text-base text-primary-pink">{subtitle}</p>
      )}
      <h2 className="font-display text-[26px] leading-tight text-text md:text-3xl">
        {title}
      </h2>
      <div className="mt-3 flex justify-center gap-1">
        <span className="text-sm">✨</span>
        <div className="h-1 w-12 rounded-full bg-primary-pink/60" />
        <span className="text-sm">✨</span>
      </div>
    </div>
  );
}
