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
      <span className="h-[3px] flex-1 rounded-full border-t-[3px] border-dashed border-dex-border/35" />
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        <span className="absolute h-7 w-7 rounded-full border-2 border-dex-border bg-white shadow-[2px_2px_0_#4B4B4B]" />
        <span className="absolute top-0 h-3.5 w-7 rounded-t-full border-2 border-b-0 border-dex-border bg-poke-red" />
        <span className="absolute top-[calc(50%-1px)] h-0.5 w-7 bg-dex-border" />
        <span className="absolute top-[calc(50%-3px)] h-1.5 w-1.5 rounded-full border border-dex-border bg-white" />
      </span>
      <span className="h-[3px] flex-1 rounded-full border-t-[3px] border-dashed border-dex-border/35" />
    </div>
  );
}
