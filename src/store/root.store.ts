import React from 'react';
import { RegistrationStore } from './registration.store';
import { LoginStore } from './login.store';
import { UserStore } from './user.store';
import { CardStore } from './card.store';
import { DictionaryStore } from './dictionary.store';
import { CreateDictionaryStore } from './createDictionary.store';
import { PhraseTranslationGameStore } from './phraseTranslationGame.store';

class RootStore {
  registrationStore: RegistrationStore;
  loginStore: LoginStore;
  userStore: UserStore;
  cardStore: CardStore;
  dictionaryStore: DictionaryStore;
  createDictionaryStore: CreateDictionaryStore;
  phraseTranslationGameStore: PhraseTranslationGameStore;

  constructor() {
    this.userStore = new UserStore();
    this.registrationStore = new RegistrationStore(this.userStore);
    this.loginStore = new LoginStore(this.userStore);
    this.dictionaryStore = new DictionaryStore(this.userStore);
    this.cardStore = new CardStore(this.dictionaryStore);
    this.createDictionaryStore = new CreateDictionaryStore(this.dictionaryStore);
    this.phraseTranslationGameStore = new PhraseTranslationGameStore();
  }
}

const store = new RootStore();

export type RootStoreType = typeof RootStore;
export const storeContext = React.createContext(store);
export const useStore = () => React.useContext(storeContext);
