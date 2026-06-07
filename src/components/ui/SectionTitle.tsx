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
        "mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {subtitle && (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl leading-tight text-ivory md:text-5xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-6 h-px w-16 bg-gradient-to-r from-gold to-transparent",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
