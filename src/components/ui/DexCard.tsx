import { cn } from "@/lib/utils";

interface DexCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DexCard({ children, className }: DexCardProps) {
  return (
    <div className={cn("dex-card p-4 md:p-5", className)}>{children}</div>
  );
}
