import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  fullHeight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[2] w-full px-4 py-14 md:px-6",
        fullHeight && "min-h-screen",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[430px]">{children}</div>
    </section>
  );
}
