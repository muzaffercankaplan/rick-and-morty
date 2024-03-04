export interface LocationSchema {
  info: InfoSchema;
  results: LocationResultSchema[];
}

export interface InfoSchema {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface LocationResultSchema {
  id: number;
  name: string;
  type: string;
  dimension?: string;
  residents?: string[];
  url: string;
  created: string;
  status?: string;
  image?: string;
  species?: string;
  gender?: string;
}

export interface LocaitonDetailSchema {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface CharacterDetailSchema {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocationInfo;
  location: CharacterLocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
  dimension?: string;
  residents?: string[];
}

interface CharacterLocationInfo {
  name: string;
  url: string;
}
