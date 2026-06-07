"use client";

import { useEffect, useState } from "react";
import { getLegendaryDuel, pickRandomDuelId } from "@/config/legendaryDuels";
import {
  getDuelAnimatedSpriteUrl,
  getDuelSpriteFlip,
  getDuelSpriteOffset,
} from "@/lib/pokemonSprites";

const SESSION_KEY = "legendary_duel_id";

function DuelSprite({
  dexNo,
  name,
  side,
}: {
  dexNo: number;
  name: string;
  side: "left" | "right";
}) {
  const flip = getDuelSpriteFlip(dexNo, side);
  const offset = getDuelSpriteOffset(dexNo);
  const transform = `${flip ? "scaleX(-1) " : ""}translate(${offset.x}px, ${offset.y}px)`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getDuelAnimatedSpriteUrl(dexNo)}
      alt={name}
      width={72}
      height={72}
      className="duel-sprite block h-[72px] w-[72px] object-contain [image-rendering:pixelated]"
      style={{
        transform,
        transformOrigin: "bottom center",
      }}
      draggable={false}
    />
  );
}

export function LegendaryDuelBackground() {
  const [duelId, setDuelId] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    const id = stored ? Number.parseInt(stored, 10) : pickRandomDuelId();
    if (!stored) sessionStorage.setItem(SESSION_KEY, String(id));
    setDuelId(Number.isNaN(id) ? 1 : id);
  }, []);

  if (!duelId) return null;

  const duel = getLegendaryDuel(duelId);

  return (
    <div
      className="legendary-duel pointer-events-none fixed inset-x-0 top-0 z-[1] mx-auto h-[38vh] max-w-[430px]"
      aria-hidden
    >
      <div className="legendary-duel__arena">
        <div className="legendary-duel__fighter">
          <div className="duel-lunge duel-lunge--left">
            <DuelSprite dexNo={duel.left.dexNo} name={duel.left.name} side="left" />
          </div>
        </div>

        <div className="legendary-duel__clash">
          <span
            className="duel-beam duel-beam--left"
            style={{ backgroundColor: duel.leftColor, boxShadow: `0 0 8px ${duel.leftColor}` }}
          />
          <span
            className="duel-beam duel-beam--right"
            style={{ backgroundColor: duel.rightColor, boxShadow: `0 0 8px ${duel.rightColor}` }}
          />
          <span
            className="duel-spark"
            style={{ backgroundColor: duel.clashColor, boxShadow: `0 0 12px ${duel.clashColor}` }}
          />
        </div>

        <div className="legendary-duel__fighter">
          <div className="duel-lunge duel-lunge--right">
            <DuelSprite dexNo={duel.right.dexNo} name={duel.right.name} side="right" />
          </div>
        </div>
      </div>

      <p className="font-system legendary-duel__label text-[7px]">
        ■ LEGENDARY DUEL #{duelId} · {duel.left.nameKo} VS {duel.right.nameKo}
      </p>
    </div>
  );
}
