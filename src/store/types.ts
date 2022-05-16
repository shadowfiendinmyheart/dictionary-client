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
  from: Language;
  to: Language;
  private: boolean;
  user_id: number;
}
