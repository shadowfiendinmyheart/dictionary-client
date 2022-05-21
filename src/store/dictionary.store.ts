import { observable, action, makeObservable } from 'mobx';
import { Dictionary } from './types';

export class DictionaryStore {
  dictionaries: Dictionary[] = [];
  publicDictionaries: Dictionary[] = [];

  constructor() {
    makeObservable(this, {
      dictionaries: observable,
      publicDictionaries: observable,

      setDictionaries: action.bound,
    });
  }

  public setDictionaries = (dictionaries: Dictionary[]) => {
    this.dictionaries = dictionaries;
  };

  public setPublicDictionaries = (dictionaries: Dictionary[]) => {
    this.publicDictionaries = dictionaries;
  };
}
