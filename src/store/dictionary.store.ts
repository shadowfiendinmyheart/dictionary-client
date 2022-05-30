import { observable, action, makeObservable, computed } from 'mobx';
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
  currentDictionary: Dictionary | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      dictionaries: observable,
      publicDictionaries: observable,
      isAssociationsModal: observable,
      cardAssociations: observable,
      isCreateDictionaryModal: observable,
      currentDictionary: observable,

      setDictionaries: action.bound,
      addDictionary: action.bound,
      setPublicDictionaries: action.bound,
      setAssociationsModal: action.bound,
      setCardAssociations: action.bound,
      setCurrentDictionary: action.bound,

      isPosibleToAddDictionary: computed,
    });

    this.userStore = userStore;
  }

  public setDictionaries = (dictionaries: Dictionary[]) => {
    this.dictionaries = dictionaries;
  };

  public addDictionary = (dictionary: Dictionary) => {
    this.dictionaries = [...this.dictionaries, dictionary];
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

  public setCurrentDictionary = (dictionary: Dictionary) => {
    this.currentDictionary = dictionary;
  };

  get isPosibleToAddDictionary() {
    if (!this.currentDictionary) {
      return false;
    }

    const findedDictionary = this.publicDictionaries.find((publicDictionary) => {
      return publicDictionary.id === this.currentDictionary?.id;
    });

    if (!findedDictionary) return false;

    return true;
  }
}
