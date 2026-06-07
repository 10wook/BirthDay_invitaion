import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn("flex items-center justify-center gap-3 px-2 py-6", className)}
    >
      <span className="h-px flex-1 bg-[#E5E7EB]" />
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#FFCB05] ring-4 ring-[#FFCB05]/25" />
      <span className="h-px flex-1 bg-[#E5E7EB]" />
    </div>
  );
}
