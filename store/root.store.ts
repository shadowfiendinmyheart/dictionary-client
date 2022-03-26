import React from 'react';
import { AuthStore } from './auth.store';

class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore();
  }
}

const store = new RootStore();

export const storeContext = React.createContext(store);
export const useStore = () => React.useContext(storeContext);
