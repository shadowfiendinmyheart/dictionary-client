import { Language } from '../api/card/types';

export interface Token {
  id: string;
  email: string;
  username: string;
}

export interface Dictionary {
  id: number;
  name: string;
  description: string;
  fromLanguage: {
    id: number;
    name: Language;
  };
  toLanguage: {
    id: number;
    name: Language;
  };
  private: boolean;
  user_id: number;
  user: { username: string };
}
