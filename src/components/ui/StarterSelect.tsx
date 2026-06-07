"use client";

import { useState } from "react";
import { useAudio } from "@/components/audio/useAudio";
import { siteConfig } from "@/config/site";
import { starterChoices, type StarterChoice } from "@/config/starters";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { PokemonSprite } from "@/components/ui/PokemonSprite";
import { GameTextBox } from "@/components/ui/GameTextBox";
import { cn } from "@/lib/utils";

export function StarterSelect() {
  const [selected, setSelected] = useState<StarterChoice | null>(null);
  const { playSfx, unlock } = useAudio();

  const choose = (starter: StarterChoice) => {
    unlock();
    setSelected(starter);
    playSfx(starter.sfx ?? "CLICK");
  };

  const confirm = () => {
    if (!selected) return;
    unlock();
    playSfx("CONFIRM");
    window.open(siteConfig[selected.rsvpUrlKey], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <GameTextBox label="PROFESSOR">
        어떤 포켓몬과 모험을 시작하겠습니까?
      </GameTextBox>

      <div className="starter-stage grid grid-cols-3 gap-2 p-3">
        {starterChoices.map((starter) => {
          const isActive = selected?.id === starter.id;
          return (
            <button
              key={starter.id}
              type="button"
              onClick={() => choose(starter)}
              className={cn("starter-slot", isActive && "is-selected")}
              aria-pressed={isActive}
            >
              {isActive && (
                <span className="font-system absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] text-poke-red">
                  ▶
                </span>
              )}
              <PokemonSprite
                dexNo={Number.parseInt(starter.dexNo, 10)}
                name={starter.nameKo}
                size="sm"
                className="mx-auto h-14 w-14"
              />
              <p className="font-system mt-1 text-[7px] text-game-blue">No.{starter.dexNo}</p>
              <p className="font-display text-xs font-bold leading-tight">{starter.nameKo}</p>
              <p className="font-system mt-1 text-[6px] leading-snug text-text-light">
                {starter.choiceLabel}
              </p>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="space-y-3">
          <GameTextBox showCursor={false}>
            <span className="font-bold text-poke-red">{selected.nameKo}</span>!{" "}
            {selected.flavorText}
          </GameTextBox>
          <div className="flex flex-wrap gap-1">
            {selected.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
          <button
            type="button"
            onClick={confirm}
            className="font-system w-full min-h-[52px] rounded-md border-[3px] border-dex-border bg-primary-yellow text-text shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_4px_#383838,4px_4px_0_#383838] active:translate-x-[1px] active:translate-y-[1px]"
          >
            ▶ {selected.nameKo}와 모험 시작!
          </button>
        </div>
      ) : (
        <p className="font-system text-center text-[8px] text-text-light">
          포켓몬을 선택해 주세요
        </p>
      )}
    </div>
  );
}
