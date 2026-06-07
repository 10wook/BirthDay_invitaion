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
        "relative w-full px-6 py-24 md:px-12 md:py-32",
        fullHeight && "min-h-screen",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
