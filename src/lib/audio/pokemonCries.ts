const SHOWDOWN_CRY_BASE = "https://play.pokemonshowdown.com/audio/cries";
const POKEAPI_CRY_BASE =
  "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest";

/** Showdown slug 예외 (하이픈·기호 제거 시 깨지는 이름) */
const CRY_SLUG_OVERRIDES: Record<string, string> = {
  "ho-oh": "hooh",
  "porygon-z": "porygonz",
  "mr-mime": "mrmime",
  "mime-jr": "mimejr",
  "nidoran-m": "nidoranm",
  "nidoran-f": "nidoranf",
  "farfetch'd": "farfetchd",
};

function toCrySlug(name: string): string {
  const lower = name.toLowerCase();
  if (CRY_SLUG_OVERRIDES[lower]) return CRY_SLUG_OVERRIDES[lower];
  return lower.replace(/[^a-z0-9]/g, "");
}

export function getPokemonCryUrl(name: string, dexNo: number): string {
  return `${SHOWDOWN_CRY_BASE}/${toCrySlug(name)}.mp3`;
}

export function getPokemonCryFallbackUrl(dexNo: number): string {
  return `${POKEAPI_CRY_BASE}/${dexNo}.ogg`;
}
