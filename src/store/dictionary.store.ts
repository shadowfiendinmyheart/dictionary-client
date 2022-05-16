import { observable, action, makeObservable, computed } from 'mobx';
import { Language } from '../api/card/types';
import { Dictionary } from './types';

export class DictionaryStore {
  dictionaries: Dictionary[] = [
    {
      id: 0,
      name: 'cats',
      description: 'meow',
      from: Language.Russian,
      to: Language.English,
      private: false,
      user_id: 0,
    },
    {
      id: 1,
      name: 'dogs',
      description: 'bark',
      from: Language.Russian,
      to: Language.English,
      private: false,
      user_id: 0,
    },
  ];

  constructor() {
    makeObservable(this, {
      dictionaries: observable,
    });
  }
}
