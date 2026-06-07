"use client";

import { useState } from "react";
import { useAudio } from "@/components/audio/useAudio";
import { cn } from "@/lib/utils";

interface GameMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  sfx?: "CONFIRM" | "CLICK";
}

interface GameMenuProps {
  items: GameMenuItem[];
  className?: string;
}

export function GameMenu({ items, className }: GameMenuProps) {
  const [active, setActive] = useState(0);
  const { playSfx, unlock } = useAudio();

  const select = (index: number) => {
    unlock();
    setActive(index);
    playSfx(items[index].sfx ?? "CLICK");
    items[index].onSelect();
  };

  return (
    <div className={cn("game-menu", className)}>
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => select(index)}
          onMouseEnter={() => setActive(index)}
          className={cn("game-menu-item font-system min-h-[48px] w-full text-left", active === index && "is-active")}
        >
          {active === index ? "▶ " : "  "}
          {item.label}
        </button>
      ))}
    </div>
  );
}
