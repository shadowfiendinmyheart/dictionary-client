import { observable, action, makeObservable } from 'mobx';
import { Dictionary } from './types';

export class DictionaryStore {
  dictionaries: Dictionary[] = [];

  constructor() {
    makeObservable(this, {
      dictionaries: observable,

      setDictionaries: action.bound,
    });
  }

  public setDictionaries = (dictionaries: Dictionary[]) => {
    this.dictionaries = dictionaries;
  };
}
