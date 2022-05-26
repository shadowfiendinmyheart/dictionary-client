import { observable, action, makeObservable } from 'mobx';
import { Assoctiation } from '../api/card/types';
import { Dictionary } from './types';
import { UserStore } from './user.store';

export class DictionaryStore {
  private userStore: UserStore;
  dictionaries: Dictionary[] = [];
  publicDictionaries: Dictionary[] = [];
  isAssociationsModal = false;
  cardAssociations: Assoctiation[] = [];
  isCreateDictionaryModal = false;

  constructor(userStore: UserStore) {
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

    this.userStore = userStore;
  }

  public setDictionaries = (dictionaries: Dictionary[]) => {
    this.dictionaries = dictionaries;
  };

  public setPublicDictionaries = (dictionaries: Dictionary[]) => {
    const enemyDictionaries = dictionaries.filter(
      (dictionary) => dictionary.user_id != this.userStore.id,
    );
    this.publicDictionaries = enemyDictionaries;
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
