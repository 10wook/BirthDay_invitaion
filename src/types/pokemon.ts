export interface PokemonEntry {
  id: string;
  dexNo: number;
  emoji: string;
  name: string;
  nameKo: string;
  level: number;
  types: string[];
  keywords: string[];
  hp: number;
  image: string;
  description: string;
  whyChosen: string;
  story: string;
}

export interface PokemonData {
  party: PokemonEntry[];
}
