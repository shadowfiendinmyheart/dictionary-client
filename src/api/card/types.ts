export interface Example {
  id: number;
  from: string;
  to: string;
}

export interface Assoctiation {
  translate: string[];
  image: string;
  description?: string;
}

export enum Language {
  English = 'english',
  Russian = 'russian',
  Chinese = 'chinese',
  German = 'german',
  Spanish = 'spanish',
  French = 'french',
  Japanese = 'japanese',
}

export type LanguageInterface = {
  [key in Language]: string;
};

export interface Card {
  phrase: string;
  description: string;
  associations: Assoctiation[];
  id: number;
  counter: number;
}
