import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn("flex items-center justify-center gap-4 px-2 py-8", className)}
    >
      <span className="h-px flex-1 bg-[#4B4B4B]/20" />
      <span className="relative block h-6 w-6 shrink-0">
        <span className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#4B4B4B] bg-[#FFF8E8] shadow-[2px_2px_0_#4B4B4B]">
          <span className="block h-1/2 bg-[#FF6B6B]" />
          <span className="block h-px w-full bg-[#4B4B4B]" />
          <span className="block h-[calc(50%-1px)] bg-[#FFF8E8]" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4B4B4B] bg-white" />
      </span>
      <span className="h-px flex-1 bg-[#4B4B4B]/20" />
    </div>
  );
}
