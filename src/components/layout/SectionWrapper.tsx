import { SectionDivider } from "@/components/ui/SectionDivider";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
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
        "relative z-[2] w-full px-4 pb-8 md:px-6",
        showDivider ? "pt-2" : "pt-10",
        fullHeight && "min-h-screen",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[430px]">
        {showDivider && <SectionDivider />}
        <div className="promo-panel p-5 md:p-6">{children}</div>
      </div>
    </section>
  );
}
