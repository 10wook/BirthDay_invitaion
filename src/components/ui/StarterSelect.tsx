"use client";

import { useEffect, useState } from "react";
import { useAudio } from "@/components/audio/useAudio";
import { siteConfig } from "@/config/site";
import { getStarterChoicesByDuelId, type StarterChoice } from "@/config/starters";
import { pickRandomDuelId } from "@/config/legendaryDuels";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { PokemonSprite } from "@/components/ui/PokemonSprite";
import { GameTextBox } from "@/components/ui/GameTextBox";
import { cn } from "@/lib/utils";

const SESSION_KEY = "legendary_duel_id";

export function StarterSelect() {
  const [duelId, setDuelId] = useState(1);
  const [selected, setSelected] = useState<StarterChoice | null>(null);
  const { playSfx, playCry, unlock } = useAudio();

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    const id = stored ? Number.parseInt(stored, 10) : pickRandomDuelId();
    if (!stored) sessionStorage.setItem(SESSION_KEY, String(id));
    setDuelId(Number.isNaN(id) ? 1 : id);
  }, []);

  const starterChoices = getStarterChoicesByDuelId(duelId);

  const choose = (starter: StarterChoice) => {
    unlock();
    setSelected(starter);
    playCry(starter.name, starter.dexNo);
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
      <GameTextBox label={`PROFESSOR · GEN ${duelId}`}>
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
              <div className="flex h-14 items-end justify-center overflow-visible pb-0.5">
                <PokemonSprite
                  dexNo={starter.dexNo}
                  name={starter.nameKo}
                  size="sm"
                />
              </div>
              <p className="font-system mt-1 text-[7px] text-game-blue">
                No.{String(starter.dexNo).padStart(3, "0")}
              </p>
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
          <GameTextBox showCursor={false}>{selected.flavorText}</GameTextBox>
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
          포켓몬을 선택하면 울음소리를 들을 수 있어요
        </p>
      )}
    </div>
  );
}
