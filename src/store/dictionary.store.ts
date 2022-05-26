import { observable, action, makeObservable } from 'mobx';
import { Assoctiation } from '../api/card/types';
import { Dictionary } from './types';

export class DictionaryStore {
  dictionaries: Dictionary[] = [];
  publicDictionaries: Dictionary[] = [];
  isAssociationsModal = false;
  cardAssociations: Assoctiation[] = [];
  isCreateDictionaryModal = false;

  constructor() {
    makeObservable(this, {
      dictionaries: observable,
      publicDictionaries: observable,
      isAssociationsModal: observable,
      cardAssociations: observable,
      isCreateDictionaryModal: observable,

      setDictionaries: action.bound,
      setPublicDictionaries: action.bound,
      setAssociationsModal: action.bound,
      setCardAssociations: action.bound,
    });
  }

  public setDictionaries = (dictionaries: Dictionary[]) => {
    this.dictionaries = dictionaries;
  };

  public setPublicDictionaries = (dictionaries: Dictionary[]) => {
    this.publicDictionaries = dictionaries;
  };

  public setAssociationsModal = (value: boolean) => {
    this.isAssociationsModal = value;
  };

  public setCardAssociations = (associations: Assoctiation[]) => {
    this.cardAssociations = associations;
  };

  public setCreateDictionaryModal = (value: boolean) => {
    this.isCreateDictionaryModal = value;
  };
}
