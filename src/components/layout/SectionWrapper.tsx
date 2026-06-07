import { SectionDivider } from "@/components/ui/SectionDivider";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  /** 섹션 상단 Poké Ball 구분선 (기본: true) */
  showDivider?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  fullHeight = false,
  showDivider = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[2] w-full px-4 pb-14 md:px-6",
        showDivider ? "pt-4" : "pt-14",
        fullHeight && "min-h-screen",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[430px]">
        {showDivider && <SectionDivider />}
        {children}
      </div>
    </section>
  );
}
