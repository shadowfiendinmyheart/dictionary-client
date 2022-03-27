import React from 'react';
import { AuthStore } from './auth.store';
import { LoginStore } from './login.store';

class RootStore {
  authStore: AuthStore;
  loginStore: LoginStore;

  constructor() {
    this.authStore = new AuthStore();
    this.loginStore = new LoginStore();
  }
}

const store = new RootStore();

export type RootStoreType = typeof RootStore;
export const storeContext = React.createContext(store);
export const useStore = () => React.useContext(storeContext);
