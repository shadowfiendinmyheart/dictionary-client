import { observable, action, makeObservable, computed } from 'mobx';
import { Language } from '../api/card/types';
import createDictionary from '../api/dictionary/createDictionary';
import {
  MAX_DICTIONARY_DESCRIPTION_LENGTH,
  MAX_DICTIONARY_NAME_LENGTH,
  MIN_DICTIONARY_NAME_LENGTH,
} from '../constants/dictionary';
import { DictionaryStore } from './dictionary.store';
import { Dictionary } from './types';

export class CreateDictionaryStore {
  private dictionaryStore: DictionaryStore;
  name = '';
  description = '';
  isPrivate = true;
  fromLanguage: Language = Language.Russian;
  toLanguage: Language = Language.English;

  errorName = '';
  errorDescription = '';

  constructor(dictionaryStore: DictionaryStore) {
    makeObservable(this, {
      name: observable,
      description: observable,
      isPrivate: observable,
      fromLanguage: observable,
      toLanguage: observable,

      errorName: observable,

      handleNameChange: action.bound,
      handleDescriptionChange: action.bound,
      setFromLanguage: action.bound,
      setToLanguage: action.bound,
      handleShufflePress: action.bound,

      validate: computed,
    });

    this.dictionaryStore = dictionaryStore;
  }

  public handleNameChange = (value: string) => {
    if (value === undefined) {
      this.errorName = 'Это поле не может быть пустым';
      return false;
    }

    if (value.length < MIN_DICTIONARY_NAME_LENGTH) {
      this.errorName = `Название словаря должно быть больше ${MIN_DICTIONARY_NAME_LENGTH}`;
      return false;
    }

    if (value.length > MAX_DICTIONARY_NAME_LENGTH) {
      this.errorName = `Название словаря должно быть меньше ${MAX_DICTIONARY_NAME_LENGTH}`;
      return false;
    }

    this.errorName = '';
    this.name = value;
  };

  public handleDescriptionChange = (value: string) => {
    if (value === undefined) {
      this.errorDescription = 'Это поле не может быть пустым';
      return false;
    }

    if (value.length > MAX_DICTIONARY_DESCRIPTION_LENGTH) {
      this.errorDescription = `Описание словаря должно быть меньше ${MAX_DICTIONARY_DESCRIPTION_LENGTH}`;
      return false;
    }

    this.errorDescription = '';
    this.description = value;
  };

  public setPrivate = (value: boolean) => {
    this.isPrivate = value;
  };

  public setFromLanguage = (language: Language) => {
    this.fromLanguage = language;
  };

  public setToLanguage = (language: Language) => {
    this.toLanguage = language;
  };

  public handleShufflePress = () => {
    const temp = this.fromLanguage;
    this.setFromLanguage(this.toLanguage);
    this.setToLanguage(temp);
  };

  public createDictionary = async () => {
    const response = await createDictionary({
      name: this.name,
      description: this.description,
      from: this.fromLanguage,
      to: this.toLanguage,
      privateDictionary: this.isPrivate,
    });

    if (response) {
      this.dictionaryStore.setDictionaries([
        ...this.dictionaryStore.dictionaries,
        { ...response },
      ]);
      this.isPrivate = true;
    }
  };

  get validate() {
    if (!this.name || !this.description) {
      return false;
    }

    if (this.errorName || this.errorDescription) {
      return false;
    }

    return true;
  }
}
