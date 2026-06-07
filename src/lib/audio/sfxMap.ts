export const SFX = {
  START: "/sfx/start.mp3",
  POKEDEX_OPEN: "/sfx/pokedex-open.mp3",
  PARTY_OPEN: "/sfx/party-open.mp3",
  BADGE_UNLOCK: "/sfx/badge-unlock.mp3",
  LEVEL_UP: "/sfx/level-up.mp3",
  CONFIRM: "/sfx/confirm.mp3",
  CLICK: "/sfx/click.mp3",
} as const;

export type SfxKey = keyof typeof SFX;

export const SFX_VOLUME: Partial<Record<SfxKey, number>> = {
  START: 0.6,
  POKEDEX_OPEN: 0.5,
  PARTY_OPEN: 0.5,
  BADGE_UNLOCK: 0.55,
  LEVEL_UP: 0.7,
  CONFIRM: 0.6,
  CLICK: 0.3,
};
