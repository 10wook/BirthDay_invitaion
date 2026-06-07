import { cn } from "@/lib/utils";

interface GameTextBoxProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  showCursor?: boolean;
}

export function GameTextBox({ children, label, className, showCursor = true }: GameTextBoxProps) {
  return (
    <div className={cn("game-textbox", className)}>
      {label && <p className="font-system mb-2 text-[8px] text-poke-red">{label}</p>}
      <div className="text-sm leading-relaxed text-text">{children}</div>
      {showCursor && <span className="game-cursor" aria-hidden>▼</span>}
    </div>
  );
}
