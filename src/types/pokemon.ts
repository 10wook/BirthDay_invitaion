export interface PokemonEntry {
  id: string;
  emoji: string;
  name: string;
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
